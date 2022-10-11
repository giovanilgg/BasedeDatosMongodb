//Listar el promedio por materias
db.alumnos.aggregate([
    { $unwind: "$evaluaciones" },
    {$group: { 
        "_id": "$evaluaciones.materia",
         "noEvaluaciones":{$sum:1},
         "promedio": {$avg: "$evaluaciones.calificacion"},
         "maxCalif": {$max: "$evaluaciones.calificacion"},
         "minCalif": {$min: "$evaluaciones.calificacion"},
      }    
    },
    {$project: {_id:0, materia: "$_id", noEvaluaciones:1, promedio:1, maxCalif:1, minCalif:"$minCalif"}},
    {$match: {promedio:{$gte: 7.00}}},
    {$sort:{ promedio: -1}}
])
    
//Operadores de Fecha
db.alumnos.aggregate([
    { $match: {"clave_alu" : 11050235 } },
    { $unwind: "$evaluaciones" },
    { $project:{
            fecha: "$evaluaciones.fecha",
            anio: { $year: "$evaluaciones.fecha" },
            mes: { $month: "$evaluaciones.fecha" },
            dia: { $dayOfMonth: "$evaluaciones.fecha" },
            hora: { $hour: "$evaluaciones.fecha" },
            minuto: { $minute: "$evaluaciones.fecha" },
            segundo: { $second: "$evaluaciones.fecha" },
            milisegundo: { $millisecond: "$evaluaciones.fecha" },
            diaAnio: { $dayOfYear: "$evaluaciones.fecha" },
            diaSemana: { $dayOfWeek: "$evaluaciones.fecha" },
            semana: { $week: "$evaluaciones.fecha" },
            calificacion:  "$evaluaciones.calificacion",
            califx100: { $multiply:["$evaluaciones.calificacion", 100] },
            fmes: { $dateToString:{ format: "%m", date: "$evaluaciones.fecha"} },
            ffecha: { $dateToString:{ format: "%Y-%m-%d", date: "$evaluaciones.fecha"} },
            fechany: { $dateToString:{ format: "%Y-%m-%d %H:%M:%S:%L%z", date: "$evaluaciones.fecha", timezone:"America/New_York"} },
            fecha05: { $dateToString:{ format: "%Y-%m-%d %H:%M:%S:%L%z", date: "$evaluaciones.fecha", timezone:"+05:00"} }
        }
     }
])    
    
    ,
     {$group: { 
        "_id": "$anio",
         "noEvaluaciones":{$sum:1},
         "promedio": {$avg: "$calificacion"},
         "maxCalif": {$max: "$calificacion"},
         "minCalif": {$min: "$calificacion"},
      }    
    },
     
 db.alumnos.aggregate([
    { $match: {"actualizado" : {$exists:1} } },
    { $project:{
            fecha: "$actualizado",
            anio: { $year: "$actualizado" },
            mes: { $month: "$actualizado" },
            dia: { $dayOfMonth: "$actualizado" },
            hora: { $hour: "$actualizado" },
            minuto: { $minute: "$actualizado" },
            segundo: { $second: "$actualizado" },
            milisegundo: { $millisecond: "$actualizado" },
            diaAnio: { $dayOfYear: "$actualizado" },
            diaSemana: { $dayOfWeek: "$actualizado" },
            semana: { $week: "$actualizado" },
            calificacion:  "$evaluaciones.calificacion",
            califx100: { $multiply:["$evaluaciones.calificacion", 100] },
            fmes: { $dateToString:{ format: "%m", date: "$actualizado"} },
            ffecha: { $dateToString:{ format: "%Y-%m-%d", date: "$actualizado"} },
            fechany: { $dateToString:{ format: "%Y-%m-%d %H:%M:%S:%L%z", date: "$actualizado", timezone:"America/New_York"} },
            fechacdmx: { $dateToString:{ format: "%Y-%m-%d %H:%M:%S:%L%z", date: "$actualizado", timezone:"America/Mexico_City"} },
            fecha00: { $dateToString:{ format: "%Y-%m-%d %H:%M:%S:%L%z", date: "$actualizado"} }
        }
     }
])
    
//db.getCollection('alumnos').find({})

db.alumnos.aggregate([
    { $match: {"actualizado" : {$exists:1} } },
    { $project:{
            fecha: "$actualizado",
            anio: { $year: "$actualizado" },
            fechacdmx: { $dateToString:{ format: "%Y-%m-%d %H:%M:%S:%L%z", date: "$actualizado", timezone:"America/Mexico_City"} },
            fechamasyear:{ $dateAdd:{ startDate: "$actualizado", unit: "year", amount: 3} },
            fechamasquarter:{ $dateAdd:{ startDate: "$actualizado", unit: "quarter", amount: 3} },
            fechamasweek:{ $dateAdd:{ startDate: "$actualizado", unit: "week", amount: 3} },
            fechamasmonth:{ $dateAdd:{ startDate: "$actualizado", unit: "month", amount: 3} },
            fechamasday:{ $dateAdd:{ startDate: "$actualizado", unit: "day", amount: 3} },
            fechamashour:{ $dateAdd:{ startDate: "$actualizado", unit: "hour", amount: 3} },
            fechamasminute:{ $dateAdd:{ startDate: "$actualizado", unit: "minute", amount: 3} },
            fechamassecond:{ $dateAdd:{ startDate: "$actualizado", unit: "second", amount: 3} },
            fechamasms:{ $dateAdd:{ startDate: "$actualizado", unit: "millisecond", amount: 3} }
        }
     }
])

 
    
 
     
     
    