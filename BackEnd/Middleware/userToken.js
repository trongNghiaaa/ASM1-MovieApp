const User = require('../Models/UserModel');

const authenticateUser = (req, res, next) => {
    const token = req.query.token; // Lấy token từ query parameters

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = User.all().find((user) => user.token === token);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Lưu thông tin user đã xác thực vào req.user để sử dụng ở các route sau
    req.user = user;

    // Xác thực thành công, tiếp tục xử lý
    next();
};

module.exports = authenticateUser;
