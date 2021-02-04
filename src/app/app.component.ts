import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item, ItemType } from './models';
import { InventoryService } from './service/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public itemTypes: Array<ItemType> = [];
  public items: Array<Item> = [];
  public editItem = new Item();
  public addItemType = new ItemType();
  public measure: string;

  constructor(private inventoryService: InventoryService, private modalService: NgbModal) {
    this.inventoryService.getItemTypes().subscribe((itemTypes: any) => {
      this.itemTypes = itemTypes;
    });
    this.inventoryService.getItems().subscribe((items: any) => {
      this.items = items;
    });
  }
  title = 'InventoryAngular';
  public openEditModal(content: any, id: string) {
    if (id === undefined) {
      this.editItem = new Item();
      this.measure = "Kilo";
    } else {
      this.editItem = Object.assign({}, this.items.find((r) => r.id == id) || new Item());
      this.measure = this.editItem.type.measure;
    }
    this.modalService.open(content);
  }
  public openAddItemTypeModal(content: any) {
    this.addItemType = new ItemType();
    this.addItemType.measure = 'Litre'
    this.modalService.open(content);
  }
  public onItemTypeChange() {
    this.measure = this.itemTypes.find((r) => r.id == this.editItem.typeID).measure;
  }
  public saveStock() {
    this.inventoryService.addEditItem(this.editItem).subscribe(() => {
      this.modalService.dismissAll();
    });
  }
  public saveItemType() {
    this.inventoryService.addItemType(this.addItemType).subscribe(() => {
      this.inventoryService.getItemTypes().subscribe((itemTypes: any) => {
        this.itemTypes = itemTypes;
        this.modalService.dismissAll();
      });
    });
  }
}
