using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class addnumero : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Numero",
                table: "Parceiros",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Numero",
                table: "Coligados",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Numero",
                table: "Parceiros");

            migrationBuilder.DropColumn(
                name: "Numero",
                table: "Coligados");
        }
    }
}
