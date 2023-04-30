const express = require("express");
require("./db/conn");
const Student = require("./models/student");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());    

//promises using

// app.post("/students",(req,res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })

//     // res.send("hello from the other sides. ");
// })

//using async await

app.post("/students", async(req,res) => {

    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){ res.status(400).send(e); }
    
})

app.get("/students", async (req,res) => {
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

app.get("/students/:id", async (req,res) => {
    try{
        const _name = req.params.id ;
        const studentData = await Student.findById(_name);
        console.log(studentData);
        //res.send(req.params.name);
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }
    catch(e){
        res.status(500).send(e);
    }
})

app.delete("/students/:id", async (req,res) => {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteStudent);
        
    }
    catch(e){
        res.status(500).send(e);
    }
})

app.patch("/students/:name", async (req,res) => {
    try{
        const _id = req.params.name;
        const updateStudent = await Student.findByNameAndUpdate(_id, req.body, {
            new : true
        });
        res.send(updateStudent);
        
    }
    catch(e){
        res.status(400).send(e);
    }
})

  
app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})


//you do not need express.json() and express.urlencoded()
//for get requests or delete requests we only need it for post and put req

//express.json() is a method inbuilt in express to recognize the incoming
//request object as a json object this method is called as a middleware
//in your application using the code: app.use(express.json());