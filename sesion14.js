db.alumnos.aggregate([
    
])

db.alumnos.aggregate([
    { $match:{ "sexo" : "F" } }
])

db.alumnos.aggregate([
    { $match:{ "edad.anios" : {$gte:30 } } }
])
    
db.alumnos.aggregate([
    { $match:{ $and:[{"edad.anios" : {$gte:30 }}, { "sexo" : "F" }] } }
])
    
db.alumnos.aggregate([
    { $match:{ $and:[{"edad.anios" : {$gte:30 }}, { "sexo" : "F" }] } },
    { $count: "noAlu" },
    { $match:{ "noAlu" : {$gte:30 } } }
])
    
    
db.alumnos.aggregate([
    { $group:{ "_id": "$sexo" } }
])  


db.alumnos.aggregate([
    { $group:{ "_id": "$ciudad" } }
])  
    
db.alumnos.aggregate([
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"} } }
])
  
db.alumnos.aggregate([
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"} } }
])
  
db.alumnos.aggregate([
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"}, nalu: { $sum: 1} } }
])  
    
    
db.alumnos.aggregate([
    { $match:{ "sexo" : "M" } },
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"}, nalu: { $sum: 1} } },
    { $match:{ "nalu" : {$gt:1 } } }
])  
    
db.alumnos.aggregate([
    { $match:{ "sexo" : "M" } },
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"}, nalu: { $sum: 1} } },
    { $match:{ "nalu" : {$gt:1 } } },
    { $project:{ _id:0, "ciudad": "$_id.ciudad", nalu:1, no_alumnos:"$nalu" }}
])
  
db.alumnos.aggregate([
    { $match:{ "sexo" : "M" } },
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"}, nalu: { $sum: 1} } },
    { $match:{ "nalu" : {$gt:1 } } },
    { $project:{ _id:0, "cd": "$_id.ciudad", nalu:1, no_alumnos:"$nalu" }},
    { $project:{ nalu: 0} }
])
  
db.alumnos.aggregate([
    { $match:{ "sexo" : "M" } },
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"}, nalu: { $sum: 1} } },
    { $match:{ "nalu" : {$gt:1 } } },
    { $project:{ _id:0, "cd": "$_id.ciudad", nalu:1, no_alumnos:"$nalu" }},
    { $project:{ nalu: 0} },
    { $sort:{ no_alumnos: -1 }}
])
 
db.alumnos.aggregate([
    { $match:{ "sexo" : "M" } },
    { $group:{ "_id": {"ciudad": "$ciudad", sexo : "$sexo"}, nalu: { $sum: 1} } },
    { $match:{ "nalu" : {$gt:1 } } },
    { $project:{ _id:0, "cd": "$_id.ciudad", nalu:1, no_alumnos:"$nalu" }},
    { $project:{ nalu: 0} },
    { $sort:{ no_alumnos: -1 }},
    { $limit: 3}
])   
    
// Agrupar por sexo y edad
db.alumnos.aggregate([
    { $group:{ "_id": {"edad": "$edad.anios", sexo : "$sexo"}, nalu: { $sum: 1} } },
    { $project:{ _id:0, "edad": "$_id.edad", nalu:1, sexo:"$_id.sexo" }},
    { $sort:{ edad: -1 }},
])     


//Mostrar el numero de alumnos agrupado por estado, que no sean de la ciudad de queretaro, y que el nombre del alumno no contenga las palabras JUAN o MARIA y ordenados
// de forma descendente por el numero de alumnos

