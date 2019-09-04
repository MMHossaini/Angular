import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPage3Component } from './demo-page3.component';

describe('DemoPage3Component', () => {
  let component: DemoPage3Component;
  let fixture: ComponentFixture<DemoPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
