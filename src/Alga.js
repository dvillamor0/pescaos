class Alga extends SerVivo{
    static escalaMasa = 1;
    constructor(masa){
        super(masa);
        this.imagen = loadImage("assets/alga.png");
    }

    dibujar(){
        push();        
        this.vida -= 0.1;
        tint((255*this.vida)/this.vidaMax);
        translate(this.posicion.x,this.posicion.y);
        image(this.imagen,-this.masa/2,-this.masa/2,Alga.escalaMasa*this.masa,Alga.escalaMasa*this.masa);
        pop();
    }
}