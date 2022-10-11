// $eq $gt $lt $gte $lte $in $nin $ne

db.alumnos.find(
{ $and:[ 
    { $or:[{"edad.anios":28}, {"edad.meses":6} ] },
    { $or:[{"sexo":"F"}, {ciudad:{ $ne:"QUERETARO"}} ] }
    ] }, 
{_id:0, nombre:1, curp:1, email:1, sexo:1, ciudad:1, edad:1}
).sort({"edad.anios":-1, nombre:1}).limit(10).toArray()


db.alumnos.distinct("nombre", { $and:[{"sexo":"F"}, {ciudad:{ $ne:"QUERETARO"}}]}).sort()


db.alumnos.distinct("edad.anios").sort()

db.alumnos.find({"sexo":"F", nombre:"ABRAHAM"})


// Listar el nombre, ap_paterno, curp, meses (de edad), email de los alumnos 
// que no vivan en QUERETARO o SANTIAGO DE QUERETARO y si tengan el campo evaluaciones
// ordenado por ap_paterno y nombre de forma desc
// usar el operador $and




//count() 
