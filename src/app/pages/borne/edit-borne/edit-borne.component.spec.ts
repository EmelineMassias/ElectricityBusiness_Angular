import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBorneComponent } from './edit-borne.component';

describe('EditBorneComponent', () => {
  let component: EditBorneComponent;
  let fixture: ComponentFixture<EditBorneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBorneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBorneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
