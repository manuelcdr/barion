using BarionAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BarionAPI.DAO
{
    public abstract class BaseDAO<T> : IDAO<T> where T : class
    {
        protected readonly BarionContext _context;
        protected DbSet<T> _dbSet;

        public BaseDAO()
        {
            _context = new BarionContext();
            SetDbSet();
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        protected abstract void SetDbSet();

        protected abstract int GetId(T obj);

        protected abstract void SetId(int id, T obj);

        public int Add(T obj)
        {
            _context.Add(obj);
            _context.SaveChanges();
            return GetId(obj);
        }

        public IEnumerable<T> All()
        {
            return _dbSet;
        }

        public void Del(int id)
        {
            var obj = GetById(id);

            if (obj == null)
                ThrowKeyNotFoundException(id);

            _context.Remove(obj);
            _context.SaveChanges();
        }

        public IEnumerable<T> GetByAnyProperties(string search)
        {
            throw new NotImplementedException();
        }

        public T GetById(int id)
        {
            var obj = _dbSet.Where(x => GetId(x) == id).SingleOrDefault();

            if (obj == null)
                ThrowKeyNotFoundException(id);

            return obj;
        }

        public int Up(int id, T obj)
        {
            SetId(id, obj);
            var entry = _context.Entry(obj);
            entry.State = EntityState.Modified;
            _context.Update(obj);
            _context.SaveChanges();
            return id;
        }

        private void ThrowKeyNotFoundException(int id)
        {
            string keyNotFoundMessage = string.Format("Coligado com id {0} não encontrado", id);
            throw new KeyNotFoundException(keyNotFoundMessage);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
