using BarionAPI.Models;

namespace BarionAPI.DAO
{
    public class ParceiroDAO : BaseDAO<Parceiro>
    {
        public ParceiroDAO() : base() { }

        protected override int GetId(Parceiro obj)
        {
            return obj.Id;
        }

        protected override void SetDbSet()
        {
            _dbSet = _context.Parceiros;
        }

        protected override void SetId(int id, Parceiro obj)
        {
            obj.Id = id;
        }
    }
}
