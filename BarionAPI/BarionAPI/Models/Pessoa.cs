namespace BarionAPI.Models
{
    public partial class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string DataNascimento { get; set; }
        public string Email { get; set; }
        public string Endereco { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cep { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public string Celular2 { get; set; }
        public string Nacionalidade { get; set; }
        public string EstadoCivil { get; set; }
        public string Cpf { get; set; }
        public string Rg { get; set; }
        public string Ctps { get; set; }
        public string Sexo { get; set; }
        public string Altura { get; set; }
        public string Manequim { get; set; }
        public string Etnia { get; set; }
        public string Olhos { get; set; }
        public string Cabelo { get; set; }
        public string Cintura { get; set; }
        public string Quadril { get; set; }
        public string Busto { get; set; }
        public string Sapato { get; set; }
        public string Idioma { get; set; }

        public bool TatuagemAparente { get; set; }
        public bool PiercingAparente { get; set; }

        public string PerfilFacebook { get; set; }

        #region Habilitacao e Carro
        public bool TemCarro { get; set; }
        public bool TemHabilitacao { get; set; }
        public bool Habilitacao_A { get; set; }
        public bool Habilitacao_B { get; set; }
        public bool Habilitacao_C { get; set; }
        public bool Habilitacao_D { get; set; }
        public bool Habilitacao_E { get; set; }
        #endregion

        #region Horários Disponíveis
        public bool HorariosDisponiveis_Manha { get; set; }
        public bool HorariosDisponiveis_Tarde { get; set; }
        public bool HorariosDisponiveis_Noite { get; set; }
        #endregion

        #region Fotos

        public string FotoRosto { get; set; }
        public string FotoCorpo1 { get; set; }
        public string FotoCorpo2 { get; set; }

        #endregion

        public string Classificacao { get; set; }
        public string Status { get; set; }

        public string Banco { get; set; }
        public string Agencia { get; set; }
        public string Conta { get; set; }

        public string Observacao { get; set; }

        
    }
}
