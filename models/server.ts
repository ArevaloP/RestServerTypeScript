import express, {Application} from 'express';
// import * as userRouter from '../routes/usuarios.route'; De esta forma se le asigna un alias, cuando se exporta mas de una variable, en el caso de arriba solo esta la exportacion por default
import cors from 'cors';

import userRouter from '../routes/usuarios.route';
import db from '../database/connection';

class Server{

    private app: Application;
    private port: string;
    private paths = {
        usuarios: '/api/usuarios'
    } 

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Conexión a la base de datos
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Definir las rutas
        this.routes();
    }
    
    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());

        //Carpeta pública
        this.app.use(express.static('public'));
    }

    async dbConnection(){

        try {

            await db.authenticate();
            console.log('Base de Datos online');
            
        } catch (error) {
            throw new Error( String(error) );
        }

    }

    routes(){
        this.app.use(this.paths.usuarios, userRouter)
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en el puerto: ' + this.port);
        });
    }
}

export default Server;