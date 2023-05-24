const models = require('../models');
const sequelize = require('sequelize');
const axios = require('axios')

module.exports = {
    getAddressDistance: async (req, res, next) => {
        try {
            // 1. cari jarak nya dari branch ke address
            const getBranch = await models.branch.findAll({
                attributes: [
                    "id",
                    "uuid",
                    "name",
                    "longitude",
                    "latitude",
                    "city_id",
                    "province_id",
                ]
            })

            // console.log('ini getBranch longitude: ', getBranch[0].dataValues)

            let newArr = []
            for (let i = 0; i < getBranch.length; i++) {

                // console.log('ini loop getBranch: ', getBranch[i])

                let temp = {};
                const R = 6371; // km (change this constant to get miles)
                let lat2 = getBranch[i].dataValues.latitude;
                // console.log('ini lat2', lat2);

                let lon2 = getBranch[i].dataValues.longitude;
                // console.log('ini long2: ', lon2)

                // let lat1 = req.body.customerAddress;
                let lat1 = 106.940559
                // let lon1 = req.body.customerAddress;
                let lon1 = -6.245760

                let dLat = ((lat2 - lat1) * Math.PI) / 180;
                let dLon = ((lon2 - lon1) * Math.PI) / 180;
                let a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                let d = R * c;

                // console.log('ini hasilnya: ', d)

                //
                temp.id = getBranch[i].dataValues.id;
                temp.uuid = getBranch[i].dataValues.uuid;
                temp.distance = d;
                temp.name = getBranch[i].dataValues.name;
                temp.city = getBranch[i].dataValues.city_id;
                temp.province = getBranch[i].dataValues.province_id

                newArr.push(temp);
            }

            newArr.sort((a, b) => {
                // console.log('distance a', a.distance)
                // console.log('distance b', b.distance)
                return a.distance - b.distance;
            });


            const finalDistance = newArr[0];
            // console.log('ini fix distance nya ', fixDistance)

            // 2. jika sudah dapat jarak fix nya, calculate ongkir
            let ongkir = await axios.post(
                `https://api.rajaongkir.com/starter/cost`,
                {
                    origin: finalDistance.city,
                    // origin: "501",
                    destination: finalDistance.city,
                    // destination: "114",
                    weight: 1700,
                    courier: "jne",
                },
                {
                    headers: {
                        key: `ae268d716c01738da90ebf5661412a31`,
                    },
                }
            );

            // console.log(`ongkir: `, ongkir.data.rajaongkir.results[0].costs[0].cost[0].value)
            const value = ongkir.data.rajaongkir.results[0].costs[0].cost[0].value

            res.status(200).send({
                message: 'ongkir required',
                data: ongkir.data.rajaongkir.results[0],
                branch: finalDistance.uuid,
                value: value,
                detail: finalDistance
            });
        }
        catch (error) {
            console.log(error)
            next(error)
        }
    },

    getProvince: async (req, res, next) => {
        try {
            let response = await axios.get(
                `https://api.rajaongkir.com/starter/province`,
                {
                    headers: {
                        key: `ae268d716c01738da90ebf5661412a31`,
                    },
                }
            );
            // console.log(`ini res getProvince`, response);
            return res.status(200).send(response.data.rajaongkir.results);
        } catch (error) {
            console.log(`error get`, error);
            next(error);
        }
    },

    insertProvince: async (req,res,next) => {
        try {
            let response = await axios.get(
                `https://api.rajaongkir.com/starter/province`,
                {
                    headers: {
                        key: `ae268d716c01738da90ebf5661412a31`,
                    },
                }
            );

            const provinces = response.data.rajaongkir.results

            for(let province of provinces){
                await models.province.create({
                    id: province.provinces_id,
                    name: province.province
                })
            }
            // console.log(`ini res getProvince`, response);
            return res.status(200).send(response.data.rajaongkir.results);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }, 

    getCity: async (req, res, next) => {
        try {
            // let { province_id } = req.params;

            let response = await axios.get(
                `https://api.rajaongkir.com/starter/city`,
                {
                    headers: {
                        key: `ae268d716c01738da90ebf5661412a31`,
                    },
                }
            );
            //   console.log(`ini res getCity`, response.data.rajaongkir.results);

            return res.status(200).send({
                data: response.data.rajaongkir.results
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    insertCity: async(req,res,next) => {
        try {
            // let { province_id } = req.params;

            let response = await axios.get(
                `https://api.rajaongkir.com/starter/city`,
                {
                    headers: {
                        key: `ae268d716c01738da90ebf5661412a31`,
                    },
                }
            );
            //   console.log(`ini res getCity`, response.data.rajaongkir.results);

            const cities = response.data.rajaongkir.results;

            for (let city of cities) {
                await models.city.create({
                    id: city.city_id,
                    name: city.city_name
                })
            }

            return res.status(200).send({
                data: response.data.rajaongkir.results
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}