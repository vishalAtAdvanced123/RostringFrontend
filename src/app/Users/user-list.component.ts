import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserServiceService } from "../services/user-service.service";
import { ISkills } from "./skill";
import { IUser } from "./user";


@Component({
  selector: 'up-user-list',
  templateUrl: './user-list.component.html'
})
export class UserProfileComponent implements OnInit {
  userTitle: string = 'Users List';
  repeatPass: string = 'none';
  imageWidth: number = 50;
  imageMargine: number = 2;

  private _listFilter: string ='';
  get listFilter(): string {
    return this._listFilter
  }
  skills : ISkills[] =[];
  users: IUser[] = [];
  filterUsers: IUser[] = [];
  locations : any[] =[];
  designations : any[]=[];
  genders : any[]=[];

 
  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   console.log('In Setter:', value)
  //   this.filterUsers = this.performFilter(value);
    
  // }

  // performFilter(filterBy: string): IUser[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.users.filter((user: IUser) =>
  //     user.firstName.toLocaleLowerCase().includes(filterBy));

  // }

 
 getForm : FormGroup;
 employeeForm: FormGroup;

  


  constructor(private userService: UserServiceService,
    private fb: FormBuilder) {
    this.employeeForm = fb.group({});
    this.getForm = fb.group({});

  }
  
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      userName: this.fb.control('',
        [Validators.required,
        Validators.minLength(5),
        Validators.pattern("[a-zA-Z].*")]
      ),
      firstName: this.fb.control('',
        [Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z].*")]
      ),
      lastName: this.fb.control('',
        [Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z].*")]
      ),
      email: this.fb.control('',
        [Validators.required,
        Validators.email]
      ),
      locationId: this.fb.control('default'),
      designationId: this.fb.control('default'),
      genderId: this.fb.control('default'),
      pwd: this.fb.control('',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)]
      ),
      rpwd: this.fb.control(''),
      skill: this.fb.control('')
    })
    this.getForm = this.fb.group({
      pageSize :this.fb.control(0),
      pageNumber : this.fb.control(0)
    })
    this.getAllUsers();
    this.getLocations();
    this.getDesignations();
    this.getGenders();
    //this.getAllSkills();
  }
  
  // Get All The Users
  getAllUsers() {
    let pageSize = this.PageSize.value;
    let pageNumber = this.PageNumber.value;
    this.userService.getAllUsers(pageSize,pageNumber)
      .subscribe(
        response => {
          this.users = response;
          this.clearPageValues();

        }
      );
  }

  getGenders(){
    this.userService.getGenders().subscribe(
      response =>{
        this.genders = response;
      }
    )
  }

  getDesignations(){
    this.userService.getDesignations().subscribe(
      response =>{
        this.designations = response;
      }
    )
  }

  getLocations(){
    this.userService.getLocations().subscribe(
      response =>{
        this.locations = response;
      }
    )
  }

  // Code for Get All the Skills
  // getAllSkills() {
  //   this.userService.getAllSkills()
  //     .subscribe(
  //       response => {
  //         this.skills = response
  //       }
  //     );
  // }

  

  // Function For the Add User 
  addUser() {
    let user: IUser = {
      userName: this.UserName.value,
        firstName : this.FirstName.value,
        lastName : this.LastName.value,
        locationId : this.LocationId.value,
        designationId : this.DesignationId.value,
        genderId : this.GenderId.value,
        email : this.Email.value,
        password : this.Password.value
      //skillId: this.Skill.value
    }
    if (this.Password.value == this.RPassword.value) {
      this.userService.addUser(user).subscribe(
        res => {
          this.users.push(res);
          this.clearForm();
          this.getAllUsers();
        });
    }
    else {
      this.repeatPass = 'inline';
    }

  }
 
  // // Code for the Delete User
  onDelete(id: any) {
    this.userService.deleteUser(id).subscribe(
      response => {
        this.getAllUsers();
      }
    )
  }

  // Code for the Get user By id 
  getUser(id: any) {
    this.userService.getUser(id).subscribe(
      res => {
        this.getUser(res);
      })
  }

  

 //For Clear the form
  clearForm() {
    this.UserName.setValue('');
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Email.setValue('');
    this.LocationId.setValue(0);
    this.DesignationId.setValue(0);
    this.GenderId.setValue(0);
    this.Password.setValue('');
    this.RPassword.setValue('');
  }

  clearPageValues(){
    this.PageSize.setValue(0);
    this.PageNumber.setValue(0);
  }

  public get PageSize(): FormControl{
    return this.getForm.get('pageSize') as FormControl;
  }
  public get PageNumber(): FormControl{
    return this.getForm.get('pageNumber') as FormControl;
  }

  public get UserName(): FormControl {
    return this.employeeForm.get('userName') as FormControl;
  }

  public get FirstName(): FormControl {
    return this.employeeForm.get('firstName') as FormControl;
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('lastName') as FormControl;
  }
  public get Email(): FormControl {
    return this.employeeForm.get('email') as FormControl;
  }
  public get LocationId(): FormControl {
    return this.employeeForm.get('locationId') as FormControl;
  }
  public get DesignationId(): FormControl {
    return this.employeeForm.get('designationId') as FormControl;
  }
  public get GenderId(): FormControl {
    return this.employeeForm.get('genderId') as FormControl;
  }
  public get Password(): FormControl {
    return this.employeeForm.get('pwd') as FormControl;
  }
  public get RPassword(): FormControl {
    return this.employeeForm.get('rpwd') as FormControl;
  }
  // public get Skill(): FormControl {
  //   return this.employeeForm.get('skill') as FormControl;
  // }
 


}