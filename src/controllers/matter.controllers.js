const ctrlMatter = {}

const Career = require("../models/Career")

/*
-get_matter
-get_career
-post_matter
-post_news
-put_matter
-delete_matter
*/

//id' : '635dad318f17621ee2508d83
//{'cuatrimestres': {$elemMatch: { 'cuatrimestre' : 1}}}
//: { $elemMatch: {'descripcion': 'Javascript'}}
//: { $elemMatch: {'cuatrimestre': cuatrimestre}}
//,{'cuatrimestres.$': 1}
ctrlMatter.get_matter = async (req, res) => {

    //const todos = true 
    const id_matter = "635dc22c302c732ca1e0c1c3"//materia en caso de estar dentro
    const cuatrimestre = 1
    
    
    const matter = await Career.find(  {'cuatrimestres.cuatrimestre':  cuatrimestre}
    ,{'cuatrimestres.$': 1})

    const materias = matter[0].cuatrimestres[0].materias.filter(x => x.id == id_matter)
    
    console.log(materias);

    return res.json({
        msg: 'GET_matter',
        matter: materias,
        matters: matter
    })
}

ctrlMatter.get_career = async (req, res) => {

    const career = await Career.find()

    return res.json({
        msg: 'get_career',
        career: career
    })
}


ctrlMatter.post_matter =  async (req, res) => {
    const id_carrera = "635dad318f17621ee2508d82" //tomamos la carrera en la cual esta situada
    const tipo = 2 //tomamos el tipó de usuario
    const anio = 1
    const { materia, descripcion, cuatrimestre } = req.body

    if(tipo == 2){
        if(materia == "" || descripcion == "" ){
            return res.status(400).json({errors : [{msg: 'Campos vacíos'}] })  
        }
    
        await Career.updateOne(
            {id: id_carrera},{
                $push:{
                    "cuatrimestres.$[cuatrim].materias": [{
                        "materia": materia
                        ,"descripcion": descripcion
                        ,"noticias" : []
                    }]
                    
                }       
            },
            {arrayFilters: [{
                "cuatrim.cuatrimestre": cuatrimestre
              }]}
        )

        const careers = await Career.find()

        
        console.log("matter")

        return res.json({
            msg: 'POST_matter',
            carrera: careers
        })
    }

    
}

ctrlMatter.post_career = async (req, res) => {
    const { carrera, descripcion, duracion } = req.body

    if(carrera == "" || descripcion == "" || duracion == ""){
        return res.status(400).json({errors : [{msg: 'Campos vacíos'}] })  
    }

    const career = new Career({
        "carrera" : carrera
        ,"descripcion" : descripcion
        ,"duracion" : duracion
        ,"anio" : 1
        ,"cuatrimestres" : [{
            "cuatrimestre" : 1
            ,"materias": []
        },
        {
            "cuatrimestre" : 2
            ,"materias": []
        }]
        ,"asistencias" : []
    })

    await career.save()

    return res.json({
        msg: 'post_career'
    })
}
ctrlMatter.post_news = async (req, res) => {
    const {titulo, descripcion} = req.body
    const tipo = 2//tipo de usuario
    const cuatrimestre = 1
    const id_carrera = "635dad318f17621ee2508d82"
    const id_materia = "635dc22c302c732ca1e0c1c3"

    if(titulo == "" || descripcion == ""){
        return res.status(400).json({errors : [{msg: 'Campos vacíos'}] })  
    }

    if(tipo == 2){

        await Career.updateOne(
            {id: id_carrera},{
                $push:{
                    "cuatrimestres.$[cuatrim].materias.$[mater].noticias": [{
                        "titulo": titulo
                        ,"descripcion": descripcion
                        ,"archivos" : "../files"
                    }]
                    
                }       
            },
            {arrayFilters: [
                {"cuatrim.cuatrimestre" : cuatrimestre},
                {
                "mater._id": id_materia                
              }]}
        )

    }

    const careers = await Career.find()


    return res.json({
        msg: 'post_news',
        news: careers
    })
}


ctrlMatter.put_matter = async (req, res) => {

    const {descripcion, materia} = req.body
    const id_carrera = "635dad318f17621ee2508d82"
    const id_matter = "635dc22c302c732ca1e0c1c3"
    const tipo = 2
    const cuatrimestre = 1

    if(tipo == 2){
        await Career.updateOne(
            {id: id_carrera},{
                $set:{
                    "cuatrimestres.$[cuatrim].materias.$[mater].descripcion": descripcion,
                    "cuatrimestres.$[cuatrim].materias.$[mater].materia": materia,
                    
                }       
            },
            {arrayFilters: [
                {"cuatrim.cuatrimestre" : cuatrimestre},
                {
                "mater._id": id_matter                 
              }]}
        )
    }


    const careers = await Career.find()

    return res.json({
        msg: 'PUT_matter',
        put_matter: careers
    })
}

ctrlMatter.delete_matter = async (req, res) => {

    const id_carrera = "63607683d3236dd249a41a00"
    const id_matter = "635dc22c302c732ca1e0c1c3"
    const tipo = 2
    const id_cuatrimestre = "635dad318f17621ee2508d83"
    const cuatrimestre = 1

    await Career.updateOne(
        {id: id_carrera},{
            $pullAll:{
                "cuatrimestres.materias": [{ _id: [ id_matter]}]}
                
            }       
        
    )

    //ver borrar
    
    //const materias = matter[0].cuatrimestres[0].materias.filter(x => x.id == id_matter)

    //console.log(matter);
    

    const careers = await Career.find()

    return res.json({
        msg: 'delete_matter',
        career: careers
    })
}





module.exports = ctrlMatter