const mongoose = require("mongoose");
const Eleve = require("./models/eleve.model");
var data = require("./data/data.json");

mongoose.connect('mongodb://localhost:27017/testIFA2');

data.forEach(function(item){
	const eleve = new Eleve(item);
	eleve.save().then(() => console.log('ok saved' + item.Nom));
});




// console.log("after promise");