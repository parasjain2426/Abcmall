import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { ActivatedRoute } from '@angular/router';
import { Respmessage } from '../Respmessage';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-mdashboard',
  templateUrl: './mdashboard.component.html',
  styleUrls: ['./mdashboard.component.css']
})
export class MdashboardComponent implements OnInit {
  auth:Respmessage;
  Username = '';
  userdata = [];
  Firstname = '';
  Lastname = '';
  Contactno = '';
  email = '';
  Address = '';
  Usertype = '';
  constructor(private abcservice:GetAbcService,private route:ActivatedRoute,private router:Router) { }

  signout(){
    this.abcservice.updateAuth(this.Username,"0").subscribe(data=>{
      this.auth=data;
      // console.log(this.auth.message);
      if(this.auth.message=="Updated Successfully"){
        this.router.navigate(['/'])
      }
    },error=>{alert("Error! Cannot Sign Out...")}
    )
  }

  ngOnInit(){
    this.Username = this.route.snapshot.paramMap.get('Username').toString();
    this.abcservice.getUser(this.Username)
    .subscribe(data=>{
        this.userdata = data;
        this.Firstname = this.userdata[0][0];
        this.Lastname = this.userdata[0][1];
        this.Usertype = this.userdata[0][2];
        this.Contactno = this.userdata[0][3];
        this.email = this.userdata[0][4];
        this.Address = this.userdata[0][5];
    },
    error=>{alert("Server Error...\nPlease Reload the Page.")}
    );
    this.abcservice.checkAuth(this.Username).subscribe(data=>
      {
        this.auth=data
        if(this.auth.message=="0"){
          alert("Please Login First");
          this.router.navigate(['/']);
        }  
    });
  }


}
