import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColigadosComponent } from './coligados.component';

describe('ColigadosComponent', () => {
  let component: ColigadosComponent;
  let fixture: ComponentFixture<ColigadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColigadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColigadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
