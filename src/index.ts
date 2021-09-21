import './app';

const dotenv = require('dotenv');
const path = require('path');

console.log(process.env);
dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});
