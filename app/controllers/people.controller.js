const request = require("request");
const kernelAPI = require("../../config/kernel-api.config");
const medicalInstitutionService = require("../service/medicalInstitution.service");
const immunization = "Immunizations";
const encounters = "Encounters";
const medications = "Medications";
const plansCares = "PlansCares";

exports.getUser = (req, res) => {
    var url = kernelAPI.urlApi + kernelAPI.urlDemographic + req.params.idUser;
    request(url, function (err, response, body) {
        if(!err) {
            var user = JSON.parse(body);
            user.Allergies = undefined;
            user.Immunizations = undefined;
            user.Medications = undefined;
            user.Providers = undefined;
            user.PlansCares = undefined;
            user.Encounters = undefined;
            res.send(user);
        } else {
            res.send(err);
        }
    });
};

exports.getJournal = (req, res) => {
    var promises = [];
    promises.push(medicalInstitutionService.initializePromise(req.params.idUser, immunization));
    promises.push(medicalInstitutionService.initializePromise(req.params.idUser, encounters));

    var objects = [];
    Promise.all(promises).then(function(results) {
        results.forEach(function(e){
            if(e.Immunizations) {
                e.Immunizations.forEach(function (i) {
                    objects.push(i);
                }); 
            } else {
                e.Encounters.forEach(function (i) {
                    objects.push(i);
                }); 
            }
        });
        objects.sort(medicalInstitutionService.compareDate);
        var pckg = objects.reduce((pckg, value, key) => { pckg[key] = value; return pckg; }, {});

        res.send(pckg);
    }).catch(function(err) {
        res.send(err);
    });
};

exports.getCurrentActivity = (req, res) => {
    var promises = [];
    promises.push(medicalInstitutionService.initializePromise(req.params.idUser, medications));
    promises.push(medicalInstitutionService.initializePromise(req.params.idUser, plansCares));

    var objects = [];
    Promise.all(promises).then(function(results) {
        results.forEach(function(e){
            if(e.Medications) {
                e.Medications.forEach(function (i) {
                    objects.push(i);
                }); 
            } else {
                e.PlansCares.forEach(function (i) {
                    objects.push(i);
                }); 
            }
        });
        objects.sort(medicalInstitutionService.compareDate);
        var pckg = objects.reduce((pckg, value, key) => { pckg[key] = value; return pckg; }, {});

        res.send(pckg);
    }).catch(function(err) {
        res.send(err);
    });
};

exports.getUserAttribute = (req, res) => {
    var url = kernelAPI.urlApi + kernelAPI.urlDemographicAttribute + req.params.idUser + "/" + req.params.attr 
    request(url, function (err, response, body) {
        if(!err) {
            var attributes = JSON.parse(body);
            res.send(attributes);
        } else {
            res.send(err);
        }
    }); 
    
};

