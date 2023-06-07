import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTaskByStateComponent } from './chart-task-by-state.component';

describe('ChartTaskByStateComponent', () => {
  let component: ChartTaskByStateComponent;
  let fixture: ComponentFixture<ChartTaskByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTaskByStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTaskByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
