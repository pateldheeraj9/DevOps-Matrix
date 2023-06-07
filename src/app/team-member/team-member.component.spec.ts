import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberComponent } from './team-member.component';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

describe('TeamMemberComponent', () => {
  let component: TeamMemberComponent;
  let fixture: ComponentFixture<TeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
