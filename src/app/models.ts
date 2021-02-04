export class ItemType {
    public id: string = '';
    public name: string = '';
    public measure: string = '';
}

export class Item {
    public id: string = '';
    public name: string = '';
    public typeID?: string;
    public stock: number = 0;
    public inUse: number = 0;
    public maxStock: number = 0;
    public updatedOn: Date = new Date();
    public notes: string = '';
    public type: ItemType = {} as any;
}