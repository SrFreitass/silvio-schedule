import { genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../prisma";

export class RegisterAccountUseCase {
    async execute({ name, email, password } : { name: string; email: string; password: string }) {

        if(!name || !password || !email) throw new Error('Body is missing');

        const salt = genSaltSync(10)
        const passwordHashed = hashSync(password, salt)
        const user = await prisma.users.create({
            data: {
                email,
                name,
                password: passwordHashed,
                role: 'teacher'
            }
        })

        const TOKEN_SECRET = process.env.TOKEN_SECRET as string

        if(!TOKEN_SECRET) throw new Error('Unexpected Error')

        const jwtToken = sign({
            email: user.email,
            id: user.id,
        }, TOKEN_SECRET, {
            expiresIn: "1d"
        })

        return {
            'access-token': jwtToken
        }
    }
} 