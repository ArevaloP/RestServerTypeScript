import dotenv from 'dotenv';
import Server from './models/server';

//Configuracion de dotenv
dotenv.config();

//Iniciar el servidor
const server = new Server();
server.listen();