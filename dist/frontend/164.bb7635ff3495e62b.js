"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[164],{2164:(v,h,d)=>{d.r(h),d.d(h,{IndianModule:()=>k});var p=d(2382),_=d(9808),f=d(3189),u=d(8698),n=d(1223),C=d(5432);function x(t,g){if(1&t){const e=n.EpF();n.TgZ(0,"div",32)(1,"ul")(2,"li",5)(3,"a",6),n._uU(4,"My Orders"),n.qZA()(),n.TgZ(5,"li",7)(6,"a",8),n._uU(7,"Order Now"),n.qZA()(),n.TgZ(8,"li",9)(9,"a",10),n._uU(10,"Delivery Address"),n.qZA()(),n.TgZ(11,"li")(12,"a",14),n.NdJ("click",function(){return n.CHM(e),n.oxw().logout()}),n._uU(13,"Logout"),n.qZA()()()()}}function O(t,g){if(1&t){const e=n.EpF();n.TgZ(0,"div",34),n._UZ(1,"img",35)(2,"br"),n.TgZ(3,"h3")(4,"span",36),n.NdJ("click",function(){n.CHM(e);const i=n.oxw().$implicit;return n.oxw().searchText=i.Dishes}),n._uU(5),n.qZA(),n._UZ(6,"br"),n.TgZ(7,"span",37),n.NdJ("click",function(){n.CHM(e);const i=n.oxw().$implicit;return n.oxw().searchText=i.HotelName}),n._uU(8),n.qZA(),n._UZ(9,"br"),n.TgZ(10,"div",38)(11,"div",39)(12,"span",40),n._uU(13),n.TgZ(14,"img",41),n.NdJ("click",function(){n.CHM(e);const i=n.oxw().$implicit;return n.oxw().addToCart(i.Dishes,i.Price,i.HotelName)}),n.qZA()()()()()()}if(2&t){const e=n.oxw().$implicit;n.xp6(1),n.MGl("src","assets/images/",e.CuisineName.toLowerCase(),"background.jpg",n.LSH),n.s9C("alt",e.Dishes),n.xp6(4),n.Oqu(e.Dishes),n.xp6(3),n.Oqu(e.HotelName),n.xp6(5),n.hij("Rs.",e.Price," ")}}function M(t,g){if(1&t&&(n.ynx(0),n.YNc(1,O,15,5,"div",33),n.BQk()),2&t){const e=g.$implicit;n.xp6(1),n.Q6J("ngIf","Indian"==e.CuisineName)}}const b=[{path:"",component:(()=>{class t{constructor(e,o){this.userSer=e,this.router=o,this.count=0,this.searchText="",this.tokendisplay=!0,this.menudisplay=!1}ngOnInit(){var e=localStorage.getItem("token"),o=localStorage.getItem("refreshToken"),i=e.split(".")[1];console.log(i);var r=Buffer.from(i,"base64");console.log(JSON.parse(r)),"ADMIN"===JSON.parse(r).role&&this.router.navigate(["not-found"]);const{exp:a}=JSON.parse(r),s=Date.now()>=1e3*a;console.log("________"+s),1==s&&(this.tokendisplay=!1,this.userSer.token(JSON.parse(r).Email_ID,o).subscribe(c=>{console.log("+++++++++++++"+c.token),localStorage.setItem("token",c.token),window.location.reload()})),this.userSer.getFoodTable().subscribe(c=>{console.log(c,"res==>"),this.categories=c}),this.userSer.getSingleUser().subscribe(c=>{this.count=Object.keys(c.cart).length})}logout(){localStorage.removeItem("token"),this.router.navigate(["login"])}addToCart(e,o,i){this.count=this.count+1,this.userSer.getSingleUser().subscribe(r=>{var a=new Map;console.log(a),console.log(r,"res==>");for(let l in r.cart)a.set(l,r.cart[l]);if(console.log(a),a.has(e)){var s=a.get(e)[0];a.set(e,[s+1,o*(s+1),i]),localStorage.setItem(e,[s+1,o+o].toString())}else a.set(e,[1,o,i]),console.log("new obj");console.log(a);let c={};a.forEach((l,m)=>{c[m]=l}),this.userSer.addToCart({cart:c}).subscribe(l=>{Object.keys(c)})})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(C.v),n.Y36(u.F0))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-indian"]],decls:53,vars:9,consts:[[1,"backgroundimage"],[1,"top"],[1,"homeLink"],["routerLink","/home"],[1,"loginLink"],["id","myorders"],["routerLink","/myOrders"],["id","ordernow"],["routerLink","/userPage"],["id","deliveryaddress"],["routerLink","/deliveryaddress"],["id","cart"],["routerLink","/cart"],[1,"badge","badge-dark",2,"color","orangered","background-color","white","padding-bottom","1px",3,"ngModel","ngModelChange"],["routerLink","/login",3,"click"],[1,"mediatop"],["id","cart","routerLink","/cart",2,"margin-right","1.5em"],[1,"badge","badge-dark",2,"color","orangered","background-color","white","font-size","12px","padding-top","4px"],[1,"material-icons",3,"click"],["class","menu",4,"ngIf"],["src","assets/images/indianbackground.jpg",2,"height","100vh","width","100vw","object-fit","cover"],[1,"text-block"],[1,"logo"],[1,"heading"],[2,"margin-top","20px","font-size","40px"],[1,"cuisineheading"],[1,"searchbox"],["id","search","type","search","name","search","placeholder","Search for Indian Dishes / Restaurants",2,"width","100%","padding","7px 7px","padding-left","8px","border-radius","4px","border","none","font-size","large","color","rgb(67, 33, 23)",3,"ngModel","ngModelChange"],[1,"break"],[1,"categories-wrapper"],[1,"categories"],[4,"ngFor","ngForOf"],[1,"menu"],["class","category",4,"ngIf"],[1,"category"],[3,"src","alt"],["id","dishes",3,"click"],["id","hotelName",3,"click"],[1,"price-cart"],[1,"price"],["id","price"],["src","assets/images/cart4.png","alt","Cart",3,"click"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"a",3),n._uU(4,"H U N G R Y"),n.qZA()(),n.TgZ(5,"div",4)(6,"ul")(7,"li",5)(8,"a",6),n._uU(9,"My Orders"),n.qZA()(),n.TgZ(10,"li",7)(11,"a",8),n._uU(12,"Order Now"),n.qZA()(),n.TgZ(13,"li",9)(14,"a",10),n._uU(15,"Delivery Address"),n.qZA()(),n.TgZ(16,"li",11)(17,"a",12),n._uU(18,"Cart "),n.TgZ(19,"span",13),n.NdJ("ngModelChange",function(r){return o.count=r}),n._uU(20),n.qZA()()(),n.TgZ(21,"li")(22,"a",14),n.NdJ("click",function(){return o.logout()}),n._uU(23,"Logout"),n.qZA()()()()(),n.TgZ(24,"div",15)(25,"a",16),n._uU(26,"Cart "),n.TgZ(27,"span",17),n._uU(28),n.qZA()(),n.TgZ(29,"i",18),n.NdJ("click",function(){return o.menudisplay=!o.menudisplay}),n._uU(30," menu "),n.qZA(),n.YNc(31,x,14,0,"div",19),n.qZA(),n._UZ(32,"img",20),n.TgZ(33,"div",21)(34,"div",22)(35,"div",23)(36,"h1",24),n._uU(37,"H U N G R Y"),n.qZA()()(),n.TgZ(38,"h2")(39,"strong"),n._uU(40,"HALT YOUR HUNGER BY ORDERING HERE"),n.qZA()(),n.TgZ(41,"div",25)(42,"strong")(43,"h2"),n._uU(44,"I N D I A N"),n.qZA()()(),n.TgZ(45,"div",26)(46,"input",27),n.NdJ("ngModelChange",function(r){return o.searchText=r}),n.qZA()()()(),n.TgZ(47,"div",28),n._uU(48," - ORDER NOW - "),n.qZA(),n.TgZ(49,"div",29)(50,"div",30),n.YNc(51,M,2,1,"ng-container",31),n.ALo(52,"filter"),n.qZA()()),2&e&&(n.xp6(19),n.Q6J("ngModel",o.count),n.xp6(1),n.Oqu(o.count),n.xp6(8),n.Oqu(o.count),n.xp6(3),n.Q6J("ngIf",o.menudisplay),n.xp6(15),n.Q6J("ngModel",o.searchText),n.xp6(5),n.Q6J("ngForOf",n.xi3(52,6,o.categories,o.searchText)))},directives:[u.yS,p.JJ,p.On,_.O5,p.Fj,_.sg],pipes:[f.Z],styles:[".backgroundimage[_ngcontent-%COMP%]{position:relative}.logo[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly}.text-block[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .homeLink[_ngcontent-%COMP%]{color:#fff;text-shadow:0 0 7px white,0 0 10px orangered,0 0 21px orangered,0 0 42px orangered,0 0 82px orangered,0 0 92px orangered,0 0 102px orangered,0 0 151px orangered}.text-block[_ngcontent-%COMP%]{width:max-content;padding-bottom:24px;text-align:center;position:absolute;line-height:1.5;background-color:#030000b3;color:#fff;padding-left:20px;padding-right:20px;top:50%;left:50%;transform:translate(-50%,-50%)}.logoimage[_ngcontent-%COMP%]{text-align:right}.heading[_ngcontent-%COMP%]{text-align:left}.top[_ngcontent-%COMP%]{z-index:1;height:45px;padding:8px;font-size:20px;background-color:#030000b3;position:fixed;display:flex;justify-content:space-between;width:100vw}.loginLink[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex;flex:row}h2[_ngcontent-%COMP%]{word-spacing:.2em}.homeLink[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .loginLink[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#ff4500}ul[_ngcontent-%COMP%]{list-style-type:none}a[_ngcontent-%COMP%]{margin-left:5px;margin-right:5px;padding:10px;color:#fff;text-decoration:none}.break[_ngcontent-%COMP%]{width:100vw;color:#fff;font-weight:900;font-family:Orbitron;font-size:35px;text-align:center;padding:26px;background-color:#ff4500}.cuisineheading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:Orbitron;padding:8px;background-color:#ff4500}[_ngcontent-%COMP%]::placeholder{font-size:17px}#ordernow[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{background-color:#ff4500}.categories-wrapper[_ngcontent-%COMP%]{width:100vw;color:#fff;background:radial-gradient(rgb(233,242,106) 20%,rgb(243,184,112) 80%);background-repeat:repeat;object-fit:cover;height:100%}.categories[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr 1fr;padding:40px}.categories[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{line-height:1.2;text-align:center;font-family:Orbitron;padding:8px;font-size:22px;font-weight:700;background-color:#ff4500;border-bottom-left-radius:20px;border-bottom-right-radius:20px}.category[_ngcontent-%COMP%]{height:max-content;padding:16px;transition:.2s}.category[_ngcontent-%COMP%]:hover{cursor:pointer;transform:scale(1.01)}.categories[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-top-left-radius:8%;border-top-right-radius:8%;height:15em;width:100%}#dishes[_ngcontent-%COMP%], #price[_ngcontent-%COMP%]{color:#ff0}.categories[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover{text-decoration:underline}#price[_ngcontent-%COMP%]{text-decoration:none}.cart[_ngcontent-%COMP%]{text-align:right}.price-cart[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:50px;width:45px;padding-bottom:8px}.price-cart[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{transform:scale(1.08)}.mediatop[_ngcontent-%COMP%]{display:none}.text-block[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:23px;margin-top:10px}@media only screen and (max-width:900px){.top[_ngcontent-%COMP%]{display:none}.mediatop[_ngcontent-%COMP%]{text-align:right;color:#ff4500;display:block;z-index:1;height:45px;padding:8px 16px;font-size:20px;background-color:#030000b3;position:fixed;width:100vw}.menu[_ngcontent-%COMP%]{margin-top:3px;width:90%;text-align:center}.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{border:.1px solid rgba(255,255,255,.244);line-height:1;display:flex;flex-direction:column;background-color:#ff4500}.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, #signup[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{background-color:#fff;color:#ff4500}.text-block[_ngcontent-%COMP%]{margin-top:6%;width:100%}.text-block[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:small}.break[_ngcontent-%COMP%]{font-size:larger}.categories[_ngcontent-%COMP%]{display:block}.category[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:12em}.price-cart[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:3em;width:3em;padding-bottom:8px}.categories[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:medium}}"]}),t})()}];let P=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[u.Bz.forChild(b)],u.Bz]}),t})(),k=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[_.ez,P,p.u5,f.h]]}),t})()}}]);