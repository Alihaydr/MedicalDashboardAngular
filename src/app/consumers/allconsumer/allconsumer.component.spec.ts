import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllconsumerComponent } from './allconsumer.component';

describe('AllconsumerComponent', () => {
  let component: AllconsumerComponent;
  let fixture: ComponentFixture<AllconsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllconsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllconsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
