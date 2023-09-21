class Tiburon extends SerVivo{
    constructor(masa){
        super(masa);
        this.imagen = loadImage("assets/tiburon.png");
        this.escala = 0;
    }

    dibujar(){
        push();
        const anguloRadianes = Math.atan2(this.velocidad.y, this.velocidad.x);
        translate(this.posicion.x,this.posicion.y);
        rotate(anguloRadianes);
        this.vida -= 0.5;
        image(this.imagen,-(this.masa + this.escala)/2,-(this.masa + this.escala)/2,(this.masa + this.escala),(this.masa + this.escala));
        pop();
    }
}