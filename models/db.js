const mongoose=require('mongoose');
const PORT=3443;

const connectionURL=`mongodb://127.0.0.1:${PORT}`;

mongoose.connect(connectionURL,{useUnifiedTopology: true,useNewUrlParser: true,}, async (error, client)=>{
    if(error){
        return console.log(error);
    }
    console.log('connection Successful!');
});

require('./model');