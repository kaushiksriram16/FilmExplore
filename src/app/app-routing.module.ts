import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookMarkComponent } from './components/book-mark/book-mark.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

const routes: Routes = [
  {path:'bookmarks', component: BookMarkComponent},
  {path:'search', component:SearchBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [BookMarkComponent, SearchBarComponent]