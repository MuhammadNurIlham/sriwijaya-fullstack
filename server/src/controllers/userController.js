const { user, detailUser, role } = require('../../models');

exports.addUser = async (req, res) => {
    try {

        const data = req.body;
        const newUser = await user.create(data);

        res.send({
            status: 'success',
            message: 'Add new user success',
            user: newUser
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
}

exports.getUsers = async (req, res) => {
    try {

        const users = await user.findAll({
            include: [
                {
                    model: detailUser,
                    as: 'detailUser',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    }
                },
                {
                    model: role,
                    as: 'role',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    }
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });

        res.send({
            status: 'success',
            message: 'get all user success',
            data: users,
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        });
    }
}

exports.getUser = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await user.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: detailuser,
                    as: 'detailuser',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    }
                },
                {
                    model: role,
                    as: 'role',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    }
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });

        res.send({
            status: 'success',
            message: `Get data with ID: ${id} success`,
            user: {
                dataUser: data
            }
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: 'server error'
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.update(req.body, {
            where: {
                id,
            },
        });

        res.send({
            status: 'success',
            message: `Update data with ID: ${id} Success`,
            data: {
                dataUpdate: user,
            },
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await user.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: 'success',
            message: `Delete data with ID: ${id} success`,
            data: user,
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        });
    }
}