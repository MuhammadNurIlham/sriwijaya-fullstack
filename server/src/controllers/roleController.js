const {role, user} = require('../../models');

exports.addRole = async (req, res) => {
    try {

        const data = req.body;
        const newRole = await role.create(data);

        res.send({
            status: 'success',
            message: 'add data role success',
            data: {
                role: newRole
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        });
    }
}

exports.getRoles = async (req, res) => {
    try {
        const roles = await role.findAll({
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        })

        res.send({
            status: 'success',
            message: 'get data success',
            data: {
                roles
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.getRole = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await role.findOne({
            where:{
                id
            },
            include:{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        })

        res.send({
            status: 'success',
            message: `get data with ID: ${id} success`,
            data: {
                role: data
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.updateRole = async (req, res) => {
    try {
        const {id} = req.params;
        await role.update(req.body, {
            where: {
                id,
            }
        });

        res.send({
            status: 'success',
            message: `update data with ID: ${id} success`,
            dataUpdate: role
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.deleteRole = async (req, res) => {
    try {
        const {id} = req.params;
        await role.destroy({
            where: {
                id,
            },
        })

        res.send({
            status: 'success',
            message: `Delete data  Role with ID: ${id} success`,
            data: role,
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}