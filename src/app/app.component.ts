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
  public filteredBy = 'All';

  constructor(private inventoryService: InventoryService, private modalService: NgbModal) {
    this.inventoryService.getItemTypes().subscribe((itemTypes: any) => {
      this.itemTypes = itemTypes;
    });
    this.inventoryService.getItems().subscribe((items: any) => {
      this.items = items;
      this.clearFilter();
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
    const isAdd = this.editItem.id == '';
    this.inventoryService.addEditItem(this.editItem).subscribe((result: any) => {
      this.editItem.id = result.id;
      if (isAdd) {
        this.items.push(Object.assign({}, this.editItem));
      } else {
        const itemIndex = this.items.findIndex((item) => item.id == result.id);
        this.items.splice(itemIndex, 1, Object.assign({}, this.editItem));
      }
      this.modalService.dismissAll();
    });
  }
  public saveItemType() {
    this.inventoryService.addItemType(this.addItemType).subscribe((result: any) => {
      this.addItemType.id = result.id;
      this.itemTypes.push(Object.assign({}, this.addItemType));
      this.modalService.dismissAll();
    });
  }
  public filterBy = (typeId: string) => {
    this.filteredBy = this.itemTypes.find((itemType) => itemType.id == typeId).name;
    this.items.forEach((item) => item.isVisible = item.typeID == typeId);
  }

  public clearFilter = () => {
    this.filteredBy = 'All';
    this.items.forEach((item) => item.isVisible = true);
  }
}
