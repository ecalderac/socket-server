import { Socket } from 'socket.io';
import SocketIO from 'socket.io';






export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

}


//Escuchar mensajes
export const mensaje =  ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('mensaje', (payload:{de:string, cuerpo:string} ) => {

        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });

}
