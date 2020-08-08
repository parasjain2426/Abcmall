import { Component, OnInit } from '@angular/core';
import { GetAbcService } from '../get-abc.service';
import { Router } from '@angular/router';
import { Respmessage } from '../Respmessage';

@Component({
  selector: 'app-busispace',
  templateUrl: './busispace.component.html',
  styleUrls: ['./busispace.component.css']
})
export class BusispaceComponent implements OnInit {
  public shops = [];
  message = '';
  nextAvail:Respmessage;
  nextDate = '';
  businessSpace = '';
  nDate:Date;

  show(name:string){
    this.businessSpace = name;
      this.message = 'Your are ready to go..!';

    if(confirm((this.message))){
              this.router.navigate(['/SignUp',this.businessSpace]);
    }
  }

  constructor(private abcservice:GetAbcService,private router:Router) { }

  ngOnInit(){
    this.abcservice.getAllShops()
    .subscribe(data=>{this.shops=data},error=>{alert("Error getting the Spaces for you\nPlease Try After some time!")});
  }

}
