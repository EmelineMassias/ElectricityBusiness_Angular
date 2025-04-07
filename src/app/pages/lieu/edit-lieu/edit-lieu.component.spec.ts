import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLieuComponent } from './edit-lieu.component';

describe('EditLieuComponent', () => {
  let component: EditLieuComponent;
  let fixture: ComponentFixture<EditLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLieuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
