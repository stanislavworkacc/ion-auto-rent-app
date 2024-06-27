const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            {expiresIn: req.body.remember ? 365 * 24 + 'h' : 30}
        );

        await UserPasswordModel.findOneAndUpdate(
            {user: user._id},
            {$push: {loggedSessions: token}},
            {
                new: true,
            }
        ).exec();


        console.log('user', user);
        res
            .status(200)
            .cookie('token', token, {
                maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
                sameSite: 'Lax',
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
                    userLastName: user?.lastName,
                    phone: user?.phone,
                    email: user.email,
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

module.exports = authUser;
