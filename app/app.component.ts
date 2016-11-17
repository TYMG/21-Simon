import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board.component'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<game-board (gamepadButtonEvent)="gameButtonClick($event)" (startButtonEvent)="startButtonClick($event)"></game-board>`,
  styleUrls:["buttons.css"]
})
export class AppComponent {

   gameButtonClick($event){
      console.log($event);
   }
   startButtonClick($event){
      console.log($event);
   }
 }
