using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class addTatooaddPiercingaddObs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Observacao",
                table: "Pessoas",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PiercingAparente",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "TatuagemAparente",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Observacao",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "PiercingAparente",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "TatuagemAparente",
                table: "Pessoas");
        }
    }
}
