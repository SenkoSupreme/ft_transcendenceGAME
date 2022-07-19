import { AfterViewInit, Component, ElementRef, HostListener, Injectable, OnInit, ViewChild } from '@angular/core';
import { GameService } from './game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {

  chat = this.gameService.getMessage();
  @ViewChild('game') gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  public animation!: any; 
  public currentAnimation!: string; public currentAnimationFrame!: number;
  public isloaded: boolean = false;
  public p1x: number; public p1y: number;
  public p2x: number; public p2y: number;
  public key: any;
 
  constructor (private gameService: GameService) {
    this.animation = { idle: [[0,0]]};
    this.currentAnimation = "idle";
    this.currentAnimationFrame = 0;
    this.p1x = -7;
    this.p1y = -7;
    this.p2x = 300;
    this.p2y = -7;
  }
  // Get Keyboard Input
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(event);
  }
  
  //Main Function
  ngAfterViewInit(): void {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d')!;
    console.log(this.gameCanvas.nativeElement.getContext('2d'));
    this.startGameLoop();
  }
  //Draw First Frame {Inittialize Canvas}
  init_canvas() {
    const background = new Image();
    background.onload = () => {
      this.ctx.drawImage(background, 0, 0);
    }
    background.src = '../../assets/splash_art01.png';
  }

  // Characters {Draw Players and manage their actions}
  drawSprite(Sctx: CanvasRenderingContext2D)
  {
    const player_1 = new Image();
    player_1.onload = () => {
      this.isloaded = true;
      if (this.key === "ArrowDown") {
        this.p1y += 2;
        this.key = "";
      }
      else if (this.key === "ArrowUp") {
        this.p1y -= 2;
        this.key = "";
      }
      else if (this.p1y > 145) {
        this.p1y = 145;
      }
      else if (this.p1y < -7) {
        this.p1y = -7;
      }
      Sctx.drawImage(player_1, 0, 0, 64, 64, this.p1x, this.p1y, 64, 64);
    }
    player_1.src = '../../assets/sprite/Doom64.png';
    
    // const player_2 = new Image();
    // player_2.onload = () => {
    //   this.isloaded = true;
    //   if (this.key === "ArrowDown") {
    //     this.p2y += 1;
    //     this.key = "";
    //   }
    //   else if (this.key === "ArrowUp") {
    //     this.p2y -= 1;
    //     this.key = "";
    //   }
    //   Sctx.drawImage(player_2, 0, 0, 64, 64, this.p2x, this.p2y, 64, 64);
    // }
    // player_2.src = '../../assets/sprite/ironman64.png';
    
  }
  
  startGameLoop() {
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
    const step = () => {
      this.init_canvas();
      this.drawSprite(this.ctx);
      requestAnimationFrame( () => {
        step();
      });
    }
    step();
  }

}

export class PlayerComponent {
  constructor(public x: number, public y: number, public spirte: number, public height: number) {}

}
