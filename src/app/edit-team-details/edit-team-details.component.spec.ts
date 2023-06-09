import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamDetailsComponent } from './edit-team-details.component';

describe('EditTeamDetailsComponent', () => {
  let component: EditTeamDetailsComponent;
  let fixture: ComponentFixture<EditTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeamDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
