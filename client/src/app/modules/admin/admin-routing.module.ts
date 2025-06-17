import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryFormComponent } from './components/category/form/form.component';
import { ViewCategoryComponent } from './components/category/view/view.component';
import { ProductFormComponent } from './components/product/form/form.component';
import { ViewProductComponent } from './components/product/view/view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewOrderComponent } from './components/order/view/view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'product',
    component: AdminComponent,
    children: [
      { path: '', component: ViewProductComponent },
      { path: 'form', component: ProductFormComponent },
    ],
  },
  {
    path: 'category',
    component: AdminComponent,
    children: [
      { path: '', component: ViewCategoryComponent },
      { path: 'form', component: CategoryFormComponent },
    ],
  },

  {
    path: 'order',
    component: AdminComponent,
    children: [{ path: '', component: ViewOrderComponent }],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
