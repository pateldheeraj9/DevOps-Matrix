import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSprintItemsByStatusComponent } from './home-sprint-items-by-status.component';

describe('HomeSprintItemsByStatusComponent', () => {
  let component: HomeSprintItemsByStatusComponent;
  let fixture: ComponentFixture<HomeSprintItemsByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSprintItemsByStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSprintItemsByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
