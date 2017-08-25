using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class addBairro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Parceiros",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Coligados",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Parceiros");

            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Coligados");
        }
    }
}
