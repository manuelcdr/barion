import * as _tags from "./tags";
import { pegaIdade } from "../global/helpers";

export class Pessoa {

    id: number;

    //dados pessoais
    nome: string;
    dataNascimento: string;
    nacionalidade: string;
    estadoCivil: string;
    cpf: string;
    rg: string;
    ctps: string;

    //contato
    email: string;
    telefone: string;
    celular: string;
    celular2: string;


    //endereco
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;

    //caracteristicas
    sexo: string;
    altura: string;
    manequim: string;
    etnia: string;
    olhos: string;
    cabelo: string;
    cintura: string;
    quadril: string;
    busto: string;
    sapato: string;
    idioma: string;
    tatuagemAparente: boolean;
    piercingAparente: boolean;

    // outros
    classificacao: string;
    status: string = _tags.TagsPadroesStatus.inativo;
    perfilFacebook: string;
    banco: string;
    agencia: string;
    conta: string;

    // habilitacao
    temCarro: boolean;
    temHabilitacao: boolean;
    habilitacao_A: boolean;
    habilitacao_B: boolean;
    habilitacao_C: boolean;
    habilitacao_D: boolean;
    habilitacao_E: boolean;

    //horarios disponiveis
    horariosDisponiveis_Manha: boolean;
    horariosDisponiveis_Tarde: boolean;
    horariosDisponiveis_Noite: boolean;

    observacao: string;

    fotoRosto: string;
    fotoCorpo1: string;
    fotoCorpo2: string;

    public get idade(): string {
        console.log(this.dataNascimento);
        let idade = pegaIdade(this.dataNascimento);

        if (idade != undefined)
            return idade.toString();

        return undefined;
    }

}

export class PropriedadeComNome {
    key: string;
    value: string[]
}

export class PessoasPropriedades {
    id: number;
    propriedades: string[] = [];
}