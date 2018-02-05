const mongoose = require("mongoose");


var eleveSchema = mongoose.Schema({
	  "Nom": String,
      "Prenom": String,
      "Javascript":String,
      "site_pref":String,
      "Pourquoi_S":String,
      "app_pref":String,
      "Pourquoi_A":String,
      "before_IFA":String,
      "pourquoi_IFA":String,
      "Mail":String
});


var Eleve = mongoose.model("eleves", eleveSchema);

module.exports= Eleve;

