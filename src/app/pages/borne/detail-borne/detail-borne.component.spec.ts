import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBorneComponent } from './detail-borne.component';

describe('DetailBorneComponent', () => {
  let component: DetailBorneComponent;
  let fixture: ComponentFixture<DetailBorneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBorneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBorneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
