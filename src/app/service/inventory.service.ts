import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item, ItemType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private httpClient: HttpClient) { }

  public getItemTypes = () => this.httpClient.get(environment.apiEndpoint + 'itemtype');

  public addItemType = (itemType: ItemType) => this.httpClient.post(environment.apiEndpoint + 'itemtype', itemType);

  public getItems = () => this.httpClient.get(environment.apiEndpoint + 'item');

  public addEditItem = (item: Item) => this.httpClient.post(environment.apiEndpoint + 'item', item);
}
