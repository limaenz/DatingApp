using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ContaController : BaseApiController
    {
        private readonly DataContext _context;
        public ContaController(DataContext context)
        {
            _context = context;

        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioAplicativo>> Registrar(RegistrarDTO registrarDto)
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

            return usuario;
        }

        private async Task<bool> UsuarioExiste(string nomeUsuario)
        => await _context.Usuarios.AnyAsync(x => x.NomeUsuario == nomeUsuario.ToLower());
    }
}