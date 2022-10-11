db.alumnos.remove({"curp" : ""})


db.alumnos.find({"curp" : ""})

db.alumnos.find()

db.alumnos.count()


db.ejemplo.find()

db.ejemplo.drop()

db.ejemplo.insertOne({
    "_id" : ObjectId("613ba30096448ba733347105"),
    "clave_alu" : 11030201,
    "ap_paterno" : "SUAREZ",
    "ap_materno" : "SANCHEZ",
    "nombre" : "OSCAR",
    "sexo" : "M",
    "curp" : "SUSO911025HQTRNS02",
    "ciudad" : "QUERETARO",
    "colegio" : {
        "nivel" : "Secundaria",
        "nombre" : "Instituto Neza"
    },
    "fingreso" : "Wed Sep 29 2021 13:54:48 GMT-0500 (CDT)",
    "status_alu" : "AC"
})


db.ejemplo.insertMany([{
    "_id" : ObjectId("613ba30096448ba733347107"),
    "clave_alu" : 11030205,
    "ap_paterno" : "VAZQUEZ MELLADO",
    "ap_materno" : "LARRACOECHEA",
    "nombre" : "ALEJANDRO",
    "sexo" : "M",
    "curp" : "VALA910506HQTZRL00",
    "ciudad" : "QUERETARO",
    "colegio" : {
        "nivel" : "Secundaria",
        "nombre" : "Instituto Neza"
    },
    "fingreso" : "Wed Sep 29 2021 13:54:48 GMT-0500 (CDT)",
    "status_alu" : "AC"
}
,
{
    "_id" : ObjectId("613ba30096448ba733347109"),
    "clave_alu" : 11030207,
    "ap_paterno" : "AGUILAR",
    "ap_materno" : "ZAMARRIPA",
    "nombre" : "MICHELLE IVONNE",
    "sexo" : "F",
    "curp" : "AUZM910928MQTGMC08",
    "ciudad" : "QUERETARO",
    "colegio" : {
        "nivel" : "Secundaria",
        "nombre" : "Instituto Neza"
    },
    "fingreso" : "Wed Sep 29 2021 13:54:48 GMT-0500 (CDT)",
    "status_alu" : "AC"
}

])


db.alumnos.count()
db.alumnos.findOneAndDelete({"sexo" : "M"})
db.alumnos.find({ "clave_alu" : 11030201})
db.alumnos.find({$and:[{"sexo" : "M"}, {ciudad:{$exists:1}}, {status_alu:{$exists:1}}]})

db.alumnos.find({ "ciudad" : "MERIDA"})

db.alumnos.findOneAndReplace(
{$and:[{"sexo" : "M"}, {ciudad:{$exists:1}}, {status_alu:{$exists:1}}]},
{"ciudad" : "MERIDA", "status_alu" : "BA"}
)

db.alumnos.findOneAndReplace(
   { "nombre" : { $lt : "RAUL" } },
   { "ciudad" : "MERIDA", "status_alu" : "BA" }
)
 
db.alumnos.find({ "ciudad" : "MONTERREY"}) 
   
db.alumnos.findOneAndUpdate(
{$and:[{"sexo" : "M"}, {ciudad:{$exists:1}}, {status_alu:{$exists:1}}]},
{ $set: { "ciudad" : "MONTERREY", "status_alu" : "EX", estado:"NL"} }
)


db.ejemplos.insertMany([{
    "_id" : ObjectId("613ba30096448ba733347107"),
    "clave_alu" : 11030205,
    "ap_paterno" : "VAZQUEZ MELLADO",
    "ap_materno" : "LARRACOECHEA",
    "nombre" : "ALEJANDRO",
    "sexo" : "M",
    "curp" : "VALA910506HQTZRL00",
    "ciudad" : "QUERETARO",
    "colegio" : {
        "nivel" : "Secundaria",
        "nombre" : "Instituto Neza"
    },
    "fingreso" : "Wed Sep 29 2021 13:54:48 GMT-0500 (CDT)",
    "status_alu" : "AC"
}
,
{
    "_id" : ObjectId("613ba30096448ba733347109"),
    "clave_alu" : 11030207,
    "ap_paterno" : "AGUILAR",
    "ap_materno" : "ZAMARRIPA",
    "nombre" : "MICHELLE IVONNE",
    "sexo" : "F",
    "curp" : "AUZM910928MQTGMC08",
    "ciudad" : "QUERETARO",
    "colegio" : {
        "nivel" : "Secundaria",
        "nombre" : "Instituto Neza"
    },
    "fingreso" : "Wed Sep 29 2021 13:54:48 GMT-0500 (CDT)",
    "status_alu" : "AC"
}

])


db.contactos.find()

db.contactos.insert({nombre:"Juan", apellidos:"Lopez"})

db.contactos.insert({nombre:"Juan", telefono:12345678})

db.contactos.insert({nombre:"Juan", telefono:"12345678" })

db.contactos.insert({nombre:"Maria", telefono:"12345678", celular:"23456789" })

db.contactos.insert({nombre:"Olga", telefono:"12345678", teltrabajo:"23456789" })