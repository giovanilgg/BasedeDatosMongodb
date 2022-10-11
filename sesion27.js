db.estudiantes.find({$and:[{ estado:"QUERETARO"}, { ciudad:"QUERETARO"}]}).count()

cursor = db.estudiantes.find({$and:[{ estado:"QUERETARO"}, { ciudad:"QUERETARO"}]})

cursor

cursor.count()

cursor.size()

cursor.batchSize()

cursor.hasNext()


while(cursor.hasNext()) print(cursor.next())


estudiantesArray = cursor.toArray()

estudiantesArray[100]

estudiantesArray.

estudiantesArray.forEach( function(md){ print( "alumno: " +  md.nombre + " " + md.ap_paterno + " " + md.ap_materno ); })

if(estudiantesArray.length > 0) { printjson( estudiantesArray) }


cursor2 = db.estudiantes.find({$and:[{ estado:"QUERETARO"}, { ciudad:"QUERETARO"}]}, { nombre:1, ciudad:1, email:1, _id:0} )