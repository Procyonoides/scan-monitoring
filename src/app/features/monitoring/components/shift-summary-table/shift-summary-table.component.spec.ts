import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSummaryTableComponent } from './shift-summary-table.component';

describe('ShiftSummaryTableComponent', () => {
  let component: ShiftSummaryTableComponent;
  let fixture: ComponentFixture<ShiftSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftSummaryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
