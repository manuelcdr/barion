
import { ObjectHelper, Dictionary, ObjDictionary, pegaIdade } from "../global/helpers";
import { Pessoa } from "./pessoa";


export class TagsPadroesStatus extends ObjectHelper {
    static ativo = "Ativo";
    static inativo = "Inativo";
    static suspenso = "Suspenso";
}

export class TagsPadroesClassificacao extends ObjectHelper {
    static a = "A";
    static b = "B";
    static supervisor = "Supervisor";
    static top = "TOP";
    static pdv = "PDV"
}

export class TagsPadroesOlhos extends ObjectHelper {
    static pretos = "pretos";
    static verdes = "verdes";
    static azuis = "azuis";
    static castanhosEscuros = "castanhos escuros";
    static castanhosClaros = "castanhos claros";
}

export class TagsPadroesCabelo extends ObjectHelper {
    static preto = "preto";
    static loiro = "loiro";
    static castanhoEscuro = "castanho escuro";
    static castanhoClaro = "castanho claro";
    static ruivo = "ruivo";
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

export class ControleTags {
    static tagsFormat: ObjDictionary<string, string>[] = [
        new ObjDictionary("altura", "altura {0}"),
        new ObjDictionary("peso", "peso {0}"),
        new ObjDictionary("manequim", "manequim {0}"),
        new ObjDictionary("sapato", "sapato {0}"),
        new ObjDictionary("olhos", "olhos {0}"),
        new ObjDictionary("cabelo", "cabelo {0}"),
        new ObjDictionary("cintura", "cintura {0}"),
        new ObjDictionary("quadril", "quadril {0}"),
        new ObjDictionary("busto", "busto {0}"),
        new ObjDictionary("cep", "cep {0}"),
        new ObjDictionary("cpf", "cpf {0}"),
        new ObjDictionary("rg", "rg {0}"),
        new ObjDictionary("ctps", "ctps {0}")
    ];

    static tagsNaoIncluidas: string[] = [
        "fotoRosto",
        "fotoCorpo1",
        "fotoCorpo2",
        "banco",
        "agencia",
        "conta",
        "numero",
        "complemento",
        "observacao"
    ]
}

export interface ITagFiltro {

    tag: string,
    valor: any,
    propNome: string;
    inteligente: boolean;
    combinaProximoFiltro: boolean;
    adicional: boolean;
    geral: boolean;

    Run(pessoa: Pessoa): boolean;
}

export class TagFiltro implements ITagFiltro {

    Run(pessoa: Pessoa): boolean {
        let tagValor: string = this.valor.trim().toLowerCase();

        // se não for geral, ou seja:
        // se tiver uma propriedade atrelada...
        if (!this.geral) {
            let propValPessoa: string = pessoa[this.propNome.trim().toLowerCase()];

            if (propValPessoa) {
                propValPessoa = propValPessoa.trim().toLowerCase();
                if (propValPessoa === tagValor) {
                    return true;
                }
            }
        }

        // se for geral, ou seja
        // se não tiver uma propriedade atrelada, procura em todas...
        else {

            for (let prop of Object.keys(pessoa)) {
                let propValPessoa = pessoa[prop];

                if (propValPessoa && typeof propValPessoa === 'string') {
                    let propValPessoaString : string = propValPessoa.trim().toLowerCase();

                    if (propValPessoaString.includes(tagValor)) {
                        return true;
                    }
                }
            }
        }
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

export class ConstrutorDeTag {

    private tagInclusa(propNome: string): boolean {
        return ControleTags.tagsNaoIncluidas.filter(t => t === propNome.trim().toLowerCase()).length <= 0;
    }

    private tagFormat(propNome: string, valor: string): string {
        let tagFormat = ControleTags.tagsFormat.filter(t => t.key === propNome.trim().toLowerCase());
        if (tagFormat.length > 0) {
            return tagFormat[0].value.replace("{0}", valor);
        }
        return valor;
    }

    construirTag(valor: string, propNome: string): TagFiltro {
        if (
            valor != null &&
            valor != undefined &&
            valor.length > 0) {
            if (this.tagInclusa(propNome)) {
                let tagNome = this.tagFormat(propNome, valor);
                return new TagFiltro(tagNome, valor, propNome);
            }
        }

        return null;
    }

    construirTodos(): TagFiltro[] {
        let tagsFiltros = new Array<ITagFiltro>();

        tagsFiltros.push(
            new TagMultiplosValores(
                "olhos claros",
                [
                    TagsPadroesOlhos.azuis,
                    TagsPadroesOlhos.verdes,
                    TagsPadroesOlhos.castanhosClaros
                ],
                "olhos"
            ),
            new TagMultiplosValores(
                "olhos escuros",
                [
                    TagsPadroesOlhos.castanhosEscuros,
                    TagsPadroesOlhos.pretos
                ],
                "olhos"
            ),
            new TagMultiplosValores(
                "cabelos claros",
                [
                    TagsPadroesCabelo.loiro,
                    TagsPadroesCabelo.castanhoClaro,
                    TagsPadroesCabelo.ruivo
                ],
                "cabelo"
            ),
            new TagMultiplosValores(
                "cabelos escuros",
                [
                    TagsPadroesCabelo.castanhoEscuro,
                    TagsPadroesCabelo.preto
                ],
                "cabelo"
            )
        )


        // medidas
        tagsFiltros.push(
            new MedidaMaiorQue("altura maior que", "altura"),
            new MedidaMenorQue("altura menor que", "altura"),

            new MedidaMaiorQue("manequim maior que", "manequim"),
            new MedidaMenorQue("manequim menor que", "manequim"),

            new MedidaMaiorQue("cintura maior que", "cintura"),
            new MedidaMenorQue("cintura menor que", "cintura"),

            new MedidaMaiorQue("quadril maior que", "quadril"),
            new MedidaMenorQue("quadril menor que", "quadril"),

            new MedidaMaiorQue("busto maior que", "busto"),
            new MedidaMenorQue("busto menor que", "busto"),

            new MedidaMaiorQue("sapato maior que", "sapato"),
            new MedidaMenorQue("sapato menor que", "sapato")
        );

        // boleanos
        tagsFiltros.push(
            new TagBooleana("Tem carro", true, "temCarro"),
            new TagBooleana("Não tem carro", false, "temCarro"),

            new TagBooleana("Tem habilitação", true, "temHabilitacao"),
            new TagBooleana("Não tem habilitação", false, "temHabilitacao"),

            new TagBooleana("Habilitacao A", true, "habilitacao_A"),
            new TagBooleana("Habilitacao B", true, "habilitacao_B"),
            new TagBooleana("Habilitacao C", true, "habilitacao_C"),
            new TagBooleana("Habilitacao D", true, "habilitacao_D"),
            new TagBooleana("Habilitacao E", true, "habilitacao_E"),

            new TagBooleana("Disponível de manhã", true, "horariosDisponiveis_Manha"),
            new TagBooleana("Disponível de tarde", true, "horariosDisponiveis_Tarde"),
            new TagBooleana("Disponível de noite", true, "horariosDisponiveis_Noite"),

            new TagBooleana("Piercing aparente", true, "piercingAparente"),
            new TagBooleana("Tatuagem aparente", true, "tatuagemAparente"),
            new TagBooleana("Piercing não aparente", false, "piercingAparente"),
            new TagBooleana("Tatuagem não aparente", false, "tatuagemAparente")

        )

        // idade
        tagsFiltros.push(
            new IdadeIgual(),
            new IdadeMaiorQue(),
            new IdadeMenorQue()
        )

        // tagsFiltros.push(new IdadeMaiorQue());

        return tagsFiltros;
    }
}

export class IdadeIgual extends TagFiltro implements ITagFiltro {
    constructor() {
        super("Idade igual a", null, null, true, false, false, true);
    }

    Run(pessoa: Pessoa): boolean {
        let valor = this.valor.toString();

        if (valor.indexOf(" ") >= 0) {
            valor = valor.split(" ").pop();
        }

        valor = valor.trim().toLowerCase();
        valor = valor.replace(",", ".");
        let valorInt = Number.parseInt(valor);

        let idade = pegaIdade(pessoa.dataNascimento);
        if (idade == undefined) {
            return false;
        }

        let idadeInt = Number.parseInt(idade.toString());

        return idadeInt == valorInt;
    }
}

export class IdadeMaiorQue extends TagFiltro implements ITagFiltro {
    constructor() {
        super("Idade maior que", null, null, true, false, false, true);
    }

    Run(pessoa: Pessoa): boolean {
        let valor = this.valor.toString();

        if (valor.indexOf(" ") >= 0) {
            valor = valor.split(" ").pop();
        }

        valor = valor.trim().toLowerCase();
        valor = valor.replace(",", ".");
        let valorInt = Number.parseInt(valor);

        let idade = pegaIdade(pessoa.dataNascimento);
        if (idade == undefined) {
            return false;
        }

        let idadeInt = Number.parseInt(idade.toString());

        return idadeInt > valorInt;
    }
}

export class IdadeMenorQue extends TagFiltro implements ITagFiltro {
    constructor() {
        super("Idade menor que", null, null, true, false, false, true);
    }

    Run(pessoa: Pessoa): boolean {
        let valor = this.valor.toString();

        if (valor.indexOf(" ") >= 0) {
            valor = valor.split(" ").pop();
        }

        valor = valor.trim().toLowerCase();
        valor = valor.replace(",", ".");
        let valorInt = Number.parseInt(valor);

        let idade = pegaIdade(pessoa.dataNascimento);
        if (idade == undefined) {
            return false;
        }

        let idadeInt = Number.parseInt(idade.toString());

        return idadeInt < valorInt;
    }
}

export class TagMultiplosValores extends TagFiltro implements ITagFiltro {

    constructor(tag: string, valores: any[], propNome: string) {
        super(tag, valores, propNome, true);
    }

    Run(pessoa: Pessoa): boolean {
        let tagValores = this.valor;
        let propValPessoa = pessoa[this.propNome.trim().toLowerCase()];
        if (propValPessoa) {
            propValPessoa = propValPessoa.trim().toLowerCase();

            let temNaPessoa = false;

            for (let tagValor of tagValores) {
                tagValor = tagValor.trim().toLowerCase();
                if (tagValor === propValPessoa) {
                    temNaPessoa = true;
                }
            }

            return temNaPessoa;
        }
    }
}

export class MedidaMaiorQue extends TagFiltro implements ITagFiltro {

    constructor(tag: string, propNome: string) {
        super(tag, null, propNome, true, false, false, true);
    }

    Run(pessoa: Pessoa): boolean {
        let valor = this.valor.toString();

        if (valor.indexOf(" ") >= 0) {
            valor = valor.split(" ").pop();
        }

        valor = valor.trim().toLowerCase();
        valor = valor.replace(",", ".");
        let valorFloat = Number.parseFloat(valor);

        let propValor: string = pessoa[this.propNome];
        if (!propValor) {
            return false;
        }

        propValor = propValor.trim().toLowerCase();
        propValor = propValor.replace(",", ".");

        let propValorFloat = Number.parseFloat(propValor);

        return propValorFloat > valorFloat;
    }

}

export class MedidaMenorQue extends TagFiltro implements ITagFiltro {

    constructor(tag: string, propNome: string) {
        super(tag, null, propNome, true, false, false, true);
    }

    Run(pessoa: Pessoa): boolean {
        let valor = this.valor.toString();

        if (valor.indexOf(" ") >= 0) {
            valor = valor.split(" ").pop();
        }

        valor = valor.trim().toLowerCase();
        valor = valor.replace(",", ".");
        let valorFloat = Number.parseFloat(valor);

        let propValor: string = pessoa[this.propNome];
        if (!propValor) {
            return false;
        }

        propValor = propValor.trim().toLowerCase();
        propValor = propValor.replace(",", ".");

        let propValorFloat = Number.parseFloat(propValor);

        return propValorFloat < this.valor;
    }

}

export class TagBooleana extends TagFiltro implements ITagFiltro {

    constructor(tag: string, valor: boolean, propNome: string) {
        super(tag, valor, propNome, true);
    }


    Run(pessoa: Pessoa): boolean {
        this.valor;

        let propValor: boolean = pessoa[this.propNome];

        if (propValor == null) {
            return false;
        }

        return propValor === this.valor;
    }
}
