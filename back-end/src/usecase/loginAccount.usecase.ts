import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../prisma";

 
export class LoginAccountUseCase {
    async execute({ email, password }: { email: string; password: string }) {
        if( !password || !email) throw new Error('Body is missing');

        const TOKEN_SECRET = process.env.TOKEN_SECRET as string

        if(!TOKEN_SECRET) throw new Error('Unexpected Error')

        const user = await prisma.users.findUnique({
            where: {
                email
            },
        })

        if(!user) throw new Error('EMAIL_INVALID')

        compareSync(password, user?.password)

        const jwtToken = sign({
            email: user.email,
            id: user.id,
        }, TOKEN_SECRET, {
            expiresIn: "1d"
        })

        return {
            'x-access-token': jwtToken,
        }
        
    }
}