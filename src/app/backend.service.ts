import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { model } from 'model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private _http: HttpClient,private router: Router) { }

  private apiurl:string = model.ip + "/api/getSingleUser";
  private categoryurl:string = model.ip + "/api/users/category";
  private restauranturl:string = model.ip + "/api/users/restaurant";
  private userurl:string = model.ip + "/api/users/user"
  private dishurl:string =  model.ip + "/api/users/dish";

  signup(user:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/signup",user)
  }

  token(Email_ID:any,refreshToken:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/token",{Email_ID,refreshToken},{responseType: 'json'})
  }

  addCategory(category:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/addCategory",category)
  }

  addRestaurant(restaurant:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/addRestaurant",restaurant)
  }

  addDish(dish:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/addDish",dish)
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login(Email_ID:any,Password:any):Observable<any>{
    
    return this._http.post(model.ip + "/api/users/login",{Email_ID,Password},{responseType: 'json'})
  }

  adminlogin(Email_ID:any,Password:any):Observable<any>{
    
    return this._http.post(model.ip + "/api/users/adminlogin",{Email_ID,Password},{responseType: 'json'})
  }

  address(user:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/address",user)
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    // console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  getSingleUser():Observable<any>{
    return this._http.get(model.ip + "/api/users/getSingleUser");
  }

  getSingleRestauarant(id:any):Observable<any>{
    return this._http.get(model.ip + "/api/users/getSingleRestaurant");
  }

  getCategories():Observable<any>{
    return this._http.get<any>(model.ip + "/api/users/getCategories");
  }

  getUsers():Observable<any>{
    return this._http.get<any>(model.ip + "/api/users/getUsers");
  }

  getFoodTable():Observable<any>{
    return this._http.get<any>(model.ip + "/api/users/getFoodTable");
  }

  getRestaurants():Observable<any>{
    return this._http.get<any>(model.ip + "/api/users/getRestaurants");
  }

  addToCart(user:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/addToCart",user)
  }

  addOrderDetails(user:any):Observable<any>{
    return this._http.post(model.ip + "/api/users/addOrderDetails",user)
  }

  getUserOrderDetails():Observable<any>{
    return this._http.get<any>(model.ip + "/api/users/getUserOrderDetails");
  }

  deleteCategory(id:any):Observable<any>{
    let ids = id;
    window.location.reload();
    return this._http.delete(`${this.categoryurl}/${ids}`);
  }

  updateCategory(user:any,id:any):Observable<any>{
    let ids = id;
    return this._http.put(`${this.categoryurl}/${ids}`,user)
  }

  deleteRestaurant(id:any):Observable<any>{
    let ids = id;
    window.location.reload();
    return this._http.delete(`${this.restauranturl}/${ids}`);
  }

  deleteUser(id:any):Observable<any>{
    let ids = id;
    window.location.reload();
    return this._http.delete(`${this.userurl}/${ids}`);
  }

  updateRestaurant(restaurant:any,id:any):Observable<any>{
    let ids = id;
    window.location.reload();
    return this._http.put(`${this.restauranturl}/${ids}`,restaurant);
  }

  updateUser(user:any,id:any):Observable<any>{
    let ids = id;
    return this._http.put(`${this.apiurl}/${ids}`,user)
  }

  deleteDish(id:any):Observable<any>{
    let ids = id;
    window.location.reload();
    return this._http.delete(`${this.dishurl}/${ids}`);
  }

  updateDish(user:any,id:any):Observable<any>{
    let ids = id;
    return this._http.put(`${this.dishurl}/${ids}`,user)
  }

}

