var form = document.getElementById("form-id");

form.addEventListener("submit", function(event) {
    console.log(form.elements);
    event.preventDefault();
    var newUser = {};

    for (i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value !== "submit") {
            console.log(form.elements[i].value);
            console.log(form.elements[i].name);
            newUser[form.elements[i].name] = form.elements[i].value;
            console.log(newUser);


        }
    };

    console.log("user final " + newUser.toString());

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:3001/liste/", true);

    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(newUser));

    // console.log(this);

    xhttp.onreadystatechange = function() {

        console.log("state : " + this.readyState);
        console.log("status :" + this.status);
        console.log("responseText :" + this.responseText);



        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
                // Request finished. Do processing here.
                console.log('req ok');
                console.log(xhttp.responseText);
                var addEleve = JSON.parse(xhttp.responseText);
                console.log(addEleve);
                // var addEleve = bindList(addEleve);

            }
    };

})