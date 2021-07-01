import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ViewComponent } from './view/view.component';
import { HeroPickerComponent } from './hero-picker/hero-picker.component'
import { ChatbotComponent } from './chatbot/chatbot.component'


const routes: Routes = [
  { path: 'player-details/:id', component: PlayerDetailsComponent },
  { path: 'player-details', component: PlayerDetailsComponent },
  { path: 'match-details/:id', component: ViewComponent },
  { path: 'match-details', component: ViewComponent },
  { path: 'chatbot',component: ChatbotComponent},
  { path: 'hero-picker', component: HeroPickerComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
