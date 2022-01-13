const { io } = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
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

    // client.on('emitir-otro-mensaje', (payload) => {
    //     console.log(payload);
    //     client.broadcast.emit('new-message', payload);
    // });

    // client.on('Culo', (payload) => {
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-culo', payload); 
    // })

  });