db.alumnos.aggregate([
    {$unwind: "$materias"},
    {$sortByCount: "$materias"}
])
    
db.alumnos.aggregate([
    {$unwind: "$evaluaciones"},
    {$sortByCount: "$evaluaciones.calificacion"}
])
    
db.alumnos.aggregate([
    {$sortByCount:"$ciudad"}
])
    
db.alumnos.aggregate([
    {$sortByCount:"$estado"}
])
    
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        //valores con los que se quieren nombrar los grupos
        $bucket:{
            groupBy:"$evaluaciones.calificacion",
            //los grupos que se quieren hacer
            //si solo se quiere un grupo se escriben 2 datos
            boundaries:[6,7,8,9,10,11],
            //agrupa en un grupo datos que no se pueden agrupar en boundaries
            default:"otros"            
        }        
    }
])
    
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        $bucket:{
            groupBy:"$evaluaciones.calificacion",
            //si solo se quiere un grupo se escriben 2 datos
            boundaries:[6,7],
            default:"otros"            
        }        
    }
])
    
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        $bucket:{
            groupBy:"$evaluaciones.calificacion",
            boundaries:[5,8,10,11],
            default:"otros",
            output:{
                nalu:{$sum:1},
                aluMat: {$addToSet: {$concat: ["$nombre"," ", "$ap_paterno",
                            " ","$ap_materno"," ","$evaluaciones.materia"]}}
            }
        }        
    }
])
    
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        //Genera automaticamente los grupo como mejor le convenga
        //Muestra min y max para hacer rangos de los grupos
        $bucketAuto:{
            groupBy:"$evaluaciones.calificacion",
            //cuantos grupos se quieren hacer 
            buckets:5,
            output:{
                nalu:{$sum:1},
                aluMat: {$addToSet: {$concat: ["$nombre"," ", "$ap_paterno",
                            " ","$ap_materno"," ","$evaluaciones.materia"]}}
            }
        }        
    }
])
    
db.alumnos.aggregate([
    {$unwind:"$evaluaciones"},
    {
        $bucketAuto:{
            groupBy:"$edad.dias",
            buckets:30,
            output:{
                nalu:{$sum:1},
                aluMat: {$addToSet: {$concat: ["$nombre"," ", "$ap_paterno",
                            " ","$ap_materno"," ","$evaluaciones.materia"]}}
            }
        }        
    }
])
    
db.alumnos.aggregate([
{
    //crea un arreglo de arreglos
    $facet:{
        "categortiasMaterias":[
            {$unwind:"$materias"}, 
            {$sortByCount: "$materias"},
            {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
        ]
    }    
}   
])

db.alumnos.aggregate([
{
    //crea un arreglo de arreglos
    $facet:{
        "materias":[
            {$unwind:"$materias"}, 
            {$sortByCount: "$materias"},
            {$project: {"materia": "$_id",nrenglones:"$count", _id:0}}
        ],
        "evaluaciones":
            {$unwind:"$evaluaciones"}, 
            {$sortByCount: "$evaluaciones.calificacion"},
            {$project: {"calificacion": "$_id",nrenglones:"$count", _id:0}}
        ],
        "ciudades":[
            {$sortByCount: "$ciudad"},
            {$project: {"ciudad": "$_id",nrenglones:"$count", _id:0}}
        ]
    }    
},
])