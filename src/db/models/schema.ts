import { sql } from 'drizzle-orm'
import { AnySQLiteColumn, index, sqliteTable, text } from 'drizzle-orm/sqlite-core'


export const user = sqliteTable('user', {
    id_user: text('id_user', { length: 36 }).primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password', { length: 60 }).notNull(),
}, (table) => [
    index("email_idx").on(table.email)
])

export const folder = sqliteTable('folder', {
    id_folder: text('id_folder', { length: 36 }).primaryKey(),
    id_parent: text('id_parent', { length: 36 }).references(
        (): AnySQLiteColumn => folder.id_folder, { onDelete: 'cascade', onUpdate: 'cascade' }
    ).notNull(),
    id_user: text('id_user', { length: 36 }).references(
        (): AnySQLiteColumn => user.id_user, { onDelete: 'cascade', onUpdate: 'cascade' }
    ).notNull(),
    folder_name: text('folder_name').notNull(),
}, (table) => [
    index("id_parent_idx").on(table.id_parent),
    index("folder_name_idx").on(table.folder_name),
])

export const file = sqliteTable('file', {
    id_file: text('id_file', { length: 36 }).primaryKey(),
    id_folder: text('id_folder', { length: 36 }).references(
        (): AnySQLiteColumn => folder.id_folder,
        { onDelete: 'cascade', onUpdate: 'cascade' }
    ),
    file_name: text('file_name').notNull(),
    url: text('url').notNull(),
    aws_key: text('aws_key').notNull(),
}, (table) => [
    index("id_folder_idx").on(table.id_folder),
    index("file_name_idx").on(table.file_name),
])



