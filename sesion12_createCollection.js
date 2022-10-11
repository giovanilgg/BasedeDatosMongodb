db.createCollection(
    "contactos",
    {
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



