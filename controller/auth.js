const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = ( req,res = response )=>{

    const { name, email, password } = req.body;

    

    res.json({
        ok:true,
        msg:'registro'
    })
}

const loginUsuario = ( req,res =response )=>{


    const { email, password } = req.body;

    
    res.json({
        ok:true,
        msg:'login'
    })
}

const revalidarToken = ( req,res =response )=>{
    res.json({
        ok:true,
        msg:'renew'
    })
}

module.exports = {crearUsuario,loginUsuario,revalidarToken} 