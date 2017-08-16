﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using BarionAPI.Models;

namespace BarionAPI.Migrations
{
    [DbContext(typeof(BarionContext))]
    [Migration("20170809154200_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BarionAPI.Models.Coligado", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Agencia");

                    b.Property<string>("Banco");

                    b.Property<string>("Celular");

                    b.Property<string>("Cidade");

                    b.Property<string>("Cnpj")
                        .HasColumnName("CNPJ");

                    b.Property<string>("Conta");

                    b.Property<string>("Contato");

                    b.Property<string>("Email");

                    b.Property<string>("Endereco");

                    b.Property<string>("Estado");

                    b.Property<string>("Ie")
                        .HasColumnName("IE");

                    b.Property<string>("Nome");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.ToTable("Coligados");
                });

            modelBuilder.Entity("BarionAPI.Models.Parceiro", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Agencia");

                    b.Property<string>("Banco");

                    b.Property<string>("Celular");

                    b.Property<string>("Cidade");

                    b.Property<string>("Cnpj")
                        .HasColumnName("CNPJ");

                    b.Property<string>("Conta");

                    b.Property<string>("Contato");

                    b.Property<string>("Email");

                    b.Property<string>("Endereco");

                    b.Property<string>("Estado");

                    b.Property<string>("Ie")
                        .HasColumnName("IE");

                    b.Property<string>("Nome");

                    b.Property<string>("Telefone");

                    b.Property<string>("TipoAtividade");

                    b.HasKey("Id");

                    b.ToTable("Parceiros");
                });

            modelBuilder.Entity("BarionAPI.Models.Pessoa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Agencia");

                    b.Property<string>("Altura");

                    b.Property<string>("Bairro");

                    b.Property<string>("Banco");

                    b.Property<string>("Busto");

                    b.Property<string>("Cabelo");

                    b.Property<string>("Celular");

                    b.Property<string>("Celular2");

                    b.Property<string>("Cep");

                    b.Property<string>("Cidade");

                    b.Property<string>("Cintura");

                    b.Property<string>("Classificação");

                    b.Property<string>("Complemento");

                    b.Property<string>("Conta");

                    b.Property<string>("Cpf")
                        .HasColumnName("CPF");

                    b.Property<string>("DataNascimento");

                    b.Property<string>("Email");

                    b.Property<string>("Endereco");

                    b.Property<string>("Estado");

                    b.Property<string>("EstadoCivil");

                    b.Property<string>("Etnia");

                    b.Property<string>("Habilitação");

                    b.Property<string>("HorariosDisponiveis");

                    b.Property<string>("Idioma")
                        .HasColumnName("idioma");

                    b.Property<string>("Manequim");

                    b.Property<string>("Nacionalidade");

                    b.Property<string>("NomeCompleto");

                    b.Property<string>("Numero");

                    b.Property<string>("Olhos");

                    b.Property<string>("Quadril");

                    b.Property<string>("Rg")
                        .HasColumnName("RG");

                    b.Property<string>("Sapato");

                    b.Property<string>("Sexo");

                    b.Property<string>("Telefone");

                    b.Property<string>("TemCarro");

                    b.HasKey("Id");

                    b.ToTable("Pessoas");
                });
        }
    }
}
