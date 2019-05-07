import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShopPage } from './modal-shop.page';

describe('ModalShopPage', () => {
  let component: ModalShopPage;
  let fixture: ComponentFixture<ModalShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
