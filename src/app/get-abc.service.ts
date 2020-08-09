import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respmessage } from './Respmessage';
import { ShopData } from './ShopData';
import { complaints } from './complaints';
import { revenue } from './revenue';

@Injectable({
  providedIn: 'root'
})
export class GetAbcService {
  constructor(private http:HttpClient) { }
  private baseUrl="https://abcmallserver.herokuapp.com/abcmall/";
  private username='parasabcmall';
  private password='adminparas';
  private httpHeader = new HttpHeaders({ 'Authorization': 'Basic ' + window.btoa(this.username + ':' + this.password) });
  
  takeHeader(){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization',  'Basic ' +window.btoa(this.username+':'+this.password))
    }
    return httpOptions;
  }

  saveUser(data,BusinessSpace,Bfrom,Bto):Observable<Respmessage>{
      const params = new HttpParams()
      .set('Username',data.UserName)
      .set('password',data.Password)
      .set('FirstName',data.FirstName)
      .set('LastName',data.LastName)
      .set('UserType',"Business Owner")
      .set('ContactNo',data.ContactNo)
      .set('email',data.Email)
      .set('Address',data.Address)
      .set('pinCode',data.PinCode)
      .set('BookFrom',Bfrom)
      .set('BookTo',Bto)
      .set('BusinessSpace',BusinessSpace);
      return this.http.post<Respmessage>(this.baseUrl+"saveUser",{},{
        headers: new HttpHeaders({'Authorization':'Basic ' + window.btoa(this.username + ':' + this.password),
        'Content-Type' : 'application/json'}),params:params})
  }

  checkUser(User:string,Password:string):Observable<Respmessage>{
    const params = new HttpParams()
    .set('Username',User)
    .set('password',Password);
    const  httpOptions = this.takeHeader()
    return this.http.get<Respmessage>(this.baseUrl+"login",{'params':params,'headers':this.httpHeader})
  }

  getUser(User:string):Observable<any>{
    const params = new HttpParams()
    .set('Username',User);
    return this.http.get<any>(this.baseUrl+"getUser",{'params':params,'headers':this.httpHeader})
  }

  getAllUsers(UserType):Observable<Object[]>{
    const params = new HttpParams()
    .set('UserType',UserType)
    return this.http.get<Object[]>(this.baseUrl+"getAllUsers",{'params':params,'headers':this.httpHeader})
  }

  getAllShops():Observable<ShopData[]>{
    const  httpOptions = this.takeHeader()
    return this.http.get<ShopData[]>(this.baseUrl+"getAllShops",httpOptions)
  }

  nonAvail(BusinessSpace:string):Observable<Respmessage>{
    const params = new HttpParams()
    .set('BusinessSpace',BusinessSpace);
    return this.http.get<Respmessage>(this.baseUrl+"nextAvail",{'params':params,'headers':this.httpHeader})
  }

  getShop(BusinessSpace:string):Observable<ShopData[]>{
      const params = new HttpParams()
      .set('BusinessSpaceType',BusinessSpace);
      return this.http.get<ShopData[]>(this.baseUrl+"getShop",{'params':params,'headers':this.httpHeader})
  }

  addRevenue(revenue:string,Bfrom:string,Bto:string):Observable<Respmessage>{
      const params = new HttpParams()
      .set('Bfrom',Bfrom)
      .set('Bto',Bto)
      .set('revenue',revenue);
      return this.http.post<Respmessage>(this.baseUrl+"addRevenue",{},{
        headers: new HttpHeaders({'Authorization':'Basic ' + window.btoa(this.username + ':' + this.password),
        'Content-Type' : 'application/json'}),params:params})
  }

  getRevenue(Bfrom:string,Bto:string):Observable<revenue[]>{
    const params = new HttpParams()
    .set('Bfrom',Bfrom)
    .set('Bto',Bto);
    return this.http.get<revenue[]>(this.baseUrl+"getRevenue",{'params':params,'headers':this.httpHeader})
  }

  totRevenue(Bfrom:string,Bto:string):Observable<any>{
    const params = new HttpParams()
    .set('Bfrom',Bfrom)
    .set('Bto',Bto);
    return this.http.get<any>(this.baseUrl+"totRevenue",{'params':params,'headers':this.httpHeader})
  }

  addReq(Comdate:string,ComType:string,Desc:string,Username:string):Observable<Respmessage>{
    const params = new HttpParams()
    .set('Comdate',Comdate)
    .set('ComType',ComType)
    .set('probDesc',Desc)
    .set('probUsername',Username);
    return this.http.post<Respmessage>(this.baseUrl+"addReq",{},{
      headers: new HttpHeaders({'Authorization':'Basic ' + window.btoa(this.username + ':' + this.password),
      'Content-Type' : 'application/json'}),params:params
    })
  }

  getReq():Observable<complaints[]>{
    const  httpOptions = this.takeHeader()
    return this.http.get<complaints[]>(this.baseUrl+"getReq",httpOptions)
  }

  addAuth(Username:string):Observable<Respmessage>{ 
    const params = new HttpParams()
    .set('authName',Username);
    return this.http.post<Respmessage>(this.baseUrl+"saveAuth",{},{
      headers: new HttpHeaders({'Authorization':'Basic ' + window.btoa(this.username + ':' + this.password),
      'Content-Type' : 'application/json'}),params:params})
  }

  updateAuth(Username:string,auth:string):Observable<Respmessage>{ //mark for change
      const params = new HttpParams()
      .set('authName',Username)
      .set('authToken',auth);
      return this.http.get<Respmessage>(this.baseUrl+"updateAuth",{'params':params,'headers':this.httpHeader})
  }

  checkAuth(Username:string):Observable<Respmessage>{ //mark for change
    const params = new HttpParams()
    .set('authName',Username);
    return this.http.get<Respmessage>(this.baseUrl+"getAuth",{'params':params,'headers':this.httpHeader})
  }

  updatepswrd(Username:string,newpassword:string):Observable<Respmessage>{
    const params = new HttpParams()
    .set('Username',Username)
    .set('newPassword',newpassword);
    return this.http.put<Respmessage>(this.baseUrl+"updatepass",{},{
      headers: new HttpHeaders({'Authorization':'Basic ' + window.btoa(this.username + ':' + this.password),
      'Content-Type' : 'application/json'}),params:params})
  }

  updatebook(Username:string,BusinessSpace:string,BookFrom:string,BookTo:string):Observable<Respmessage>{
    const params=new HttpParams()
    .set('Username',Username)
    .set('BusinessSpace',BusinessSpace)
    .set('BookFrom',BookFrom)
    .set('BookTo',BookTo);
    return this.http.put<Respmessage>(this.baseUrl+"updatebook",{},{
      headers: new HttpHeaders({'Authorization':'Basic ' + window.btoa(this.username + ':' + this.password),
      'Content-Type' : 'application/json'}),params:params})
  }

  chckavail(df,dt,BusinessSpace):Observable<Object[]>{
    const params = new HttpParams()
    .set('DF',df)
    .set('DT',dt)
    .set('BusinessSpace',BusinessSpace);
    return this.http.get<Object[]>(this.baseUrl+"chckavail",{'params':params,'headers':this.httpHeader})
  }

  updatespace(BusinessSpaceType:string,Available:string):Observable<Respmessage>{
    const params = new HttpParams()
    .set('Available',Available)
    .set('BusinessSpaceType',BusinessSpaceType);
    return this.http.put<Respmessage>(this.baseUrl+"pdatespace",{},{
      headers: new HttpHeaders({'Authorization':'Basic ' + window.btoa(this.username + ':' + this.password),
      'Content-Type' : 'application/json'}),params:params})
  }
}
