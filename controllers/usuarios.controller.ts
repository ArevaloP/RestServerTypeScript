import { Request, Response } from "express";

import Usuario from '../models/usuario';


export const getUsuarios = async(req: Request, res: Response)=>{

    const usuarios = await Usuario.findAll();

    
    return res.json({usuarios});
}

export const getUsuario = async(req: Request, res: Response)=>{
    
    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(400).json({
            msg: `No existe el usuario con el id ${id}`
        });
    }else{
        return res.json(usuario);
    }
}


export const postUsuario = async(req: Request, res: Response)=>{
    
    const {body} = req;
    try {

        const existEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con le email: '+body.email 
            });
        }

        const usuario = await Usuario.create( body );
        
        return res.json(usuario);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }

} 


export const putUsuario = async(req: Request, res: Response)=>{
    
    const {id} = req.params;
    const {body} = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        await usuario.update(body);

        return res.json(usuario);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}

export const deleteUsuario = async(req: Request, res: Response)=>{
    
    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    
    await usuario.update({estado: false});
    // await usuario.destroy(); Eliminación física de la base de datos

    res.json(usuario);
}
