import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconsumerComponent } from './addconsumer.component';

describe('AddconsumerComponent', () => {
  let component: AddconsumerComponent;
  let fixture: ComponentFixture<AddconsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddconsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddconsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
