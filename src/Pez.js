class Pez extends SerVivo{
    constructor(masa){
        super(masa);
        this.hembra = Math.random() < 0.5 ? true : false;
        if (this.hembra) {
            this.imagen = loadImage("assets/pezF.png");
        }else{
            this.imagen = loadImage("assets/pezM.png");
        }
        this.miedo = 0.15;
        this.hambre = 0.05;
        this.soledad = 0.8;
        this.escala = 1;

    }

    dibujar(){
        push();
        const anguloRadianes = Math.atan2(this.velocidad.y, this.velocidad.x);
        translate(this.posicion.x,this.posicion.y);
        rotate(anguloRadianes);
        tint((255*this.vida)/this.vidaMax);
        this.vida -= 0.5;
        this.hambre += 0.01;
        image(this.imagen,-(this.masa + this.escala)/2,-(this.masa + this.escala)/2,(this.masa + this.escala),(this.masa + this.escala));
        pop();
    }
}