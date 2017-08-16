using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class addfotos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FotoCorpo1",
                table: "Pessoas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FotoCorpo2",
                table: "Pessoas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FotoRosto",
                table: "Pessoas",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FotoCorpo1",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "FotoCorpo2",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "FotoRosto",
                table: "Pessoas");
        }
    }
}
