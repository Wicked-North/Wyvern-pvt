var mysql = require('mysql')
const pool = require("./db");
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const {
    get
} = require('http');

let sess = "0"
let pnr
///////


////

price = [
    [0, 3127, 3100, 3250, 2500, 2750, 3350],
    [3127, 0, 3500, 4000, 2500, 3500, 3256],
    [3100, 3500, 0, 4659, 3304, 2752, 2560],
    [3250, 4000, 4659, 0, 4253, 3440, 4500],
    [2500, 2500, 3304, 4253, 0, 4152, 3112],
    [2750, 3500, 2752, 3440, 4152, 0, 3505],
    [3350, 3256, 2560, 4500, 3112, 3505, 0],
]

// price = [
//     [0, 3462, 3456, 3767, 2675, 3578, 3467],
//     [3462, 0, 3200, 3650, 3000, 3820, 3500],
//     [3456, 3200, 0, 5345, 3899, 3466, 2899],
//     [3767, 3650, 5345, 0, 4300, 3890, 4500],
//     [2675, 3000, 3899, 4300, 0, 4564, 3250],
//     [3578, 3820, 3466, 3890, 4564, 0, 3899],
//     [3467, 3500, 2899, 4500, 3250, 3899, 0],
// ]


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
    host: "localhost",
    user: "root",
    password: "abhra", //change password 
    database: "wyvern",
    multipleStatements: true
})


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());



con.connect((err, res) => {
    if (err) throw err;
    else console.log("Db Connected")
})

app.post('/getSignup', (req, res) => {
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
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err
        hashPassword = hash;
        console.log(hashPassword)
    })

    var check_sql = `select* from loginInfo where email = '${email}'`

    con.query(check_sql, (err, result) => {
        var loginId
        if (result.length == 0) {
            var userIns = `insert into userInfo (user_name, email, gender, DOB, mobile_1, mobile_2, address) values ('${name}', '${email}', '${gender}', '${birthday}', '${mobile1}', '${mobile2}', '${address}')`

            con.query(userIns, (err, result) => {
                if (err) throw err;
                console.log("record inserted in user table");
            })

            var getid = `select user_id from userInfo where email = '${email}'`



            con.query(getid, (err, result) => {
                loginId = result[0].user_id;
                console.log(result[0].user_id, "helloooooo")

                var logIns = `insert into loginInfo (person_id, person_role, password, email) values(${loginId}, 'user', '${hashPassword}', '${email}')`

                console.log(hashPassword)

                con.query(logIns, (err, result) => {
                    if (err) throw err;
                    console.log("record inserted in login table");
                })

            })

            console.log(loginId, "hiiiii")


            res.send("Successfully Registered");

        } else {
            res.send("User with this email already exists. Try with a different email.")
        }
    })


})

app.post('/getLogin', (req, res) => {
    //console.log(req);
    let vtoken
    let user_id
    let user_name
    let gender
    let dob
    let mobile
    let loginObject = req.body
    let email = loginObject.email
    let password = loginObject.password
    let userDetails
    console.log(loginObject)
    //res.json({'msg':'logged in succesfully'})
    let dbpassword
    let test = {}
    var checkSql = `select * from loginInfo where email = '${email}'`
    try {
        con.query(checkSql, (err, result) => {

            if (err) throw err
            dbpassword = result[0].password
            bcrypt.compare(password, dbpassword, (err, result) => {

                if (err) throw err;
                if (result) {

                    var getDataSql = `select* from userinfo where email = '${email}' `

                    con.query(getDataSql, (err, result) => {



                        user_id = result[0].user_id
                        user_name = result[0].user_name
                        gender = result[0].gender
                        dob = result[0].DOB
                        mobile = result[0].mobile_1


                        console.log(user_id, user_name, gender, dob, mobile)

                    })


                    let user = {
                        uemail: email
                    };

                    jwt.sign({
                            user,
                        },
                        "secretkey",
                        (err, token) => {
                            // req.session.token = token ;

                            vtoken = token
                        }
                    );
                    sess = "1";
                    res.setHeader('email', 'abhraghosh9@gmail.com')


                    setTimeout(() => {
                        userDetails = {
                            token: vtoken,
                            sess: sess,
                            user_id: user_id,
                            user_name: user_name,
                            gender: gender,
                            dob: dob,
                            mobile: mobile
                        }
                    }, 10)
                    //res.json(userDetails)
                    console.log(userDetails)
                    // res.json(userDetails)
                    setTimeout(() => {
                        res.json(userDetails)
                    }, 10)

                    // userDetails={}


                    //res.json(token)
                } else {
                    console.log("failed")
                    res.json({
                        'successful': '0'
                    })
                }
            })
        })
    } catch (e) {
        console.log("wrong email")
    }
})

app.get('/get_userDetails', (req, res) => {
    res.setHeader('email', 'abhraghosh9@gmail.com')
    res.json(userDetails)

    console.log('route get details server side', userDetails)



})


app.post("/getViaDetails", (req, res) => {
    //console.log(req)
    var nodeObj = req.body
    console.log(nodeObj)
    var searchSql = `select * from flights where start = '${nodeObj.start}' && end = '${nodeObj.end}' and via is not NULL`
    con.query(searchSql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.json(result)
    })
    //res.json({name : "abhra"})
});

app.post("/getDirectDetails", (req, res) => {
    // console.log(req)
    var nodeObj = req.body
    console.log(nodeObj)
    var searchSql = `select * from flights where start = '${nodeObj.start}' && end = '${nodeObj.end}' and via is NULL`
    con.query(searchSql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.json(result)
    })
    //res.json({name : "abhra"})
});

app.post("/optimisedVia", (req, res) => {
    // console.log(req)
    var nodeObj = req.body
    console.log(nodeObj)
    var searchSql = `select * from flights where start = '${nodeObj.start}' && end = '${nodeObj.end}' && via = '${nodeObj.via}'`
    con.query(searchSql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.json(result)
    })
    //res.json({name : "abhra"})
});

app.post("/bookSeats", (req, res) => {

    var days = req.body[0].seats.day
    var seatString = req.body[0].seats.seat
    var fnums = req.body[0].seats.fnum
    var type = req.body[0].ticket.type
    var flight_num = req.body[0].ticket.flight_num
    var price = req.body[0].ticket.price
    var userid = req.body[0].ticket.userid
    let boarding = req.body[0].ticket.boarding
    let totalPrice = req.body[0].ticket.totalPrice

    console.log(type, flight_num, price, userid)



    var searchSql = 'update seats set `' + days + '`' + `='${seatString}' where flight_num='${fnums}'`
    con.query(searchSql, (err, result) => {
        if (err) throw err;
        else
            console.log("Updated into Seats")
    })

    var insertTicket = `insert into tickets (class,flight_num,userid,total_price,boarding) values('${type}','${flight_num}','${userid}','${totalPrice}','${boarding}')`
    var getPNR = `select PNR from tickets where userid = '${userid}' order by PNR desc LIMIT 1`

    con.query(insertTicket, (err, result) => {
        if (err) throw err;
        else {
            console.log("Inserted into Tickets")
            con.query(getPNR, (err, re) => {
                if (err) throw err;
                else {
                    pnr = re[0].PNR
                    console.log(pnr)

                    for (var i = 0; i < req.body[0].pass.length; i++) {
                        var name = req.body[0].pass[i].name
                        var dob = req.body[0].pass[i].dob
                        var email = req.body[0].pass[i].email
                        var phone = req.body[0].pass[i].phone
                        var flight = req.body[0].pass[i].flight
                        var boarding = req.body[0].board

                        var pid = req.body[0].pass[i].id
                        var PNRpas = pnr
                        var seatNo = req.body[0].pass[i].seats
                        var pasGen = req.body[0].pass[i].gender.slice(0, 1)


                        var searchSql = `insert into passengers (paspnr,pname,pid,pemail,pmobile,seat_no,gender,dob,pas_boarding)values(${PNRpas},'${name}',${pid},'${email}','${phone}','${seatNo}','${pasGen}','${dob}','${boarding}')`
                        con.query(searchSql, (err, result) => {
                            if (err) throw err;
                            else
                                console.log("Inserted into Passengers")
                        })

                    }


                }
            })
        }
    })




});

// app.get()




app.post("/getSeatDets", (req, res) => {
    var days = req.body.day
    var fnums = req.body.fnum
    console.log(req.body)
    var searchSql = 'select `' + days + '`' + ` as 'day' from seats where flight_num='${fnums}'`
    con.query(searchSql, (err, result) => {
        if (err) throw err;
        res.json(result)

    })
    //res.json({name : "abhra"})
});


app.get("/get_sess", (req, res) => {
    console.log(sess);
    res.send(sess);
    sess = "0"
});

app.get('/get_token', (req, res) => {
    //res.json({message:"hello"})
    //console.log(vtoken)
    res.send(vtoken)
    vtoken = ""
})

app.get('/data', (req, res) => {
    //console.log(req)

    res.json({

        message: "post created"
    })
})

// async function verifyToken(req, res, next){

//     console.log('in verify token')
//     //console.log(req)
// try{
//         const bearerHeader = req.headers["authorisation"];
//         if (typeof bearerHeader !== "undefined") {
//             const bearer = bearerHeader.split(' ');
//             const bearerToken = bearer[1];
//             let authData = await jwt.verify(bearerToken, "secretkey");
//             console.log(bearerToken)
//             console.log(req.token)
//             next();
//         } else {
//           res.status(403).json({message : "authentication failed"});
//         }
//     } catch(error){
//         res.status(403).json({message : "authentication failed"})
//     }

// }

//One time function for feeding values into SQL
function insertDirectPath() {
    var places = ["bangalore", "delhi", "mumbai", "kolkata", "jaipur", "hyderabad", "ahmedabad"];
    var cou = 300;
    for (var i = 0; i < places.length; i++) {
        for (var j = 0; j < places.length; j++) {
            if (i == j)
                continue;

            // console.log({start:places[i] ,end:places[j]})
            var nameSelector = flight_name[Math.floor((Math.random() * 5))];
            var insPrice = price[i][j]
            var dep = time[i][j].split('-')[0]
            var arr = time[i][j].split('-')[1]
            var fnum = `${nameSelector.slice(0,2)}-${cou+=2}`
            var dataInsertSql = `insert into flights values ('${fnum}','${nameSelector}','${places[i]}', NULL , '${places[j]}', '${dep}', '${arr}', ${insPrice})`

            con.query(dataInsertSql, (err, res) => {
                if (err) throw err
                console.log('data inserted in flights (dir)')
            })

            //console.log(nameSelector, insPrice, dep, arr, fnum, places[i],places[j])

        }
    }
}
//insertDirectPath()


//One time function for feeding values into SQL
function abcd() {
    var cou = 604
    var places = ["bangalore", "delhi", "mumbai", "kolkata", "jaipur", "hyderabad", "ahmedabad"];
    for (var i = 0; i < places.length; i++) {
        for (var j = 0; j < places.length; j++) {
            if (i == j)
                continue;
            for (var k = 0; k < places.length; k++) {
                if (k == j || k == i)
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
                con.query(dataInsertSql, (err, res) => {
                    if (err) throw err
                    console.log('data inserted in flights (via)')
                })
                //console.log(count++)
            }
        }
    }
}
//insertViaPath()

app.post("/getCurrentTicketsPassengers", (req, resp) => {

    var userID = req.body.userId
    let pnrWiseTickets = []
    var distinctPnrSql = `select distinct pnr from tickets where userid = ${userID}`
    con.query(distinctPnrSql, (err, res) => {
        if (err) throw err
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            let curTicketsPassengers = `
            select t.pnr, t.class, t.flight_num, t.userID, t.total_price, p.pname, p.pid, p.seat_no, p.gender, p.dob, f.start, f.via, f.end, f.flight_name from flights f, tickets t, passengers p where t.pnr = p.paspnr and t.userid = '${userID}' and f.flight_num = t.flight_num and pnr = ${res[i].pnr}`

            con.query(curTicketsPassengers, (err, result) => {
                if (err) throw err;
                else {
                    console.log(result)
                    pnrWiseTickets.push(result)
                }

            })
        }
        setTimeout(() => {
            console.log(pnrWiseTickets)
            resp.json(pnrWiseTickets)
        }, 1000)

    })

});

app.post("/getPastTicketsPassengers", (req, resp) => {

    var userID = req.body.userId
    let pnrWiseTickets = []
    var distinctPnrSql = `select distinct pnr from completed_tickets where userid = ${userID}`
    con.query(distinctPnrSql, (err, res) => {
        if (err) throw err
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            let curTicketsPassengers = `
            select t.pnr, t.class, t.flight_num, t.userID, t.total_price, p.pname, p.pid, p.seat_no, p.gender, p.dob, f.start, f.via, f.end, f.flight_name from flights f, completed_tickets t, completed_passengers p where t.pnr = p.paspnr and t.userid = '${userID}' and f.flight_num = t.flight_num and pnr = ${res[i].pnr}`

            con.query(curTicketsPassengers, (err, result) => {
                if (err) throw err;
                else {
                    console.log(result)
                    pnrWiseTickets.push(result)
                }

            })
        }
        setTimeout(() => {
            console.log(pnrWiseTickets)
            resp.json(pnrWiseTickets)
        }, 1000)

    })

});


//===============================================  ADMIN SECTION===============================================================================

app.get('/getCurrentTicketDetails', async (req, res) => {
    try {
        let sql = `select* from tickets`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.get('/getPreviousTicketDetails', async (req, res) => {
    try {
        let sql = `select* from completed_tickets where status = 'completed'`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.get('/getCancelledTicketDetails', async (req, res) => {
    try {
        let sql = `select* from completed_tickets where status = 'cancelled'`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.post('/getTicketDetailsByPnr', async (req, res) => {
    //console.log(req)
    try {
        console.log(req)
        let pnr = req.body.pnr
        let sql = `select* from tickets where pnr = '${pnr}'`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.post('/getTicketDetailsByUserid', async (req, res) => {
    let userTickDets = []
    //console.log(req)
    try {
        console.log(req)
        let uid = req.body.uid
        let sqlCur = `select* from tickets where userid = '${uid}'`
        let sqlPrev = `select* from completed_tickets where userid = '${uid}' and status = 'completed'`
        let sqlCanc = `select* from completed_tickets where userid = '${uid}' and status = 'cancelled'`
        //console.log(sql)
        let [resultCur] = await pool.query(sqlCur)
        //console.log(resultCur)
        userTickDets.push(resultCur)
        let [resultPrev] = await pool.query(sqlPrev)
        userTickDets.push(resultPrev)
        let [resultCanc] = await pool.query(sqlCanc)
        userTickDets.push(resultCanc)
        res.json(userTickDets)
    } catch (err) {
        console.log(err)
    }
})


app.get('/getFlightDetails', async (req, res) => {
    try {
        let sql = `select* from flights`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.get('/getUserDetails', async (req, res) => {
    try {
        let sql = `select* from userinfo`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.post('/getUserDetailsByUserid', async (req, res) => {
    //console.log(req)
    try {
        console.log(req)
        let uid = req.body.uid
        let sql = `select* from userinfo where user_id = '${uid}'`
        console.log(sql)
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})


app.get('/getPassengerDetails', async (req, res) => {
    try {
        let sql = `select* from passengers order by paspnr`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

app.post('/getPassengerDetailsByPnr', async (req, res) => {
    //console.log(req)
    try {
        console.log(req)
        let pnr = req.body.pnr
        let sql = `select* from passengers where paspnr = '${pnr}'`
        let [result] = await pool.query(sql)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})



app.listen('4000', () => {
    console.log("Server running at port 4000");
})