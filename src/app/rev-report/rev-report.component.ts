import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { revenue } from '../revenue';
import { ActivatedRoute, Router } from '@angular/router';
import { Respmessage } from '../Respmessage';

@Component({
  selector: 'app-rev-report',
  templateUrl: './rev-report.component.html',
  styleUrls: ['./rev-report.component.css']
})
export class RevReportComponent implements OnInit {
  Username = '';
  auth:Respmessage;
  dateFrom:Date;
  dateTo:Date;
  revres = [];
  revdisp = [];
  tsum:number = 0;
  revint:revenue={} as revenue;
  i:number;

  inpDates(data){
    document.getElementById('showrevenue').style.display = 'block';
    this.dateFrom = new Date(data.DateFrom);
    this.dateTo = new Date(data.DateTo);
    this.abcservice.getRevenue()
    .subscribe(response=>{
      this.revres = response;
       this.abcservice.getRevenue(this.dateFrom.toISOString(),this.dateTo.toISOString())
        .subscribe(response=>{
                this.revres = response;
    },
    error=>{alert("Error getting the Revenue Report\nPlease Try Again Later..!")});
    this.abcservice.totRevenue(this.dateFrom.toISOString(),this.dateTo.toISOString()).subscribe(response=>this.tsum=response);
    }

  constructor(private abcservice:GetAbcService,private router:Router,private route:ActivatedRoute) { }

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
