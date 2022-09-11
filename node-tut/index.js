const express = require('express');
const con = require("./config");
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    con.query("select * from users",(err,result)=>{
        if(err)
        {
          res.send("some error")
        }
        else{
          res.send(result)
        }
      })
});

app.post("/",(req,resp)=>{
  const data=req.body;
  con.query("INSERT INTO users SET?",data,(error,results,fields)=>{
    if(error) throw error;
    resp.send(results)
  })
});

app.put("/:id",(req,resp)=>{
  const data= [req.body.name,req.params.id];
  con.query("UPDATE users SET name = ? WHERE id = ?",
  data,(error,results,fields)=>{
    if(error) throw error;
    resp.send(results)
  })
})
//if affectedRows count is 0 then you have to run insert code
app.delete("/:id",(req,resp)=>{
  con.query("DELETE FROM users WHERE id="+ req.params.id);
  resp.send(req.params.id);
})

app.listen(5000)