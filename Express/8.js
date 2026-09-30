const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

const students = [
    {
        id:101,
        name:"dia",
        course:"MCA"
    },
    {
        id:102,
        name:"Priya",
        course:"BCA"
    },
    {
        id:103,
        name:"Jiya",
        course:"MCA"
    }
];

app.get("/", (req,res) => {
    res.send("Welcome to Student information System");
});

app.get("/students", (req,res) => {
    res.json(students);
});

app.get("/search", (req,res) => {
    const course = req.query.course;
    const result = students.filter
    (
        student => student.course.toLowerCase() === coursse.toLowerCase()
    );

    if(result.length > 0)
    {
        res.json(result);
    }
    else{
        res.status(404).json
        ({
            message:"No Found"
        });
    }
});

app.get("/students/:id", (req,res) =>
{
    const studentId = req.params.id;
    const student = students.find(
        student => student.id == studentId
    );
    if(student)
    {
        res.status(200).json({
            message:"Student Added",
            student:student
        });
    }
    else{
        res.status(404).json({
            message:"Student not found"
        });
    }
});

app.post("/students", (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}` );
});
