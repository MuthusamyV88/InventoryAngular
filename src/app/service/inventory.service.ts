import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private httpClient: HttpClient) { }

  public getItemTypes = () => this.httpClient.get(environment.apiEndpoint + 'itemtype');

  public getItems = () => this.httpClient.get(environment.apiEndpoint + 'item');
}
