db.alumnos.aggregate([
    { $unwind: "$evaluaciones" },
    { 
        $group:{ _id:{alumno:{$concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]} },
                promCalif:{ $avg:"$evaluaciones.calificacion"}
                },
        
    },
    {
        $project:{
            _id:0, alumno:"$_id.alumno", promCalif:"$promCalif",
            observacion: {
                $switch:{
                    branches:[
                        {
                            case: { $eq : [ { $avg : "$promCalif" }, 10 ] },
                            then: "Excelente calificacion!"
                        },
                        {
                            case: { $and:[{$gte : [ { $avg : "$promCalif" }, 8 ]}, {$lt : [ { $avg : "$promCalif" }, 10 ]}] },
                            then: "Buena Calificacion!"
                        },
                        {
                            case: { $and:[{$gte : [ { $avg : "$promCalif" }, 6 ]}, {$lt : [ { $avg : "$promCalif" }, 8 ]}] },
                            then: "Calificacion Regular!"
                        },
                        {
                            case: { $lt : [ { $avg : "$promCalif" }, 6 ] },
                            then: "Mala calificacion!"
                        }
                    ],
                    default: "Sin calificacion para evaluar"
                }
            }
        }
    },
    { $sort:{promCalif:-1}}
])

db.alumnos.aggregate([
    { $match:{ evaluaciones:{$exists:1}}},
    { $project:{
        alumno:{$concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]}, 
        califGTE8:{
            $filter:{
                input:"$evaluaciones",
                as:"evaluaciones",
                cond:{ $gte:["$$evaluaciones.calificacion", 8] }
            }
        }
      }
    },
    {$sort:{ alumno:1}}
])


db.alumnos.aggregate([
    { $match:{ 
        "_id" : ObjectId("5f873e4a7591b0b48f65fd0f")
        //evaluaciones:{$exists:1}
        }},
    { $unwind:"$evaluaciones" },
    { $sort: {"evaluaciones.calificacion": -1, "evaluaciones.materia": 1}},
    { $group:{ _id:{oid:"$_id", alumno:{$concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]} }, 
        evaluaciones:{ $push:{ materia:"$evaluaciones.materia", calificacion:"$evaluaciones.calificacion"} }
       }
     },
     { $project:{
        _id:0,
        alumno:"$_id.alumno", 
        califGTE8:{
            $filter:{
                input:"$evaluaciones",
                as:"evaluaciones",
                cond:{ $gte:["$$evaluaciones.calificacion", 8] }
            }
        }
      }
    },
    {$sort:{ alumno:1}}
    
])


