import { TestBed, async, inject } from '@angular/core/testing';

import { MembersGuard } from './members.guard';
import { Router } from '@angular/router';

describe('MembersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembersGuard, Router]
    });
  });

  // it('should ...', inject([MembersGuard, Router], (guard: MembersGuard) => {
  //   expect(guard).toBeTruthy();
  // }));
});
