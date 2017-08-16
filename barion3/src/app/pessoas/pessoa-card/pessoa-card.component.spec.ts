import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCardComponent } from './pessoa-card.component';

describe('PessoaCardComponent', () => {
  let component: PessoaCardComponent;
  let fixture: ComponentFixture<PessoaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
