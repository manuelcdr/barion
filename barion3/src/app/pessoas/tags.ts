
import { ObjectHelper, Dictionary, ObjDictionary } from "../global/helpers";
import { Pessoa } from "./pessoa";


export class TagsPadroesStatus extends ObjectHelper {
    ativo = "Ativo";
    inativo = "Inativo";
    suspenso = "Suspenso";
}

export class TagsPadroesClassificacao extends ObjectHelper {
    a = "A";
    b = "B";
    supervisor = "Supervisor";
    top = "TOP";
    pdv = "PDV"
}

export class TagsPadroesOlhos extends ObjectHelper {
    pretos = "pretos";
    verdes = "verdes";
    azuis = "azuis";
    castanhosEscuros = "castanhos escuros";
    castanhosClaros = "castanhos claros";
}

export class TagsPadroesCabelo extends ObjectHelper {
    preto = "preto";
    loiro = "loiro";
    castanhoEscuro = "castanho escuro";
    castanhoClaro = "castanho claro";
    ruivo = "ruivo";
}

export class TagsPadroes {

    dicionario: ObjDictionary<string, string[]>[] = [
        new ObjDictionary("olhos", new TagsPadroesOlhos().getPropertiesArray()),
        new ObjDictionary("cabelo", new TagsPadroesCabelo().getPropertiesArray()),
        new ObjDictionary("status", new TagsPadroesStatus().getPropertiesArray()),
        new ObjDictionary("classificacao", new TagsPadroesClassificacao().getPropertiesArray())
    ]


    tagsPadroesPorNome(nome: string): string[] {
        let dic = this.dicionario.filter(d => d.key == nome)[0];

        if (dic)
            return dic.value;

        return null;
    }
}

export class TagsAdicionais {

    constructor() {
        let tagPadroesOlhos = new TagsPadroesOlhos();
        let tagsPadroesCabelo = new TagsPadroesCabelo();

        this.dicionario = [

            new TagAdicional(
                "olhos claros",
                "olhos",
                [
                    tagPadroesOlhos.azuis,
                    tagPadroesOlhos.verdes,
                    tagPadroesOlhos.castanhosClaros
                ]
            ),

            new TagAdicional(
                "olhos escuros",
                "olhos",
                [
                    tagPadroesOlhos.castanhosEscuros,
                    tagPadroesOlhos.pretos
                ]
            ),

            new TagAdicional(
                "cabelos claros",
                "cabelo",
                [
                    tagsPadroesCabelo.loiro,
                    tagsPadroesCabelo.castanhoClaro,
                    tagsPadroesCabelo.ruivo
                ]
            ),

            new TagAdicional(
                "cabelos escuros",
                "cabelo",
                [
                    tagsPadroesCabelo.castanhoEscuro,
                    tagsPadroesCabelo.preto
                ]
            )
        ];
    }

    dicionario: Array<TagAdicional> = new Array<TagAdicional>();

    // get todas() {
    //     let todas: string[] = [];
    //     this.dicionario.forEach(element => {
    //         if (!todas[element.key])
    //             todas.push(element.key);
    //     });
    //     return todas;
    // }
}

export class ControleTags {
    static tagsComPropsMaisValor: string[] = [
        "altura",
        "peso",
        "manequim",
        "sapato",
        "olhos",
        "cabelo",
        "cintura",
        "quadril",
        "busto",
        "cep",
        "cpf",
        "rg",
        "ctps"
    ];

    static tagsNaoIncluidas: string [] = [
        "fotoRosto",
        "fotoCorpo1",
        "fotoCorpo2",
        "banco",
        "agencia",
        "conta",
        "numero",
        "complemento"
    ]
}

export class TagAdicional {

    constructor(public tag: string, public propNome: string, public valores: string[]) {
    }
}

export interface ITagFiltro {

    tag: string,
    valor: any,
    propNome: string;
    inteligente: boolean;
    combinaProximoFiltro: boolean;
    adicional: boolean;
    geral: boolean;

    Run(pessoa: Pessoa, valor: any): boolean;
}

// export interface ITagInteligente {
//     Run(pessoa: Pessoa, valor: number): boolean;
// }

export class TagFiltro implements ITagFiltro {

    Run(pessoa: Pessoa, valor: any): boolean {
        return false;
    }

    constructor(
        public tag: string,
        public valor: any,
        public propNome: string = '',
        public inteligente: boolean = false,
        public adicional: boolean = false,
        public geral: boolean = false,
        public combinaProximoFiltro: boolean = false
        ) {

        if (tag === '' && typeof valor === 'string') {
            tag = valor;
        }

        if (propNome === '') {
            geral = true;
        }

        this.valor = valor;
        this.propNome = propNome;
        this.tag = tag;
        this.inteligente = inteligente;
        this.adicional = adicional;
        this.geral = geral;
    }

    static BuscaTag(tag: string, tagsFiltros: TagFiltro[]): TagFiltro {
        let tagFiltro = tagsFiltros.filter(t => t.tag.trim().toLowerCase() === tag.trim().toLocaleLowerCase())[0];
        return tagFiltro;
    }

}

export class ConstrutorDeTagInteligente {

    static construirTodos(): TagFiltro[] {
        let tagsFiltros = new Array<ITagFiltro>();

        tagsFiltros.push(new MedidaMaiorQue("altura maior que", null, "altura", true, null, null, true));
        tagsFiltros.push(new MedidaMenorQue("altura menor que", null, "altura", true, null, null, true));

        tagsFiltros.push(new MedidaMaiorQue("manequim maior que", null, "manequim", true, null, null, true));
        tagsFiltros.push(new MedidaMenorQue("manequim menor que", null, "manequim", true, null, null, true));

        tagsFiltros.push(new MedidaMaiorQue("cintura maior que", null, "cintura", true, null, null, true));
        tagsFiltros.push(new MedidaMenorQue("cintura menor que", null, "cintura", true, null, null, true));

        tagsFiltros.push(new MedidaMaiorQue("quadril maior que", null, "quadril", true, null, null, true));
        tagsFiltros.push(new MedidaMenorQue("quadril menor que", null, "quadril", true, null, null, true));

        tagsFiltros.push(new MedidaMaiorQue("busto maior que", null, "busto", true, null, null, true));
        tagsFiltros.push(new MedidaMenorQue("busto menor que", null, "busto", true, null, null, true));

        tagsFiltros.push(new MedidaMaiorQue("sapato maior que", null, "sapato", true, null, null, true));
        tagsFiltros.push(new MedidaMenorQue("sapato menor que", null, "sapato", true, null, null, true));

        tagsFiltros.push(new TagBooleana("Tem carro", true, "temCarro", true));
        tagsFiltros.push(new TagBooleana("Não tem carro", false, "temCarro", true));

        tagsFiltros.push(new TagBooleana("Tem habilitação", true, "temHabilitacao", true));
        tagsFiltros.push(new TagBooleana("Não tem habilitação", false, "temHabilitacao", true));

        tagsFiltros.push(new TagBooleana("Habilitacao A", true, "habilitacao_A", true));
        tagsFiltros.push(new TagBooleana("Habilitacao B", true, "habilitacao_B", true));
        tagsFiltros.push(new TagBooleana("Habilitacao C", true, "habilitacao_C", true));
        tagsFiltros.push(new TagBooleana("Habilitacao D", true, "habilitacao_D", true));
        tagsFiltros.push(new TagBooleana("Habilitacao E", true, "habilitacao_E", true));

        tagsFiltros.push(new TagBooleana("Disponível de manhã", true, "horariosDisponiveis_Manha", true));
        tagsFiltros.push(new TagBooleana("Disponível de tarde", true, "horariosDisponiveis_Tarde", true));
        tagsFiltros.push(new TagBooleana("Disponível de noite", true, "horariosDisponiveis_Noite", true));

        return tagsFiltros;
    }
}

export class MedidaMaiorQue extends TagFiltro implements ITagFiltro {

    Run(pessoa: Pessoa, valor: number): boolean {

        let propValor: string = pessoa[this.propNome];
        if (!propValor) {
            return false;
        }

        propValor = propValor.trim().toLowerCase();
        propValor = propValor.replace(",", ".");

        let propValorFloat = Number.parseFloat(propValor);

        return propValorFloat > valor;
    }

}

export class MedidaMenorQue extends TagFiltro implements ITagFiltro {

    Run(pessoa: Pessoa, valor: number): boolean {
        let propValor: string = pessoa[this.propNome];
        if (!propValor) {
            return false;
        }

        propValor = propValor.trim().toLowerCase();
        propValor = propValor.replace(",", ".");

        let propValorFloat = Number.parseFloat(propValor);

        return propValorFloat < valor;
    }

}

export class TagBooleana extends TagFiltro implements ITagFiltro {
    Run(pessoa: Pessoa, valor: boolean = this.valor): boolean {
        valor = this.valor;

        let propValor: boolean = pessoa[this.propNome];
        
        if (propValor == null) {
            return false;
        }

        return valor === propValor;
    }
}
