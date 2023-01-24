const express = require('express')
const app = express()
const ds =require('./service/dataservice')
const db =require('./service/db')
const cors = require('cors')
const fs = require("fs")
const multer = require("multer")
app.use(express.json())
const bcrypt = require("bcryptjs")
app.use(cors({
    origin:'http://localhost:4200'
    
    }))
    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    //   });

    app.listen(3000,()=>{
        console.log('sucess');
        })
   
app.post('/login',async (req,res)=>{
    try {

        ds.login(req.body.acno,req.body.pswd).then(result=>{
            // res.json(result)
            
            res.status(result.statuscode).json(result)})
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }

   
    // if(result){
    //     res.send('success')
    
    // }
    // else{
    //     req.send('fail')
    // }
    })     
app.post('/register',async (req,res)=>{
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        console.log('hashedPwd: ', hashedPwd);
        ds.signUp(req.body.username,hashedPwd).then(result=>{res.status(result.statuscode).json(result)})

      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }

 
    // res.json(result)
    
    // if(result){
    //     res.send('success')
    
    // }
    // else{
    //     req.send('fail')
    // }
    })
        
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads')
            },
            filename: function (req, file, cb) {
              cb(null, file.fieldname + '-' + Date.now())
              console.log('file.fieldname: ', file.fieldname);
            }
          })
          var upload = multer({ storage: storage })




        app.post('/add',upload.single('file'),(req,res)=>{
            console.log('  req.body: ',   req.body);    
            var img = fs.readFileSync(req.file.path);
             var encode_img = img.toString('base64');
            //  console.log('encode_img: ', encode_img);
            var final_img = {
                data:new Buffer.from(encode_img,'base64'),
                contentType:req.file.mimetype,
            };
            // console.log('final_img : ', final_img );
            // console.log(',req.body.image:' ,req.file);
            // console.log(',req.body.image:' ,req.body.gender
            // );
            ds.add(req.body.firstname,req.body.lastname,req.body.email,req.body.city,req.body.address,req.body.gender,final_img)
            .then(result=>{


                res.status(result.statuscode).json(result)
    
            })

        })
        app.patch('/update',(req,res)=>{
            // console.log('  req.body: ',   req.body);    
            ds.update(req.body.id,req.body.firstname,req.body.lastname,req.body.email,req.body.city,req.body.address,req.body.gender)
            .then(result=>{
                // console.log('result: ', result);


                res.status(result.statuscode).json(result)
    
            })

        })
        app.get('/showcust',(req,res)=>{
            // console.log('res: ', res);
          
            ds.showcust()
            .then(result=>{
                // console.log('result: ', result.message[0].img);


                res.status(result.statuscode).json(result)
    
            })

        })
        app.delete('/deleteCus',(req,res)=>{
            let email=req.headers['email']
            console.log('email: ', email);
            console.log('res: ', req.body);
          
            ds.deleteCus(email)
            .then(result=>{
                // console.log('result: ', result.message);


                res.status(result.statuscode).json(result)
    
            })

        })