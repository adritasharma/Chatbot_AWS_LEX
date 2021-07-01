import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPickerComponent } from './hero-picker.component';

describe('HeroPickerComponent', () => {
  let component: HeroPickerComponent;
  let fixture: ComponentFixture<HeroPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
