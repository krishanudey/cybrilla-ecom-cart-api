import * as express from 'express';
import * as path from 'path';
import { app } from './api/app';

const port = 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.listen(port, function () {
    console.log(`server listening on port ${port}!`);
});
