module.exports = async function (req, res, next) {
    if (req.session.user.role > 1) {
        return res.err(992);
    }

    return next();
}
