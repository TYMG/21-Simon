import { Component, Input} from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'simon-button'
})
export class ButtonComponent {
    @Input() color;
    constructor() {}
 }