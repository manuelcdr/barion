using BarionAPI.Models;

namespace BarionAPI.DAO
{
    public class ColigadoDAO : BaseDAO<Coligado>
    {
        public ColigadoDAO() : base() { }

        protected override int GetId(Coligado obj)
        {
            return obj.Id;
        }

        protected override void SetDbSet()
        {
            _dbSet = _context.Coligados;
        }

        protected override void SetId(int id, Coligado obj)
        {
            obj.Id = id;
        }
    }
}
