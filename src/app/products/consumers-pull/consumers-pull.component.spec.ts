import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersPullComponent } from './consumers-pull.component';

describe('ConsumersPullComponent', () => {
  let component: ConsumersPullComponent;
  let fixture: ComponentFixture<ConsumersPullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumersPullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumersPullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
