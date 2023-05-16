const {detailuser} = require('../../models');

exports.addDetailUser = async (req, res) => {
    try {
        const data = req.body;
        const newDetail = await detailuser.create(data);

        res.send({
            status: 'success',
            message: 'add data detail user success',
            dataUser: newDetail
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.getDetailUser = async (req, res) => {
    try {
        const {id} = req.params;
        const dataUser = await detailuser.findOne({
            where: {
                id,
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            message: `get data detail user with ID: ${id} success`,
            data: dataUser
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.updateDetailUser = async (req, res) => {
    try {
        const {id} = req.params;
        await detailuser.update(req.body, {
            where: {
                id
            }
        }) 
        res.send({
            status: 'success',
            message: `Update data detail user with ID: ${id} success`,
            data: detailuser
        })     
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.deleteDetailUser = async (req, res) => {
    try {
        const {id} = req.params;
        await detailuser.destroy({
            where: {
                id,
            },
        })

        res.send({
            status: 'success',
            message: `Delete data detail user with ID: ${id} success`,
            data: detailuser,
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}