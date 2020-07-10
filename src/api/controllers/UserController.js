const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { API_SECRET } = require('../../../config/config');
const bcrypt = require('bcrypt');

signToken = user => {
    return JWT.sign({
        iss: 'chat',
        sub: user.id,
        iat: new Date().getTime(),
    }, API_SECRET);
}

hideSensitiveData = data => {
    data.forEach((user) => { user.password = undefined});
    return data;
}

module.exports = {
    async signUp(req, res) {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email: email });

        if (userExists)
            return res.status(422).send("User is already created");

        const encryptedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        var user;
        try {
            user = await User.create({
                name,
                email,
                password: encryptedPassword,
            });
        } catch (error) {
            return res.status(422).send(error.message);
        }

        user.password = undefined;
        user.code = undefined;

        return res.status(201).json(user);
    },

    async signIn(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user)
            return res.status(404).send(`Email não cadastrado: ${email}`);

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(422).send(`Senha inválida`);

        const token = signToken(user);

        user.password = undefined;
        return res.status(200).json({
            user,
            token: token
        });
    }
}