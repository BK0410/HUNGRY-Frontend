import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public count: any = 0;
  public categories: any;
  public searchText: any = ''
  public searchWord:any = ""
  public restaurants: any;
  public display = false;
  public dishes:any;
  public users:any;
  public dishDisplay = false

  public getParamid: any;
  public restaurantName: any = '';
  public cuisineName:any = '';
  public dishName:any = '';
  public price:any = '';
  constructor(private userSer: BackendService, private router: Router, private router2: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("================="+this.searchText)

    var token:any = localStorage.getItem('token');
    var base64Payload = token.split('.')[1];
    console.log(base64Payload)
    var payload1:any = Buffer.from(base64Payload, 'base64');
    console.log(JSON.parse(payload1))
    if(JSON.parse(payload1).role === "USER"){
      this.router.navigate(['not-found'])
    }

    this.userSer.getFoodTable().subscribe((res) => {
      console.log(res, "res==>");
      this.dishes = res
    })

    this.userSer.getUsers().subscribe((res) => {
      console.log(res, "res==>");
      this.users = res
    })

    this.userSer.getCategories().subscribe((res) => {
      console.log(res, "res==>");
      this.categories = res
    })

    this.userSer.getRestaurants().subscribe((res) => {
      console.log(res, "res==>");
      this.restaurants = res
    })

    this.userSer.getSingleUser().subscribe((res) => {
      this.count = Object.keys(res.cart).length
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['adminhome']);
  }

  selectedOption: string = ''
  printedOption: string = ''

  print() {
    this.printedOption = this.selectedOption;
  }

  addToCart(dish: string, price: any, restaurant: any) {
    this.count = this.count + 1;
    this.userSer.getSingleUser().subscribe((res) => {
      var cart = new Map<string, any>();
      console.log(cart)
      console.log(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      console.log(cart)


      if (cart.has(dish)) {
        var value: any = cart.get(dish)[0]
        cart.set(dish, [value + 1, price * (value + 1), restaurant])
      }
      else {
        cart.set(dish, [1, price, restaurant])
        console.log("new obj")
      }
      console.log(cart)
      let jsonObject: any = {};
      cart.forEach((value: any, key: any) => {
        jsonObject[key] = value
      });
      this.userSer.addToCart({ cart: jsonObject }).subscribe((res) => {
        var count = Object.keys(jsonObject).length;
        alert("Dish added to Cart successfully")
      })
    })

  }

  deleteCategory(id: any) {
    this.userSer.deleteCategory(id).subscribe((res) => {
    })
  }

  deleteRestaurant(id: any) {
    this.userSer.deleteRestaurant(id).subscribe((res) => {
    })
  }

  deleteUser(id: any) {
    this.userSer.deleteUser(id).subscribe((res) => {
    })
  }

  deleteDish(id:any){
    this.userSer.deleteDish(id).subscribe((res) => {
    })
  }

  addCategoryForm = new FormGroup({
    'CategoryName': new FormControl('', Validators.required)
  });

  addRestaurantForm = new FormGroup({
    'RestaurantName': new FormControl('', Validators.required),
    'CuisineName': new FormControl('', Validators.required)
  });

  
  updateDishForm = new FormGroup({
    'DishName': new FormControl('',Validators.required),
    'CuisineName': new FormControl('',Validators.required),
    'RestaurantName': new FormControl('',Validators.required),
    'Price':new FormControl('',Validators.required)
  });

  addDishForm = new FormGroup({
    'DishName': new FormControl(),
    'CuisineName': new FormControl(''),
    'RestaurantName': new FormControl(''),
    'Price':new FormControl('')
  });



updatefn(){
  console.log(this.restaurantName)
  console.log(this.dishName)
  console.log(this.cuisineName)
  console.log(this.price)
}
  addCategory() {
    if (this.addCategoryForm.valid) {
      this.userSer.addCategory(this.addCategoryForm.value).subscribe((res) => {
        alert("Category Added Successfully")
        this.addCategoryForm.reset();
        window.location.reload();
      })
    }
    else {
      alert("Please Enter Category Name");
    }
  }

  addRestaurant() {
    if (this.addRestaurantForm.valid) {
      this.userSer.addRestaurant(this.addRestaurantForm.value).subscribe((res) => {
        alert("Restaurant Added Successfully")
        this.addRestaurantForm.reset();
        window.location.reload();
      })
    }
    else {
      alert("Invalid Input");
    }
  }

  addDish() {
    if (this.addDishForm.valid) {
      this.userSer.addDish(this.addDishForm.value).subscribe((res) => {
        alert("Dish Added Successfully")
        this.addDishForm.reset();
        window.location.reload();
      })
    }
    else {
      alert("Invalid Input");
    }
  }

  // updatefunction(id:any) {
  //   this.display = true;
  //   this.getParamid = 
  // }


  updateRestaurant(){
    console.log(this.getParamid)
    if(this.addRestaurantForm.valid){
      this.userSer.updateRestaurant(this.addRestaurantForm.value,this.getParamid).subscribe((res)=>{
        alert("Restaurant Updated successfully")
        window.location.reload();
      })
    }
    else{
      alert("All fields are required");
    }
  }

  async updateDish(){
    let a = await this.updatefn
    if(this.updateDishForm.valid){
      this.userSer.updateDish(this.updateDishForm.value,this.getParamid).subscribe((res)=>{
        alert("Dish Updated successfully")
        window.location.reload();
      })
    }
    else{
      alert("All fields are required");
    }
  }


}
