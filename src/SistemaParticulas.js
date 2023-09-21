class SistemaParticulas{
    constructor(n, Clase,masa) {
        this.particulas = [];

        for (let i = 0; i < n; i++) {
            this.addParticula(Clase,masa);
        }
    }

    addParticula(Clase,masa,random = true){
        let masaParticula = masa;
        if (random) {
            masaParticula = generarNumeroNormal(masa,10);
        }
        
        const particula = new Clase(masaParticula);
        this.particulas.push(particula);
    }

    aplicarFuerza(fuerza){
        this.particulas.forEach(particula => {
            particula.aplicarFuerza(fuerza);
        });
    }

    dibujar(){
        this.particulas.forEach(particula => {
            particula.dibujar();
        });
    }

    actualizar(){
        this.particulas.forEach(particula => {
            particula.actualizar();
        });
    }

    esVivo(){
        if (this.particulas[0] instanceof SerVivo) {
            return true
        }
        return false
    }

    matar(){
        if (this.esVivo()) {
            for (let i = 0; i < this.particulas.length; i++) {
                const particula = this.particulas[i];
                
                if (particula.vida <= 0) {
                    this.particulas.splice(i, 1);
                    this.addParticula(particula.constructor,particula.masa,false);
                }
                
            }
            
        }
    }

}