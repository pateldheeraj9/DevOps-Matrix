import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVelocityComponent } from './chart-velocity.component';

describe('ChartVelocityComponent', () => {
  let component: ChartVelocityComponent;
  let fixture: ComponentFixture<ChartVelocityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartVelocityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartVelocityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
