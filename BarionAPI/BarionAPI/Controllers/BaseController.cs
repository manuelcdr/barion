using BarionAPI.DAO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace BarionAPI.Controllers
{
    public abstract class BaseController<T> : Controller where T : class
    {
        protected BaseDAO<T> _dao;
        protected abstract string returnUrl { get;  }

        public BaseController()
            : base()
        {
            SetDAO();
        }

        protected abstract void SetDAO();

        // GET: api/values
        [HttpGet]
        public ActionResult Get()
        {
            var todos = _dao.All();

            if (todos == null || todos.Count() == 0)
                return NoContent();

            return Ok(todos);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var obj = _dao.GetById(id);
                return Ok(obj);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        // POST api/values
        [HttpPost]
        public virtual ActionResult Post([FromBody]T obj)
        {
            int id = _dao.Add(obj);

            if (id > 0)
                return Created(returnUrl + id.ToString(), id);

            return NoContent();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]T obj)
        {
            try
            {
                _dao.Up(id, obj);
                return Ok(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _dao.Del(id);
                return Ok();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("propriedades")]
        public ActionResult GetProperties()
        {
            var todos = _dao.All();

            var propriedades = new SortedSet<string>();
            var propriedadesComNome = new Dictionary<string, string[]>();

            foreach (var prop in typeof(T).GetProperties())
            {
                if (prop.PropertyType.Equals(typeof(string)))
                {
                    // add propriedades com nome
                    var propList = new List<string>();

                    foreach (T pessoa in todos)
                    {    
                        var value = (string)prop.GetValue(pessoa);

                        if (!string.IsNullOrEmpty(value))
                        {
                            // add propriedades
                            if (!propriedades.Contains(value))
                                propriedades.Add(value);

                            // add propriedades com nome
                            if (!propList.Contains(value))
                                propList.Add(value);
                        }
                    }

                    if (propList.Count > 0)
                        propriedadesComNome.Add(prop.Name, propList.ToArray());
                }
            }

            if (propriedades.Count == 0)
                return NoContent();

            return Ok(new { todasPropriedades = propriedades.ToArray(), porNome = propriedadesComNome.ToArray() });
        }

        protected override void Dispose(bool disposing)
        {
            _dao.Dispose();
            base.Dispose(disposing);
        }
    }
}
