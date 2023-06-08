import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTeamPerformanceComponent, ChartTeamPerformanceComponent } from './chart-team-performance.component';

describe('ChartTeamPerformanceComponent', () => {
  let component: ChartTeamPerformanceComponent;
  let fixture: ComponentFixture<ChartTeamPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTeamPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTeamPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
