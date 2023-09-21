function generarNumeroNormal(media, desviacionEstandar) {
    let u1, u2;
    let z0, z1;
    
    do {
      u1 = Math.random();
      u2 = Math.random();
    } while (u1 === 0);
    
    z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
    
    return z0 * desviacionEstandar + media;
  }