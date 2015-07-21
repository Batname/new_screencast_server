import http from 'http';
import Q from 'q';
import co from 'co';
import fs from 'fs';

function getFilePromise(){
  let deferred = Q.defer();
  fs.readFile('package.json', (err, info) => {
    if(err) deferred.reject(err);
    if(!err) deferred.resolve(info);
  });
  return deferred.promise;
};

function* getFileGenerator (){
  let result = yield getFilePromise();
  return result;
};


let server = new http.Server();

server.on('request', (req, res) => {
  co(getFileGenerator)
  .then((result) => res.end(result), (err) => console.log(err));
});

server.listen(3000, '127.0.0.1');