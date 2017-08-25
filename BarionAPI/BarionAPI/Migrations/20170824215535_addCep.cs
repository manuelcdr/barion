using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class addCep : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cep",
                table: "Parceiros",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cep",
                table: "Coligados",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cep",
                table: "Parceiros");

            migrationBuilder.DropColumn(
                name: "Cep",
                table: "Coligados");
        }
    }
}
