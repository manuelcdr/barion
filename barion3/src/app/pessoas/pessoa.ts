import { TagsAdicionais, TagsPadroesOlhos, TagsPadroes } from "./tags";

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

    tagsAdicionais: string;

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
            let valor = pessoa[key];
            props.propriedades.push(valor);

            let tagAdicional = new TagsAdicionais().dicionario.filter(t => t.value.indexOf(valor) >= 0)[0];
            if (tagAdicional)
                props.propriedades.push(tagAdicional.key);
        }

        return props;
    }

    // precisa colocar um valor null para cada propriedade para funcinar o auto-complete.
    // este método recebe uma lista de propriedades e adiciona este valor null para cada uma.
    static preparaPropriedades(props: string[]) {
        let propriedadesModificadas = {};

        for (let prop of props) {
            propriedadesModificadas[prop] = null;
        }

        return propriedadesModificadas;
    }

    static preparaPropriedadesComNome(nome: string, propsComNome: PropriedadeComNome[]) {
        let props: string[] = new TagsPadroes().tagsPadroesPorNome(nome.toLowerCase());

        if (!props)
            props = new Array<string>();

        let filterProps = propsComNome
            .filter(prop => prop.key.toLowerCase() == nome.toLowerCase())[0]
            .value;

        filterProps
            .forEach(tag => {
                if (props.indexOf(tag) < 0)
                    props.push(tag);
            });

        return this.preparaPropriedades(props);
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