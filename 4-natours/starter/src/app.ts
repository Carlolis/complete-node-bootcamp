import express from 'express';

const app = express();

app.get('/json', (req, res) => {
  const json = req.query;
  console.log(json);
  const { inta, intb } = json;
  console.log(inta);
  let resultatC;
  if (!(inta == undefined || intb == undefined)) {
    resultatC = +inta + +intb;
  }
  res
    .status(200)
    .json({ message: 'Hello from the resultat is', resultat: resultatC });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
