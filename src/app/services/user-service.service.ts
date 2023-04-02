import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkills } from '../Users/skill';
import { IUser } from '../Users/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = 'https://localhost:7107/api/users'
  skillUrl = 'https://localhost:7107/api/users/Skill'

  constructor(private http : HttpClient) { }

  getAllUsers(pageSize: any , pageNumber : any) : Observable<any>{
    return this.http.get<any>(this.baseUrl+'?pageSize='+pageSize+'&pageNumber='+pageNumber )
    // ?pageSize=3&pageNumber=1
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


  updateUser(id :any , user : IUser):Observable<IUser>{
    return this.http.put<IUser>(this.baseUrl + '/' + id, user);
  }

  getAllSkills(): Observable<ISkills[]>{
    return this.http.get<ISkills[]>(this.skillUrl);
  }

  getSkill(id : any):Observable<ISkills[]>{
    return this.http.get<ISkills[]>(this.skillUrl+ '/' + id)
  }

  addSkill(id :any , skill : ISkills):Observable<ISkills>{
    return this.http.post<ISkills>(this.skillUrl + '/'+ id , skill)
  }
  deleteSkill(id : any): Observable<ISkills>{
    return this.http.delete<ISkills>(this.skillUrl + '/' + id)
  }
}
