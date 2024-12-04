const authorizeRole = (roles) => {
    return (req , res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error: 'Доступ запрещён'});
        }
        next();
    };
};

module.exports = authorizeRole;