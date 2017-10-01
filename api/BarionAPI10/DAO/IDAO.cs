using System.Collections.Generic;

namespace BarionAPI.DAO
{
    public interface IDAO<T>
    {
        IEnumerable<T> All();
        T GetById(int id);
        int Add(T obj);
        void Del(int id);
        int Up(int id, T obj);
        IEnumerable<T> GetByAnyProperties(string search);
    }
}
