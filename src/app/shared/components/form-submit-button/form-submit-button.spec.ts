import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitButton } from './form-submit-button';

describe('FormSubmitButton', () => {
  let component: FormSubmitButton;
  let fixture: ComponentFixture<FormSubmitButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubmitButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmitButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
