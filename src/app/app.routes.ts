import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { AddBlogsComponent } from './add-blogs/add-blogs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-blogs', component: AllBlogsComponent },
  { path: 'add-blogs', component: AddBlogsComponent },
  { path: 'edit/:id', component: AddBlogsComponent },
  { path: '**', redirectTo: '' }
];
