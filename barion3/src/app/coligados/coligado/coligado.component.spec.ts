import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColigadoComponent } from './coligado.component';

describe('ColigadoComponent', () => {
  let component: ColigadoComponent;
  let fixture: ComponentFixture<ColigadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColigadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColigadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
