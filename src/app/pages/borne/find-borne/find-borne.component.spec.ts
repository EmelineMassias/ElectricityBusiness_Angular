import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBorneComponent } from './find-borne.component';

describe('FindBorneComponent', () => {
  let component: FindBorneComponent;
  let fixture: ComponentFixture<FindBorneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindBorneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindBorneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
