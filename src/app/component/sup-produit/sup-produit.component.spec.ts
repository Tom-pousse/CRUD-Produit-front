import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupProduitComponent } from './sup-produit.component';

describe('SupProduitComponent', () => {
  let component: SupProduitComponent;
  let fixture: ComponentFixture<SupProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupProduitComponent]
    });
    fixture = TestBed.createComponent(SupProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
