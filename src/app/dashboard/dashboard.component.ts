import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Respmessage } from '../Respmessage';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { computeCost } from '../computeCost';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bookAlert = "The Space is Booked within provided Date-Time\nPlease Choose Other Date-Time or Book after Following Date-Time Above";
  auth:Respmessage;
  Username = '';
  userdata = [];
  Firstname = '';
  Lastname = '';
  BusinessSpace = '';
  Contactno = '';
  email = '';
  Address = '';
  Usertype = '';
  dfrom = '';
  dto = '';
  nextDate = '';
  dateWarn='';
  cmsg:Respmessage;
  respAvail=[];
  computecost = new computeCost();
  private Bfrom:Date;
  private Bto:Date;
  private today = new Date();
  private shop=[];
  private revenue;
  private datetimeDiff;
  constructor(private abcservice:GetAbcService,private route:ActivatedRoute,private router:Router) { }
  reqSer(){
      this.router.navigate(['/requestServices',this.Username])
  }

  signout(){
    this.abcservice.updateAuth(this.Username,"0").subscribe(data=>{
      this.auth=data;
      if(this.auth.message=="Updated Successfully"){
        this.router.navigate(['/'])
      }
    },error=>{alert("Error! Cannot Sign Out...")}
    )
  }

  exdate(){
    document.getElementById('showdate').style.display = 'block';
  }

  submitForm(userForm){
    this.Bfrom = userForm.BookFrom;
    this.Bto = userForm.BookTo;
    var prevbf = new Date(this.dfrom);
    var prevbt = new Date(this.dto);
    if(this.Bfrom<this.today 
      || this.Bfrom>this.Bto 
      || this.Bto<this.today 
      || this.Bfrom==null
      || this.Bto==null
      || prevbf>this.Bfrom
      || prevbt>this.Bto){
        this.dateWarn = "Please Select a Valid Date Range";
    }

    else{
      this.abcservice.getShop(this.BusinessSpace)
      .subscribe(response=>{this.shop = response;
       
        this.revenue = this.computecost.totalCost(this.shop,this.Bto,this.Bfrom,"1");

        if(confirm("Do You really want to continue\nTotal Cost: Rs."+this.revenue.toString())){
          this.abcservice.chckavail(this.Bfrom.toISOString(),this.Bto.toISOString(),this.BusinessSpace)
         .subscribe(response=>{this.respAvail = response;
           if(this.respAvail.length==0){
          this.abcservice.addRevenue(this.revenue.toString(),this.Bfrom.toISOString(),this.Bto.toISOString())
          .subscribe(data=>{
            // console.log(data)
          },error=>{alert("Error Updating the details...!")});

          this.abcservice.updatebook(this.Username,this.BusinessSpace,this.Bfrom.toISOString(),this.Bto.toISOString())
          .subscribe(data=>{
              this.cmsg = data;
              alert(this.cmsg.message);
          },error=>{alert("Error! extending the dates\nPlease Try Again");});
        }
        else{
          alert(this.bookAlert);
          this.abcservice.nonAvail(this.BusinessSpace)
                  .subscribe(response=>{this.cmsg=response;
                    if(this.cmsg.message=="No"){
                        this.nextDate = this.today.toDateString();
                    }
                    else{
                    var nDate = new Date(this.cmsg.message);
                    nDate.setDate(nDate.getDate()+1);
                    this.nextDate = nDate.toDateString();
                  }
                                                }); 
          document.getElementById('nAvail').style.display = 'block'; 
        }
      },error=>{alert("Error Checking the Availability!")});
        }
        else{
          document.getElementById('showdate').style.display = 'none';
        }
     
    },error=>{alert("Couldnot get the information about BusinessSpace\nTry After Some Time")}
    
    ) 
  
  }
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
        this.BusinessSpace = this.userdata[0][8];
        this.dfrom = this.userdata[0][6];
        this.dto = this.userdata[0][7];
    },
    error=>{alert("Server Error...\nPlease Reload the Page.")}
    )
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
