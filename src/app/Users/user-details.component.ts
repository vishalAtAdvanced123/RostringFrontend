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


  skills: ISkills[] = [];
  Allskills: ISkills[] = [];
  location: any = '';
  gender: any = '';
  designation: any = '';


  userDetails: IUser = {
    userName: '',
    firstName: '',
    lastName: '',
    locationId: 0,
    designationId: 0,
    genderId: 0,
    email: '',
    password: ''
  };

  userSkill: ISkills = {
    id: 0,
    name: ''
  };


  // Get All skills 
  getAllSkills() {
    this.userService.getAllSkills()
      .subscribe(
        response => {
          this.Allskills = response
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
              this.userService.getGender(this.userDetails.genderId).subscribe(
                res => {
                  this.gender = res;
                }
              )
              this.userService.getLocation(this.userDetails.locationId).subscribe(
                res => {
                  this.location = res;
                }
              )
              this.userService.getDesignation(this.userDetails.designationId).subscribe(
                res => {
                  this.designation = res;
                }
              )


            }
          });
          this.userService.getSkillForUser(id).subscribe({
            next: (res) => {
              this.skills = res;
            }
          })
        }
        if (id) {
          this.userService.getSkillForUser(id).subscribe({
            next: (response) => {
              this.skills = response;
            }
          });
        }


      }
    });
    this.getAllSkills();


  }

  // Get skill 
  getSkill(skillId: any) {
    this.userService.getSkill(skillId).subscribe({
      next: (res) => {
        this.getSkill(res);
      }
    });
  }

  // function for Back Button
  onBack(): void {
    this.router.navigate(['/users']);
  }

  // Update User 
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
