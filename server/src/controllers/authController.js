const { user } = require('../../models');

const Joi = require('joi'); // inport Joi Validation
const bcrypt = require('bcrypt'); // import bcrypt
const jwt = require('jsonwebtoken'); // import jsonwebtoken

require('dotenv').config();


exports.register = async (req, res) => {
    // schema validation using JOI
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        roleId: Joi.string().min(1).required(),
    })

    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);

    // if error exist send validation error message
    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });

    try {
        // we generate salt (random value) with 10 rounds
        const salt = await bcrypt.genSalt(10);
        // we hash password from request with salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            roleId: parseInt(req.body.roleId, 10) // parse from string to integer
        });

        // generate token
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY);


        res.status(200).send({
            status: "success",
            data: {
                name: newUser.name,
                email: newUser.email,
                roleId: newUser.roleId,
                token,
            },
        });
    } catch (error) {
        console.log("ini error login",error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.login = async (req, res) => {
    // our validation schema here
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });

    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);

    // if error exist send validation error message
    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        // compare password between entered from client and from database
        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        // check if not valid then return response with status 400 (bad request)
        if (!isValid) {
            return res.status(400).send({
                status: "failed",
                message: "credential is invalid",
            });
        }

        // generate token
        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);

        res.status(200).send({
            status: "success",
            data: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                token,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        });

        if (!dataUser) {
            return res.status(404).send({
                status: "failed",
            });
        }

        res.send({
            status: "success",
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.status({
            status: "failed",
            message: "Server Error",
        });
    }
};