const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
    try {
        const { title, description, published } = req.body;

        if (!title) {
            const error = new Error('Content can not be empty.');
            error.code = 422;
            throw error;
        }

        const tutorial = {
            title,
            description,
            published: published ? published: false
        };

        const data = await Tutorial.create(tutorial);

        return res.send(data);
    } catch (err) {
        next(err);
    }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res, next) => {
    try {
        const { title } = req.body;

        const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        const data = await Tutorial.findAll({ where: condition });

        return res.send(data);
    } catch (err) {
        next(err);
    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await Tutorial.findByPk(id);

        if (!data) {
            const error = new Error(`Tutorial with "${id}" was not found`);
            error.code = 404;
            throw error;
        }

        return res.send(data);
    } catch (err) {
        next(err);
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await Tutorial.update(req.body, { where: { id } });

        if (data[0] === 1) {
            return res.send({ message: `Tutorial with "${id}" was updated successfully` });
        } else {
            const error = new Error(`Tutorial with "${id}" was not updated`);
            error.code = 404;
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await Tutorial.destroy({ where: { id } });

        if (data === 1) {
            return res.send({ message: 'Tutorial was deleted successfully.' });
        } else {
            const error = new Error(`Tutorial with id "${id}" was not deleted.`);
            error.code = 422;
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res, next) => {
    try {
        const data = await Tutorial.destroy({ where: {}, truncate: false });

        if (data) {
            return res.send({ message: `"${data}" Tutorials was deleted successfully` });
        }
    } catch (err) {
        next(err);
    }
};

// Find all published Tutorials
exports.findAllPublished = async (req, res, next) => {
    try {
        const data = await Tutorial.findAll({ where: { published: true } });

        return res.send(data);
    } catch (err) {
        next(err);
    }
};
