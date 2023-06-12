import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSprintPerformanceComponent } from './chart-sprint-performance.component';

describe('ChartSprintPerformanceComponent', () => {
  let component: ChartSprintPerformanceComponent;
  let fixture: ComponentFixture<ChartSprintPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSprintPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSprintPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
