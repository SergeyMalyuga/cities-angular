import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSortingComponent } from './form-sorting.component';

describe('FormSortingComponent', () => {
  let component: FormSortingComponent;
  let fixture: ComponentFixture<FormSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSortingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
