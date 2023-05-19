const sequelize = require('sequelize');
const model = require('../models');

module.exports = {
    addressList: async (req, res, next) => {
        try {
            let getAddress = await model.addresses.findAll()
            res.status(200).send(getAddress)
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    userAddress: async (req, res, next) => {
        try {
            console.log("data address user by req.decrypt.uuid :", req.decrypt.uuid);
            let getAddress = await model.addresses.findAll({
                attributes: ['id', 'receiverName', 'receiverEmail', 'addressLine', 'subDistrict', 'city', 'province', 'branchId'],
                where: {
                    userUuid: req.decrypt.uuid
                }
            })
            console.log("data address user by uuid :", getAddress);

            res.status(200).send({
                success: true,
                message: "Get User Address",
                data: getAddress
            })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}