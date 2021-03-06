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

//  http://localhost:3000/test

app.all('/test', (req, res) => {
  res.status(200).json({ message: 'KKKKKK'});
})

//  http://localhost:3000/sum?num1=5&num2=7

app.all('/sum', (req, res) => {
  var a = parseInt(req.query.num1);
  var b = parseInt(req.query.num2);
  res.status(200).json({ message: a+b});
})

//  http://localhost:3000/reverse?str1=myStrIngIsHere

app.all('/reverse', (req, res) => {
  var str = req.query.str1;
  var strR = "";
  for(i=0; i< str.length; i++){
    var c = str[i]
    if (c == c.toLowerCase()){
      strR = strR + c.toUpperCase();
    } else{
      strR = strR + c.toLowerCase();
    }
  }
  res.status(200).json({ message: strR});
})

//  http://localhost:3000/reverseArray?arr1=[1,2,3,4,5]
//  http://localhost:3000/reverseArray?arr1=["aa","bb","cc","dd","ee"]

app.all('/reverseArray', (req, res) => {
  var arr1 = JSON.parse(req.query.arr1);
  res.status(200).json({ message: arr1.reverse()});
})


http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})
