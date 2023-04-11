import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {


  skills: any[] = [];
  AllSkills: any[] = [];
  SkillstoDisplay: any[] = [];

  skillForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserServiceService, private fb: FormBuilder) {
    this.skillForm = fb.group({});
  }
  ngOnInit(): void {

    this.skillForm = this.fb.group({
      skillId: this.fb.control('default')
    })

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.getSkill(id);
      }
    })
    
    this.getAllSkills();
    
  }
  
//Add the Skill for User
  addSkill() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        let skill: any = {
          skillId: this.SkillId.value
        }
        if (id) {
          this.userService.addSkill(id, skill).subscribe({
            next: (res) => {
              this.skills.push(res);
              this.getSkill(id);
              //this.getOnlyskill(id);

            }
          })
        }
      }
    })

  }


//Get All The SkilllsList
  getAllSkills() {
    this.userService.getAllSkills()
      .subscribe(
        response => {
          this.AllSkills = response
        }
      );
  }

  //Get The Skill User's Skills
  getSkill(id: any) {
    this.userService.getSkillForUser(id).subscribe(
      response => {
        this.skills = response;
        console.log(response)
        let skillList: any = [];
        for (var x of response) {
          this.userService.getSkill(x.skillId).subscribe(
            res => {
              skillList.push(res)
            }
          )
        }
        this.SkillstoDisplay = skillList;
      }
    )
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }

  //Delete the User's Skill 
  deleteSkill(skillId: any) {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {

        }
        this.userService.deleteSkill(id, skillId).subscribe(
          res => {
            this.getSkill(id);
          }
        )
      }
    })
  }

  public get SkillId(): FormControl {
    return this.skillForm.get('skillId') as FormControl;
  }

}
