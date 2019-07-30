import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OwnerService {

  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNERS_API = this.API+'/owners';
  public OWNER_API = this.API+'/owner?dni=';
  

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.OWNERS_API);
  }

  getByDni(dni: string) {
    return this.http.get(this.OWNER_API + dni);
  }

  getById(id:string){
    return this.http.get(this.OWNERS_API + '/' + id);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNERS_API, owner);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
