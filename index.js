const { log } = require("console")
const express=require("express")
const app =express()
const port =4444
const path=require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override")
app.use(methodOverride("_method"));
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
app.set("view engine","ejs")
//url endcoded data smjh paiga express'
// , parse karne mein help
app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))//css file
 
let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding",
    }, 
    {
        id:uuidv4(),
        username:"Aditya Pal",
        content:"Hardwork is important to achieve success",
    },
    {
        id:uuidv4(),
        username:"Gaurav Singh",
        content:"I got selected for my first internship",
    }
]


app.get("/posts",(req,res)=>{
   // res.send("serving working well")
   res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})  
app.post("/posts",(req,res)=>{
let {username,content}=req.body;
let id=uuidv4()
posts.push({id,username,content});
res.redirect("/posts")

})
app.get("/posts/:id",( req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=> id===p.id);
 res.render("show",{post})

})
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts")

})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts =posts.filter((p)=>id!==p. id);
    res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit")


})

app.listen(port,()=>{
    console.log("listening to port :4444");
})
//get request mein to  request ke parameters ke
 //ander Query le ander hamari information aaati hai 
// but post request mein body ke ander request aati hai  