using Microsoft.AspNetCore.Mvc;
using BarionAPI.Models;
using BarionAPI.DAO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BarionAPI.Controllers
{
    [Route("api/[controller]")]
    public class ParceirosController : BaseController<Parceiro>
    {
        public ParceirosController() : base() { }

        protected override string returnUrl => "/parceiros/";

        protected override void SetDAO()
        {
            _dao = new ParceiroDAO();
        }
    }
}
