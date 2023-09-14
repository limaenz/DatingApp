using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegistrarDTO
    {
        [Required]
        public string NomeUsuario { get; set; }
        [Required]
        public string Senha { get; set; }
    }
}