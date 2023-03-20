import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  submitted: boolean = false
  valid: boolean = false
  projectForm!: FormGroup
  project_status = ['Stable', 'Critical', 'Finished']
  forbiddenControlNames = ['Test', 'Any']

  constructor() {}

  forbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if(this.forbiddenControlNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true}
    }
    return null;
  }

  initForm() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(
        '',
        [Validators.required, CustomValidators.invalidProjectName],
        <AsyncValidatorFn>CustomValidators.asyncInvalidProjectName
      ),
      'mail': new FormControl('', [Validators.email]),
      'projectStatus': new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if(this.projectForm.valid){
      this.valid = true
      console.log(this.projectForm.value);
    }
    else
    console.log('NOT VALID');
  }

  ngOnInit() {
    this.initForm()
  }

}
