using System;
using System.Collections.Generic;

namespace BarionAPI.Models
{
    public partial class Parceiro
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public string Ie { get; set; }
        public string TipoAtividade { get; set; }
        public string Cep { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Endereco { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Contato { get; set; }
        public string Celular { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Banco { get; set; }
        public string Agencia { get; set; }
        public string Conta { get; set; }
    }
}
