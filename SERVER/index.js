const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet')
const logger = require('morgan');

const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}

const routes = require('./routes');
const connectors = require('./connectors');

(async () => {
  try {
    // Force the server not to start listening until the database is connected.
    await connectors.mongoose.connect();
    await connectors.mongoose.initializeHelpers()

    app.use(logger('combined'));
    app.use(cors());

    if (process.env.NODE_ENV === 'production') {
      app.use(helmet());
    }

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use('/api', routes);

    app.use((req, res, next) => {
      res.status(404);
      res.json({ message: 'Not Found' });
    });

    app.use((err, req, res, next) => {
      console.log(err);
      const error = err.error || err;

      res.status(error.statusCode || 500);

      const options = err.options || {};

      const body = {};
      const message = options.expose ? error.message : '';

      if (message) {
        body.message = message;
      }

      res.json({
        ...error,
        body
      });
  });

  io.listen(
    http.listen(port, () => console.log(`Server listening on port ${port}!`))
  );

  app.io = io.on('connection', (socket) => {});

  } catch (error) {
    console.log('Server Init Error---\n', error);
  }
})();
