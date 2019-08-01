const request = require("request-promise");

exports.getAll = (req, res) => {
/* 
    request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:3000/demographics"
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
    }); */
    var options = {
        method: 'GET',
        uri: 'https://frozen-harbor-42427.herokuapp.com/demographics',
        json: true 
    };

    request(options).then(function (response) {
        console.log(response);
        res.send(response);
    })
    .catch(function (err) {
        console.log(err);
        res.send(err);
    });
/*         
    request({
        url: "https://localhost:3000/demographics/",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
      }, function(error, response, body) {
        console.log(body);
        console.log(error);

      }); */
/* 
    request('https://localhost:3000/demographics/', { json: true }, (err, res, body) => {
  if (err) { 
      return console.log(err); 
  }
  console.log(body);
  console.log(body.id);
  console.log(body.title);
}); */
 
};