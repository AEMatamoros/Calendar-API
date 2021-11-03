const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
//Midlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
//Controllers
const { createEvent, getEvents, getEvent, updateEvent,deleteEvent } = require('../controller/event-controller');
//Helpers
const { isDate } = require('../helpers/isDate');

router.use(validarJWT);

router.post('/',[
    check('start','Debe especificar una fecha de inicio').custom( isDate ),
    check('end','Debe especificar una fecha de finalizacion').custom( isDate ),
    check('event_title','Debe especificar el titulo').not().isEmpty(),
    check('event_description','Debe especificar la descripcion del evento'),
    validarCampos
],createEvent,(req,res)=>{

})

router.get('/',getEvents,(req,res)=>{

})

router.get('/:id',getEvent,(req,res)=>{

})

router.put('/:id',updateEvent,(req,res)=>{

})

router.delete('/:id', deleteEvent,(req,res)=>{
    
})


module.exports = router;