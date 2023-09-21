let canvas = null;

let comida,peces,depredadores,piedras;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("canvas");

  frameRate(45);

  comida = new SistemaParticulas(50,Alga,50);
  peces = new SistemaParticulas(10,Pez,100);
  depredadores = new SistemaParticulas(1,Tiburon,400);
  piedras = new SistemaParticulas(5,Piedra,300);

  windowResized();
}

function draw() {
  background("#4fc6f1");

  translate(windowWidth*0.5,windowHeight * 0.5);
  scale(0.6);

  cercaniaPescaos();
  perseguirPez();
  comer();
  huir();
  noChocar(peces);
  noChocar(depredadores);

  comida.actualizar();
  peces.actualizar();
  peces.matar();
  comida.matar();
  depredadores.actualizar();
  piedras.actualizar();

  comida.dibujar();
  piedras.dibujar();
  peces.dibujar();
  depredadores.dibujar();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function noChocar(sistema) {
  sistema.particulas.forEach(pez => {
    const fuerza = createVector(0, 0);
    piedras.particulas.forEach(piedra => {
      
      const distancia = p5.Vector.dist(pez.posicion, piedra.posicion);
      if (distancia < piedra.masa/2) {
        const direccion = p5.Vector.sub(piedra.posicion, pez.posicion);
        direccion.mult(-5/distancia*distancia);
        fuerza.add(direccion);
      }
    });
    pez.aplicarFuerza(fuerza);
  });
}

function huir() {
  peces.particulas.forEach(pez => {
    const fuerza = createVector(0, 0);

    let tiburonMasCercano;
    let distanciaMasCorta = Infinity;

    depredadores.particulas.forEach(tiburon => {
      
      const distancia = p5.Vector.dist(pez.posicion, tiburon.posicion);
      if (distancia < distanciaMasCorta) {
        distanciaMasCorta = distancia;
        tiburonMasCercano = tiburon;
      }

    });
    if (tiburonMasCercano) {
        const distancia = p5.Vector.dist(pez.posicion, tiburonMasCercano.posicion);
        const direccion = p5.Vector.sub(tiburonMasCercano.posicion, pez.posicion);
        
        direccion.mult(-(pez.miedo)/distancia*distancia);
        fuerza.add(direccion);
    }

    // Aplicar la fuerza al pez
    pez.aplicarFuerza(fuerza);
  });
}

function comer() {
  peces.particulas.forEach(pez => {
    const fuerza = createVector(0, 0);

    let algaMasCercana;
    let distanciaMasCorta = Infinity;

    comida.particulas.forEach(alga => {
      // Calcular la distancia entre el pez y la alga
      const distancia = p5.Vector.dist(pez.posicion, alga.posicion);

      // Verificar si esta alga está más cerca que la anterior más cercana
      if (distancia < distanciaMasCorta) {
        distanciaMasCorta = distancia;
        algaMasCercana = alga;
      }
    });

    // Calcular la dirección hacia la alga más cercana
    if (algaMasCercana) {
        const distancia = p5.Vector.dist(pez.posicion, algaMasCercana.posicion);
        const direccion = p5.Vector.sub(algaMasCercana.posicion, pez.posicion);

        direccion.mult(pez.hambre);
        fuerza.add(direccion);

        if (distancia < 10){
          algaMasCercana.vida = 0;
          pez.escala += 0.1 * algaMasCercana.masa;
          pez.hambre = 0.1;
        }
    }

    // Aplicar la fuerza al pez
    pez.aplicarFuerza(fuerza);
  });
}


function perseguirPez() {
  depredadores.particulas.forEach(tiburon => {
    const fuerza = createVector(0, 0);

    let pezaMasCercano;
    let distanciaMasCorta = Infinity;

    peces.particulas.forEach(pez => {
      
      const distancia = p5.Vector.dist(pez.posicion, tiburon.posicion);
      if (distancia < distanciaMasCorta) {
        distanciaMasCorta = distancia;
        pezaMasCercano = pez;
      }

    });
    if (pezaMasCercano) {
        const distancia = p5.Vector.dist(tiburon.posicion, pezaMasCercano.posicion);
        const direccion = p5.Vector.sub(pezaMasCercano.posicion, tiburon.posicion);
        fuerza.add(direccion);

        if (distancia < 20){
          pezaMasCercano.vida = 0;
          tiburon.escala += 0.1 * pezaMasCercano.masa;
        }
    }

    // Aplicar la fuerza al pez
    tiburon.aplicarFuerza(fuerza);
  });
}

function cercaniaPescaos() {
  peces.particulas.forEach(pez1 => {
    const fuerza = createVector(0, 0);

    let pecesMasCercanos = [];
    let distanciaMasCorta = Infinity;

    peces.particulas.forEach(pez2 => {
      const distancia = p5.Vector.dist(pez1.posicion, pez2.posicion);
      if (distancia < distanciaMasCorta && distancia > 550) {
        distanciaMasCorta = distancia;
        pecesMasCercanos.push(pez2);
        if (pecesMasCercanos.length >= 5) {
          const indicePezMasLejano = pecesMasCercanos.indexOf(
            pecesMasCercanos.reduce((a, b) =>
              p5.Vector.dist(pez1.posicion, a.posicion) >
              p5.Vector.dist(pez1.posicion, b.posicion)
                ? a
                : b
            )
          );
          pecesMasCercanos.splice(indicePezMasLejano, 1);
        }
      }
    });
    pecesMasCercanos.forEach(pezCercano => {
        const distancia = p5.Vector.dist(pez1.posicion, pezCercano.posicion);
        const direccion = p5.Vector.sub(pezCercano.posicion, pez1.posicion);

        if (distancia > 550) {
          direccion.mult(pez1.soledad * 0.1);          
        }else{
          direccion.mult(-pez1.soledad);
        }
        fuerza.add(direccion); 
    });

    // Aplicar la fuerza al pez
    pez1.aplicarFuerza(fuerza);
  });
}