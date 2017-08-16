using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class tiraacentuaçãocampospessoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NomeCompleto",
                table: "Pessoas",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "Habilitação",
                table: "Pessoas",
                newName: "Habilitacao");

            migrationBuilder.RenameColumn(
                name: "Classificação",
                table: "Pessoas",
                newName: "Classificacao");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Pessoas",
                newName: "NomeCompleto");

            migrationBuilder.RenameColumn(
                name: "Habilitacao",
                table: "Pessoas",
                newName: "Habilitação");

            migrationBuilder.RenameColumn(
                name: "Classificacao",
                table: "Pessoas",
                newName: "Classificação");
        }
    }
}
