import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { Respmessage } from '../Respmessage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busreport',
  templateUrl: './busreport.component.html',
  styleUrls: ['./busreport.component.css']
})
export class BusreportComponent implements OnInit {
  Username = '';
  auth:Respmessage;
  allShops = [];
  msg:Respmessage;
  avail:Respmessage;

  constructor(private abcservice:GetAbcService,private router:Router,private route:ActivatedRoute) { }

  refresh(bustype){
    this.abcservice.nonAvail(bustype)
    .subscribe(response=>{this.msg=response;
        if(this.msg.message!="No"){
          //console.log(this.msg.message);
          var nDate = new Date(this.msg.message);
          nDate.setDate(nDate.getDate()+1);
          this.abcservice.updatespace(bustype,nDate.toDateString())
              .subscribe(response=>{this.avail=response;
                if(this.avail.message=="Updated"){
                  location.reload();  
                }
              });}
            });   
  }

  ngOnInit(){
    this.Username = this.route.snapshot.paramMap.get('Username').toString();
    this.abcservice.checkAuth(this.Username).subscribe(data=>
      {
        this.auth=data
        if(this.auth.message=="0"){
          alert("Please Login First");
          this.router.navigate(['/']);
        }
        else{
          this.abcservice.getAllShops()
            .subscribe(data=>{
            this.allShops=data;
          },
          error=>{alert("Error! Getting the Report\nPlease try again later...")});
        }  
    });
  }

}
