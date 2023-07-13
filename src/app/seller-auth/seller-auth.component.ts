import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  SignUp = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [Validators.required]),
    conform_password: new FormControl('', [Validators.required])
  },[SellerAuthComponent.passwordmatch('password','conform_password')] //singnupcomponent is use to call passswordmatch bcz passwordmatch fun is static 
  )
  get f(){
    return this.SignUp.controls;
  }

  static  passwordmatch(password:string,conform_password:string):ValidatorFn
  {
    return (form:AbstractControl):ValidationErrors | null =>{
      
      const passwordvalue=form.get(password);
      const conformpasswordvalue =form.get(conform_password);
      return passwordvalue && conformpasswordvalue && passwordvalue.value !== conformpasswordvalue.value
          ? { mismatch: true }
          : null;
    }
  }
  
  get passwordMatchError() {
    return (
      this.SignUp.getError('mismatch') &&
      this.SignUp.get('conform_password')?.touched
    );
  }

  onregister(){
    var data =this.SignUp.value;
    console.log(data);
  }


}
