import { Knex } from 'knex'
export class UsersModel {

    getList(db: Knex) {
        return db('users as u')
            .select('u.id', 'u.first_name',
                'u.last_name', 'u.title_id', 't.name as title_name')
            .join('titles as t', 't.id', 'u.title_id')
    }

    saveUser(db: Knex, data: any) {
        return db('users')
            .insert(data);
    }

    info(db: Knex, id: number) {
        return db('users')
            .where('id', id)
    }

    findUsername(db: Knex, email: string) {
        return db('users')
            .where('email', email)
    }

    delete(db: Knex, id: number) {
        return db('users')
            .where('id', id)
            .delete()
    }

    update(db: Knex, id: number, data: any) {
        return db('users')
            .where('id', id)
            .update(data);
    }
}