import jwt from "jsonwebtoken";


const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_TOKEN_KEY , {
        expiresIn: '31d'
    });
}

export default generateToken;   