using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using BarionAPI10;

namespace BarionAPI.Models
{
    public partial class BarionContext : DbContext
    {
        public virtual DbSet<Coligado> Coligados { get; set; }
        public virtual DbSet<Parceiro> Parceiros { get; set; }
        public virtual DbSet<Pessoa> Pessoas { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(GlobalConfigurations.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Coligado>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Agencia);

                entity.Property(e => e.Banco);

                entity.Property(e => e.Celular);

                entity.Property(e => e.Cidade);

                entity.Property(e => e.Cnpj)
                    .HasColumnName("CNPJ");

                entity.Property(e => e.Conta);

                entity.Property(e => e.Contato);

                entity.Property(e => e.Email);

                entity.Property(e => e.Endereco);

                entity.Property(e => e.Estado);

                entity.Property(e => e.Ie)
                    .HasColumnName("IE");

                entity.Property(e => e.Nome);

                entity.Property(e => e.Telefone);
            });

            modelBuilder.Entity<Parceiro>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Agencia);

                entity.Property(e => e.Banco);

                entity.Property(e => e.Celular);

                entity.Property(e => e.Cidade);

                entity.Property(e => e.Cnpj)
                    .HasColumnName("CNPJ");

                entity.Property(e => e.Conta);

                entity.Property(e => e.Contato);

                entity.Property(e => e.Email);

                entity.Property(e => e.Endereco);

                entity.Property(e => e.Estado);

                entity.Property(e => e.Ie)
                    .HasColumnName("IE");

                entity.Property(e => e.Nome);

                entity.Property(e => e.Telefone);

                entity.Property(e => e.TipoAtividade);
            });

            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Agencia);

                entity.Property(e => e.Altura);

                entity.Property(e => e.Bairro);

                entity.Property(e => e.Banco);

                entity.Property(e => e.Busto);

                entity.Property(e => e.Cabelo);

                entity.Property(e => e.Celular);

                entity.Property(e => e.Celular2);

                entity.Property(e => e.Cep);

                entity.Property(e => e.Cidade);

                entity.Property(e => e.Cintura);

                entity.Property(e => e.Classificacao);

                entity.Property(e => e.Complemento);

                entity.Property(e => e.Conta);

                entity.Property(e => e.Cpf)
                    .HasColumnName("CPF");

                entity.Property(e => e.DataNascimento);

                entity.Property(e => e.Email);

                entity.Property(e => e.Endereco);

                entity.Property(e => e.Estado);

                entity.Property(e => e.EstadoCivil);

                entity.Property(e => e.Etnia);

                //entity.Property(e => e.Habilitacao);

                //entity.Property(e => e.HorariosDisponiveis);

                entity.Property(e => e.Idioma)
                    .HasColumnName("idioma");

                entity.Property(e => e.Manequim);

                entity.Property(e => e.Nacionalidade);

                entity.Property(e => e.Nome);

                entity.Property(e => e.Numero);

                entity.Property(e => e.Olhos);

                entity.Property(e => e.Quadril);

                entity.Property(e => e.Rg)
                    .HasColumnName("RG");

                entity.Property(e => e.Sapato);

                entity.Property(e => e.Sexo);

                entity.Property(e => e.Telefone);

                entity.Property(e => e.TemCarro);
            });
        }
    }
}