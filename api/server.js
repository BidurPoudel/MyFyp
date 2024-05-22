import express from 'express'
import cors from 'cors'
import mainRoute from './src/main.route.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3001;


//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  credentials: true,
};
app.use(cors(corsOptions));

//entry routes
app.use('/api', mainRoute)

//listening to port
app.listen(port, () => {
  console.log(`App is listenings at port number: ${port}`)
})
