const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;



mongoose.set('strictQuery', false);
mongoose.connect(MONGOURI);

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoose server")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting to mongoose server",err)
})

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})