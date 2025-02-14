import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsDashboardComponent } from './complaints-dashboard.component';

describe('ComplaintsDashboardComponent', () => {
  let component: ComplaintsDashboardComponent;
  let fixture: ComponentFixture<ComplaintsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
