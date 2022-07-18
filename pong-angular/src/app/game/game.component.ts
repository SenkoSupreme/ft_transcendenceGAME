import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {

  @ViewChild('game') gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx! :CanvasRenderingContext2D;
  
  
  ngAfterViewInit() {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d');
    console.log(this.gameCanvas.nativeElement.getContext('2d'));
  }
}
