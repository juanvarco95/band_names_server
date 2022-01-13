const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
console.log('init server');

// bands.addBand(new Band('Queen'));
// bands.addBand(new Band('Bon Jovi'));
// bands.addBand(new Band('Metallica'));


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });
    
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        
        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    });
    
    client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        // io.emit('nuevo-mensaje', payload); // Emite a todos los clientes
        client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos los clientes menos al que lo emitió
    });
    
    client.on('vote-band', (payload) => {
        console.log(payload.id);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('create-band', (band) => {
        console.log(band.name);
        bands.addBand(new Band(band.name));
        io.emit('active-bands', bands.getBands());
        
    });
    
    client.on('delete-band', (band) => {
        console.log(band.id);
        bands.deleteBand(band.id);
        io.emit('active-bands', bands.getBands());
    })


    // client.on('emitir-otro-mensaje', (payload) => {
    //     console.log(payload);
    //     client.broadcast.emit('new-message', payload);
    // });

    // client.on('Culo', (payload) => {
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-culo', payload); 
    // })

  });