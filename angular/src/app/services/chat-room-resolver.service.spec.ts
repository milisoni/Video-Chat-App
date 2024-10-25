import { TestBed } from '@angular/core/testing';

import { ChatRoomResolverService } from './chat-room-resolver.service';

describe('ChatRoomResolverService', () => {
  let service: ChatRoomResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatRoomResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
