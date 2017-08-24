
import { ObjectHelper, Dictionary, ObjDictionary } from "../global/helpers";


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
    olhosPretos = "olhos pretos";
    olhosVerdes = "olhos verdes";
    olhosAzuis = "olhos azuis";
    olhosCastanhosEscuros = "olhos castanhos escuros";
    olhosCastanhosClaros = "olhos castanhos claros";
}

export class TagsPadroesCabelo extends ObjectHelper {
    public cabeloPreto = "cabelo preto";
    public cabeloLoiro = "cabelo loiro";
    public cabeloCastanhoEscuro = "cabelo castanho escuro";
    public cabeloCastanhoClaro = "cabelo castanho claro";
    public cabeloRuivo = "cabelo ruivo";
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
            new ObjDictionary<string, string[]>("olhos claros", [
                tagPadroesOlhos.olhosAzuis,
                tagPadroesOlhos.olhosVerdes,
                tagPadroesOlhos.olhosCastanhosClaros
            ]),
            new ObjDictionary<string, string[]>("olhos escuros", [
                tagPadroesOlhos.olhosPretos,
                tagPadroesOlhos.olhosCastanhosEscuros
            ]),
            new ObjDictionary("cabelos escuros", [
                tagsPadroesCabelo.cabeloCastanhoEscuro,
                tagsPadroesCabelo.cabeloPreto
            ])
        ];
    }

    dicionario: Array<ObjDictionary<string, string[]>>;

    get todas() {
        let todas: string[] = [];
        this.dicionario.forEach(element => {
            if (!todas[element.key])
                todas.push(element.key);
        });
        return todas;
    }
}

