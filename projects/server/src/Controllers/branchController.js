const sequelize = require('sequelize');
const model = require('../models');

module.exports = {
    branchList: async (req, res, next) => {
        try {
            let {
                id
            } = req.query;

            if(!id) {
                id = ''
            }
            
            let getBranch = await model.branch.findAll({
                attributes:['id', 'name', 'city', 'province', 'subDistrict'],
                where: {
                    id: {[sequelize.Op.like]: `%${id}%`}
                }
            })
            console.log('ini data dari getBranch :', getBranch);
            res.status(200).send(getBranch)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}