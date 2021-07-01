import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { HeroPickerComponent } from './hero-picker/hero-picker.component';
import { ChatbotComponent } from './chatbot/chatbot.component';




@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    PlayerDetailsComponent,
    HeroPickerComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
