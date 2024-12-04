const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const {jwt: jwtConfig} = require('../config/config')

exports.register = async (req, res) =>{
    try {
        const {email, password, role} = req.body;
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({error: 'Пользователь уже существет'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({email, password: hashedPassword, role});
        res.status(201).json({message: 'Регистрация прошла успешно', user});
    } catch (error) {
        res.status(500).json({error: 'Ошибка реегестрации, попробуйте снова!'});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await user.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({error: 'Пользователь не найден'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).json({error: 'Пароль не верный'});
        }

        const token = jwt.sign(
            {userId: user.id, role: user.role},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expiresIn}
        );

        res.json({message: 'Успешный вход', token});
    } catch (error) {
        res.status(500).json({error: 'Ошибка при входе'})
    }
}

