const ctrlAssistance = {}
const Career = require("../models/Career")

ctrlAssistance.get_assistance = async (req, res) => {
    const id_carrera = "635dad318f17621ee2508d82"

    const career = await Career.find({id: id_carrera})
    

    return res.json({
        msg: 'GET_assistance',
        assist: career
    })
}


ctrlAssistance.post_assistance = async (req, res) => {
    const {fecha} = req.body //ademas va el usuario a quien asistió

    const id_carrera = "635dad318f17621ee2508d82"
    const id_user = "63583cbff45a6e030ff8a78f"

    const tipo = 2

    const fecha_fin =new Date(fecha).toISOString()

    if(tipo == 2){
        await Career.updateOne(
            {_id: id_carrera},{
                $push:{
                    "asistencias": [{
                        "fecha": fecha_fin
                        ,"id_usuarios": id_user
                    }]
                    
                }       
            }
        )    
    }
    

    const assis = await Career.find()

    return res.json({
        msg: 'POSTassistance',
        asis: assis
    })
}

module.exports = ctrlAssistance