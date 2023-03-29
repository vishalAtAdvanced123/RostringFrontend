import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { ISkills } from './skill';
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
    'Ahmadabad'
  ];

  skills : ISkills[] = [];
  userDetails: IUser = {
    name: '',
    email: '',
    location: '',
    position: '',
    gender: '',
    password: '',
    skillId: 0
  };

  userSkill: ISkills = {
    id: 0,
    name: ''
  };

  getAllSkills() {
    this.userService.getAllSkills()
      .subscribe(
        response => {
          this.skills = response
        }
      );
  }

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
              this.userService.getSkill(this.userDetails.skillId).subscribe({
                next: (res) => {
                  this.userSkill = res;
                }
              })
            }
          });
        }


      }
    });
    this.getAllSkills();


  }

  getSkill(skillId: any) {
    this.userService.getSkill(skillId).subscribe({
      next: (res) => {
        this.getSkill(res);
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
