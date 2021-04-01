// creamos un archivo para modelar una banda,k usaremos clases para este ejemplo

const {v4: uuidV4} = require('uuid');

class Band {
    // para definir las propiedades de una clase se hace mediante el constructor
    // hay un paquete  que nos permite generar ids únicos, npm install uuid --save
    constructor( name = 'no-name' ) {
        this.id = uuidV4();
        this.name = name;
        this.votes = 0;
    }


}
// después debemos de exportar la clase para poder ser usada

module.exports = Band;