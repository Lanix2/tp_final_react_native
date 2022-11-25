const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult} = require('express-validator')



const Users = require('../models/Users');

const ctrlUser = {}

/*
    -get_users
    get_users    
    post_nota
    -register_user
    -put_user
    -delete_user
    -login
*/


ctrlUser.get_user = async (req, res) => {
    
    const user = await Users.find()

    console.log(user)


    return res.json({
        msg: 'GET_user',
        usuario: user
    })
}



ctrlUser.get_notas = async (req, res) => {
    const {id_materia, id_usuario} = req.body

    return res.json({
        msg: 'get_users'
    })
}

ctrlUser.post_nota = async (req, res) => {
    const { tipo , nota} = req.body

    id_usuario = "635984a033895e6a07f96f84"
    id_materia = "635dc22c302c732ca1e0c1c3"

    await Users.updateOne(
        {id: id_usuario},{
            $push:{
                "notas": [{
                    "id_materia": id_materia,
                    "nota": nota,
                    "tipo": tipo
                }]
                
            }       
        }
    )

    const user = await Users.find()

    return res.json({
        msg: 'post_nota',
        notas: user
    })
}

ctrlUser.put_user = async (req, res) => {
    const {nombre, apellido, email, contrasena} = req.body
   
    const id_user = "63583cbff45a6e030ff8a78f"

    //validar campos

    const salt = await bcrypt.genSalt(10)       

    const contrasena_fin = await bcrypt.hash(contrasena, salt)
    
    await Users.updateOne(
        {id: id_user},{
            $set:{
                "nombre": nombre,
                "apellido": apellido,
                "email": email,
                "contrasena": contrasena_fin
                
            }       
        }
    )
    
    const user = await Users.find()

    return res.json({
        msg: 'PUT_user',
        user: user
    })
}

ctrlUser.delete_user = async (req, res) => {

    const id_user = "635984a033895e6a07f96f84"

    await Users.deleteOne({_id: id_user})

    const user = await Users.find()

    return res.json({
        msg: 'delete_user',
        user: user
    })
}

ctrlUser.auth = (req, res) => {
    const token = req.header('x-auth-token')
    // const token2 = jwt.sign("tukituki", '123',);
    let logeado = false
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err){
            console.log("no hay token");
        }else{
            logeado = true
        }
    })

    return res.json({
        log: logeado
    })
}


ctrlUser.login = async (req, res) => {
    const { email, contrasena } = req.body
    //console.log(email);
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors :  errors.array()})
    }

    console.log(req.body)
//check user existence
    try {
        let user = await Users.findOne({email})
        if(!user){
            return res.json({msg: 'user not found', login: false })  
        }
        
        const isMatch = await bcrypt.compare(contrasena, user.contrasena)

        if(!isMatch){ 
            return res.json({msg: 'las credenciales no son correctas', login: false }) 
        }

        //return jsonwebtoken
        
        const payload = {
            user : {
                id: user.id
            }
        }

        console.log(user.id)

        const token = jwt.sign(payload, process.env.SECRET);

        // const token = jwt.sign(
        //     payload, 
        //     {expiresIn: 3600},
        //     (err, token) => {
        //         if(err) throw err
        //         res.json({token})
        //     }
        // )

       // jwt.verify(token, config.get('jwtSecret'))

        return res.json({
            token: token
            ,login: true
            ,nombre: user.nombre
            ,apellido: user.apellido 
            ,email: user.email
            ,tipo: user.tipo
        })
    
        /* console.log('user created')
        res.json({msg:'datos correctos user creado', datos : req.body.name + req.body.email}) */

    } catch (error) {
        console.error(error.message)
        return res.status(500).send('server error')
    }
}

ctrlUser.register_user = async (req, res) => {
    
    console.log(req.body)
    
    const {nombre, apellido ,email, contrasena, tipo } = req.body

    console.log('incoming data=>', nombre, apellido, email, contrasena, tipo)

    

    try {
        let user = await Users.findOne({email})
        if (user){ res.status(400).json({errors : [{msg: 'el usuario ya existe'}] })  }

        user = new Users({
            "nombre" : nombre,
            "apellido" : apellido,
            "email" : email,
            "contrasena" : contrasena,
            "tipo" : tipo,
            "documentacion" : ""

        })

        const salt = await bcrypt.genSalt(10)

        user.contrasena = await bcrypt.hash(contrasena, salt)

        await user.save()

        return res.json("correcto")
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}





module.exports = ctrlUser