// Sesion 01
// Insertar

db.ejempla.insert(
{
	"_id" : 1234567,
	"materia" : "TOBD",
	"dias" : [
		"martes",
		"jueves"
	],
	"alumnos" : 37,
	temas: [{tema:'BDD', horas:3}, {tema:'BDOO', horas:4}, {tema:'NoSQL', horas:3}]
}
)