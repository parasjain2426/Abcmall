import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Respmessage } from '../Respmessage';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  Username = '';
  auth:Respmessage;
  ComType='';
  Desc = '';
  Tdate = new Date();
  confirmation:Respmessage;
  warnMessage = '';
  submitForm(formData){
    this.ComType = formData.ComType;
    this.Desc = formData.Description;
    //console.log(this.ComType);
    if(this.ComType.length==0 || this.Desc.length==0){
      this.warnMessage = 'Please Provide Complete Details...';
    }
    else{
      this.abcservice.addReq(this.Tdate.toISOString(),this.ComType,this.Desc,this.Username)
      .subscribe(data=>{
          this.confirmation = data;
          alert(this.confirmation.message);
          //console.log(this.confirmation);
      },
      error=>{alert("Error in Submitting request...\nPlease Try Again Later!")})
    }
  }
  constructor(private abcservice:GetAbcService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(){
      this.Username = this.route.snapshot.paramMap.get('Username').toString();
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
