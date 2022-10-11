
db.alumnos.find({
   nombre: /.*ale.*/i
}, 
{ nombre:1, curp:1, email:1, _id:0})
.count()

db.alumnos.find({
   nombre:{ $regex: ".*ale.*", $options:"i" }
}, 
{ nombre:1, curp:1, email:1, _id:0})
.count()

//Contiene
db.alumnos.distinct("nombre", {nombre: /.*ale.*/i}).sort()
//Inicia
db.alumnos.distinct("nombre", {nombre: /^ale.*/i}).sort()
//Termina
db.alumnos.distinct("nombre", {nombre: /.*nia$/i}).sort()


//Negar Inicio
db.alumnos.distinct("nombre", {nombre: { $not:/^ale.*/i }}).sort()


db.alumnos.distinct("nombre", {  nombre:{ $not:{ $regex: "^ale.*", $options:"i" } } }).sort()


db.alumnos.find(
{  nombre:{ $not:{ $regex: "^ale.*", $options:"i" } } } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1})


db.alumnos.find(
{
    $and:[
    {nombre:{ $not:{ $regex: "^ale.*", $options:"i" } }},
    {ciudad:{ $not:/.*quer.*/i } },
    { ciudad: {$exists:1} }
    ]
} 
,
{ nombre:1, curp:1, email:1, ciudad:1, _id:0}).sort({nombre:1}).count()



db.alumnos.find(
{  nombre:/(juan|maria)/i  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()


db.alumnos.find(
{  nombre:/(^juan|^maria)/i  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()

db.alumnos.find(
{  nombre:/(juan$|maria$)/i  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()


db.alumnos.find(
{  nombre:/(^juan|maria$)/i  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()



db.alumnos.find(
{
    $and:[
    {nombre:{ $not:{ $regex: "^ale.*", $options:"i" } }},
    {ciudad:{ $not:{ $in:[/.*quer.*/i, /.*qro.*/i] } } },
    { ciudad: {$exists:1} }
    ]
} 
,
{ nombre:1, curp:1, email:1, ciudad:1, _id:0}).sort({nombre:1}).count()


ciudades = db.alumnos.distinct("ciudad", {ciudad:{ $not:{ $in:[/.*quer.*/i, /.*qro.*/i] } }}).sort()


ciudades

db.alumnos.find(
{
    ciudad:{ $in:ciudades }
} 
,
{ nombre:1, curp:1, email:1, ciudad:1, _id:0}).sort({nombre:1}).count()


db.alumnos.find(
{ email: {$exists:1} }
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()

//contiene un digito
db.alumnos.find(
{  email:/[0-9]/  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()


//Inicia con un digito
db.alumnos.find(
{  email:/^[0-9]/i  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()

//Termina con un digito
db.alumnos.find(
{  email:/[0-9]$/i  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()

//Tiene email y no contiene digitos
db.alumnos.find(
{ $and:[{email:{ $not: /[0-9]/i }},  { email: {$exists:1} }]  } 
,
{ nombre:1, curp:1, email:1, _id:0}).sort({nombre:1}).count()

db.alumnos.find({email:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/} ,{nombre:1, email:1, _id:0}).count()


db.alumnos.find(
{
    $and:[
    {email:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/},
    {email: {$not:/(gmail|hotmail|hotmai|homail)/} },
    { email: {$exists:1} }
    ]
} ,
{nombre:1, email:1, _id:0}).count()



