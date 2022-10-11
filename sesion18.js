db.alumnos.aggregate([
//{ $unwind: "$evaluaciones" },
{
    $match:{
        $and:[{"ciudad" : "QUERETARO"}, {"nombre":/jose|ana/i}]
    }
},
{
    $project:{
        matricula:"$clave_alu", "evaluaciones":1, fecha:"$evaluaciones.fecha",
        alumno: { $concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"] }
    }
},
{
    $merge:{ into: "alumnosQueretaro"}
}
])


db.alumnos.aggregate([
{
    $lookup:{
        from: "alumnosQueretaro",
        localField: "clave_alu",
        foreignField: "matricula",
        as: "datosAlumnos"
    }
}
])

db.alumnos.aggregate([
{ $unwind: "$evaluaciones" },
{
    $match:{
        $and:[{"ciudad" : "QUERETARO"}, {"nombre":/jose|ana/i}]
    }
},
{
    $project:{
        matricula:"$clave_alu", materia:"$evaluaciones.materia", calificacion:"$evaluaciones.calificacion", 
        fecha:"$evaluaciones.fecha",
        alumno: { $concat:["$ap_paterno", " ", "$ap_materno", " ", "$nombre"] },
        _id:0
    }
}
,
{
    $merge:{ into: "alumnosEvalQueretaro"}
}
])


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
    $match: { clave_alu: { $in:[11030172, 11050190]}}
}
])

//11050190

//Listas solo los alumnos que si tienen evaluaciones en el Lookup
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
}
])


//Ejercicio
//Crear una nueva coleccion que contenga la ciudad, el nombre completo del alumno, el curp y el email llada alumnosCiudad
//Usando $lookup generar un arreglo con los datos de los alumnos que coincidan por ciudad, 
//mostrar solo los campos ciudad y alumnosCiudad