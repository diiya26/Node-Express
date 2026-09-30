import express from "express"; 
const app=express();
const port=3000;

function menu(){
    return`
        <nav>
            <a href="/">Home</a> | 
            <a href="/users">Users</a> |
            <a href="/about">About</a>
        </nav>
    `;
}
const users= [
    {
        id:1001,
        user_name:"Diya",
        course:"MCA",
        semester:"3rd Semester"
    },
    {
        id:1002,
        user_name:"Nishit",
        course:"BCA",
        semester:"2nd Semester"
    },
    {
        id:1003,
        user_name:"Rehea",
        course:"MCA",
        semester:"3rd Semester"
    }
];
app.get("/",(req,res)=>{
    res.send(`
      ${menu()}
      <h2>Home</h2>
      <p>Welcome to the Home Page!</p>
    `);
});
app.get("/users",(req,res)=>{
let output =`
<h2>User List</h2>
<ul>
`;
users.forEach(user=>{
    output +=`<li>`;
    output +=`<a href="/users/${user.id}">${user.user_name}</a>`;
    output +=`</li>`;
    
});
output +=`</ul>`;
res.send(output);
});
app.get("/users/:id",(req,res)=>{
    const uid=req.params.id;
    const user=users.find(
        u=>u.id ==uid
    );   
    if(user){
        res.send(`
            ${menu()}
            <h2>User Detail</h2>
            <p>User Name : ${user.user_name}</p>
            <p>Course : ${user.course}</p>
            <p>Semester : ${user.semester}</p>
        `);
    }  else {
        res.status(404).send(`
            ${menu()}
            <h2>User Details</h2>
            <p>404 - User not found</p>
        `);
    }
});
app.get("/about",(req,res)=>{
    res.send(`
     ${menu()}
      <h2>About Us</h2>
      <p>This is the About Us page</p>
    `);
});
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`)
});
