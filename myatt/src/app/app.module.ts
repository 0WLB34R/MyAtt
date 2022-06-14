import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AttProffComponent } from './components/att-proff/att-proff.component';
import { AttStudentComponent } from './components/att-student/att-student.component';





@NgModule({
  declarations: [
    AppComponent,
    AttProffComponent,
    AttStudentComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
