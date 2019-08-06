const request = require("request");
const kernelAPI = require("../../config/kernel-api.config");

exports.initializePromise = (idUser, attr) => {
    var options = { url: kernelAPI.urlApi + kernelAPI.urlDemographicAttribute + idUser + "/" + attr };
    // Return new promise 
    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
};

exports.compareDate = (a,b) => {
    if (a.Date > b.Date) {
        return -1;
    } else if (a.Date < b.Date) {
        return 1;
    } else {
        return 0;
    }
};