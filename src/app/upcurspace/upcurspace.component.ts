import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAbcService } from '../get-abc.service';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { error } from '@angular/compiler/src/util';
import { Respmessage } from '../Respmessage';
import { computeCost } from '../computeCost';

@Component({
  selector: 'app-upcurspace',
  templateUrl: './upcurspace.component.html',
  styleUrls: ['./upcurspace.component.css']
})
export class UpcurspaceComponent implements OnInit {
  computecost = new computeCost();
  isdisabled = true;
  warnMessage = '';
  dateWarn = '';
  BusinessSpace = '';
  BookFrom:Date;
  BookTo:Date;
  bfrom='';
  bto='';
  Usrname = '';
  pswrd = '';
  today = new Date();
  usr:Respmessage;
  cnfrm:Respmessage;
  avail:Respmessage;
  usrdata = [];
  shop=[];
  revenue = 0;
  Sqft = '';
  respAvail=[];
  nextDate = '';
  private nextAvail:Respmessage;

  submitForm(data){
      this.Usrname = data.Username;
      this.pswrd = data.password;
      this.BookFrom = data.BookFrom;
      this.BookTo = data.BookTo;
      this.Sqft = data.Sqft;
      if(!this.isdisabled){
        this.Sqft = data.Sqft;
        if(this.Sqft.length==0){
          this.Sqft = "0";
        }
      }
      if(this.Usrname.length==0 || this.pswrd.length==0){
        this.warnMessage = 'Username or Password fields cannot be empty';
      }
      if(this.today>this.BookFrom || this.today>this.BookTo || this.BookFrom>this.BookTo || this.BookFrom==null || this.BookTo==null){
        this.dateWarn = 'Invalid Dates';
      }
      else{
      this.abcservice.checkUser(this.Usrname,this.pswrd).subscribe(response=>{
        this.usr = response;
        if(this.usr.message=="No"){
          alert("Invalid User");
        }
        else{
          this.warnMessage='';
          this.dateWarn = '';
          this.abcservice.getUser(this.Usrname).subscribe(response=>{
            this.usrdata = response;
            var bookto = new Date(this.usrdata[0][7]);
            if(this.today<bookto){
                alert("Your BookedSpace still have time left\nPlease apply for new after the end of time for current Space.");
            }
            else{
              this.abcservice.chckavail(this.BookFrom.toISOString(),this.BookTo.toISOString(),this.BusinessSpace)
                .subscribe(response=>{this.respAvail = response;
                  if(this.respAvail.length==0){
                  this.dateWarn = '';
                    this.warnMessage = '';
                    this.abcservice.getShop(this.BusinessSpace)
                    .subscribe(response=>{this.shop = response
                      this.revenue = this.computecost.totalCost(this.shop,this.BookTo,this.BookFrom,this.Sqft);
                    this.abcservice.addRevenue(this.revenue.toString(),this.BookFrom.toISOString(),this.BookTo.toISOString())
                    .subscribe(response=>{this.cnfrm = response});

                    this.abcservice.updatebook(this.Usrname,this.BusinessSpace,this.BookFrom.toISOString(),this.BookTo.toISOString())
                    .subscribe(response=>{this.cnfrm=response;
                      if(this.cnfrm.message=="Updated Successfully"){
                        alert(this.cnfrm.message);
                        this.router.navigate(['/']);
                      }
                      },error=>alert("Error Contacting Server"));                  
                  },error=>alert("Error Contacting Server"));
                  }
                  else{
                    alert("Sorry! The Space is already booked for provided Date-Time.");
                    this.abcservice.nonAvail(this.BusinessSpace)
                .subscribe(response=>{this.nextAvail=response;
                  if(this.nextAvail.message=="No"){
                      this.nextDate = this.today.toDateString();
                  }
                  else{
                  var nDate = new Date(this.nextAvail.message);
                  nDate.setDate(nDate.getDate()+1);
                  this.nextDate = nDate.toDateString();
                  }
                  }); 
                    document.getElementById('nAvail').style.display = 'block';
                }
              },error=>alert("Error Contacting Server"));
           }
            
          },error=>{alert("Error contacting the server!");});
        }
      },error=>{alert("Error contacting the server!");});
    }
  }

  chckprice(df,dt,sqft){
    if(!this.isdisabled){
      if(sqft.length==0){
        sqft = "0";
      }
    }
    if(df==null || dt==null){
      this.dateWarn = 'Invalid Dates';
    }
    else{
      this.dateWarn = '';
    this.abcservice.getShop(this.BusinessSpace)
    .subscribe(response=>{this.shop = response;
      this.revenue = this.computecost.totalCost(this.shop,dt,df,sqft);
      alert("Total Cost\n"+''+"\nPayable Rs."+this.revenue);
    },error=>{alert("Error Fetching the Price")});
  }
  }

  constructor(private abcservice:GetAbcService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(){
      this.BusinessSpace = this.route.snapshot.paramMap.get('BusinessSpace').toString();
      if(this.BusinessSpace.toString().startsWith("B")){
        this.isdisabled = false;
      }
  }

}
