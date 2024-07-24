import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent  {

  @Input() shelf: any[] = [];
  @Input() shelfIndex: number = 0;
  
  hoveredCell: string = '';

  onMouseOver(item: string) {
    /* console.log(this.shelf)
    console.log(item) */
    this.hoveredCell = item;
  }

  onMouseOut() {
    this.hoveredCell = '';
  }
}
