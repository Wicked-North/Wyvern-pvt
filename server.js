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

price = [
    [0, 3127, 3100, 3250, 2500, 2750, 3350],
    [3127, 0, 3500, 4000, 2500, 3500, 3256],
    [3100, 3500, 0, 4659, 3304, 2752, 2560],
    [3250, 4000, 4659, 0, 4253, 3440, 4500],
    [2500, 2500, 3304, 4253, 0, 4152, 3112],
    [2750, 3500, 2752, 3440, 4152, 0, 3505],
    [3350, 3256, 2560, 4500, 3112, 3505, 0],
  ]   


 time = [
    [0, '19:30:00-22:15:00', '20:45:00-22:35:00', '19:10:00-21:50:00', '07:05:00-10:00:00', '07:50:00-08:55:00', '04:45:00-07:05:00'],
    ['19:30:00-22:15:00', 0, '18:20:00-20:15:00', '10:55:00-11:45:00', '12:25:00-13:45:00', '19:35:00-21:55:00', '07:15:00-08:40:00'],
    ['20:45:00-22:35:00', '18:20:00-20:15:00', 0, '19:55:00-22:30:00', '16:50:00-18:45:00', '16:00:00-17:20:00', '19:05:00-21:10:00'],
    ['19:10:00-21:50:00', '10:55:00-11:45:00', '19:55:00-22:30:00', 0, '19:40:00-21:00:00', '19:55:00-22:10:00', '16:30:00-19:30:00'],
    ['07:05:00-10:00:00', '12:25:00-13:45:00', '16:50:00-18:45:00', '19:40:00-21:00:00', 0, '11:45:00-13:40:00', '07:15:00-08:15:00'],
    ['07:50:00-08:55:00', '19:35:00-21:55:00', '16:00:00-17:20:00', '19:55:00-22:10:00', '11:45:00-13:40:00', 0, '15:40:00-17:25:00'],
    ['04:45:00-07:05:00', '07:15:00-08:40:00', '19:05:00-21:10:00', '16:30:00-19:30:00', '07:15:00-08:15:00', '15:40:00-17:25:00', 0],
  ]

flight_name = ['indigo', 'vistara', "air india", 'go air', 'spice jet', 'jet airways']
 


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
    //console.log(req);
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

app.post("/getDetails", (req, res) =>{
//console.log(req)
let start = req.body.start
let end = req.body.end
var searchSql = `select * from flights where start = '${start}' && end = '${end}'`
con.query(searchSql, (err, result) =>{
    if(err) throw err;
    //console.log(result)
    res.json(result)
})
console.log(start, end)
});


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

app.get('/data', verifyToken, (req, res) =>{
    //console.log(req)
  
        res.json({
            message : "post created"
        })
})

async function verifyToken(req, res, next){
    
    console.log('in verify token')
    //console.log(req)
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


function insertDirectPath(){
var places = ["bangalore", "delhi", "mumbai", "kolkata", "jaipur", "hyderabad","ahmedabad"];
var cou = 435;
 for(var i=0;i<places.length;i++){
     for(var j=0;j<places.length;j++){
         if(i==j)
            continue;
            
           // console.log({start:places[i] ,end:places[j]})
            var nameSelector = flight_name[Math.floor((Math.random() * 5))];
            var insPrice = price[i][j]
            var dep = time[i][j].split('-')[0]
            var arr = time[i][j].split('-')[1]
            var fnum = `${name.slice(0,2)}-${cou+=4}`
            var dataInsertSql = `insert into flights values ('${fnum}','${nameSelector}','${places[i]}', NULL , '${places[j]}', '${dep}', '${arr}', ${insPrice})`

            con.query(dataInsertSql,(err, res) =>{
                if (err) throw err
                console.log('data inserted in flights (dir)')
            })

            //console.log(nameSelector, insPrice, dep, arr, fnum, places[i],places[j])
         
     }
 }
}
//insertDirectPath()



function insertViaPath(){
var cou = 604
var places = ["bangalore", "delhi", "mumbai", "kolkata", "jaipur", "hyderabad","ahmedabad"];
 for(var i=0;i<places.length;i++){
     for(var j=0;j<places.length;j++){
         if(i==j)
            continue;
         for(var k=0;k<places.length;k++){
             if(k==j || k==i)
                continue;
                var priceSelector = Math.floor((Math.random() * 1000) - 300);
                var nameSelector = flight_name[Math.floor((Math.random() * 5))];
                var viaPrice = price[i][j] + priceSelector
                var depVia = time[k][j].split('-')[0]
                var arrVia = time[k][j].split('-')[1]
                var hourVia = Number(arrVia.split(':')[0]) - Number(depVia.split(':')[0])
                var start = time[i][k].split('-')[1]
                var hourStart = start.split(':')
                hourStart[0] = Number(hourStart[0]) + hourVia
                hourStart = hourStart.join(':')

                //console.log(hourStart,hourVia)

               
               
                var fnum = `${nameSelector.slice(0,2)}-${cou+=2}`
                var dataInsertSql = `insert into flights values ('${fnum}','${nameSelector}','${places[i]}', '${places[k]}' , '${places[j]}', '${time[i][k].split('-')[0]}', '${hourStart}', ${viaPrice})`
                //console.log(fnum,nameSelector, places[i],places[k] ,places[j] ,time[i][k].split('-')[0] ,hourStart ,viaPrice)
                con.query(dataInsertSql,(err, res) =>{
                    if (err) throw err
                    console.log('data inserted in flights (via)')
                })
            //console.log(count++)
         }
     }
 }
}
//insertViaPath()

app.listen('4000', () => {
    console.log("Server running at port 4000");
  })
  