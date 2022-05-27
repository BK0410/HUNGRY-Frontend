import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [{ path: '',   redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
{ path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) }, 
{ path: 'userPage', loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule),canActivate:[AuthGuard] }, 
{ path: 'deliveryaddress', loadChildren: () => import('./deliveryaddress/deliveryaddress.module').then(m => m.DeliveryaddressModule),canActivate:[AuthGuard] }, 
{ path: 'Italian', loadChildren: () => import('./italian/italian.module').then(m => m.ItalianModule),canActivate:[AuthGuard] }, 
{ path: 'Indian', loadChildren: () => import('./indian/indian.module').then(m => m.IndianModule),canActivate:[AuthGuard] }, 
{ path: 'Chinese', loadChildren: () => import('./chinese/chinese.module').then(m => m.ChineseModule),canActivate:[AuthGuard] }, 
{ path: 'Arabian', loadChildren: () => import('./arabian/arabian.module').then(m => m.ArabianModule),canActivate:[AuthGuard] },
{ path: 'restaurant', loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),canActivate:[AuthGuard] },
{ path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
{ path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),canActivate:[AuthGuard] },
{ path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),canActivate:[AuthGuard] },
{ path: 'myOrders', loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule),canActivate:[AuthGuard] },
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard] },
{ path: 'adminhome', loadChildren: () => import('./adminhome/adminhome.module').then(m => m.AdminhomeModule) }, 
{ path: '**', loadChildren: () => import('./notfound/notfound.module').then(m => m.NotfoundModule),canActivate:[AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
