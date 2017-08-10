import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInputComponent } from './container-input.component';

describe('ContainerInputComponent', () => {
  let component: ContainerInputComponent;
  let fixture: ComponentFixture<ContainerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
