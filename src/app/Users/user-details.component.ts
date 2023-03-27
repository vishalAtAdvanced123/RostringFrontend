import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { IUser } from './user';

@Component({
  selector: 'up-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit{
  pageTitle: string = 'User details';
  //user : IUser | undefined ;
  
  locationOptions =[
    'Banglore',
    'Vadodara',
    'Ahmdabad'
];
userDetails : IUser ={
        name: '',
        email : '',
        location : '',
        position : '',
        gender : '',
        password : '',
        skillId : 0
};


  
  constructor(private route:ActivatedRoute,private router: Router,
    private userService : UserServiceService ){
      
    }

    // userForm = new FormGroup({
    //   name : new FormControl(""),
    //   email : new FormControl(""),
    //   gender : new FormControl(""),
    //   position : new FormControl(""),
    //   location : new FormControl("default"),
    //   pwd : new FormControl(""),
    //   rpwd : new FormControl(""),
    //   skill : new FormControl("")
  
    //  })

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.pageTitle += `: ${id}`;
    // this.getUser(id);
    this.route.paramMap.subscribe({
      next : (params) =>{
        const id = params.get('id');

        if (id){
          this.userService.getUser(id).subscribe({
            next:(response)=>{
              this.userDetails = response;

            }
          });
        }

      }
    });
    

  }

  onBack():void{
    this.router.navigate(['/users']);
  }

  updateUser(){
    this.userService.updateUser(this.userDetails.id , this.userDetails).
    subscribe({
      next:(response)=>{
        this.userDetails = response;
        this.router.navigate(['/users']);
      }
    });
  }

  // getUser(id : any){
  //   this.userService.getUser(id).subscribe(
  //     res => {
  //       this.user = res ;
  //       return this.user;
  //     })
  // }

  // updateUser(id :any){
  //   let user = this.getUser(id)
  //   // let user : any = {
  //   //   name : this.EmpName.value,
  //   //   email: this.Email.value,
  //   //   location : this.locationOptions[parseInt(this.Location.value)],
  //   //   position : this.Position.value,
  //   //   gender : this.Gender.value,
  //   //   password : this.Password.value,
  //   //   skill : this.Skill.value
  //   // }
  //   this.setForm(user);
  //   this.userService.updateUser(id, user).subscribe(
  //     res => {
  //       this.user = res;
  //       this.getUser(id);
        
        
  //     }
  //   )

  // }

  // setForm(user : any){
  //   this.EmpName.setValue(user.name);
  //   this.Email.setValue(user.email);
  //   this.Location.setValue(user.location);
  //   this.Position.setValue(user.position);
  //   this.Gender.setValue(user.gender);
  //   this.Password.setValue(user.password);
  //   this.Skill.setValue(user.skillId);

  // }

  // public get EmpName():FormControl{
  //   return this.userDetails.get('name') as FormControl;
  //  }
  //  public get Gender():FormControl{
  //   return this.userForm.get('gender') as FormControl;
  //  }
  //  public get Email():FormControl{
  //   return this.userForm.get('email') as FormControl;
  //  }
  //  public get Location():FormControl{
  //   return this.userForm.get('location') as FormControl;
  //  }
  //  public get Position():FormControl{
  //   return this.userForm.get('position') as FormControl;
  //  }
  //  public get Password():FormControl{
  //   return this.userForm.get('pwd') as FormControl;
  //  }
  //  public get RPassword():FormControl{
  //   return this.userForm.get('rpwd') as FormControl;
  //  }
  //  public get Skill(): FormControl{
  //   return this.userForm.get('skill') as FormControl;
  //  }
  

 
}
