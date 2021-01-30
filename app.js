const express = require("express");
const Student = require("./db/models/students");
require("./db/conn");

const app = express();
const port = process.env.PORT || 9860;

app.use(express.json());
//create new student

app.get("/students", async (req, res) => {
    try{
        const studentData = await Student.find();
        res.send(studentData);
    }catch(e){
        res.send(e);

    }
})


app.post("/students",(req,res) => {

    console.log(req.body);
   const user = new Student(req.body);

   user.save().then(()=> {
       res.status(201).send(user);
   }).catch((e)=> {
       res.status(400).send(e);
   })
})


//update
app.put("/students/:id",async (req,res)=> {
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body,{
            new : true
        });
        res.send(updateStudents);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete
app.delete("/students/:id",async (req,res)=> {
    try{
       // const _id = req.params.id;
        const deleteStudents = await Student.findByIdAndDelete(req.params.id);   
            if(!req.params.id){
                return res.status(400).send();
            }
        
        res.send(deleteStudents);
    }catch(e){
        res.status(500).send(e);
    }
})





app.listen(port, ()=>{
    console.log("connection is setup at",port)
})