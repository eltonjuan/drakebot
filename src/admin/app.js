import express from 'express';
import { dust } from 'adaro';
import render from './admin';
import path from 'path';
export default function () {
  const app = express();
  const port = 8080;

  app.engine('dust', dust());
  app.set('view engine', 'dust');
  app.set('views', path.join(__dirname, 'templates'));

  app.get('/', (req, res) => {
    render().then(markup => {
      res.render('index', {
        markup,
      });
    }).catch(err => {
      console.error(err);
    });
  });

  const server = app.listen(port, () => {
    const host = server.address().address;
    console.log(server.address());
    console.log(`Admin app listening at http://${host}:${port}`);
  });
}
