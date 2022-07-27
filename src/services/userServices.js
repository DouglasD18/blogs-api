const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const userServices = {
    validateFieldName({ displayName }) {
        const nameSchema = Joi.object({
            displayName: Joi.string().min(8).required(),
        }); 
        const nameResult = nameSchema.validate({ displayName });
        if (nameResult.error) {
            const message = '"displayName" length must be at least 8 characters long';
            return { code: 400, message };
        }
        return true;
    },
    validateFieldEmail({ email }) {
        const emailSchema = Joi.object({
            email: Joi.string().email().required(),
        });
        const emailResult = emailSchema.validate({ email });
        if (emailResult.error) return { code: 400, message: '"email" must be a valid email' };
        return true;
    },
    validateFieldPassword({ password }) {
        const passwordSchema = Joi.object({
            password: Joi.string().min(6).required(),
        });
        const passwordResult = passwordSchema.validate({ password });
        if (passwordResult.error) {
            return { code: 400, message: '"password" length must be at least 6 characters long' };
        }
        return true;
    },
    async emailVerify({ email }) {
        const userExists = await User.findOne({
            where: { email },
          });
        if (!userExists) {
            return true;
        }
        return { code: 409, message: 'User already registered' };
    },
    async userCreate({ displayName, email, password, image }) {
        const newUser = await User.create({ displayName, email, password, image });
        return newUser;
    },
    tokenGenerate({ id, displayName }) {
        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
        const payload = { data: { id, displayName } };
        const token = jwt.sign(payload, secret, jwtConfig);
        return token;
    },
    async addUser(body) {
        const nameSended = this.validateFieldName(body);
        const emailSended = this.validateFieldEmail(body);
        const passwordSended = this.validateFieldPassword(body);
        const emailExists = await this.emailVerify(body);
        if (nameSended.code) return nameSended;
        if (emailSended.code) return emailSended;
        if (passwordSended.code) return passwordSended;
        if (emailExists.code) return emailExists;
        const newUser = await this.userCreate(body);
        const token = this.tokenGenerate(newUser);
        return { code: 201, token };
    },
    async getAll() {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        return users;
    },
};

module.exports = userServices;
