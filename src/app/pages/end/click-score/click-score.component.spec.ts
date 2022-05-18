import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickScoreComponent } from './click-score.component';

describe('ClickScoreComponent', () => {
  let component: ClickScoreComponent;
  let fixture: ComponentFixture<ClickScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
