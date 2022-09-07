'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb://ihababbas:ihab2312@ac-kxl5ukb-shard-00-00.pwuqss6.mongodb.net:27017,ac-kxl5ukb-shard-00-01.pwuqss6.mongodb.net:27017,ac-kxl5ukb-shard-00-02.pwuqss6.mongodb.net:27017/?ssl=true&replicaSet=atlas-g6rktj-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MONGO ONLINE')
});

const Bookmodel = require('./book');


async function seedData(){
let firstBook = new Bookmodel({
  title: 'The Martian',
  description: 'Get you some potatoes',
  status: 'unread',
  name: "Admin",
})
let seceondbook = new Bookmodel({
  title: '12 Rules for Life',
  description: 't provides life advice through essays in abstract ethical principles, psychology, mythology, religion, and personal anecdotes.',
  status: 'unread',
  name: "Admin",
})
let thirdBook  = new Bookmodel({
  title: 'The Official SAT Study Guide,',
  description: 'one of the most useful test preparation tools available to the public for a very, very low cost.',
  status: 'read',
  name: "Admin",
})
await firstBook.save();
await seceondbook.save();
await thirdBook.save();
}

//seedData();



app.get('/books',BooksHandler)
app.post('/books', postBooks)
app.delete('/book/:id', deleteBooks);
app.put('/books/:id', updateBooks);

function BooksHandler(req,res) {
  const name = req.query.name
  Bookmodel.find({name:name},(err,result)=>{
      if(err)
      {
          console.log(err);
      } 
      else
      {
          console.log(result);
          res.send(result);
      }
  })
}

async function postBooks(req, res, next) {
  console.log(req.params.id);
  try {
    console.log(req.body);
    console.log("post");
    let createdBooks = await Bookmodel.create(req.body)
    res.status(200).send('Book Created');
  } catch (err) {
    next(err);
  }
};

async function deleteBooks(req, res, next) {
  try {
    
    await Bookmodel.findByIdAndDelete(req.params.id);
    res.status(200).send('Book Deleted');
  } catch (err) {
    next(err);
  }
};
async function updateBooks(req, res, next) {
  try {   
    let id = req.params.id;
    await Bookmodel.updateOne({_id: id},req.body);
    res.status(200).send('Book Updated');
  } catch (err) { 
    next(err);
  }
};


app.get('/test', (request, response) => {

  response.send('test request received')

})
app.get('/*', (req, res) => {
  console.log('HELLO THERE')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
