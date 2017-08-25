using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class addComplemento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                table: "Parceiros",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                table: "Coligados",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Complemento",
                table: "Parceiros");

            migrationBuilder.DropColumn(
                name: "Complemento",
                table: "Coligados");
        }
    }
}
