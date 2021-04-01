// mensajes de sockets
const {io} = require('../index.js');
const Bands = require('../models/bands.js');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Asking alexandria'));
bands.addBand( new Band('Bon jovi'));
bands.addBand( new Band('Heroes del silencio'));
bands.addBand( new Band('Justin Bieber'));


console.log(bands);

io.on('connection', client => {
    console.log('Cliente conectado');

    // para mandar el arreglo de bandas registradas a los clientes conectados
    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('CLiente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje',{ admin: 'Nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {
        console.log(payload);
        // ahora debemos mandar a llamar el método voteBand
        bands.voteBand( payload.id );
        // por último debemos de notificar que hubo un cambio en el server
        // client.emit('active-bands', bands.getBands());
        // se puede ocupar el código anterior pero no solo vamos a notificar al cliente conectado sino a todos
        // usamos io, porque io se refiere al servidor
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band', (payload) => {
        console.log(payload);
        bands.addBand( new Band(payload.name) );
        io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band', (payload) => {
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // el servidor estará escuchando el nuevo-mensaje y devolverá el payload
    client.on('emitir-mensaje', ( payload ) => {
        // el emit emite a todos los clientes conectados
        // io.emit('nuevo-mensaje',payload);
        // emite a todos excepto al que emite el mensaje
        // console.log(payload);
        client.broadcast.emit('nuevo-mensaje',payload); 
    });

});