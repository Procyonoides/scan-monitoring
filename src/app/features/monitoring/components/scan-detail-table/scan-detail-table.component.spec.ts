import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanDetailTableComponent } from './scan-detail-table.component';

describe('ScanDetailTableComponent', () => {
  let component: ScanDetailTableComponent;
  let fixture: ComponentFixture<ScanDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanDetailTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
