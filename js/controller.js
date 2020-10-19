'use strict';

/**
 * Javascript function that requests the BIC details for the entered bank code.
 * The request is sent using an asynchronous HTTP request.
 */
function requestBICDetails() {
    let bankcode;
    //1. Hide the result area while searching
    document.getElementById("result").hidden = true;
    //2. Get the entered bank code value
    bankcode = document.getElementById("bankcode").value;
    //3. Check whether the value is set...
    if (bankcode) {
    //Do something if variable is not empty
    console.log(bankcode);
    //4. ... and start the request
    bicInspector.resolveBICDetails(bankcode, handleBICDetails);
    }

     else {
     //Do something if variable is empty
     //5. ... or alert because bank code is not entered
     alert("Enter a valid BIC!");
    }






}

/**
 * Callback function that handles the asynchronous HTTP result.
 * @param bankCode The bank code.
 * @param details The bank's details.
 */
function handleBICDetails(bankCode, details) {

    //Check if details value is set
    if(details){
        //Show result area
        document.getElementById("result").hidden = false;

        //Update content
        document.getElementById("bic").innerHTML = details.bic;
        document.getElementById("bank_name").innerHTML = details.bank_name;
        document.getElementById("postal_code").innerHTML = details.postal_code;
        document.getElementById("city").innerHTML = details.city;

    } else {
        //... or alert if details is empty
        alert('Unknown BIC: ' + bankCode);
    }
}
