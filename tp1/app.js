const express = require('express')
const app = express()
const port = 3000

const metrics = {
    requestsCount: {},
    status: 'healthy',
};
   
app.get('/metrics', (req, res, next) => {
    console.log('entree metrics');
    metrics.uptime = `${process.uptime().toFixed(2)}`
    return res.json(metrics);
});

app.use((req, res, next) => {
    const currentURLCount= metrics.requestsCount[req.url];
    metrics.requestsCount[req.url] = currentURLCount
        ? currentURLCount+1
        : 1 ;
    return next();
});

app.get('/welcome', (req, res) => {
    res.send('Bienvenue sur le TP 1 du cours darchitecture logicielle !')
})

app.get('/secret', (req, res) => {
    res.status(401).send('Vous ne possédez pas les droits pour accéder à ma page secrète')
})

app.get('/error', (req, res) => {
    res.status(500).json({ message: 'Erreur interne du serveur' })
})

app.use(express.static('public'))

app.get('/img', (req, res) => {
  res.download('public/image.jpg')
})

app.get('/redirectMe', (req, res) => {
    res.redirect('https://iut.univ-paris8.fr/')
})
app.get('/users/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Bienvenue sur la page de ${name}`);
})
app.get('/somme', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const somme = a + b;
    res.send(`La somme de ${a} et ${b} est égale à ${somme}`);
})  
  
app.use((req,res) => {
    res.status(404).send("Cette page n'existe pas!");
});
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()}: ${req.path}`);
    return next();
});

  
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})