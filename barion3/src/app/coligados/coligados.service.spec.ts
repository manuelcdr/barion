import { TestBed, inject } from '@angular/core/testing';
import { ColigadosService } from "./coligados.service";

describe('ColigadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColigadosService]
    });
  });

  it('should be created', inject([ColigadosService], (service: ColigadosService) => {
    expect(service).toBeTruthy();
  }));
});
