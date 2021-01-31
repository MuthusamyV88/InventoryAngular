import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private httpClient: HttpClient) { }

  public getMeasures = () => this.httpClient.get(environment.apiEndpoint + 'measure');
}
