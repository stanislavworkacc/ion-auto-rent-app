const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const notRememberMeExpirationTime = 60000000000;

const authUser = async (req, res, {user, databasePassword, password, UserPasswordModel}) => {
    const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);

    if (!isMatch)
        return res.status(403).json({
            success: false,
            result: null,
            message: 'Invalid credentials.',
        });

    if (isMatch) {
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: req.body.remember ? 365 * 24 + 'h' : notRememberMeExpirationTime}
        );

        await UserPasswordModel.findOneAndUpdate(
            {user: user._id},
            {$push: {loggedSessions: token}},
            {
                new: true,
            }
        ).exec();


        // httpOnly: true,
        //     secure: true, // Використовувати тільки через HTTPS
        //     sameSite: 'None' // Дозволяє крос-доменні куки
        res
            .status(200)
            .cookie('token', token, {
                maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
                sameSite: 'None',
                httpOnly: true,
                secure: false,
                domain: req.hostname,
                path: '/',
                Partitioned: true,
            })
            .json({
                success: true,
                result: {
                    _id: user._id,
                    userName: user.userName,
                    userLastName: user?.userLastName,
                    phone: user?.phone,
                    email: user.email,
                    ssoUser: user.ssoUser,
                },
                message: 'Successfully login user',
            });
    } else {
        return res.status(403).json({
            success: false,
            result: null,
            message: 'Invalid credentials.',
        });
    }
};

const ssoAuthUser = async (req, res, {user, UserPasswordModel}) => {
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: req.body.remember ? 365 * 24 + 'h' : notRememberMeExpirationTime}
    );

    await UserPasswordModel.findOneAndUpdate(
        {user: user._id},
        {$push: {loggedSessions: token}},
        {
            new: true,
        }
    ).exec();

    res
        .status(200)
        .cookie('token', token, {
            maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
            sameSite: 'None',
            httpOnly: true,
            secure: false,
            domain: req.hostname,
            path: '/',
            Partitioned: true,
        })
        .json({
            success: true,
            result: {
                _id: user._id,
                userName: user.userName,
                userLastName: user?.userLastName,
                phone: user?.phone,
                email: user.email,
                ssoUser: user.ssoUser,
            },
            message: 'Successfully login user',
        });
};

module.exports = {
    authUser,
    ssoAuthUser
};
// module.exports = ssoAuthUser;
