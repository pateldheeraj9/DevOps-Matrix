import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartWorkScopeAnalysisComponent } from './chart-work-scope-analysis.component';

describe('ChartWorkScopeAnalysisComponent', () => {
  let component: ChartWorkScopeAnalysisComponent;
  let fixture: ComponentFixture<ChartWorkScopeAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartWorkScopeAnalysisComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChartWorkScopeAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
