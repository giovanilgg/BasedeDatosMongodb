db.alumnos.find({
    curp:/[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]/
},
{nombre:1, curp:1, _id:0})



db.alumnos.find({email:/[[:punct:]]/}, {nombre:1, curp:1, email:1, _id:0})

//contiene algun digito
db.alumnos.find({email:/[[:digit:]]/}, {nombre:1, curp:1, email:1, _id:0}).count()

//inicia con algun digito
db.alumnos.find({email:/^[[:digit:]]/}, {nombre:1, curp:1, email:1, _id:0}).count()

//contiene 3 digitos seguidos
db.alumnos.find({email:/[[:digit:]]{3}/}, {nombre:1, curp:1, email:1, _id:0}).count()

//contiene al menos 3 digitos seguidos
db.alumnos.find({email:/[[:digit:]]{3,}/}, {nombre:1, curp:1, email:1, _id:0}).count()

//contiene al menos 4 y  maximo 6 digitos seguidos
db.alumnos.find({email:/[[:digit:]]{4,6}/}, {nombre:1, curp:1, email:1, _id:0}).count()

//contiene algun digito
db.alumnos.find({email:/\d/}, {nombre:1, curp:1, email:1, _id:0}).count()

db.alumnos.find({email:/\D/}, {nombre:1, curp:1, email:1, _id:0}).count()




//Test 

db.alumnos.updateOne(
    {"clave_alu" : 11060062},
    {
        $set:{ email:"jarreola@patito23.com"}
    }
)


db.alumnos.updateOne(
    {"clave_alu" : 11060062},
    {
        $set:{ materias:["BDI", "BDII", "TEBD"]}
    }
)



db.alumnos.updateOne(
    {"clave_alu" : 11060062},
    {
        $set:{ 
            semestres:["20211", "20222"],
            promedio:10,
            proyectos:[{proyecto:"P1", duracion:3, tiempo:"meses"}, {proyecto:"PDos", duracion:4, tiempo:"semanas"}],
            domicilio: { calle:"Rancho seco", numero:"S/N", cp:"50000"},
            fnac:ISODate("2000-09-29")
        }
    }
)


db.alumnos.find(
    {"clave_alu" : 11060062} 
)
    
    
db.alumnos.find(
    {nombre : "ALDO"} 
)


db.alumnos.updateOne(
    {nombre : "ALDO"} ,
    {
        $set:{ 
            semestres:["20211", "20222"],
            promedio:10,
            proyectos:[{proyecto:"P1", duracion:3, tiempo:"meses"}, {proyecto:"PDos", duracion:4, tiempo:"semanas"}],
            domicilio: { calle:"Rancho seco", numero:"S/N", cp:"50000"},
            fnac:ISODate("2000-09-29")
        }
    }
)
    
    
db.alumnos.updateMany(
    {} ,
    {
        $set:{ 
            status_alu:"AC",
            "colegio.nombre":"Instituto Neza",
            "colegio.nivel":"Secundaria",
            fingreso: Date()
        }
    }
)


db.alumnos.find({status_alu:{$exists:1}}).count()

db.alumnos.find({nombre:/(juan|maria)/i}).count()


db.alumnos.updateMany(
    {nombre:/(juan|maria)/i} ,
    {
        $set:{ 
            visita:true
        }
    }
)
    
db.alumnos.updateMany(
    {nombre:/(juan|maria)/i} ,
    {
        $unset:{ 
            "fingreso":false
        }
    }
)
    
    
    
db.alumnos.updateMany(
    {nombre:/(juan|maria)/i} ,
    [
    {
        $set:{ actualizado: "$$NOW", "grupo" : {$concat : ["$colegio.nivel", "-", "$nombre"] } }
    },
    { 
        $unset: [ "status_alu", "lastUpdate"] 
    }
    ]
)
    
    db.alumnos.find({nombre:/(juan|maria)/i}).count()
