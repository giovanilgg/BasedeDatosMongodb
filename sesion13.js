db.contactos.find()

db.contactos.insert({nombre:"Juan", apellidos:"Lopez"})

db.contactos.insert({nombre:"Juan", telefono:12345678})

db.contactos.insert({nombre:"Juan", telefono:"12345678" })

db.contactos.insert({nombre:"Maria", telefono:"12345678", celular:"23456789" })

db.contactos.insert({nombre:"Olga", telefono:"12345678", teltrabajo:"23456789" })

db.contactos.insert({nombre:"Abraham", telefono:"12345678", email:"patito23@gmail.com" })

db.contactos.insertOne({nombre:"Abraham", telefono:"12345678", email:"abraham@fes.unam.com" })

db.contactos.insert({nombre:"Abraham", telefono:"12345678", email:"abraham@fes.mx" })

db.contactos.insertMany([{nombre:"Vania", telefono:"55678900", email:"vania@fes.mx", etiqueta:"Inscrito" }])

db.contactos.insertMany([{nombre:"Vania", telefono:"55678900", email:"vania@fes.mx", etiqueta:"Alumno" }])

db.contactos.insert({nombre:"Luis Gerardo", telefono:"22345678", email:"luisgerardo@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: 1999 })
    
db.contactos.insert({nombre:"Luis Gerardo", telefono:"22345678", email:"luisgerardo@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: NumberInt(2018) })
    
db.contactos.insert({nombre:"Monica", telefono:"32345678", email:"monica@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: NumberInt(2020), direccion: { calle:"Av rancho seco", cp:NumberInt(56100) } })
    
db.contactos.insert({nombre:"Monica", telefono:"32345678", email:"monica@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: NumberInt(2020), 
    direccion: { calle:"Av rancho seco", 
        cp:NumberInt(56100) ,
        numero: "S/N",
        colonia: "Impulsora",
        ciudad: "Neza"
    } 
    })


db.contactos.insert({nombre:"Rodrigo", telefono:"72345678", email:"rodrigo@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: NumberInt(2020), 
    direccion: { 
        ciudad: "Neza",
        numero: "S/N",
        calle:"Av rancho seco", 
        cp:NumberInt(56100) ,
        colonia: "Impulsora",
        estado: "Mexico"
    } 
    })
    
db.getCollectionInfos()
    
db.getCollectionInfos({ name : "contactos" })

db.runCommand(
{
    collMod: "contactos",
    validationLevel: "moderate",
    validationAction: "error",
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required: ["nombre", "telefono"],
            properties:{
                telefono:{
                    bsonType: "string",
                    description: "Telefono es necesario ingresar un telefono"
                },
                email:{
                    bsonType: "string",
                    pattern : "@fes\.mx$",
                    description: "Email no cumple con el patron"
                },
                etiqueta:{
                    enum : ["Alumno", "Profesor", "Directivo"],
                    description: "Etiqueta acepta ciertos valores"
                },
                anio_ingreso:{
                    bsonType: "int",
                    minimum : 2000,
                    maximum : 2021
                },
                promedio:{
                    bsonType: "decimal",
                    minimum : 0.00,
                    maximum : 10.00
                },
                direccion:{
                    bsonType: "object",
                    required: ["cp", "ciudad"],
                    properties:{
                        calle: { bsonType: "string" },
                        numero: { bsonType: "string" },
                        colonia: { bsonType: "string" },
                        ciudad: { bsonType: "string",  description: "La ciudad es requerida" },
                        cp: { bsonType: "int", description: "El cp es requerido" }
                    }
                }
            }
        }
    }
}
)

db.contactos.insert({nombre:"Ricardo", telefono:"372345678", email:"ricardo@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: NumberInt(2020), 
    direccion: { calle:"Av rancho seco", cp:NumberInt(56100) , ciudad:"Neza"},
    promedio : "10"
    })

db.contactos.insert({nombre:"Ricardo", telefono:"372345678", email:"ricardo@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: NumberInt(2020), 
    direccion: { calle:"Av rancho seco", cp:NumberInt(56100), ciudad:"Neza" },
    promedio : NumberDecimal(10.5)
    })

db.contactos.insert({nombre:"Ricardo", telefono:"372345678", email:"ricardo@fes.mx", 
    etiqueta:"Alumno", anio_ingreso: NumberInt(2020), 
    direccion: { calle:"Av rancho seco", cp:NumberInt(56100), ciudad:"Neza" },
    promedio : NumberDecimal(10.00)
    })


db.contactos.find()
    
db.alumnos.count()  
    
db.alumnos.find() 

db.alumnos.insert(   
{
    "team" : "Observant Badgers",
    "score" : 20000.0,
    nombre: "VIVIANA"
}
)

db.getCollectionInfos({ name : "alumnos" })


db.runCommand(
{
    collMod:"alumnos",
    validationLevel: "moderate",
    validationAction: "error",
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required: ["nombre", "ap_paterno", "sexo"],
            properties:{
                nombre:{ bsonType: "string" },
                ap_paterno:{ bsonType: "string" },
                sexo:{ bsonType: "string", enum:["F", "M"] }
            }
        }
    }
}
)

db.alumnos.insert(   
{
    "team" : "Observant Badgers",
    "score" : 20000.0,
    nombre: "VIVIANA"
}
)


db.alumnos.insert(   
{
    "team" : "Observant Badgers",
    "score" : 20000.0,
    nombre: "VIVIANA",
    ap_paterno: "LOPEZ",
    sexo:"X"
}
)

db.alumnos.insert(   
{
    "team" : "Observant Badgers",
    "score" : 20000.0,
    nombre: "VIVIANA",
    ap_paterno: "LOPEZ",
    sexo:"F"
}
)



db.runCommand(
{
    collMod:"alumnos",
    validationLevel: "strict",
    validationAction: "error",
    validator:{
        $jsonSchema:{
            bsonType: "object",
            required: ["nombre", "ap_paterno", "sexo"],
            properties:{
                nombre:{ bsonType: "string" },
                ap_paterno:{ bsonType: "string" },
                sexo:{ bsonType: "string", enum:["F", "M"] }
            }
        }
    }
}
)


db.runCommand(
{
    collMod:"alumnos",
    validationLevel: "off",
    validator:{}
}
)

db.alumnos.insert(   
{
    "team" : "Observant Badgers",
    "score" : 20000.0,
    nombre: "VIVIANA",
    ap_paterno: "LOPEZ",
    sexo:"X"
}
)


db.alumnos.validate()

