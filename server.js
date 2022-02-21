const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();


function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

sum(1)(2); // 3
sum(5)(-1)(2); // 6
sum(6)(-1)(-2)(-3); // 0
sum(0)(1)(2)(3)(4)(5); // 15


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.all('/test', (req, res) => {
  res.status(200).json({ message: 'KKKKKK'});
})

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})
