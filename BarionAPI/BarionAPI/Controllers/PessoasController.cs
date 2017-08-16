using Microsoft.AspNetCore.Mvc;
using BarionAPI.Models;
using BarionAPI.DAO;
using System.Linq;
using System.Dynamic;
using System.Collections.Generic;
using System.Reflection;
using System.Net.Http;
using System.IO;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using BarionAPI.Helpers;

namespace BarionAPI.Controllers
{
    [Route("api/[controller]")]
    public class PessoasController : BaseController<Pessoa>
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private string _imagesPath;

        public PessoasController(IHostingEnvironment hostingEnvironment)
            : base()
        {
            _hostingEnvironment = hostingEnvironment;
            _imagesPath = Path.Combine(_hostingEnvironment.ContentRootPath, "Uploads/Images/Pessoas");
        }

        protected override string returnUrl => "/pessoas/";

        protected override void SetDAO()
        {
            _dao = new PessoaDAO();
        }

        [HttpPost("{id}/images")]
        public ActionResult PostImage(int id)
        {
            var files = HttpContext.Request.Form.Files;
            if (files.Count > 0)
            {
                var pessoa = _dao.GetById(id);

                if (pessoa != null)
                {
                    foreach (var file in files)
                    {
                        if (file != null && file.Length > 0)
                        {
                            if (file.Length > 0)
                            {
                                var filePath = _imagesPath;
                                var fileName = $"{file.Name}";

                                if (fileName.ToLower().Contains("rosto"))
                                    pessoa.FotoRosto = fileName;

                                if (fileName.ToLower().Contains("corpo1"))
                                    pessoa.FotoCorpo1 = fileName;

                                if (fileName.ToLower().Contains("corpo2"))
                                    pessoa.FotoCorpo2 = fileName;

                                using (var fileStream = new FileStream(Path.Combine(_imagesPath, fileName), FileMode.Create))
                                {
                                    file.CopyTo(fileStream);
                                }
                            }
                        }
                    }
                    _dao.SaveChanges();
                    return Ok(pessoa);
                }
            }
            return NoContent();
        }

        [HttpGet("image/{fileName}")]
        public ActionResult GetImage(string fileName)
        {
            var image = System.IO.File.OpenRead(Path.Combine(_imagesPath, fileName));
            return File(image, MimeTypeHelper.GetMimeTypeFromFileName(fileName));
        }
    }
}
