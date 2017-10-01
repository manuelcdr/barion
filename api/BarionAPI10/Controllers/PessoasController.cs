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
using System;

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
                                string fileName = DateTime.Now.ToString("ddMMyyyy") + id.ToString() + file.Name;

                                new VerificaFotoRosto(pessoa).Run(fileName, _imagesPath);
                                new VerificaFotoCorpo1(pessoa).Run(fileName, _imagesPath);
                                new VerificacFotoCorpo2(pessoa).Run(fileName, _imagesPath);

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


    public abstract class VerificaFoto
    {
        public string search { get; set; }
        public string currentFileName { get; set; }
        public Pessoa pessoa { get; set; }

        public VerificaFoto(Pessoa pessoa)
        {
            this.pessoa = pessoa;
        }

        public void Run(string fileName, string filePath)
        {
            if (fileName.ToLower().Contains(search))
            {
                if (!string.IsNullOrEmpty(currentFileName))
                {
                    string filePathFull = Path.Combine(filePath, currentFileName);
                    if (System.IO.File.Exists(filePathFull))
                        System.IO.File.Delete(filePathFull);
                }

                AtualizaCampo(fileName);

            }
        }

        public abstract void AtualizaCampo(string fileName);
    }

    public class VerificaFotoRosto : VerificaFoto
    {
        public VerificaFotoRosto(Pessoa pessoa)
            : base(pessoa)
        {
            this.search = "rosto";
            currentFileName = this.pessoa.FotoRosto;
        }

        public override void AtualizaCampo(string fileName)
        {
            pessoa.FotoRosto = fileName;
        }
    }

    public class VerificaFotoCorpo1 : VerificaFoto
    {
        public VerificaFotoCorpo1(Pessoa pessoa)
            : base(pessoa)
        {
            this.search = "corpo1";
            currentFileName = this.pessoa.FotoCorpo1;
        }

        public override void AtualizaCampo(string fileName)
        {
            pessoa.FotoCorpo1 = fileName;
        }
    }

    public class VerificacFotoCorpo2 : VerificaFoto
    {
        public VerificacFotoCorpo2(Pessoa pessoa)
            : base(pessoa)
        {
            this.search = "corpo2";
            this.currentFileName = this.pessoa.FotoCorpo2;
        }

        public override void AtualizaCampo(string fileName)
        {
            pessoa.FotoCorpo2 = fileName;
        }
    }
}
