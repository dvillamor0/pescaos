class Piedra extends Particula{

    constructor(masa){
        super(masa);
        this.imagen = loadImage("assets/piedra.png");
    }

    dibujar(){
        push();
        translate(this.posicion.x,this.posicion.y);
        image(this.imagen,-this.masa/2,-this.masa/2,this.masa,this.masa);
        pop();
    }

}