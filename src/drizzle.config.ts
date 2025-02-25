// // import 'dotenv/config'
// import type { Config } from 'drizzle-kit';


// export default {
//     schema: './src/db/schema.ts',
//     out: './migrations',
//     driver: 'turso',
//     dialect: 'sqlite',
//     dbCredentials: {
//         url: "C:/users/user/--dev/cnjs-ts/drive/src/drive.db",
//         // authToken: process.env.TURSO_AUTH_TOKEN!,
//     },
// } satisfies Config;




import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' });

export default defineConfig({
    schema: '../src/db/schema/schema.ts',
    out: '../migrations',
    dialect: 'sqlite',
    dbCredentials: {
        url: 'file:../src/db/drive.db',
        // authToken: process.env.TURSO_AUTH_TOKEN!,
    },
});


