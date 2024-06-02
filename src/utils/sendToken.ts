import { Response } from 'express';
import { IUser } from '../types/types';

interface MyBearerToken {
    token: string;
    type: string;
}

const sendToken = <T extends IUser>(
    user: T,
    statusCode = 200,
    res: Response,
) => {
    const token = user.getJWTToken();

    const bearerToken: MyBearerToken = {
        token,
        type: 'Bearer',
    };

    res
        .status(statusCode)
        .json({
            success: true,
            message: "User registered successfully",
            user,
            token: bearerToken,
        });
};

export default sendToken;
