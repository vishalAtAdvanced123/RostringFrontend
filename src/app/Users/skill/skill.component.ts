import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ISkills } from '../skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {


  skills: ISkills[] = [];
  AllSkills: ISkills[] = [];
  skillsOption=[
    'C#',
    'Python',
    'Machine Learning',
    'Web API',
    'Angular',
    '.NET',
    'C++',
    'Java',
    'Bootstrap',
    'Deep Learning'
  ];

  

  skillForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserServiceService, private fb: FormBuilder) {
    this.skillForm = fb.group({});
  }
  ngOnInit(): void {
    
    this.skillForm = this.fb.group({
      name : this.fb.control('')
    })

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.userService.getSkill(id).subscribe({
            next: (response) => {
              this.skills = response;
            }
          });
        }
        // let skill: ISkills = {
        //   name: this.SkillName.value
        // };

        // if (id) {
        //   this.userService.addSkill(id, skill).subscribe({
        //     next : (res)=>{
        //       this.skills.push(res);
        //     }
        //   });
        // }
      }
    })
    //this.addSkill();
    this.getAllSkills();
    
    
    
  }
  
  addSkill(){
    this.route.paramMap.subscribe({
      next:(params) => {
        const id = params.get('id');

        let skill : ISkills ={
          name : this.SkillName.value
        }
        if(id){
          this.userService.addSkill(id , skill).subscribe({
            next:(res)=>{
              this.getSkill(id);
              this.skills.push(res);
              
            }
          })
        }
      }
    })
      
  }

  getAllSkills() {
    this.userService.getAllSkills()
      .subscribe(
        response => {
          this.AllSkills = response
        }
      );
  }

  getSkill(id: any) {
    this.userService.getSkill(id).subscribe(
      response => {
        this.skills = response;
      }
    )
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }

  deleteSkill(skillId : any){
    this.route.paramMap.subscribe({
      next:(params) => {
        const id = params.get('id');
        if(id){
          this.userService.deleteSkill(skillId).subscribe(
           res=>{
              this.getSkill(id);
            }
          )
        }
      }
    })
  }

  public get SkillName(): FormControl {
    return this.skillForm.get('name') as FormControl;
  }

}
