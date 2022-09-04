'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/Books', {useNewUrlParser: true, useUnifiedTopology: true});

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
  status: 'unread'
})
let seceondbook = new Bookmodel({
  title: '12 Rules for Life',
  description: 't provides life advice through essays in abstract ethical principles, psychology, mythology, religion, and personal anecdotes.',
  status: 'unread'
})
let thirdBook  = new Bookmodel({
  title: 'The Official SAT Study Guide,',
  description: 'one of the most useful test preparation tools available to the public for a very, very low cost.',
  status: 'read'
})
await firstBook.save();
await seceondbook.save();
await thirdBook.save();
}

//seedData();



app.get('/books',BooksHandler)


function BooksHandler(req,res) {
  Bookmodel.find({},(err,result)=>{
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





app.get('/test', (request, response) => {

  response.send('test request received')

})
app.get('/*', (req, res) => {
  console.log('HELLO THERE')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));