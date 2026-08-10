import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Fip360Service } from './fip360.service';

describe('Fip360Service', () => {
  let service: Fip360Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(Fip360Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
