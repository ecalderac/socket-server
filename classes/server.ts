
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io'; //1-importando modulo de socketio
import http from 'http'; //3-http se utiliza ya q es un intermediario entre socket.io y express

import * as socket from '../sockets/socket';

export default class Server{
    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server; //2-configuracion de los sockets para emitir y escuchar eventos
    private httpServer: http.Server; //4-Este sera el servidor q se debera levantar y no el de express


    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app);//5-Le manda la configuracion que tiene express en app
        this.io = socketIO(this.httpServer);//configuracion del socketio

        this.escucharSockets();
    }



    public static get instance (){
        return this._intance || (this._intance = new this());
    }


    private escucharSockets(){

        console.log('Escuchando conexiones - sockets');
        //escuchando un socket desde la variable cliente, recordar que on = escucha
        this.io.on('connection', cliente => {

            console.log('Cliente Conectado');

            //Mensajes
            socket.mensaje( cliente, this.io );

            //Desconectar
            socket.desconectar( cliente );

        });

    }

    start( callback: Function ) {

        this.httpServer.listen( this.port, callback() ); //6-inicializando el http server

    }


}