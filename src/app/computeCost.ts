export class computeCost{
    diff:number;
    datetimeDiff:number;
    revenue:number;

     totalCost(shop:Array<any>,bto:Date,bfrom:Date,Sqft){
        if(shop[0][1]=="Daywise"){
            this.diff = bto.getTime() - bfrom.getTime();
            this.datetimeDiff = this.diff/(1000*3600*24);
        }
        else if(shop[0][1]=="Hourwise"){
          this.diff = bto.getTime() - bfrom.getTime();
          this.datetimeDiff = this.diff/(1000*3600);
        }
        else if(shop[0][1]=="Weekwise"){
          this.diff = bto.getTime() - bfrom.getTime();
          this.datetimeDiff = this.diff/(1000*3600*24*7);
        }
        else{
         this.diff = bto.getTime() - bfrom.getTime();
         this.datetimeDiff = parseInt(Sqft)*this.diff/(1000*3600*24);
        }
        this.revenue = this.datetimeDiff*(parseInt(shop[0][2]));
        return this.revenue;
    }
}