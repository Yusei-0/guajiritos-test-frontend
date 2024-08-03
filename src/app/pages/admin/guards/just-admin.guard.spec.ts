import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { justAdminGuard } from './just-admin.guard';

describe('justAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => justAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
