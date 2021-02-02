import { Component } from '@angular/core';
import { InventoryService } from './service/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public itemTypes: Array<{ name: string, id: string, measure: string }> = [];

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.getItemTypes().subscribe((itemTypes: any) => {
      this.itemTypes = itemTypes;
    });
  }
  title = 'InventoryAngular';

}
