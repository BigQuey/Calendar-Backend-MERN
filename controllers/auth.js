//* esta importación se hizo solo para el speller
const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async(req,res = response)=>{
    const {email,password} =req.body
    
    try{
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese correo'
            })
        }
        usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password,salt )

        await usuario.save();

        //TODO generar el JWT
        const token = await generarJWT(usuario.id,usuario.name);
        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'Por Favor comuníquese con el ADMIN'
        })
    }
}

const loginUsuario = async(req,res)=>{
    const {email,password} = req.body
    try{
        const usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario no existe con ese correo'
            })
        }
        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                ok:false,
                msg: 'password incorrecto'
            });
        }
        //TODO generar el JWT
        const token = await generarJWT(usuario.id,usuario.name);
        

        res.json({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:"por favor comuníquese con el administrador"
        })
    }
}
const revalidarToken = async(req,res)=>{
    const {uid,name} = req;
    const token = await generarJWT(uid,name);
    res.json({
        ok:true,
        token,
    })
}
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}