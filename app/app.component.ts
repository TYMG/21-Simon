import { Component } from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: "game-board.html",
  styleUrls:["buttons.css"]
})
export class AppComponent {

    eventEmitClick(color) {
      console.log(color);
    }
 }
