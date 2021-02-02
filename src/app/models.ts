export class ItemType {
    public id: string | undefined;
    public name: string | undefined;
    public measure: string | undefined;
}

export class Item {
    public id: string | undefined;
    public name: string | undefined;
    public typeID: string | undefined;
    public available: number | undefined;
    public maxStock: number | undefined;
    public updatedOn: Date | undefined;
    public notes: string | undefined;
    public type: ItemType | undefined;
}