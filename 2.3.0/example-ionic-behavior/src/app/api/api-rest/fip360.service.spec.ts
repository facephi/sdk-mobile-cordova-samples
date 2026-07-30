import { TestBed } from '@angular/core/testing';
import { Fip360Service } from './fip360.service';

describe('Fip360Service', () => {
  let service: Fip360Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fip360Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
