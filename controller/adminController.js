const adminSchema = require('../model/adminSchems');
const jwt = require('jsonwebtoken');
const insertData = async (req,res) => {
    try{
        const {name, email, password} = req.body;
        let InsertData = await adminSchema.create({
            name : name,
            email : email,
            password : password
        })
        if(InsertData){
            console.log("Record Inserted");
            return res.json({message : 'Record Inserted' , status : 1});
        }
        else{
            return res.json({message : 'Record not Inserted' , status : 0});   
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const viewData = async (req,res) => {
    try{
        let ViewData = await adminSchema.find({});
        if(ViewData){
            return res.json({message : ViewData, status : 1});
        }
        else{
            return res.json({message : 'Record not fetch' , status : 0});   
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const loginData = async (req,res) => {
    try{
        const {email, password} = req.body;
        let UserLogin = await adminSchema.findOne({email : email});
        if(!UserLogin || UserLogin.password != password){
            return res.json({message : "Check your email and password", status : 0});
        }
        else{
            const Token = jwt.sign({payload : UserLogin}, 'Hemanshi', {expiresIn : '1hr'});
            console.log(Token); 
            return res.json({Token : Token});
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}



module.exports = {
    insertData,
    viewData,
    loginData
}