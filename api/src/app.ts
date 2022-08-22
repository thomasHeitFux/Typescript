import express, { Application,Request, Response, NextFunction} from 'express';
import config from './lib/config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index';
//-----------------------------------
const app: Application = express();


interface error {
	status: number;
	message: string;
}

app.use(express.urlencoded({extended: true, limit: '50mb'})); //middleware
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/', routes);
app.use(
	cors({
	  origin: "http://localhost:3000",
	  credentials: true,
	  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
	  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
	})
  );
// app.use((req: Request, res: Response,  next: NextFunction) => {
// 	res.header('Access-Control-Allow-Origin', '*'); 
// 	res.header('Access-Control-Allow-Credentials', 'true');
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// 	next();
//   });

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

export default app;