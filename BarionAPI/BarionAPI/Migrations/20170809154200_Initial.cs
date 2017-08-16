using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BarionAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Pessoas");
            migrationBuilder.DropTable("Coligados");
            migrationBuilder.DropTable("Parceiros");

            migrationBuilder.CreateTable(
                name: "Coligados",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Agencia = table.Column<string>(nullable: true),
                    Banco = table.Column<string>(nullable: true),
                    Celular = table.Column<string>(nullable: true),
                    Cidade = table.Column<string>(nullable: true),
                    CNPJ = table.Column<string>(nullable: true),
                    Conta = table.Column<string>(nullable: true),
                    Contato = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Endereco = table.Column<string>(nullable: true),
                    Estado = table.Column<string>(nullable: true),
                    IE = table.Column<string>(nullable: true),
                    Nome = table.Column<string>(nullable: true),
                    Telefone = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coligados", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Parceiros",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Agencia = table.Column<string>(nullable: true),
                    Banco = table.Column<string>(nullable: true),
                    Celular = table.Column<string>(nullable: true),
                    Cidade = table.Column<string>(nullable: true),
                    CNPJ = table.Column<string>(nullable: true),
                    Conta = table.Column<string>(nullable: true),
                    Contato = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Endereco = table.Column<string>(nullable: true),
                    Estado = table.Column<string>(nullable: true),
                    IE = table.Column<string>(nullable: true),
                    Nome = table.Column<string>(nullable: true),
                    Telefone = table.Column<string>(nullable: true),
                    TipoAtividade = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parceiros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Agencia = table.Column<string>(nullable: true),
                    Altura = table.Column<string>(nullable: true),
                    Bairro = table.Column<string>(nullable: true),
                    Banco = table.Column<string>(nullable: true),
                    Busto = table.Column<string>(nullable: true),
                    Cabelo = table.Column<string>(nullable: true),
                    Celular = table.Column<string>(nullable: true),
                    Celular2 = table.Column<string>(nullable: true),
                    Cep = table.Column<string>(nullable: true),
                    Cidade = table.Column<string>(nullable: true),
                    Cintura = table.Column<string>(nullable: true),
                    Classificação = table.Column<string>(nullable: true),
                    Complemento = table.Column<string>(nullable: true),
                    Conta = table.Column<string>(nullable: true),
                    CPF = table.Column<string>(nullable: true),
                    DataNascimento = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Endereco = table.Column<string>(nullable: true),
                    Estado = table.Column<string>(nullable: true),
                    EstadoCivil = table.Column<string>(nullable: true),
                    Etnia = table.Column<string>(nullable: true),
                    Habilitação = table.Column<string>(nullable: true),
                    HorariosDisponiveis = table.Column<string>(nullable: true),
                    idioma = table.Column<string>(nullable: true),
                    Manequim = table.Column<string>(nullable: true),
                    Nacionalidade = table.Column<string>(nullable: true),
                    NomeCompleto = table.Column<string>(nullable: true),
                    Numero = table.Column<string>(nullable: true),
                    Olhos = table.Column<string>(nullable: true),
                    Quadril = table.Column<string>(nullable: true),
                    RG = table.Column<string>(nullable: true),
                    Sapato = table.Column<string>(nullable: true),
                    Sexo = table.Column<string>(nullable: true),
                    Telefone = table.Column<string>(nullable: true),
                    TemCarro = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coligados");

            migrationBuilder.DropTable(
                name: "Parceiros");

            migrationBuilder.DropTable(
                name: "Pessoas");
        }
    }
}
