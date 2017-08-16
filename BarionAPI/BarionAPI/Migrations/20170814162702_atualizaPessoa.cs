using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BarionAPI.Migrations
{
    public partial class atualizaPessoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Habilitacao",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "TemCarro",
                table: "Pessoas");

            migrationBuilder.RenameColumn(
                name: "HorariosDisponiveis",
                table: "Pessoas",
                newName: "PerfilFacebook");

            migrationBuilder.AddColumn<bool>(
                name: "TemCarro",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Habilitacao_A",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Habilitacao_B",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Habilitacao_C",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Habilitacao_D",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Habilitacao_E",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HorariosDisponiveis_Manha",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HorariosDisponiveis_Noite",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HorariosDisponiveis_Tarde",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "TemHabilitacao",
                table: "Pessoas",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Habilitacao_A",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Habilitacao_B",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Habilitacao_C",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Habilitacao_D",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Habilitacao_E",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "HorariosDisponiveis_Manha",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "HorariosDisponiveis_Noite",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "HorariosDisponiveis_Tarde",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "TemHabilitacao",
                table: "Pessoas");

            migrationBuilder.RenameColumn(
                name: "PerfilFacebook",
                table: "Pessoas",
                newName: "HorariosDisponiveis");

            migrationBuilder.AlterColumn<string>(
                name: "TemCarro",
                table: "Pessoas",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<string>(
                name: "Habilitacao",
                table: "Pessoas",
                nullable: true);
        }
    }
}
