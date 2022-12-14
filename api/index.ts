import {sequelize} from './src/db';
import app from './src/app';
import config from './src/lib/config'
sequelize
	.sync({force: true, logging: false})
	.then(() => {
		console.log('base de datos conectada! :D');
		app.listen(config.port, function () {
			console.log('App is listening on port 3001!');
		});
	})
	.catch((err) => console.error(err));