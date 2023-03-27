import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserServiceService } from "../services/user-service.service";
import { IUser } from "./user";
import { UserService } from "./user.services";


@Component({
    selector: 'up-user-list',
    templateUrl : './user-list.component.html'
})
export class UserProfileComponent implements OnInit{
userTitle : string = 'Users List';
repeatPass : string = 'none';
imageWidth : number = 50;
imageMargine : number = 2;
errorMessage: string = '';
sub!: Subscription;

private _listFilter : string = '';
get listFilter() : string {
    return this._listFilter
}

set listFilter(value : string){
    this._listFilter = value;
    console.log('In Setter:',value)
    this.filterUsers = this.performFilter(value);
}

locationOptions =[
    'Banglore',
    'Vadodara',
    'Ahmdabad'
];

employeeForm: FormGroup;

filterUsers: IUser[] = [];
users: IUser[] = [];


constructor(private userService: UserServiceService,
  private fb:FormBuilder) 
  { 
    this.employeeForm = fb.group({});

  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name : this.fb.control('' ,
      [Validators.required ,
       Validators.minLength(4),
       Validators.pattern("[a-zA-Z].*")]
      ),
      email: this.fb.control('',
      [Validators.required ,
       Validators.email]
      ),
      location : this.fb.control('default'),
      position: this.fb.control(''),
      gender: this.fb.control('' , [Validators.required]),
      pwd: this.fb.control('',
      [Validators.required ,
      Validators.minLength(6),
      Validators.maxLength(15)]
      ),
      rpwd: this.fb.control(''),
      skill : this.fb.control('')
    })
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(
      response => {
        this.users = response
      }
    );
  }

performFilter(filterBy:string) : IUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user : IUser)=>
    user.name.toLocaleLowerCase().includes(filterBy));

}
 
addUser(){
  let user:IUser={
    name : this.EmpName.value,
    email: this.Email.value,
    location : this.locationOptions[parseInt(this.Location.value)],
    position : this.Position.value,
    gender : this.Gender.value,
    password : this.Password.value,
    skillId : this.Skill.value
  }
  if (this.Password.value == this.RPassword.value) {
    this.userService.addUser(user).subscribe(
      res => {
        this.users.push(res);
        this.clearForm();
        this.getAllUsers();
      });
  }
  else{
    this.repeatPass='inline';
  }
  
}

onDelete(id : any){
  this.userService.deleteUser(id).subscribe(
    response =>{
      this.getAllUsers();
    }
  )
}
getUser(id : any){
  this.userService.getUser(id).subscribe(
    res => {
      this.getUser(res);
    })
}


clearForm(){
  this.EmpName.setValue('');
  this.Email.setValue('');
  this.Location.setValue('');
  this.Position.setValue('');
  this.Gender.setValue('');
  this.Password.setValue('');
  this.RPassword.setValue('');
 }

 public get EmpName():FormControl{
  return this.employeeForm.get('name') as FormControl;
 }
 public get Email():FormControl{
  return this.employeeForm.get('email') as FormControl;
 }
 public get Location():FormControl{
  return this.employeeForm.get('location') as FormControl;
 }
 public get Position():FormControl{
  return this.employeeForm.get('position') as FormControl;
 }
 public get Gender():FormControl{
  return this.employeeForm.get('gender') as FormControl;
 }
 public get Password():FormControl{
  return this.employeeForm.get('pwd') as FormControl;
 }
 public get RPassword():FormControl{
  return this.employeeForm.get('rpwd') as FormControl;
 }
 public get Skill():FormControl{
  return this.employeeForm.get('skill') as FormControl;
 } 

 

}