import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { Respmessage } from '../Respmessage';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { error } from '@angular/compiler/src/util';
import {computeCost} from '../computeCost';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {
  private compute:computeCost = new computeCost();
  private nextAvail:Respmessage;
  private Bfrom:Date;
  private Bto:Date;
  private today = new Date();
  private shop=[];
  private respAvail = [];
  private message:Respmessage;
  private auth:Respmessage;
  private usr:Respmessage;
  isdisabled = true;
  BusinessSpace="";
  nextDate = '';
  bookAlert = "The Space is Booked within provided Date-Time\nPlease Choose Other Date-Time or Book after Following Date-Time Above";
  dateWarn = '';
  revenue=0;
  warnMessage = '';
  Sqft='';

  chckAvail(df,dt){
    this.Bfrom = df;
    this.Bto = dt;
    if(this.Bfrom<this.today || this.Bfrom>this.Bto || this.Bto<this.today || this.Bfrom==null || this.Bto==null){
      this.dateWarn = "Please Select a Valid Date Range";
  }
  else{
    this.dateWarn = "";
    this.abcservice.chckavail(this.Bfrom.toISOString(),this.Bto.toISOString(),this.BusinessSpace)
    .subscribe(data=>{this.respAvail = data;
      if(this.respAvail.length==0){
        alert("The Space is All Yours\nYou are Good to Go....");
        document.getElementById('nAvail').style.display = 'none'; 
      }
      else{
        alert(this.bookAlert);
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
    });
 }
  }
  
  submitForm(data,df,dt){
    this.Bfrom = df;
    this.Bto = dt;
    if(!this.isdisabled){
    this.Sqft = data.Sqft;
    if(this.Sqft.length==0){
      this.Sqft = "0";
    }
  }
    if(this.Bfrom<this.today || this.Bfrom>this.Bto || this.Bto<this.today || this.Bfrom==null || this.Bto==null){
        this.dateWarn = "Please Select a Valid Date Range";
    }
  
    if(data.FirstName.toString().length==0 ||
      data.LastName.toString().length==0 ||
      data.UserName.toString().length==0 ||
      data.Password.toString().length==0 ||
      data.ContactNo.toString().length==0 ||
      data.Email.toString().length==0 ||
      data.Address.toString().length==0 ||
      data.PinCode.toString().length==0){
          this.warnMessage = "Please Fill all Valid Details!"
      }

    else{
      this.abcservice.checkUser(data.UserName.toString(),data.Password.toString()).subscribe(response=>{
        this.usr = response;
        if(this.usr.message=="No"){
         //yesdata.UserName
.subscribe(response=>{});       
          this.abcservice.chckavail(this.Bfrom.toISOString(),this.Bto.toISOString(),this.BusinessSpace)
         .subscnse=>{this.respAvail = response;
           if(this.respAvail.length==0){
             this.dateWarn = '';
             this.warnMessage = '';
         
             this.abcservice.getShop(this.BusinessSpace)
             .subscribe(response=>{this.shop = response;
              this.revenue = this.compute.totalCost(this.shop,this.Bto,this.Bfrom,this.Sqft);
                     this.abcservice.addRevenue(this.revenue.toString(),this.Bfrom.toISOString(),this.Bto.toISOString().toString())
                       .subscribe(data=>{
                         this.message = data;})
                           },error=>{alert("Error Contacting to the Server\nPlease try again...!")});
             
                     this.abcservice.addAuth(data.UserName).subscribe(response=>{this.auth=response},error=>{alert("Error Generating AuthToken")});
             
                     this.abcservice.saveUser(data,this.BusinessSpace,this.Bfrom.toISOString(),this.Bto.toISOString())
                         .subscribe(response=>{this.message=response;
                                 alert(this.message.message);
                                 if(this.message.message=="Saved Successfully"){
                                   this.router.navigate(['/']);
                                 }
                                     },error=>{alert("Error! Saving the User-Details.")});            
           }
           else{
             alert(this.bookAlert);                                    
           } 
         });
        }
        else{
          alert("Username or Password already exists!");
        }
      }); 
  }
    }

  alreadysigned(){
    this.router.navigate(['/upcurspace',this.BusinessSpace]);
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
    this.revenue = this.compute.totalCost(this.shop,dt,df,sqft);
      alert("Total Cost\n"+''+"\nPayable Rs."+this.revenue);
    },error=>{alert("Error Fetching the Price")});
  }
  }

  constructor(private abcservice:GetAbcService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(){
    this.BusinessSpace = this.route.snapshot.paramMap.get('businessSpace').toString();
    if(this.BusinessSpace.toString().startsWith("B")){
      this.isdisabled = false;
    }
  }

}
