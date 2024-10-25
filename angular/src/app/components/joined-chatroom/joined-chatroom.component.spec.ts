import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedChatroomComponent } from './joined-chatroom.component';

describe('JoinedChatroomComponent', () => {
  let component: JoinedChatroomComponent;
  let fixture: ComponentFixture<JoinedChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinedChatroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinedChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
