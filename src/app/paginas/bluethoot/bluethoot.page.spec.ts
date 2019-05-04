import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluethootPage } from './bluethoot.page';

describe('BluethootPage', () => {
  let component: BluethootPage;
  let fixture: ComponentFixture<BluethootPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluethootPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluethootPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
