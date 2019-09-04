import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPage2Component } from './demo-page2.component';

describe('DemoPage2Component', () => {
  let component: DemoPage2Component;
  let fixture: ComponentFixture<DemoPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
