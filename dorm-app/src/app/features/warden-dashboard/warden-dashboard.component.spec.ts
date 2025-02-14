import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardenDashboardComponent } from './warden-dashboard.component';

describe('WardenDashboardComponent', () => {
  let component: WardenDashboardComponent;
  let fixture: ComponentFixture<WardenDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WardenDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WardenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
