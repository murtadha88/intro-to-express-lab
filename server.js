const e = require('express');
const express = require('express');

const app = express();

//Routes
//Q1:
app.get('/greeting/:name', (req, res) => {
    const name = req.params.name;

    res.send(`<h1>Hello there, ${name}!</h1>`);
});

//Q2:
app.get('/roll/:number', (req, res) => {
    const rollNumber = Number(req.params.number);
    if (rollNumber <= 999999999999999999999999999) {
        const randomNumber = Math.floor(Math.random() * rollNumber);
        res.send(`<p>You rolled a ${randomNumber}</p>`);
    }
    else {
        res.send("<p>You must specify a number</p>");
    }
});

//Q3:
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:number', (req, res) => {
    const itemNumber = Number(req.params.number);
    if (itemNumber <= 999999999999999999999999999) {
        if (itemNumber < collectibles.length) {
            const name = collectibles[itemNumber].name;
            const price = collectibles[itemNumber].price;

            res.send(`So, you want the ${name}? For ${price}, it can be yours!`);
        }
        else {
            res.send("<p>This item is not yet in stock. Check back soon!<p>");
        }
    }
    else {
        res.send("<p>You must specify a number</p>");
    }
});

//Q4:
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shose', (req, res) => {
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const type = req.query.type;

    let matchShose = [];

    for (let i = 0; i < shoes.length; i++) {
        if (shoes[i].price >= minPrice && shoes[i].price <= maxPrice && shoes[i].type == type) {
            matchShose.push(shoes[i]);
        }
    }

    if (matchShose.length > 0) {
        const response = matchShose
            .map(
                shose =>
                    `<h2>${shose.name}</h2>
                     <p>Price: $${shose.price}</p>
                     <p>Type: ${shose.type}</p>
                     <hr>`
            ).join("");

        res.send(response);
    }
    else {
        res.send("There is no shose like this.")
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});