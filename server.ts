import { server } from './src/main';

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

const port = process.env.PORT ?? 3000;
server.listen(port).then();
