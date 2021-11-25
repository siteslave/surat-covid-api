import { Knex } from 'knex'
export class Report_accumulateModel {

    getList(db: Knex) {
        return db('report_accumulate as r')
        .select('r.ddate','r.newn','r.accumulate','amp.ampur_name','amp.chw_name')
        .join('amppart as amp','amp.ampur','r.ampur') 
        
      
    }

    info(db: Knex, ampur: number) {
        return db('report_accumulate as r')
        .select('r.ddate','r.newn','r.accumulate','amp.ampur_name','amp.chw_name')
        .join('amppart as amp','amp.ampur','r.ampur')
        .where('amp.ampur', ampur)
    }

   
}