const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

mongoose.connect('mongodb+srv://mukundtechamplifiers:2N639MbMmbHeAAB5@cluster0.vx0y6cf.mongodb.net/?retryWrites=true&w=majority', connectionParams,(err)=>{
    if(!err){
        console.log('Database Connection successful...');
    }
    else{
        console.log('error in connection - ',err);
    }
})

module.exports = mongoose;