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


  locationOptions = [
    'Banglore',
    'Vadodara',
    'Ahmadabad'
  ];
  userDetails: IUser = {
    name: '',
    email: '',
    location: '',
    position: '',
    gender: '',
    password: '',
    //skillId: 0
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
              // this.userService.getSkill(this.userDetails.skillId).subscribe({
              //   next: (res) => {
              //     this.userSkill = res;
              //   }
              // })
            }
          });
        }
      }
    });
    //this.getAllSkills();


  }


  onBack(): void {
    this.router.navigate(['/users']);
  }

  updateUser() {
    this.userService.updateUser(this.userDetails.id, this.userDetails).
      subscribe({
        next: (response) => {
          this.userDetails = response;
          this.router.navigate(['/users']);
        }
      });
  }



  

}
