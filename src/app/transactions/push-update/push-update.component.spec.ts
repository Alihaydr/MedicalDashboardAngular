import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushUpdateComponent } from './push-update.component';

describe('PushUpdateComponent', () => {
  let component: PushUpdateComponent;
  let fixture: ComponentFixture<PushUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
