class SerVivo extends Particula{

    static mediaVida = 30;
    static sVida = 9;

    constructor(masa){
        super(masa);
        this.vidaMax = generarNumeroNormal(SerVivo.mediaVida,SerVivo.sVida) * getTargetFrameRate();
        this.vida = this.vidaMax;
    }

}