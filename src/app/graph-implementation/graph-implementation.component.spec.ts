import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphImplementationComponent } from './graph-implementation.component';

describe('GraphImplementationComponent', () => {
  let component: GraphImplementationComponent;
  let fixture: ComponentFixture<GraphImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphImplementationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
