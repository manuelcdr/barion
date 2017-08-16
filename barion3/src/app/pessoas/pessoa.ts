export class Pessoa {

    id: number;

    //dados pessoais
    nome: string;
    dataNascimento: string;
    nacionalidade: string;
    estadoCivil: string;
    cpf: string;
    rg: string;

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

    // outros
    classificacao: string;
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

    fotoRosto: string;
    fotoCorpo1: string;
    fotoCorpo2: string;

    static pegaPropsPessoas(pessoas: Pessoa[]): PessoasPropriedades[] {

        var pessoasPropriedades = new Array<PessoasPropriedades>();

        pessoas.forEach(pessoa => {
            pessoasPropriedades.push(this.pegaPropsPessoa(pessoa))
        })

        return pessoasPropriedades;
    }

    static pegaPropsPessoa(pessoa: Pessoa): PessoasPropriedades {
        var props = new PessoasPropriedades();
        props.id = pessoa.id;

        for (let key of Object.keys(pessoa)) {
            props.propriedades.push(pessoa[key]);
        }

        return props;
    }

    static preparaPropriedades(props: string[]) {
        let propriedadesModificadas = {};

        for (let prop of props) {
            propriedadesModificadas[prop] = null;
        }

        return propriedadesModificadas;
    }

    static preparaPropriedadesComNome(nome: string, props: PropriedadeComNome[]) {
        let propriedadesModificadas = {};

        let prop: PropriedadeComNome = props.filter(prop => prop.key.toLowerCase() == nome.toLowerCase())[0];

        return this.preparaPropriedades(prop.value);
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