import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyComponent } from './key/key.component';
import { BoardComponent } from './board/board.component';
import { BoardRowComponent } from './board-row/board-row.component';
import { BoardTileComponent } from './board-tile/board-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    KeyboardComponent,
    KeyComponent,
    BoardComponent,
    BoardRowComponent,
    BoardTileComponent
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
