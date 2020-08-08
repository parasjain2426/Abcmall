import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { Respmessage } from '../Respmessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // private message:BehaviorSubject<Object> = new BehaviorSubject<Object>(null);
  message:Respmessage;
  auth:Respmessage;
  public Username='';
  private Password='';
  userdata = [];
  getCredentials(name:string,pswrd:string){
      this.Username = name;
      this.Password = pswrd;
      this.abcservice.checkUser(this.Username,this.Password)
            .subscribe(data=>{
              this.message=data as Respmessage;
                if(this.message.message=="Business Owner"){
                  this.abcservice.updateAuth(this.Username,"1").subscribe(data=>{
                    this.auth=data;
                    if(this.auth.message=="Updated Successfully"){
                      this.router.navigate(['/login/dashboard',this.Username]);
                    }
                    else{
                      alert("Error!..Logging In");
                    }
                  },error=>{alert("Error...Verifying Login Details")})
                }
                else if(this.message.message=="Marketing"){
                  this.abcservice.updateAuth(this.Username,"1").subscribe(data=>{
                    this.auth=data;
                    if(this.auth.message=="Updated Successfully"){
                      this.router.navigate(['/login/mdashboard',this.Username]);
                    }
                    else{
                      alert("Error!..Logging In");
                    }
                  },error=>{alert("Error!...\nAuthorization Failure")})
                }
                else{
                  alert("Invalid User\nPlease Check the Login Credentials Entered.")
                }
            });
  }
  constructor(private abcservice:GetAbcService,private router:Router) { }

  ngOnInit(): void {
  }

}
