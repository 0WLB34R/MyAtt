import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import { DbhandlerService } from 'src/app/services/dbhandler/dbhandler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public fbAuth: AngularFireAuth, private router: Router, private dbhandler:DbhandlerService) { }
  title = 'ang-route-block';
  signIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    this.fbAuth.signInWithPopup(googleAuthProvider).then((res:any) => {
      if(res.additionalUserInfo.isNewUser){
        this.dbhandler.createUser(res.user!.uid,{
            ClassesAsProff:[],
            ClassesAsStudent:[],
            Name:res.additionalUserInfo.profile.given_name,
            LastName:res.additionalUserInfo.profile.family_name,
            Email:res.additionalUserInfo.profile.email,
          }).then( () => this.router.navigate(['dashboard']))
     }else{
       this.router.navigate(['dashboard'])
     } 
    });
  }


  ngOnInit(): void {
  }
}