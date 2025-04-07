import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLieuComponent } from './detail-lieu.component';

describe('DetailLieuComponent', () => {
  let component: DetailLieuComponent;
  let fixture: ComponentFixture<DetailLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLieuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
