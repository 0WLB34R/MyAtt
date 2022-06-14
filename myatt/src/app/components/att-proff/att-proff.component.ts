import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbhandlerService } from 'src/app/services/dbhandler/dbhandler.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-att-proff',
  templateUrl: './att-proff.component.html',
  styleUrls: ['./att-proff.component.scss']
})
export class AttProffComponent implements OnInit {
  
  classCode!:string
  classId!:string
  att!:any;
  dates:string[]=[];
  fullAtt:any[]=[];
  studentList:any

  constructor(private dbhandler: DbhandlerService, private fbAuth:AngularFireAuth) { }

  ngOnInit(): void {
    this.classId = this.dbhandler.infoHolder.pop();

    this.dbhandler.getAClass(this.classId).subscribe((res:any) =>{
      this.att=res.data()
      this.studentList=res.data().Students
      console.log("Student List: ",this.studentList)
      this.constructArray()
    })

  }

  makeid():string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  closeAtt(){
    let date = this.getDate()

    console.log(date)
    this.dbhandler.updateAttendance(this.classId,{
      [`Attendances.${date}.Open`]:false,
    }).then(() => console.log("Success"))
  }

  openAtt(){
    this.classCode = this.makeid();
    

    let date = this.getDate()

    console.log(date)
    this.dbhandler.updateAttendance(this.classId,{
      [`Attendances.${date}.Code`]:this.classCode,
      [`Attendances.${date}.Open`]:true,
      [`Attendances.${date}.Students`]:[]
    }).then(() => console.log("Success"))
  }

  getDate():string{
    let temp = new Date()
    var m = temp.getUTCMonth()+1
    var d = temp.getUTCDate()
    var y = temp.getUTCFullYear()
    return m+"-"+d+"-"+y
  }

  constructArray(){
    console.log(this.att.Attendances)
    let day = 0
    let student = 0
    let temp = []
     for(let i in this.att.Attendances){
      for(let j in this.studentList){
        console.log(i)
        console.log(this.studentList[j])
        temp.push(this.att.Attendances[i].Students.indexOf(j) > -1)
        student+=1
      }
      this.fullAtt.push(temp)
      day+=1

      //  console.log(i)
      //  this.dates.push(i)
      //  console.log(this.att.Attendances[i])
      //  this.fullAtt.push(this.att.Attendances[i].Students)
     }
   }
}
