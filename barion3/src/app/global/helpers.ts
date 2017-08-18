
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