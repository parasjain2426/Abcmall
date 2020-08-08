import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { Respmessage } from '../Respmessage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-com-report',
  templateUrl: './com-report.component.html',
  styleUrls: ['./com-report.component.css']
})
export class ComReportComponent implements OnInit {
  reports = []
  Username = '';
  auth:Respmessage;

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
        else{
          this.abcservice.getReq()
          .subscribe(data=>{this.reports=data;
          });
          }
      });
  }

}
