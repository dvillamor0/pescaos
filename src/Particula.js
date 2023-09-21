class Particula{

    static media = 0;
    static desviacionEstandar = 500;

    static vmax = 1;

    constructor(masa){
        const x = generarNumeroNormal(Particula.media,Particula.desviacionEstandar);
        const y = generarNumeroNormal(Particula.media,Particula.desviacionEstandar);
        
        this.posicion = createVector(x,y);
        this.velocidad = createVector(0,0);
        this.aceleracion = createVector(0,0);

        this.masa = masa;
    }

    dibujar(){
        throw new Error("Las subclases deben implementar este método");
    }

    aplicarFuerza(fuerza){
        const ax = fuerza.x / this.masa;
        const ay = fuerza.y / this.masa;
        this.aceleracion = createVector(this.aceleracion.x + ax, this.aceleracion.y + ay);
    }

    actualizar(){
        this.velocidad.x += this.aceleracion.x;
        this.velocidad.y += this.aceleracion.y;
        //console.log("aceleracion",this.aceleracion.x,this.aceleracion.y);

        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;
        //console.log("velocidad",this.velocidad.x,this.velocidad.y);

        this.aceleracion.x = 0;
        this.aceleracion.y = 0;

        this.velocidad.x = this.velocidad.x * 0.96;
        this.velocidad.y = this.velocidad.y * 0.96;

        //console.log("posicion",this.posicion.x,this.posicion.y);
    }
}