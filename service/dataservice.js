const db =require('./db')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const login =async (acno,pswd) =>{
  const user = await db.admin.findOne({ username:acno })
  console.log('user: ', user);
  console.log(pswd,acno);
  const cmp = await bcrypt.compare(pswd, user.password);
  if( cmp){

    return db.user.findOne({username:acno,password:pswd}).then( user =>{
      
      
      // console.log('pswd: ', pswd);
      // console.log(acno)
      // console.log(userDetails)
      
      if(user){
        // console.log('user: ',);
        
        // console.log(acno);
        // // console.log(acno)
        // if(pswd==userDetails[acno]['password'])
        //  currentUser=userDetails[acno]['username']
        //  currentAcno=userDetails[acno].acno
        // key=require('crypto').randomBytes(32).toString('hex')
        // const token = jwt.sign(acno,key)
        const token = jwt.sign(acno,'shajmil2022')
         return {
         currentuser: user.username,
          statuscode:200,
          status: 'success',
          message:' account login sucess',
          acno,
        token
        }
         
        
        }
        else{
          return {
            statuscode:401,
            status: 'fail',
            message:'  password incorrect'
          }
        }
        
      })
    }
        else{
            return {
                statuscode:401,
                status: 'fail',
                message:' user not found'
              
            
            }
            
          }
        }
const signUp = async (username,password)=>{
// var hash;

  return db.admin.findOne({username}).then(users=>{
 
    if(users){
      // alert('already exist')
      return {
        statuscode:401,
        status: 'fail',
        message:' account already exist'
      }
    }else{

      // console.log('hash: ', hash);
     const newUser= new db.admin( {
       
        username,
        password,

      } )  

      newUser.save()
      // console.log(userDetails);
    // console.log(details);
      return {
        statuscode:200,
        status: 'success',
        message:' account created'
      }
    }
  
  }
  ) 

}
const add = (firstname,lastname,email,city,address,gender,final_img)=>{
  console.log('final_img: ', final_img);
    // console.log('gender: ', gender);
    // console.log('address: ', address);
    // console.log('city: ', city);
    // console.log('email: ', email);
    // console.log('lastname: ', lastname);
    // console.log('firstname: ', firstname);

    
 
    return db.user.findOne({email}).then(users=>{
  
   
      if(users){
        console.log('users: ', users);
        // alert('already exist')
        return {
          statuscode:401,
          status: 'fail',
          message:' Customer already exist'
        }
      }else{
       const newUser= new db.user( {
           firstname,
           lastname,
           email,
           city,address,gender,img:final_img
           
        }, )  
        // console.log('newUser: ', newUser);
  
        newUser.save()
        // console.log(userDetails);
      // console.log(details);
        return {
          statuscode:200,
          status: 'success',
          message:' Customer created'
        }
      }
    
    }
    ) }
const update = (id,firstname,lastname,email,city,address,gender)=>{
    // console.log('gender: ', gender);
    // console.log('address: ', address);
    // console.log('city: ', city);
    // console.log('email: ', email);
    // console.log('lastname: ', lastname);
    // console.log('firstname: ', firstname);

    
 
    return db.user.updateOne( { _id: id },
    {
      $set: {    firstname,
        lastname,
        email,
        city,address,gender },
    
    }).then(users=>{
      // console.log('users: ', users);
  
   
      if(users){
        // alert('already exist')
        return {
          statuscode:200,
          status: 'success',
          message:' Customer updated'
        }
      }else{
      
        // console.log(userDetails);
      // console.log(details);
        return {
          statuscode:401,
          status: 'fail',
          message:' email already'
        }
      }
    
    }
    ).catch(err=>{
      // console.log('err: ', err);
      return {
        statuscode:401,
        status: 'fail',
        message:' email already'
      }

    }) }
    const showcust=()=>{
        return db.user.find().then(users=>{
            // console.log('users: ', users);
            var b = Buffer.from(users[0].img.data).toString('base64')
          // console.log('b: ', b);
          users[0].img=b;
// var s = b.toString();
// console.log('s: ', s);
            return {
                statuscode:200,
                status: 'success',
                message:users
              }


    })}
    const deleteCus=(email)=>{
     
    
        return db.user.deleteOne({ email: email }).then(users=>{
          
            // console.log('users: ', users);
            return {
                statuscode:200,
                status: 'success',
                message:users
              }
    }
    )
  }
    module.exports = {
      add,showcust
    ,deleteCus,update,signUp,login
      }