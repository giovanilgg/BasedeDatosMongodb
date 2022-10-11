db.getCollection('alumnos').find({"clave_alu" : 11050235 })

db.alumnos.aggregate([
    { $match: {"clave_alu" : 11050235 } },
    { $unwind: "$materias" }
])
    
db.alumnos.aggregate([
    { $match: {"clave_alu" : 11050235 } },
    { $unwind: "$evaluaciones" }
])
    
db.alumnos.aggregate([
    { $match: {"clave_alu" : 11050235 } },
    { $unwind: "$calificaciones" }
])
    
db.alumnos.aggregate([
    { $match: {"clave_alu" : 11050235 } },
    { $unwind: "$evaluaciones" },
    { $unwind: "$materias" }
])
    
db.alumnos.aggregate([
    { $match: {"clave_alu" : 11050235 } },
    { $unwind: "$edad" },
    { $count: "ndocu"}
])
    
db.alumnos.aggregate([
    { $unwind: "$evaluaciones" },
    { $count: "ndocu"}
])
    
    
db.alumnos.aggregate([
    { $match: {"evaluaciones" : {$exists: 1} } },
    { $unwind: "$evaluaciones" },
    { $group: {  
            "_id":{ clave_alu: "$clave_alu" , alumno:{ $concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"] } }, 
            "noevaluciones":{ $sum: 1} ,
            "promedio":{ $avg: "$evaluaciones.calificacion"}
        }
    }
])
    
db.alumnos.find({"evaluaciones" : {$exists: 1} } ).count()
 
db.alumnos.aggregate([
    //{ $match: {"evaluaciones" : {$exists: 1} } },
    { $unwind: "$evaluaciones" },
    { $group: {  
            "_id":{ clave_alu: "$clave_alu" , alumno:{ $concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"] } }, 
            "noevaluciones":{ $sum: 1} ,
            "promedio":{ $avg: "$evaluaciones.calificacion"},
            "maxima":{ $max: "$evaluaciones.calificacion"},
            "min":{ $min: "$evaluaciones.calificacion"}
        }
    }
])
    
db.alumnos.aggregate([
    //{ $match: {"evaluaciones" : {$exists: 1} } },
    { $unwind: "$evaluaciones" },
    { $group: {  
            "_id":{ clave_alu: "$clave_alu" , alumno:{ $concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"] } }, 
            "noevaluaciones":{ $sum: 1} ,
            "promedio":{ $avg: "$evaluaciones.calificacion"},
            "maxima":{ $max: "$evaluaciones.calificacion"},
            "min":{ $min: "$evaluaciones.calificacion"}
        }
    },
    {$project:{ _id:0, matricula:"$_id.clave_alu", alumno:"$_id.alumno", noevaluaciones:1, promedio:1, maxima:1, minima:"$min" }},
    {$sort:{ promedio:-1} }
])
    
db.alumnos.aggregate([
    //{ $match: {"evaluaciones" : {$exists: 1} } },
    { $unwind: "$evaluaciones" },
    { $group: {  
            "_id":{ clave_alu: "$clave_alu" , alumno:{ $concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"] } }, 
            "noevaluaciones":{ $sum: 1} ,
            "promedio":{ $avg: "$evaluaciones.calificacion"},
            "maxima":{ $max: "$evaluaciones.calificacion"},
            "min":{ $min: "$evaluaciones.calificacion"}
        }
    },
    {$project:{ _id:0, matricula:"$_id.clave_alu", alumno:"$_id.alumno", noevaluaciones:1, promedio:1, maxima:1, minima:"$min" }},
    {$sort:{ promedio:-1} },
    //{ $count: "ndocu"}
])

//Mostrar solo a los alumnos reprobados en el promedio final
db.alumnos.aggregate([
    {$match: {"sexo": "M" } },
    {$unwind: "$evaluaciones"},
    {$group: { 
        "_id": {
            clave_alu: "$clave_alu", 
            alumno:{$concat: ["$nombre"," ","$ap_paterno", " ","$ap_materno"] } 
            },
         "noEvaluaciones":{$sum:1},
         "promedio": {$avg: "$evaluaciones.calificacion"},
         "maxCalif": {$max: "$evaluaciones.calificacion"},
         "minCalif": {$min: "$evaluaciones.calificacion"},
      }    
    },
    {$project: {_id:0, matricula: "$_id.clave_alu", alumno: "$_id.alumno", noEvaluaciones:1, promedio:1,
        maxCalif:1, minCalif:"$minCalif"}},
     {$sort: {promedio:-1}},
     {$match: {promedio:{$lt: 6.00}}},
     //{$count: "ndocu"}
])    
    
    
    
    
//Listar las alumnos que hayan reprobado al menos una materia
db.alumnos.aggregate([
    { $match: {"sexo" : "F" } },
    { $unwind: "$evaluaciones" },
    { $match:{ "evaluaciones.calificacion":{$lt:6.00}}},
    { $group: {  
            "_id":{ clave_alu: "$clave_alu" , alumno:{ $concat:["$nombre", " ", "$ap_paterno", " ", "$ap_materno"] } }, 
            "noreprobadas":{ $sum: 1} 
        }
    },
    { $project: {_id:0, matricula: "$_id.clave_alu", alumno: "$_id.alumno", noreprobadas:1,}},
    { $sort: {noreprobadas:-1}},
    //{ $count: "ndocu"}

])

