namespace API.Entidades
{
    public class UsuarioAplicativo
    {
        public int Id { get; set; }
        public string NomeUsuario { get; set; }
        public byte[] SenhaHash { get; set; }
        public byte[] SenhaSalt { get; set; }
    }
}