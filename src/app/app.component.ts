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
    this.editItem = this.items.find((r) => r.id == id) || new Item();
    this.modalService.open(content);
  }
}
