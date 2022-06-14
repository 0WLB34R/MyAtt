import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('TimerComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

   it('should let the user sign in', () =>{
    component.signIn()
    //expect(true).toBeFalsy()
  })

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ LoginComponent ]
  //   })
  //   .compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

 

  // it('should let the user sign up'), () =>{

  // }

});
