import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, //15minutes,
    max: 100, //Limit each Ip to 100 requests per window (here 5min),
}));
app.listen(3001, '0.0.0.0', ()=>{
    console.log('Listening on port http://localhost:3001');
});
// app.get('/', async ())

app.use(handleError);