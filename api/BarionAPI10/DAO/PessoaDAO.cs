using BarionAPI.Models;

namespace BarionAPI.DAO
{
    public class PessoaDAO : BaseDAO<Pessoa>
    {
        public PessoaDAO() : base() { }

        protected override int GetId(Pessoa obj)
        {
            return obj.Id;
        }

        protected override void SetDbSet()
        {
            _dbSet = _context.Pessoas;
        }

        protected override void SetId(int id, Pessoa obj)
        {
            obj.Id = id;
        }
    }
}
