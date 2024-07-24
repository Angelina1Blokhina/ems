import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {

  warehouseForm: FormGroup;
  shelfData: any[] = [];
  previousParams = {
    shelves: 0,
    rows: 0,
    columns: 0
  };
  
  constructor(private fb: FormBuilder) {
    this.warehouseForm = this.fb.group({
      shelves: null,
      rows: null,
      columns: null
    });
  }

  oldShelfMore(shelves: number){
    this.shelfData.length = shelves;
  }

  oldRowsfMore(rows: number, columns: number, oldColumns: number){
    this.shelfData.forEach((shelf: any)=>{
      shelf.length = rows // количество полок в каждом стеллаже
      if(columns < oldColumns){ 
        this.oldColumnsfMore(columns, shelf)
      }
      else if(columns > oldColumns){
        for(let i = 0; i< rows; i++){
          this.newColumnsMore(shelf[i], oldColumns, columns)
        }
      }
    })
  }

  oldColumnsfMore(columns:number,shelf: any){
    shelf.forEach((row: any) =>{
      row.length  = columns
    })
  }

  newColumnsMore(row: any, oldColumns: number, columns: number){
      for (let j = oldColumns; j<columns; j++){
        row[j] = { id: `${j}`+ (Math.random() * 1000), name: `Товар ${Math.floor(Math.random() * 100)}` };
      }
  }

  newRowsMore(rows: number,  oldColumns: number, columns: number){
    this.shelfData.forEach((shelf: any)=>{
    for (let i = 0; i< rows; i++) {
      if (!shelf[i]) {
        shelf[i] = [];
        this.newColumnsMore(shelf[i], 0, columns)
      }
      else{
        if(columns < oldColumns){ 
          this.oldColumnsfMore(columns, shelf)
        }
        else if(columns > oldColumns){
          this.newColumnsMore(shelf[i], oldColumns, columns)
        }
      }
    }
    })
  }

  noDifRows(columns: number, oldColumns: number, rows: number){
    if(columns < oldColumns){ 
      this.shelfData.forEach((shelf: any)=>{
        this.oldColumnsfMore(columns, shelf)
      })
    }
    // если количество ячеек увеличилось
    else if(columns > oldColumns){
      this.shelfData.forEach((shelf: any)=>{
        for(let i = 0; i< rows; i++){
          this.newColumnsMore(shelf[i], oldColumns, columns)
        } 
      })
    }
  }

  generateShelves() {
    const { shelves, rows, columns } = this.warehouseForm.value;
    const oldShelves = this.previousParams.shelves;
    const oldRows = this.previousParams.rows;
    const oldColumns = this.previousParams.columns;

     // если количество стеллажей увеличилось
     if(shelves > oldShelves){
      for (let i = 0; i< shelves; i ++){
        if (!this.shelfData[i]) {
          this.shelfData[i] = [];
          this.newRowsMore(rows, 0, columns)
        }
        else{
          //если количество полок уменьшилось
          if(rows < oldRows){
            this.oldRowsfMore(rows, columns, oldColumns);
          }
          //если количество полок увеличилось
          else if(rows > oldRows){
            this.newRowsMore(rows, oldColumns, columns)
          }
          //если количество полок не изменилось
          else{
            this.noDifRows(columns, oldColumns, rows)
          }
          
        }   
      }
    }
    // если количество стеллажей уменьшилось или осталось прежним
    else{
      if (shelves < oldShelves) this.oldShelfMore(shelves);

      // если количество полок уменьшилось
      if(rows < oldRows){
        this.oldRowsfMore(rows, columns, oldColumns);
      }
      // если количество полок увеличилось
      else if (rows > oldRows){
        this.newRowsMore(rows, oldColumns, columns)
      }
      // если количество полок не изменилось
      else{
        this.noDifRows(columns, oldColumns, rows)
      }
    }

    console.log(this.shelfData)
    this.previousParams = { shelves, rows, columns };
  }


}
