import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Client, Phone} from './client/client.model'

import {MEAT_API} from '../app.api'

@Injectable()
export class ClientsService {

    constructor(private http: HttpClient) {}

    clients(): Observable<Client[]> {
      console.log('acessando clientes da api...')
      return this.http.get<Client[]>(`${MEAT_API}/clients`)
    }

    clientById(id: string): Observable<Client> {
      return this.http.get<Client>(`${MEAT_API}/clients/${id}`)
    }

    saveClient(client: Client): Observable<Client> {
      return this.http.post<Client>(`${MEAT_API}/clients`, client)
    }

    updateClient(client: Client): Observable<Client> {
      return this.http.put<Client>(`${MEAT_API}/clients/${client.id}`, client)
    }

    deleteClient(id: string): Observable<any> {
      return this.http.delete(`${MEAT_API}/clients/${id}`)
    }

}
