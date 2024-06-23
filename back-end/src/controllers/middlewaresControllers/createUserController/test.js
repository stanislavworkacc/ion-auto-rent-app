const test = async (userModel, req, res) => {
    return res.status(200).json({
        success: true,
        message: 'TEST '
    });
}

module.exports = test;
