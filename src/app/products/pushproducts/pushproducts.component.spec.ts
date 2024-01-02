import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushproductsComponent } from './pushproducts.component';

describe('PushproductsComponent', () => {
  let component: PushproductsComponent;
  let fixture: ComponentFixture<PushproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PushproductsComponent]
    });
    fixture = TestBed.createComponent(PushproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
