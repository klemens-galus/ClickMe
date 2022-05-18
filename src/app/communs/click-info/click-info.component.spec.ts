import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickInfoComponent } from './click-info.component';

describe('ClickInfoComponent', () => {
  let component: ClickInfoComponent;
  let fixture: ComponentFixture<ClickInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
