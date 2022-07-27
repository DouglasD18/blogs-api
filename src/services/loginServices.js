const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const loginServices = {
    verifyFields(body) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        }); 
        const result = schema.validate(body);
        if (result.error) {
            return { code: 400, message: 'Some required fields are missing' };
        } 
        return true;
    },

    async verifyUser({ email, password }) {
        const userExists = await User.findOne({
            where: { email, password },
          });
        if (!userExists) {
            return { code: 400, message: 'Invalid fields' };
        }
        return userExists;
    },

    createToken({ id, name }) {
         const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
         const payload = { data: { id, name } };
         const token = jwt.sign(payload, secret, jwtConfig);
         return token;
    },

    async login(body) {
        const haveAllFields = this.verifyFields(body);
        if (haveAllFields.code) {
            return haveAllFields;
        }
        const userExists = await this.verifyUser(body);
        if (userExists.code) {
            return userExists;
        } 
        const token = this.createToken(userExists);
        return { code: 200, token, message: '' };
    },
};

module.exports = loginServices;
