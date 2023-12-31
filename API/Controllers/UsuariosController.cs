using API.Data;
using API.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsuariosController : BaseApiController
    {
        private readonly DataContext _context;
        public UsuariosController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioAplicativo>>> ObtemUsuarios()
        => await _context.Usuarios.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioAplicativo>> ObtemUsuario(int id)
        => await _context.Usuarios.FindAsync(id);
    }
} 