export const scrapeRequest = require('request');
export const cheerio = require('cheerio');
export const tableParser = require('cheerio-tableparser');
export const getHost = () => `http://127.0.0.1:4000/graphql`;