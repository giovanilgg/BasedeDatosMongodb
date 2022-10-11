db.alumnos.aggregate([
{
    $match:{
        $and:[{"estado":"QUERETARO"}, { materias:{ $exists:1}}]
    }
},
{
    $project:{ 
        _id:0,
        alumno:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
        materias:"$materias",
        slidematerias:{ $slice:["$materias", 3, 3] }
     }
},
{
    $project:{ 
        alumno:1,
        materias:1,
        slidematerias:1,
        diffmaterias:{ $setDifference:["$materias", "$slidematerias"] },
        intersecmaterias:{ $setIntersection:["$materias", "$slidematerias"] },
        unionmaterias:{ $setUnion:["$materias", "$slidematerias"] },
     }
},
{
    $project:{ 
        alumno:1,
        materias:1,
        slidematerias:1,
        diffmaterias:1,
        intersecmaterias:1,
        unionmaterias:1,
        esigualmaterias:{ $setEquals:["$materias", "$unionmaterias"] },
        essubsetmaterias:{ $setIsSubset:["$materias", "$slidematerias"] },
        essubsetmaterias2:{ $setIsSubset:["$slidematerias", "$materias"] },
     }
}
])

db.alumnos.aggregate([
{
    $match:{
        $and:[{"estado":"QUERETARO"}, { materias:{ $exists:1}}]
    }
},
{
    $project:{ 
        _id:0,
        alumno:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
     }
},
{
    $addFields:{
        replaceUno:{ $replaceOne:{ input:"$alumno", find:"A", replacement: "@"} },
        replaceTodo:{ $replaceAll:{ input:"$alumno", find:"A", replacement: "@"} }
    }
}
])



db.evaluacionesESP.aggregate([
{ $set:{ _id:"evaluacionesESP"}},
{ $group:{_id:"$ciudad", ncalif:{ $sum:1}, promedio:{$avg:"$evaluaciones.calificacion"} } },
{ $addFields:{ origen:"evaluacionesESP"} }, 
{
    $unionWith:{
        coll:"evaluacionesFIS",
        pipeline:[
            { $group:{_id:"$ciudad", ncalif:{ $sum:1}, promedio:{$avg:"$evaluaciones.calificacion"} } },
            { $addFields:{ origen:"evaluacionesFIS"} }
        ]
    }
},
{
    $unionWith:{
        coll:"evaluacionesOPT",
        pipeline:[
            { $group:{_id:"$ciudad", ncalif:{ $sum:1}, promedio:{$avg:"$evaluaciones.calificacion"} } },
            { $addFields:{ origen:"evaluacionesOPT"} }
        ]
    }
},
{ $sort:{ _id:1 }},
//,{ $count:"neval"}
])


//////


db.alumnos.aggregate([
{ $unwind: "$evaluaciones"},
{ $match:{"evaluaciones.materia":"FIS" } },
{ $project:{ _id:0,
        alumno:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
        ciudad:"$ciudad", evaluaciones:"$evaluaciones"
        }
},
{ $merge:{ into: "evaluacionesFIS"}}
])

//////


db.evaluacionesESP.aggregate([
{ $set:{ _id:"evaluacionesESP"}},
{
    $unionWith:{
        coll:"evaluacionesFIS",
        pipeline:[{ $set:{ _id:"evaluacionesFIS"} }]
    }
},
{
    $unionWith:{
        coll:"evaluacionesOPT",
        pipeline:[{ $set:{ _id:"evaluacionesOPT"} }, { $project:{ _id:1, alumno:1, evaluaciones:1}}]
    }
},
{ $sort:{ alumno:1 }}
//,{ $count:"neval"}
])



db.evaluacionesESP.aggregate([
{ $set:{ _id:"evaluacionesESP"}},
{
    $unionWith:{
        coll:"evaluacionesFIS",
        pipeline:[{ $set:{ _id:"evaluacionesFIS"} }]
    }
},
{
    $unionWith:{
        coll:"evaluacionesOPT",
        pipeline:[{ $set:{ _id:"evaluacionesOPT"} }, { $project:{ _id:1, alumno:1, evaluaciones:1}}]
    }
},
{ $sort:{ alumno:1 }},
{ $group:{ _id:"$alumno", ncalif:{$sum:1}, promedio:{ $avg:"$evaluaciones.calificacion"} } },
{ $project:{ alumno:"$_id", ncalif:"$ncalif", promedio:"$promedio", _id:0 }}
//,{ $count:"neval"}
])