import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPage1Component } from './demo-page1.component';

describe('DemoPage1Component', () => {
  let component: DemoPage1Component;
  let fixture: ComponentFixture<DemoPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
