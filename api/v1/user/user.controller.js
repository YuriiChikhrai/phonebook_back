exports.getUserProfileDataCtrl = async (req, res, next) => {
    try {
        res.send({ data: req.user, data1: req.user, data2: req.user, data3: req.user });
    } catch (e) {
        next(e);
    }
}