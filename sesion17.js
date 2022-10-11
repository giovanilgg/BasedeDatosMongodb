db.alumnos.aggregate([
    { $unwind : "$evaluaciones" },
    {
        $group:{ 
            _id: "$evaluaciones.materia",
            fmax:{ $max: "$evaluaciones.fecha"},
            fmin:{ $min: "$evaluaciones.fecha"}
        }
    },
    {
        $group:{ 
            _id:{ fmax:"$fmax", fmin:"$fmin" }
        }
    },
    {
        $project:{ _id:0, fmax:"$_id.fmax", fmin:"$_id.fmin"}
    }
])
    
    
db.alumnos.aggregate([
    { $unwind : "$evaluaciones" },
    { $match:{
            $and:[
                {"evaluaciones.fecha":{ $gte: ISODate("2020-12-01T00:00:00.000Z") } },
                {"evaluaciones.fecha":{ $lte: ISODate("2021-02-28T00:00:00.000Z") } }
            ]
        }
    },
    {
        $group:{ 
            _id: "$ciudad",
            fechaMax:{ $max: "$evaluaciones.fecha"},
            fechaMin:{ $min: "$evaluaciones.fecha"},
            calificacionNumero:{ $sum: 1 },
            calificacionTotal :{ $sum: "$evaluaciones.calificacion"},
            calificacionPromedio :{ $avg: "$evaluaciones.calificacion"}
        }
    }
])
    
//user $merge
db.alumnos.aggregate([
    { $unwind : "$evaluaciones" },
    { $match:{
            $and:[
                {"evaluaciones.fecha":{ $gte: ISODate("2020-12-01T00:00:00.000Z") } },
                {"evaluaciones.fecha":{ $lte: ISODate("2021-02-28T00:00:00.000Z") } }
            ]
        }
    },
    {
        $group:{ 
            _id: "$ciudad",
            fechaMax:{ $max: "$evaluaciones.fecha"},
            fechaMin:{ $min: "$evaluaciones.fecha"},
            calificacionNumero:{ $sum: 1 },
            calificacionTotal :{ $sum: "$evaluaciones.calificacion"},
            calificacionPromedio :{ $avg: "$evaluaciones.calificacion"}
        }
    },
    {
        $project:{ _id:0, ciudad:"$_id", fechaMax: 1, fechaMin:1, calificacionNumero:1, calificacionTotal :1, calificacionPromedio :1}
    },
    { $sort:{ ciudad : 1} },
    {
        $merge:{ into: "ciudadevaluaciones", on: "_id", whenMatched: "replace", whenNotMatched: "insert"}
    }
])
    
    
 //merge con _id null
    
db.alumnos.aggregate([
    { $unwind : "$evaluaciones" },
    { $match:{
            $and:[
                {"evaluaciones.fecha":{ $gte: ISODate("2020-12-01T00:00:00.000Z") } },
                {"evaluaciones.fecha":{ $lte: ISODate("2021-02-28T00:00:00.000Z") } }
            ]
        }
    },
    {
        $group:{ 
            _id: "$ciudad",
            fechaMax:{ $max: "$evaluaciones.fecha"},
            fechaMin:{ $min: "$evaluaciones.fecha"},
            calificacionNumero:{ $sum: 1 },
            calificacionTotal :{ $sum: "$evaluaciones.calificacion"},
            calificacionPromedio :{ $avg: "$evaluaciones.calificacion"}
        }
    },
    {
        $project:{ 
            _id:0, ciudad:{ $ifNull:["$_id", "Sin Dato"] }, fechaMax: 1, fechaMin:1, calificacionNumero:1, 
            calificacionTotal :1, calificacionPromedio :1
        }
    },
    { $sort:{ ciudad : 1} },
    {
        $merge:{ into: "cdevaluaciones", on: "_id", whenMatched: "replace", whenNotMatched: "insert"}
    }
])
    
//out, crea una nueva coleccion sin hacer merge
    
db.alumnos.aggregate([
    { $unwind : "$evaluaciones" },
    { $match:{
            $and:[
                {"evaluaciones.fecha":{ $gte: ISODate("2020-12-01T00:00:00.000Z") } },
                {"evaluaciones.fecha":{ $lte: ISODate("2021-02-28T00:00:00.000Z") } }
            ]
        }
    },
    {
        $group:{ 
            _id: "$ciudad",
            fechaMax:{ $max: "$evaluaciones.fecha"},
            fechaMin:{ $min: "$evaluaciones.fecha"},
            calificacionNumero:{ $sum: 1 },
            calificacionTotal :{ $sum: "$evaluaciones.calificacion"},
            calificacionPromedio :{ $avg: "$evaluaciones.calificacion"}
        }
    },
    {
        $project:{ 
            _id:0, ciudad:{ $ifNull:["$_id", "Sin Dato"] }, fechaMax: 1, fechaMin:1, calificacionNumero:1, 
            calificacionTotal :1, calificacionPromedio :1
        }
    },
    { $sort:{ ciudad : 1} },
    {
        $out: "cdevaluaciones" 
    }
])
    
    
    
    