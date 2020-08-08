import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { Respmessage } from '../Respmessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fgtpswrd',
  templateUrl: './fgtpswrd.component.html',
  styleUrls: ['./fgtpswrd.component.css']
})
export class FgtpswrdComponent implements OnInit {
  Username:string;
  Newpassword:string;
  Retypepassword:string;
  message:Respmessage;
  usr = [];
  updateCredentials(UserId,NewPassword,RetypePassword){
    this.Username = UserId;
    this.Newpassword = NewPassword;
    this.Retypepassword = RetypePassword;
    //console.log(this.Username);
    if(this.Username.length==0){
      alert("Please Provide a valid Username");
    }
    else if(this.Newpassword.length==0 || this.Retypepassword.length==0){
      alert("Please Provide a valid password to continue...");
    }
    else if(this.Newpassword!=this.Retypepassword){
      alert("Both passwords didn't matched!");
    }
    else{
      this.abcservice.getUser(this.Username)
      .subscribe(response=>{
       this.usr = response;
       if(this.usr.length!=0){
        this.abcservice.updatepswrd(this.Username,this.Newpassword)
      .subscribe(data=>{
          this.message = data;
          alert(this.message.message);
          this.router.navigate(['/login']);
      },error=>{alert("Error! Updating Password\nPlease try again later..!");})
       }
       else{
         alert("Invalid Username!");
       }
      
    })
    }
  }
  constructor(private abcservice:GetAbcService,private router:Router) { }

  ngOnInit(): void {
  }

}
