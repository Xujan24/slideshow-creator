import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideSectionsComponent } from './slide-sections.component';

describe('SlideSectionsComponent', () => {
  let component: SlideSectionsComponent;
  let fixture: ComponentFixture<SlideSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
