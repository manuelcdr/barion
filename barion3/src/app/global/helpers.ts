declare var $: any;

export class ObjectHelper {

    getPropertiesArray(): any[] {
        let propValues = [];
        for (let key of Object.keys(this)) {
            propValues.push(this[key]);
        }
        return propValues;
    }
}


export class ObjDictionary<TKey, TValue> {
    key: TKey;
    value: TValue;

    constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;
    }
}

export class Dictionary<TKey, TValue> {

    private objs = new Array<ObjDictionary<TKey, TValue>>();

    add(obj: ObjDictionary<TKey, TValue>) {
        this.objs.push(obj);
    }

    constructor(objs: Array<ObjDictionary<TKey, TValue>>) {
        this.objs = objs;
    }
}

export class ToolTip {

    static showByElement(el: Element, tooltip: string, position: string, time: number = 3000) {
        $(el).tooltip({
            tooltip: tooltip,
            position: position,
            delay: 300
        });
        $(el).trigger("mouseenter");
        setTimeout(
            () => {
                $(el).trigger("mouseleave");
                setTimeout(
                    () => $(el).tooltip('remove'),
                    600
                );
            },
            time
        );
    }

}

export class AutoComplete {
    // precisa colocar um valor null para cada propriedade para funcinar o auto-complete.
    // este método recebe uma lista de propriedades e adiciona este valor null para cada uma.
    static preparaData(tags: string[]) {
        let propriedadesModificadas = {};

        for (let tag of tags) {

            propriedadesModificadas[tag] = null;
        }

        return propriedadesModificadas;
    }
}

export function pegaIdade(dataString: string): number {

    console.log('dataString: ' + dataString);

    if (dataString == null || dataString == undefined || dataString.length <= 0) {
        return undefined;
    }

    let splitData = dataString.split("/");
    let ano = new Number(splitData[2]).valueOf();
    let mes = new Number(splitData[1]).valueOf();
    let dia = new Number(splitData[0]).valueOf();

    var hoje = new Date();
    var dataNascimento = new Date(ano, mes, dia);
    var idade = hoje.getFullYear() - dataNascimento.getFullYear();
    var m = hoje.getMonth() - dataNascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    console.log(idade);
    return idade;
}

export function pegaTamanhoImagem(file) {
    retornaTamanhoEmTexto(file.size);
}

export function retornaTamanhoEmTexto(number : number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}

export function transformaBytesEmKB(size : number) {
        return (size / 1024);
}

export function transformaBytesEmMB(size : number) {
    return (size / 1048576);
}