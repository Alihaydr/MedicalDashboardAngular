import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullproductsComponent } from './pullproducts.component';

describe('PullproductsComponent', () => {
  let component: PullproductsComponent;
  let fixture: ComponentFixture<PullproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PullproductsComponent]
    });
    fixture = TestBed.createComponent(PullproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
