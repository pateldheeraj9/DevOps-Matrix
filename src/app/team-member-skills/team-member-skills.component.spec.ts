import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberSkillsComponent } from './team-member-skills.component';

describe('TeamMemberSkillsComponent', () => {
  let component: TeamMemberSkillsComponent;
  let fixture: ComponentFixture<TeamMemberSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMemberSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
