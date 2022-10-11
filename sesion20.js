db.alumnos.aggregate([
    { $match: {ciudad: "QUERETARO"}},
    { $group:{ _id: "$colonia", "nalu":{ $sum: 1}} },
    { $sort:{ nalu: -1}}
])
    
db.alumnos.explain().aggregate([
    { $match: {ciudad: "QUERETARO"}},
    { $group:{ _id: "$colonia", "nalu":{ $sum: 1}} },
    { $sort:{ nalu: -1}}
])

###### $MIN $MAX

    
db.alumnos.aggregate([
  { $unwind: "$evaluaciones" },
  { $match: { "ciudad": "QUERETARO"} },
  { $group:
       { _id:{clave_alu:"$clave_alu", nombre:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]} },
         primeraCalif:{$first:'$evaluaciones.calificacion'},
         ultimaCalif:{$last:'$evaluaciones.calificacion'},
         maxCalif:{$max:'$evaluaciones.calificacion'},
         minCalif:{$min:'$evaluaciones.calificacion'},
         "ncalif":{$sum:1}
  }
}
])

db.alumnos.aggregate([
    { $match: { $and:[{ciudad: "QUERETARO"}, {colonia:/(centro|marques)/i}] } },
    { $match: {"evaluaciones":{$exists:1}}} ,
    { $addFields:{ sumaCalif:{ $sum: "$evaluaciones.calificacion"} }},
    { $addFields:{ promCalif:{ $avg: "$evaluaciones.calificacion"} }},
    { $addFields:{ maxCalif:{ $max: "$evaluaciones.calificacion"} }},
    { $addFields:{ minCalif:{ $min: "$evaluaciones.calificacion"} }},
    { $addFields:{ primerCalif:{ $first: "$evaluaciones.calificacion"} }},
    { $addFields:{ ultimaCalif:{ $last: "$evaluaciones.calificacion"} }}
])
   
    
db.alumnos.aggregate([
    { $match: { $and:[{ciudad: "QUERETARO"}, {colonia:/(centro|marques)/i}] } },
    //{ $match: {"evaluaciones":{$exists:1}}} ,
    { $addFields:{ sumaCalif:{ $sum: "$evaluaciones.calificacion"} }},
    { $addFields:{ promCalif:{ $avg: "$evaluaciones.calificacion"} }},
    { $addFields:{ maxCalif:{ $max: "$evaluaciones.calificacion"} }},
    { $addFields:{ minCalif:{ $min: "$evaluaciones.calificacion"} }},
    { $addFields:{ primerCalif:{ $first: "$evaluaciones.calificacion"} }},
    { $addFields:{ ultimaCalif:{ $last: "$evaluaciones.calificacion"} }},
    { $match: {ciudad: "QUERETARO"}},
    { $group:{ _id: "$colonia", "nalu":{ $sum: 1}, promedio:{ $avg: "$promCalif"} ,
         maxCalif:{ $max: "$maxCalif"}, minCalif:{ $min: "$minCalif"} } },
    { $sort:{ nalu: -1}}
])


db.alumnos.aggregate([
    { $match: { $and:[{ciudad: "QUERETARO"}, {colonia:/(centro|marques)/i}] } },
    { $match: {"evaluaciones":{$exists:1}}} ,
    { $addFields:{ 
        sumaCalif:{ $sum: "$evaluaciones.calificacion"} ,
        promCalif:{ $avg: "$evaluaciones.calificacion"} ,
        maxCalif:{ $max: "$evaluaciones.calificacion"} ,
        minCalif:{ $min: "$evaluaciones.calificacion"} ,
        primerCalif:{ $first: "$evaluaciones.calificacion"} ,
        ultimaCalif:{ $last: "$evaluaciones.calificacion"} 
       }
    },
    {
        $addFields:{ totalesCalif:{ $add:["$promCalif", "$maxCalif", "$minCalif", 
                                    "$primerCalif", "$ultimaCalif", "$sumaCalif"] }}
    },
    { $group:{ _id:{clave_alu:"$clave_alu", nombre:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]} },
            valores:{ $push:{
                    sumaCalif: "$sumaCalif",
                    promCalif: "$promCalif",
                    maxCalif: "$maxCalif",
                    minCalif: "$minCalif",
                    primerCalif: "$primerCalif",
                    ultimaCalif: "$ultimaCalif",
                    totales: "$totalesCalif"
                }}
        } 
     },
     { $project: { matricula:"$_id.clave_alu", alumno:"$_id.nombre", valores:"$valores", _id:0 }}
])




