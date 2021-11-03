const { response } = require('express');
const eventModel = require('../models/event-model'); 

const createEvent = async (req,res = response,next)=>{
    
    try {
        const event = eventModel( req.body );
        event.user = req.uid
        await event.save()
        res.status(201).json({
            ok:true,
            msg:'Creado correctamente',
            event
        })
    } catch (error) {
        if(error){
            console.log(error)
            res.status(400).json({
                ok:false,
                msg:'Ocurrio un error al crear el evento'
            })
        }
    }
    

    next()
}


const getEvents = async (req,res = response, next)=>{
    
    try {
        const events = await eventModel.find().populate('user');

        res.status(200).json({
            ok:true,
            events:events
        })

    } catch (error) {
        if(error){
            res.status(400).json({
                ok:false,
                msg:"Ocurrio un error al obtener los eventos"
            })
        }
    }


    next()
}

const getEvent = async (req,res=response, next)=>{

    const event = await eventModel.findById(req.params.id);

    if(!event){
        return res.status(400).json({
            ok:false,
            msg:'El id es incorrecto'
        })
    }

    if(event.user.toString() !== req.uid){
        return res.status(401).json({
            ok:false,
            msg:'No tiene provilegios de edicion para este evento'
        })
    }

    return res.status(200).json({
        ok:true,
        msg:'Evento obtenido deforma correcta',
        event
    })

    next();
}
const updateEvent = async (req,res = response, next)=>{

    const event = await eventModel.findById(req.params.id);

    if(!event){
        return res.status(400).json({
            ok:false,
            msg:'El id es incorrecto'
        })
    }

    if(event.user.toString() !== req.uid){
        return res.status(401).json({
            ok:false,
            msg:'No tiene provilegios de edicion para este evento'
        })
    }

    const newEvent ={
        ...req.body,
        user:req.uid
    }
    const eventoActualizado = await eventModel.findByIdAndUpdate(event.id, newEvent,{ new:true })//retorna el evento actualizado

    res.json({
        ok:true,
        msg:'Evento Actualizado',
        eventoActualizado
    })


}

const deleteEvent= async (req, res=response, next) => {

    const event = await eventModel.findById(req.params.id);

    if(!event){
        return res.status(400).json({
            ok:false,
            msg:'El id es incorrecto'
        })
    }

    if(event.user.toString() !== req.uid){
        return res.status(401).json({
            ok:false,
            msg:'No tiene provilegios de edicion para este evento'
        })
    }

    const status = await eventModel.findByIdAndRemove(req.params.id)
    res.status(200).json({
        ok:true,
        msg:"Evento eliminado correctamente",
        status:status
    })

    next();
} 

module.exports = {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
}