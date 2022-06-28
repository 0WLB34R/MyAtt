import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbhandlerService } from 'src/app/services/dbhandler/dbhandler.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { arrayRemove } from 'firebase/firestore';

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
  studentsNames:string[]=[];
  fullAtt:any[]=[];
  studentList:any;
  uid!:string
  className!:string
  loading:boolean=true;
  attOpen:boolean=true;

  constructor(private dbhandler: DbhandlerService, private fbAuth:AngularFireAuth, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((event: any) => {
      this.classId = event.classid;})

    this.fbAuth.onAuthStateChanged((user: any) => {
      this.uid = user.uid;
    })
    //this.index = this.dbhandler.infoHolder.pop();
    //this.classId = this.dbhandler.infoHolder.pop();
    this.dbhandler.fire.asObservable().subscribe( res => console.log(res))

    this.dbhandler.getAClass(this.classId).subscribe((res:any) =>{
      this.att=res.data()
      this.studentList=res.data().Students
      this.className = res.data().ClassName
      try{
      this.classCode = res.data().Attendances[this.getDate()].Code
      this.attOpen = res.data().Attendances[this.getDate()].Open
      }catch (e){
        console.log("code not set yet")
      }
      console.log(this.classCode)
      
      for(let i in this.att.Attendances){
        this.dates.push(i);
      }

      this.dates = this.dates.sort((a, b) => {
        return <any>new Date(a) - <any>new Date(b);
      });

      for(let i in this.studentList){
        this.studentsNames.push(this.studentList[i])
      }

      this.studentsNames = this.studentsNames.sort();

      console.log("Student List: ",this.studentList)
      this.constructArray()
      this.loading = false
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
    }).then(() => this.attOpen=false)
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
    for(let i in this.studentList){
      let temp2 = []
      for(let j of this.dates){
        temp2.push(this.att.Attendances[j].Students.indexOf(i) > -1);
      }
      this.fullAtt.push(temp2);
    }
  }

  deleteClass(){
    if(confirm("Are you sure you want to delete this class?")){
      this.dbhandler.killClass(this.classId).then(()=>{
        this.dbhandler.updateUser(this.uid,{
          "ClassesAsProff": arrayRemove({ClassId:this.classId,ClassName:this.className})
        }
        ).then(()=> this.router.navigate(['/dashboard/classes/list']))
      })
    
    }
  }
}
