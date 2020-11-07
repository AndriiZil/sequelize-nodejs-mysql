const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const db = require('./app/models');
const tutorialRouter = require('./app/routes/tutorial.routes');

db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db');
});

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

tutorialRouter(app);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application' });
});

const PORT = process.env.PORT || 8081;

app.use((err, req, res, next) => {
    if (err) {
        const code = err.code || err.status || 500;
        const message = err.message || 'Unknown Error';

        return res.status(code).send({ message });
    }
    next();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
