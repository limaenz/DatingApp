using API.Entidades;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CriaToken(UsuarioAplicativo usuario);
    }
}