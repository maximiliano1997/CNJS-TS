// import { config } from 'dotenv';
// import { createClient } from '@libsql/client';
// config({ path: '.env' }); // or .env.local
import path from 'path'
import { drizzle } from 'drizzle-orm/libsql/node';
import * as schema from '../db/models/schema'

const dbPath = path.resolve(__dirname, 'drive.db')

export const db = drizzle({
    connection: {
        url: `file:${dbPath}`,
        // authToken: process.env.TURSO_AUTH_TOKEN!,
    }
}, { schema });


// "file:C:/users/user/--dev/cnjs-ts/drive/src/db/db.ts"




// const client = createClient({
//     url: 'file:C:/users/user/--dev/cnjs-ts/drive/src/db/drive.db',
//     // authToken: process.env.TURSO_AUTH_TOKEN!,
// })

// export const db = drizzle(client)