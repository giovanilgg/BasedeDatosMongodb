db.alumnos.aggregate([
{
    $lookup:{
        from: "alumnosEvalQueretaro",
        localField: "clave_alu",
        foreignField: "matricula",
        as: "evaluacionesAlumnos"
    }
}
,
{
    $match: { 
           $expr: {$gt: [{$size: "$evaluacionesAlumnos"}, 0]}
        }
},
{
    $project:{ "alumno":{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]}, clave_alu:1, "evaluacionesAlumnos":1, _id:0 }
},
{
    $unwind: "$evaluacionesAlumnos"
},
{
    $group:{ 
        "_id":{ clave_alu: "$clave_alu", alumno: "$alumno", anio:{ $dateToString : {format : "%Y", date : "$evaluacionesAlumnos.fecha"}}}, 
        promedio:{ $avg:"$evaluacionesAlumnos.calificacion"},
        nmaterias:{ $sum:1}  
    }
},
{ $sort: { "_id.alumno" : 1 }},
{ $project:{ _id:0, clave_alu:"$_id.clave_alu", alumno:"$_id.alumno", anio:"$_id.anio", promedio:1, nmaterias:1 }  },
{ $project:{ clave_alu:1, alumno:1, anio:1, promedio:"$promedio", nmaterias:"$nmaterias" }  }
//{ $match: { "_id.clave_alu": 11050190 } }
//,{ $count: "nalu"}
])