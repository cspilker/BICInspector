/**
 * The BIC inspector namespace registered at the window object
 * @returns {{resolveBICDetails: Function}}
 */
window.bicInspector = function () {
    'use strict';

    /**
     * Resolves the BIC details for the given bank code.
     * @param bankCode The bank code entered by the user.
     * @param callback The callback.
     * @private
     */
    let _resolveBICDetails = function (bankCode, callback) {
        // URL of the REST service
        let url = `https://fintechtoolbox.com/bankcodes/${bankCode}.json`;

        // The XML HTTP request
        let request = new XMLHttpRequest();
        // Create the event handler
        let processRequest = function () {

            //Process the request

            // We react only on state ...?... as the request is processed completely then
            if (request.readyState === 4) {
                // Checks whether the result is valid
                if (request.status === 200) {
                    // Parses the result
                    let response = JSON.parse(request.responseText);

                    // Calls the callback function
                    callback(bankCode, response.bank_code);
                }
                else {
                    // Something went wrong because the status was not as expected
                    alert('HTTP Request failed! Status: '+ request.status);
                }
            }
        };

        // Register event handler
        request.onreadystatechange = processRequest;

        // Open request...
        request.open("GET", url, true);
        // ...and send
        request.send(null);
    };

    return {
        resolveBICDetails: _resolveBICDetails
    }
}();
