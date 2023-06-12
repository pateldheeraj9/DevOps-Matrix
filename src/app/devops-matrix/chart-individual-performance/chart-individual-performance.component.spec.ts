import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartIndividualPerformanceComponent } from './chart-individual-performance.component';

describe('ChartIndividualPerformanceComponent', () => {
  let component: ChartIndividualPerformanceComponent;
  let fixture: ComponentFixture<ChartIndividualPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartIndividualPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartIndividualPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
