const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 5500;

app.use(express.static('public'));
app.get('/api/quotes/random', (req, res, next) => {
  const data = getRandomElement(quotes);
 
    const dataquote = {
      quote: {
        quote: data.quote,
        person: data.person
      }
    }
  
  res.send(dataquote);
});

app.get('/api/quotes', (req, res, next) => {
  const personQuery = req.query.person;

  // If there's a person query parameter, filter quotes by that person
  if (personQuery) {
    const filteredQuotes = quotes.filter(quote => quote.person === personQuery);
    res.json({ quotes: filteredQuotes });
  } else {
    // If no query parameter, return all quotes
    res.json({ quotes: quotes });
  }
});

app.post('/api/quotes', (req, res, send) => {

  const quoteParam = req.query.quote;
  const personParam = req.query.person;

  if(!quoteParam || !personParam){
    res.status(400);
  }
  else {
    const responseQuote = {
    quote: {
      quote: quoteParam,
      person: personParam
    }
  }

   const newQuote = {
      quote: quoteParam,
      person: personParam,
    };

    // Add the new quote to your data store (e.g., quotes array)
    quotes.push(newQuote);

  res.send(responseQuote);
  }
  
});
app.listen(PORT);
