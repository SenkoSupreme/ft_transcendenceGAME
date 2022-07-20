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
  public ballx: number; public bally: number; public ballv: number;
 
  constructor (private gameService: GameService) {
    this.animation = { idle: [[0,0]]};
    this.currentAnimation = "idle";
    this.currentAnimationFrame = 0;
    this.p1x = -9;
    this.p1y = -9;
    this.p2x = 300;
    this.p2y = -7;
    this.ballx = -1;
    this.bally = -1;
    this.ballv = Math.sqrt(Math.sqrt(Math.pow(this.ballx, 2) + Math.pow(this.bally, 2)));
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
 

  //Draw Ball
  drawBall()
  {
    const balli = new Image();
    balli.src = 'https://lh3.googleusercontent.com/YerOe9ljeSIr-q9jG4f_UeNOiPctlG52eQoEP2g5Da5B9FK5NCQI88KucWhbUtoRML79L4cO7LmD2QDN7Ktn6Hs';
    balli.onload = () => {
      this.isloaded = true;
      //this.ctx.drawImage(balli, 0, 0, 32, 32, this.ballx,  this.bally, 32, 32);
      this.ctx.drawImage(balli, 0, 0, 258, 258, this.ballx + 168, this.bally + 89, 16, 16);
    }
  }
  
  // Characters {Draw Players and manage their actions}
  drawSprite()
  {
    const player_1 = new Image();
    player_1.src = '../../assets/sprite/Doom64.png';
    player_1.onload = () => {
      this.isloaded = true;
      if (this.key === "ArrowDown") {
        this.p1y += 2.7;
        this.key = "";
      }
      else if (this.key === "ArrowUp") {
        this.p1y -= 2.7;
        this.key = "";
      }
      if (this.p1y > 146) {
        this.p1y = 145.5;
      }
      if (this.p1y < -9) {
        this.p1y = -9;
      }
      this.ctx.drawImage(player_1, 0, 0, 64, 64, this.p1x, this.p1y, 64, 64);
    }
    
    const player_2 = new Image();
    player_2.src = '../../assets/sprite/ironman64.png';
    player_2.onload = () => {
      this.isloaded = true;
      if (this.key === "ArrowLeft") {
        this.p2y += 2.7;
        this.key = "";
      }
      else if (this.key === "ArrowRight") {
        this.p2y -= 2.7;
        this.key = "";
      }
      if (this.p2y > 146) {
        this.p2y = 145.5;
      }
      if (this.p2y < -9) {
        this.p2y = -9;
      }
      this.ctx.drawImage(player_2, 0, 0, 64, 64, this.p2x, this.p2y, 64, 64);
    }
    
  }

  
  startGameLoop() {
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
    const step = () => {
      this.init_canvas();
      this.drawBall(); 
      this.drawSprite();
      if (this.bally < -100 || this.ballx > 100) {
        this.ballx -= this.ballv;
        this.bally -= this.ballv;
        this.ballv = - this.ballv;
      }
      this.ballx += this.ballv;
      this.bally += this.ballv;
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
