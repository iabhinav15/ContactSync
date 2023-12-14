import JWT from 'jsonwebtoken';

export const userAuth = async(req, res, next)=>{
    const authHeader = req?.headers?.authorization;
    if(!authHeader || !authHeader?.startsWith('Bearer')){
        return next("Authentication == failed", 401);
    }

    const token = authHeader?.split(" ")[1];

    try {
        const userToken = JWT.verify(token, process.env.JWT_Secret);
        req.body.user = {
            userId: userToken.userId,
        };
        return next();
    } catch (error) {
        console.log(error);
        next("Authentication failed", 401)
    }
}

