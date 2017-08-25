import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuelCordeiroNetoComponent } from './manuel-cordeiro-neto.component';

describe('ManuelCordeiroNetoComponent', () => {
  let component: ManuelCordeiroNetoComponent;
  let fixture: ComponentFixture<ManuelCordeiroNetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuelCordeiroNetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuelCordeiroNetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
