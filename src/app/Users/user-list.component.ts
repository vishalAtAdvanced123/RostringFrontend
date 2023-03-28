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
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string ='';
  get listFilter(): string {
    return this._listFilter
  }
  skills : ISkills[] =[];
  users: IUser[] = [];
  filterUsers: IUser[] = this.users;

 
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In Setter:', value)
    this.filterUsers = this.performFilter(value);
    
  }

  performFilter(filterBy: string): IUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: IUser) =>
      user.name.toLocaleLowerCase().includes(filterBy));

  }

  locationOptions = [
    'Banglore',
    'Vadodara',
    'Ahmadabad'
  ];
  

  employeeForm: FormGroup;

  


  constructor(private userService: UserServiceService,
    private fb: FormBuilder) {
    this.employeeForm = fb.group({});

  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: this.fb.control('',
        [Validators.required,
        Validators.minLength(4),
        Validators.pattern("[a-zA-Z].*")]
      ),
      email: this.fb.control('',
        [Validators.required,
        Validators.email]
      ),
      location: this.fb.control('default'),
      position: this.fb.control(''),
      gender: this.fb.control('', [Validators.required]),
      pwd: this.fb.control('',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)]
      ),
      rpwd: this.fb.control(''),
      skill: this.fb.control('')
    })
    this.getAllUsers();
  }
  
  // Get All The Users
  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe(
        response => {
          this.users = response
        }
      );
  }

  getAllSkills() {
    this.userService.getAllSkills()
      .subscribe(
        response => {
          this.skills = response
        }
      );
  }

  

  // Function For the Add User 
  addUser() {
    let user: IUser = {
      name: this.EmpName.value,
      email: this.Email.value,
      location: this.locationOptions[parseInt(this.Location.value)],
      position: this.Position.value,
      gender: this.Gender.value,
      password: this.Password.value,
      skillId: this.Skill.value
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
 
  // Code for the Delete User
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
    this.EmpName.setValue('');
    this.Email.setValue('');
    this.Location.setValue('');
    this.Position.setValue('');
    this.Gender.setValue('');
    this.Password.setValue('');
    this.RPassword.setValue('');
  }

  public get EmpName(): FormControl {
    return this.employeeForm.get('name') as FormControl;
  }
  public get Email(): FormControl {
    return this.employeeForm.get('email') as FormControl;
  }
  public get Location(): FormControl {
    return this.employeeForm.get('location') as FormControl;
  }
  public get Position(): FormControl {
    return this.employeeForm.get('position') as FormControl;
  }
  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl;
  }
  public get Password(): FormControl {
    return this.employeeForm.get('pwd') as FormControl;
  }
  public get RPassword(): FormControl {
    return this.employeeForm.get('rpwd') as FormControl;
  }
  public get Skill(): FormControl {
    return this.employeeForm.get('skill') as FormControl;
  }
 


}