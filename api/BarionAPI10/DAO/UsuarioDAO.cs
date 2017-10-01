using BarionAPI.Models;
using System.Linq;

namespace BarionAPI.DAO
{
    public class UsuarioDAO : BaseDAO<Usuario>
    {
        public UsuarioDAO() : base() { }

        public bool Login(string login, string senha)
        {
            return _dbSet.Where(u => u.Login == login && u.Senha == senha).FirstOrDefault() != null;
        }

        protected override int GetId(Usuario obj)
        {
            return obj.Id;
        }

        protected override void SetDbSet()
        {
            _dbSet = _context.Usuarios;
        }

        protected override void SetId(int id, Usuario obj)
        {
            obj.Id = id;
        }
    }
}
