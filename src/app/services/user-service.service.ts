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
  UserSkillUrl = 'https://localhost:7107/api/users/Skill'
  locationUrl = 'https://localhost:7107/api/users/locations'
  designationUrl = 'https://localhost:7107/api/user/designation'
  genderUrl = 'https://localhost:7107/api/users/gender'
  skillUrl = 'https://localhost:7107/api/users/Skills'
  
 

  constructor(private http : HttpClient) { }

  //Gender
  getGenders():Observable<any[]>{
    return this.http.get<any[]>(this.genderUrl)
  }
  getGender(id : any): Observable<any>{
    return this.http.get<any>(this.genderUrl + '/'+ id)
  }

  //Designation
  getDesignations():Observable<any>{
    return this.http.get<any>(this.designationUrl)
  }
  getDesignation(id : any): Observable<any>{
    return this.http.get<any>(this.designationUrl + '/'+ id)
  }
  
  //Skill
  getAllSkills():Observable<any>{
    return this.http.get<any>(this.skillUrl)
  }
  getSkill(id:any):Observable<any>{
    return this.http.get<any>(this.skillUrl+'/'+id)
  }


  //Location
  getLocations():Observable<any>{
    return this.http.get<any>(this.locationUrl)
  }
  

  getLocation(id : any): Observable<any>{
    return this.http.get<any>(this.locationUrl + '/'+ id)
  }

  //Users
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

  //UserSkills

  // getAllSkills(): Observable<ISkills[]>{
  //   return this.http.get<ISkills[]>(this.skillUrl);
  // }

  getSkillForUser(id : any):Observable<any[]>{
    return this.http.get<any[]>(this.UserSkillUrl+ '/' + id)
  }

  addSkill(id :any , skill: any):Observable<any>{
    return this.http.post<any>(this.UserSkillUrl + '/'+ id , skill)
  }
  deleteSkill(id : any, skillId:any): Observable<any>{
    return this.http.delete<any>(this.UserSkillUrl + '/' + id+'?SkillId='+skillId)  
    // 1?SkillId=3
  }
}
