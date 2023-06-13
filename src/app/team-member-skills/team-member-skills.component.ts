import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, AbstractControl, ValidatorFn, ValidationErrors, FormArray } from '@angular/forms';
import { TeamMemberDetailsService } from '../Service/team-member-details/team-member-details.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
 
interface SkillType {
  type: string;
  code: number;
}

@Component({
  selector: 'app-team-member-skills',
  templateUrl: './team-member-skills.component.html',
  styleUrls: ['./team-member-skills.component.css'],
  providers: [MessageService]
})
export class TeamMemberSkillsComponent implements OnInit{
  skilltypes: SkillType[] | undefined;
  skillForm: FormGroup | undefined;
  skillArray: FormGroup | undefined;
  Memberid: any;
  allSkills: any;
  primarySkill: any;
  secondarySkill: any;
  tertiarySkill: any;
  deleteSkillDialog!: boolean | false;
  currentSkillId: any;

  constructor(private httpProvider: TeamMemberDetailsService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private messageService: MessageService){
    this.deleteSkillDialog = false
  }

  ngOnInit() {
    this.skilltypes = [
        { type: 'Primary Skill', code: 1},
        { type: 'Secondary Skill', code: 2},
        { type: 'Tertiary Skill', code: 3},
    ];



    this.skillForm = new FormGroup({
      skillType: new FormControl<SkillType | null>(null),
      skillName: new FormControl('')
    });

    this.skillArray = new FormGroup({
      skills: new FormArray([])
    })
    this.addSkill1()
   
   this.Memberid = this.config.data.id
   this.getAllSkills()
  }

  get skills() {
    return this.skillArray?.controls["skills"] as FormArray;
  }

  addSkill1() {
    const skillForm = new FormGroup({
      skillType: new FormControl<SkillType | null>(null),
      skillName: new FormControl('')
    });
    this.skills.push(skillForm);
  }

  deleteSkill1(skillIndex: number) {
    this.skills.removeAt(skillIndex);
  }

  hideDialog() {
    this.ref.close();
    this.ref.destroy();
    
  }

  skillTypeValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control.value)
      var forbidden : boolean 
      forbidden = false
      if(control.value?.code == 1 && (this.primarySkill?.length != 0)){
        forbidden = true
        return forbidden ? {forbiddenType: {value: "primary skill already exists"}} : null;
      }
      if(control.value?.code == 2 && (this.secondarySkill?.length != 0)){
        forbidden = true
        return forbidden ? {forbiddenType: {value: "secondary skill already exists"}} : null;
      }
      return null
    };
  }

  getAllSkills(){
    this.httpProvider.getTeamMemberSkills(this.Memberid).subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.allSkills = data.body;
        console.log(this.allSkills)
        this.primarySkill = this.allSkills.filter((obj: { skillType: number; }) => {
          return obj.skillType === 1;
        });
        this.secondarySkill = this.allSkills.filter((obj: { skillType: number; }) => {
          return obj.skillType === 2;
        });
        this.tertiarySkill = this.allSkills.filter((obj: { skillType: number; }) => {
          return obj.skillType === 3;
        });
        console.log(this.primarySkill)
      }
    },
    (error: any) => {
      if (error) {
        console.log(error)
      }
    });
  }

  submitSkills(){
    for(let i of this.skills.controls){
    if (i instanceof FormGroup) {
        this.addSkill(i)
     }
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Successfully' });

    this.skillArray?.reset()
      
    
  }

  addSkill(i : FormGroup){
    console.log(i)
    let data = {
      "teamMemberId": this.Memberid,
      "skillName": i.value.skillName,
      "skillType": i.value.skillType.code
    }
    this.httpProvider.postTeamMemberSkill(data).subscribe(async (data: { body: null; } | null) => {
      console.log(data);
      if (data != null && data.body != null) {
        this.getAllSkills()
        this.skillForm?.reset();
      }
    },
      async (error: any) => {
        console.log(error)
      });
  }

  deleteSkillConfirmation(id:any){
    this.deleteSkillDialog = true;
    this.currentSkillId = id;
  }

  deleteSkill(){
    this.httpProvider.deleteTeamMemberSkill(this.currentSkillId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Deletion Successful' });
        console.log("deletion success")
        this.deleteSkillDialog = false
        this.getAllSkills()
      }
    },
    (error: any) => {
      if (error) {
        console.log(error)
      }
    });
  }




}
