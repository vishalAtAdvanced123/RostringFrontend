import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { IUser } from './user';

@Component({
  selector: 'up-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  pageTitle: string = 'User details';
  locationOptions = [
    'Banglore',
    'Vadodara',
    'Ahmdabad'
  ];
  userDetails: IUser = {
    name: '',
    email: '',
    location: '',
    position: '',
    gender: '',
    password: '',
    skillId: 0
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
