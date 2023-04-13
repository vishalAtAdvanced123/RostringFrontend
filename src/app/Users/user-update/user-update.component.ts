import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { IUser } from '../user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{

  locations : any[] =[];
  designations : any[]=[];
  genders : any[]=[];

  locationOptions = [
    'Banglore',
    'Vadodara',
    'Ahmadabad'
  ];


  userDetails:any = {
        id :0,
        userName: '',
        firstName : '',
        lastName : '',
        locationId : 0,
        designationId : 0,
        genderId : 0,
        email : '',
        password : ''
  };

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserServiceService) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.userService.getUser(id).subscribe({
            next: (response) => {
              this.userDetails = response;
              
            }
          });
        }
      }
    });
    //this.getAllSkills();
    this.getLocations();
    this.getDesignations();
    this.getGenders();


  }


  onBack(): void {
    this.router.navigate(['/users']);
  }

  updateUser() {
    this.userService.updateUser(this.userDetails.id, this.userDetails).
      subscribe({
        next: (response) => {
          this.userDetails = response;
          //this.router.navigate(['/users/']);
          
        }
      });
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



  

}
