const { response } = require('express');
const bcryptjs = require('bcryptjs');
const userModel = require('../models/auth-model');
const { generateJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response, next) => {

  try {
    
    const { first_name,last_name, email, password } = req.body

    let usuario = await userModel.findOne({email})
    if(usuario){
        return res.status(400).json({
            ok:false,
            msg:'Este correo ya ha sido registrado'
        })
    }

    const user = userModel()
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.password = password
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    let createdUser = await user.save()

    //Generar JWT
    const token = await generateJWT( createdUser.id, createdUser.first_name, createdUser.last_name )
    
    return res.status(201).json({
        ok:'true',
        msg:'User created',
        id:createdUser['_id'],
        first_name:createdUser['first_name'],
        last_name:createdUser['last_name'],
        email:createdUser['email'],
        token: token
    })

    next()

  } catch (error) {

    return res.status(400).json({
      ok: 'false',
      msg: 'Ha ocurrido un error',
    })

  }

}

const loginUsuario = async (req, res = response, next) => {

  const { email, password } = req.body

  try {
    let usuario = await userModel.findOne({email})

    if(!usuario){
        res.status(400).json({
            ok:false,
            msg:'Credenciales de acceso incorrectas'
        })
    }
    
    //Confirmar password
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Contraseña incorrecta'
        })
    }

    //Generar Token
    const token = await generateJWT( usuario.id, usuario.first_name, usuario.last_name )

    res.status(201).json({
        ok:'true',
        msg:'Logged in',
        id:usuario['_id'],
        first_name:usuario['first_name'],
        last_name:usuario['last_name'],
        date_created:usuario['date_created'],
        email:usuario['email'],
        token: token
    })

  } catch (error) {
    res.status(400).json({
        ok: 'false',
        msg: 'Ha ocurrido un error',
      })
  }


  next()
}

const revalidarToken = async (req, res = response, next) => {

    const uid = req.uid;
    const first_name = req.first_name;
    const last_name = req.last_name;
    
    const token = await generateJWT( uid, first_name,last_name );

    res.status(200).json({
        ok:true,
        msg:'Token renovado',
        uid:uid,
        first_name:first_name,
        last_name:last_name,
        token:token
    })

  next()

}

module.exports = { crearUsuario, loginUsuario, revalidarToken }
