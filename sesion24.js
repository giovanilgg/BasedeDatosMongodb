db.alumnos.aggregate([
   {
      $project: {
         _id: 0,
         nombre:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
         numeroEvaluaciones: { $cond: { if: { $isArray: "$evaluaciones" }, then: { $size: "$evaluaciones" }, else: "NA"} }
      }
   },
   {
    $sort: {
      numeroEvaluaciones: 1
    }
   }
] )
   
   
db.alumnos.aggregate([
   {
      $project: {
         _id: 0,
         nombre:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
         evaluaciones: { 
             $cond: { 
                 if: { $isArray: "$evaluaciones" }, 
                 then:  "$evaluaciones" , 
                 else: [{
                        "materia" : "",
                        "calificacion" : 0,
                        "fecha" : "$$NOW"
                    }]} }
      }
   },
   { $sort:{nombre:1}},
   {
       $unwind:"$evaluaciones"
   },
   {$group:{
        _id:"$nombre",
        evaluaciones:{$push:{materia:"$evaluaciones.materia", 
        calificacion:"$evaluaciones.calificacion"}},
        promCalif:{$avg:"$evaluaciones.calificacion"}
     }
    },
    { $sort:{_id:1}},
    //{$count:"nalu"}
] )

db.alumnos.aggregate([
   {
       $project:{
           _id:0,
           nombre:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
           primerEval:{ $arrayElemAt:["$evaluaciones", 0]},
           ultimaEval:{ $arrayElemAt:["$evaluaciones", -1]},
           terceraEval:{ $arrayElemAt:["$evaluaciones", 200]}
       }
   }
] )
   
   
db.alumnos.aggregate([
   {
       $project:{
           _id:0,
           nombre:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
           numeroEvaluaciones:{
               $cond:{
                   if:{ $isArray: "$evaluaciones"},
                   then:{ $size: "$evaluaciones"},
                   else: 0
               }
           }
       }
   },
   {
       $group:{ _id:"$numeroEvaluaciones", noAlumnos:{$sum:1}}
   },
   { $project:{ _id:0, numeroEvaluaciones:"$_id", noAlumnos:"$noAlumnos"}},
   { $sort: {noAlumnos:-1 }}
] )
    
db.alumnos.aggregate([
    {
        $match:{
            $and:[
                { "evaluaciones": { $exists: 1 } },
                { $expr:{ $eq:[{$size:"$evaluaciones"}, 3]} }
            ]
            }      
     }
] )
     
db.alumnos.aggregate([
    {
        $match:{
            $and:[
                { "evaluaciones": { $exists: 1 } },
                { $expr:{ $gt:[{$size:"$evaluaciones"}, 5]} }
            ]
            }      
     },
     {
         $project:{
             _id:0,
            nombre:{ $concat: ["$nombre"," ","$ap_paterno"," ","$ap_materno"]},
            tresPrimEval:{ $slice:["$evaluaciones", 0, 3] },
            tresSegEval:{ $slice:["$evaluaciones", 3, 3] },
            trestercEval:{ $slice:["$evaluaciones", 6, 3] }
         }
     }
] )
    
    
    