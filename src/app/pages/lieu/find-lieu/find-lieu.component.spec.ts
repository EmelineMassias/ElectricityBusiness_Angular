import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLieuComponent } from './find-lieu.component';

describe('FindLieuComponent', () => {
  let component: FindLieuComponent;
  let fixture: ComponentFixture<FindLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindLieuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
