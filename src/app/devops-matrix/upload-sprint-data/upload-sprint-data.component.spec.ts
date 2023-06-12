import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSprintDataComponent } from './upload-sprint-data.component';

describe('UploadSprintDataComponent', () => {
  let component: UploadSprintDataComponent;
  let fixture: ComponentFixture<UploadSprintDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSprintDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSprintDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
