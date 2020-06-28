import { TestBed, async, inject } from '@angular/core/testing';

import { MembersGuard } from './members.guard';

describe('MembersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembersGuard]
    });
  });

  it('should ...', inject([MembersGuard], (guard: MembersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
