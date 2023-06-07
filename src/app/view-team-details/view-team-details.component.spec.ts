import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamDetailsComponent } from './view-team-details.component';

describe('EditTeamDetailsComponent', () => {
  let component: ViewTeamDetailsComponent;
  let fixture: ComponentFixture<ViewTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeamDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
