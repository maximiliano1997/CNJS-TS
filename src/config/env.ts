import * as env from 'env-var'
// import 'dotenv/config';
import * as dotenv from 'dotenv'
dotenv.config({ path: 'src/.env' })

export const envs = {
    SECRET_PASSWORD_KEY: env.get('SECRET_PASSWORD_KEY').required().asString(),
    DATABASE_URL: env.get('DATABASE_URL').required().asString(),
    MAIL: env.get('MAIL').required().asEmailString(),
}
// const PORT: number = env.get('PORT').required().asIntPositive();



console.log('SECRET_PASSWORD_KEY:', process.env.SECRET_PASSWORD_KEY);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('MAIL:', process.env.MAIL);
console.log('PORT:', process.env.PORT);