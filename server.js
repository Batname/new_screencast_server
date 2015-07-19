import http from 'http';
import Q from 'q';
import co from 'co';

let server = new http.Server();

let requestPromise = () => {
  let deferred = Q.defer();
  server.on('request', (req, res) => {
    if(res){
      deferred.resolve(res);
    } else {
      deferred.reject(new Error('error'));
    }
  });
  return deferred.promise;
};

let endPromise = () => {
  let deferred = Q.defer();
  setTimeout(()=> deferred.resolve('<br>END'), 200);
  return deferred.promise;
};

let requestGenerator = function* (){
  let result = yield requestPromise();
  result.write('write yield requestPromise');
  let end = yield endPromise();
  result.end(end);
  return 'result';
};

co(requestGenerator).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});

server.listen(3000, '127.0.0.1');