import { Component, OnInit } from '@angular/core';
import { ReadServiceService } from '../read-service.service';



@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

  resultData: Chem[] = [];
  date: any;

constructor(private result: ReadServiceService) {
  setInterval(() => {
    this.date = new Date()
  }, 1000)
 }



ngOnInit() {
this.getData();
}

getData() {
  this.result.getInfo().subscribe(data => {
  
    let csvToRowArray = data.split("\n");
    let now = new Date()
    
    for (let index = 1; index < csvToRowArray.length; index++) {
      let row = csvToRowArray[index].split(",");
      if (row[0]==now.toLocaleDateString()){
      this.resultData.push(new Chem(row[1].trim(), row[2].trim(), row[3].trim()));
      }
    }
  this.resultData.sort((a, b) => (a.id > b.id) ? 1 : -1);
  console.log(this.resultData);
},
error => {
    console.log(error);
}
);}


  getColor(alloy:any): string {
    if (alloy === null)
      alloy = '';
    else 
      alloy = alloy.toString();
      
      if (alloy === 'A357' )
        return 'brown';
      else if (alloy === 'A356')
        return 'yellow';
      else if (alloy === '356')
        return 'black';
      else if (alloy === '355' || alloy === 'C355')
        return 'green';
      else return 'white';
    }
  }

export class Chem{
  id: string;
  alloy: string;
  fe_content: string;
  pot_number: number

  constructor(alloy: string, id: string,fe_content: string){
    this.id = id;
    this.alloy = alloy;
    this.fe_content = fe_content;
    this.pot_number = parseInt(this.id[0])
  }
}
