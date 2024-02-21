import express from 'express'
import cors from 'cors'
import mainRoute from './src/main.route.js';
import cookieParser from 'cookie-parser';
import path, {join} from 'path'
import { fileURLToPath } from 'url';
const app = express();
const port = 3001;


//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());




//entry routes
app.use('/api', mainRoute)

//listening to port
app.listen(port, () => {
  console.log(`App is listenings at port number: ${port}`)
})
