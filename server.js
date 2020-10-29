var mysql = require('mysql')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const { get } = require('http');
var vtoken;
let sess = "0"

const app = express();

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "abhra",
    database : "wyvern",
})

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.static(path.join(__dirname, "static")));


con.connect((err,  res) =>{
    if(err) throw err;
    else console.log("connected")
})

app.post('/getSignup', (req,res) =>{
    //console.log(req);
    let name = req.body.name
    let email = req.body.email
    let birthday = req.body.birthday
    let password = req.body.password
    let gender = req.body.gender
    let mobile1 = req.body.mobile_1
    let mobile2 = req.body.mobile_2
    let address = req.body.address

    console.log(name, email, birthday)
let hashPassword;
bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err) throw err
    hashPassword = hash;
    console.log(hashPassword)
})

var check_sql = `select* from loginInfo where email = '${email}'`

con.query(check_sql, (err, result) =>{
    var loginId 
    if(result.length == 0){
        var userIns = `insert into userInfo (user_name, email, gender, DOB, mobile_1, mobile_2, address) values ('${name}', '${email}', '${gender}', '${birthday}', '${mobile1}', '${mobile2}', '${address}')` 

        con.query(userIns, (err, result) =>{
            if (err) throw err;
            console.log("record inserted in user table");
        })

        var getid = `select user_id from userInfo where email = '${email}'`
        
        

        con.query(getid, (err, result)=>{
            loginId = result[0].user_id;
            console.log(result[0].user_id, "helloooooo")

            var logIns = `insert into loginInfo (person_id, person_role, password, email) values(${loginId}, 'user', '${hashPassword}', '${email}')`
             
            console.log(hashPassword)

            con.query(logIns, (err, result) =>{
                if (err) throw err;
                console.log("record inserted in login table");
            })
            
        })
        
        console.log(loginId, "hiiiii")
       
      
        res.send("Successfully Registered");

    }else{
        res.send("User with this email already exists. Try with a different email.")
    }
})
    

})

app.post('/getLogin', (req, res)=>{
    console.log(req);
    let email = req.body.email
    let password = req.body.pass
    let dbpassword

    var checkSql = `select * from loginInfo where email = '${email}'`

    con.query(checkSql, (err, result) =>{
        if (err) throw err
        dbpassword = result[0].password
        bcrypt.compare(password, dbpassword, (err, result)=>{
            if (err) throw err;
            if(result){

                let user = {
                    uemail: email
                  };

                jwt.sign(
                    {
                      user,
                    },
                    "secretkey",
                    (err, token) => {
                       // req.session.token = token ;

                     vtoken = token
                    }
                  );
                  sess = "1";
                  res.redirect('homepage.html')
              

                //res.json(token)
            }else{
                res.send("login failed")
            }
        })
    })
})

app.get("/get_sess", (req, res) => {
    console.log(sess);
    res.send(sess);
    sess = "0"
  });

app.get('/get_token', (req, res)=>{
  //res.json({message:"hello"})
    //console.log(vtoken)
    res.send(vtoken)
    vtoken = ""
})

app.get('/data', (req, res) =>{
    console.log(req)
  
        res.json({
            message : "post created"
        })
})

async function verifyToken(req, res, next){
    
    console.log('in verify token')
    console.log(req)
try{
        const bearerHeader = req.headers["authorisation"];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            let authData = await jwt.verify(bearerToken, "secretkey");
            console.log(bearerToken)
            console.log(req.token)
            next();
        } else {
          res.status(403).json({message : "authentication failed"});
        }
    } catch(error){
        res.status(403).json({message : "authentication failed"})
    }
     
}

app.listen(4000, () => {
    console.log("Server running at port 4000");
  })
  