const jwt = require('jsonwebtoken');

const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

const jwUtils = {

    generate: (user) => {
        return new Promise((resolve, reject) => {

            const playload = {
                id: user._id,
                role: user.role
            }

            const options = {
                algorithm: 'HS512',

                expiresIn: '3d',

                audience: JWT_AUDIENCE,

                issuer: JWT_ISSUER

            }

            jwt.sign(playload, JWT_SECRET, options, (error, token) => {
                if (error) {
                    reject(error);
                }

                resolve(token);
            })





        })
    },

    decode: (token) => {

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error('Pas de token reçu'));

            }

            const options = {
                audience: JWT_AUDIENCE,

                issuer: JWT_ISSUER

            }

            jwt.verify(token, JWT_SECRET, options, (error, playload) => {
                if (error) {
                    reject(error);

                }

                resolve(playload);

            })

        })

    }
}

module.exports = jwUtils;