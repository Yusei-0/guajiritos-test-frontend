import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTitleComponent } from './app-title.component';

describe('AppTitleComponent', () => {
  let component: AppTitleComponent;
  let fixture: ComponentFixture<AppTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
