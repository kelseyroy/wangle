import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyComponent } from './key/key.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    KeyboardComponent,
    KeyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
