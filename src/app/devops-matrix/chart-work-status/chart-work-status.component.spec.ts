import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWorkStatusComponent } from './chart-work-status.component';

describe('ChartWorkStatusComponent', () => {
  let component: ChartWorkStatusComponent;
  let fixture: ComponentFixture<ChartWorkStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartWorkStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartWorkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
