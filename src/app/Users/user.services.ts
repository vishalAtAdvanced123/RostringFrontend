import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable,tap, throwError } from "rxjs";
import { IUser } from "./user";


@Injectable({
    providedIn : 'root'
})
export class UserService{
    private userUrl = 'api/Users/users.json'

    constructor(private http:HttpClient){

    }

    getUsers(): Observable<IUser[]>{
        return this.http.get<IUser[]>(this.userUrl).pipe(
            tap(data => console.log('All',JSON.stringify(data))),
            catchError(this.handleError)
        )
    }
    private handleError(err:HttpErrorResponse){
        let errorMessage =' '
        if (err.error instanceof ErrorEvent){
            errorMessage=`An error occurs: ${err.error.message}`;
     }else{
        errorMessage=`Server return code: ${err.status}, error mesage is ${err.message} `}
        console.error(errorMessage)
        return throwError (()=>errorMessage)
    }
// getUasers(): IUser[]{
//     return [{
        
//         "UserId": 1,
//         "name" : "Vishal Rathod",
//         "email":"vishalanilrathod@gmail.com",
//         "location":"vadodara",
//         "position":"Full stack developer",
//         "gender":"Male",
//         "image":"assets/default-avatar.jpg"

//     },
//     {
//         "UserId": 2,
//         "name" : "Rahul Parik",
//         "email":"rahulparik@gmail.com",
//         "location":"Banglore",
//         "position":"senior developer",
//         "gender":"Male",
//         "image":"assets/default-avatar.jpg"

//     },
//     {
        
//         "UserId": 3,
//         "name" : "Samyak jain",
//         "email":"samyankjain12@gmail.com",
//         "location":"Ahamadabad",
//         "position":"junior developer",
//         "gender":"Male",
//         "image":"assets/default-avatar.jpg"
//     }]
// }

   

}
