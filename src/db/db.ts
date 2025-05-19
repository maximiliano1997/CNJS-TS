import { config } from 'dotenv';
// import { createClient } from '@libsql/client';
config({ path: '.env' }); // or .env.local
import path from 'path'
import { drizzle } from 'drizzle-orm/libsql/node';
import * as schema from '../db/models/schema'
import { envs } from '../config/env'

const dbPath = path.resolve(__dirname, 'drive.db')
const dbUrl = envs.DATABASE_URL || `file:${dbPath}`;
console.log("Database URL being used:", dbUrl); // Depuración

export const db = drizzle({
    connection: {
        url: envs.DATABASE_URL || `file:${dbPath}`,
        // authToken: process.env.TURSO_AUTH_TOKEN!,
    }
}, { schema });


// "file:C:/users/user/--dev/cnjs-ts/drive/src/db/db.ts"




// const client = createClient({
//     url: 'file:C:/users/user/--dev/cnjs-ts/drive/src/db/drive.db',
//     // authToken: process.env.TURSO_AUTH_TOKEN!,
// })

// export const db = drizzle(client)