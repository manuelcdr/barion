using Microsoft.AspNetCore.Mvc;
using BarionAPI.Models;
using BarionAPI.DAO;
using System.Linq;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using BarionAPI.Helpers;
using System;

namespace BarionAPI.Controllers
{
    [Route("auth")]
    public class UsuariosController : BaseController<Usuario>
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private string _imagesPath;

        public UsuariosController(IHostingEnvironment hostingEnvironment)
            : base()
        {
            _hostingEnvironment = hostingEnvironment;
            _imagesPath = Path.Combine(_hostingEnvironment.ContentRootPath, "Uploads/Images/Pessoas");
        }

        protected override string returnUrl => "/usuarios/";

        protected override void SetDAO()
        {
            _dao = new UsuarioDAO();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody]Usuario user)
        {
            if (user == null)
                return NotFound();

            if ((_dao as UsuarioDAO).Login(user.Login, user.Senha))
                return Ok();

            return NotFound();
        } 

    }
}
