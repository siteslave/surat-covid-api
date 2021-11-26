import { Knex } from 'knex'
export class LoginModel {


    findUsername(db: Knex, email: string) {
        return db('users')
            .where('email', email)
    }


}