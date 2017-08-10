import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoLinksComponent } from './caminho-links.component';

describe('CaminhoLinksComponent', () => {
  let component: CaminhoLinksComponent;
  let fixture: ComponentFixture<CaminhoLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaminhoLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaminhoLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
