import express from 'express';
import render from './admin';

export default function() {
  const app = express();
  const port = 8080;

  app.get('/', (req, res) => {
    render().then((markup) => {
      res.send(markup);
    }).catch((err) => {
      console.error(err);
    });
  });

  const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(server.address())
    console.log(`Admin app listening at http://${host}:${port}`)
  });
}
