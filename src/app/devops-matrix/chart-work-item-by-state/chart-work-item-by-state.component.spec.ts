import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartWorkItemByStateComponent } from './chart-work-item-by-state.component';

describe('ChartWorkItemByStateComponent', () => {
  let component: ChartWorkItemByStateComponent;
  let fixture: ComponentFixture<ChartWorkItemByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartWorkItemByStateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChartWorkItemByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
