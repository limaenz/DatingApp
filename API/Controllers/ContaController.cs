using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entidades;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ContaController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public ContaController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;

        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioDto>> Registrar(RegistrarDTO registrarDto)
        {
            using var hmac = new HMACSHA512();

            if (await UsuarioExiste(registrarDto.NomeUsuario))
                return BadRequest("Este usuário já existe.");

            var usuario = new UsuarioAplicativo
            {
                NomeUsuario = registrarDto.NomeUsuario.ToLower(),
                SenhaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrarDto.Senha)),
                SenhaSalt = hmac.Key
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return new UsuarioDto
            {
                NomeUsuario = usuario.NomeUsuario
                , Token = _tokenService.CriaToken(usuario)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UsuarioDto>> Login(LoginDto loginDto)
        {
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(x => x.NomeUsuario == loginDto.NomeUsuario);

            if (usuario is null)
                return Unauthorized("Senha inválida.");

            using var hmac = new HMACSHA512(usuario.SenhaSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Senha));

            for (int indice = 0; indice < computedHash.Length; indice++)
            {
                if (computedHash[indice] != usuario.SenhaHash[indice])
                    return Unauthorized("Senha inválida.");
            }
            
            return new UsuarioDto
            {
                NomeUsuario = usuario.NomeUsuario
                , Token = _tokenService.CriaToken(usuario)
            };
        }

        private async Task<bool> UsuarioExiste(string nomeUsuario)
        => await _context.Usuarios.AnyAsync(x => x.NomeUsuario == nomeUsuario.ToLower());
    }
}