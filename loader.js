import mongoose from 'mongoose';
import DrakeSpeak from './src/models/DrakeSpeak';
import seed from './seed.json';

mongoose.connect('mongodb://localhost/drakebot');

seed.forEach((quote) => {
  let d = new DrakeSpeak(quote);
  d.save((err, res)=> {
    if (err) throw err;
    console.log('saved... ', res);
  });
});
