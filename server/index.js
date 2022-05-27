const dbUri = 'mongodb+srv://xkiller:mongo123@cluster0.g6bs0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FriendModel = require('./models/friend')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('connected'))
    .catch((err) => console.log(err))




// create
app.post('/insert',  (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;

    const friend = new FriendModel({ name, age, phone })
    friend.save()
    res.send(friend)
})



// read
app.get('/read', (req, res) => {
    FriendModel.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
})



// delete
app.delete('/delete/:id' , async (req ,res)=>{
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id).exec()
    res.send('one friend deleted')
})



// update 
app.put("/update" , async (req , res)=>{
    const id = req.body.id
    const name = req.body.name
    const age = req.body.age
    const phone = req.body.phone
    console.log(req.body)
    try{
        await FriendModel.findById(id , (error , friendToUpdate) =>{
            friendToUpdate.name=name
            friendToUpdate.age=Number(age)
            friendToUpdate.phone=phone
            friendToUpdate.save()
        })
    }catch{err=>console.log(err)}
    res.send('updated')
})




app.post('/findFriend' , (req,res)=>{
const find =req.body.find
  FriendModel.find({name:find})
  .then(result=>res.send(result))
})



app.get('/', (req, res) => {
    res.send('at Home')
})


app.listen(3001);



















