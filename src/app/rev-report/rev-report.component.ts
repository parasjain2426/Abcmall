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
      for(this.i=0;this.i<this.revres.length;this.i++){
            var df = new Date(this.revres[this.i].bfrom);
            var dt = new Date(this.revres[this.i].bto);
            if((df>=this.dateFrom && dt<=this.dateTo)){
                  this.revint.bfrom = this.revres[this.i].bfrom;
                  this.revint.bto = this.revres[this.i].bto;
                  this.revint.revenue = this.revres[this.i].revenue;
                  this.revdisp.push(this.revint);
                  this.tsum+=parseInt(this.revres[this.i].revenue);
            }
            this.revint = {} as revenue;
      }
        // console.log(this.revdisp);
    },
    error=>{alert("Error getting the Revenue Report\nPlease Try Again Later..!")})
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
