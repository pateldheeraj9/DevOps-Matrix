import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevopsMatrixComponent } from './devops-matrix.component';

describe('DevopsMatrixComponent', () => {
  let component: DevopsMatrixComponent;
  let fixture: ComponentFixture<DevopsMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevopsMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevopsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
