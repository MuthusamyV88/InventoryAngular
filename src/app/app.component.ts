import { Component } from '@angular/core';
import { InventoryService } from './service/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public measures: Array<{ name: string, id: string }> = [];

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.getMeasures().subscribe((measures: any) => {
      this.measures = measures;
    });
  }
  title = 'InventoryAngular';

}
