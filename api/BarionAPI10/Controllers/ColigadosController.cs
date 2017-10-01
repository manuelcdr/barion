using Microsoft.AspNetCore.Mvc;
using BarionAPI.Models;
using BarionAPI.DAO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BarionAPI.Controllers
{
    [Route("api/[controller]")]
    public class ColigadosController : BaseController<Coligado>
    {
        public ColigadosController() : base() { }

        protected override string returnUrl => "/coligados/";

        protected override void SetDAO()
        {
            _dao = new ColigadoDAO();
        }
    }
}
