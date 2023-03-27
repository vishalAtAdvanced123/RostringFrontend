import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Users/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = 'https://localhost:7107/api/users'

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<IUser[]>{
    return this.http.get<IUser[]>(this.baseUrl)
  }

  addUser(user : IUser){
     return this.http.post<IUser>(this.baseUrl , user)
  }

  deleteUser(id:any):Observable<IUser>{
    return this.http.delete<IUser>(this.baseUrl+'/'+id)
  }

  getUser(id : any): Observable<IUser>{
    return this.http.get<IUser>(this.baseUrl + '/' + id);
  }
  
  updateUser(id :any , user : any):Observable<IUser>{
    return this.http.put<IUser>(this.baseUrl+ '/' + id , user);
  }
}
