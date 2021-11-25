import { Knex } from 'knex'
export class MophicModel {

  getImmunizationHistoryDate(db: Knex) {
    return db.raw(`
      select vi.immunization_date, count(1) as total
      from visit_immunization vi
      where vi.immunization_date between date_sub(current_date() , INTERVAL 10 DAY) and current_date()
      group by vi.immunization_date
      order by vi.immunization_date asc;
    `)
  }

  getImmunizationOverall(db: Knex) {
    return db.raw(`
    select vi.hospital_code, h.hospital_name, count(1) as total, vpt.total as target
    from visit_immunization vi
    inner join hospital h on h.hospital_code=vi.hospital_code
    inner join view_person_target vpt on vpt.hospital_code =vi.hospital_code
    group by vi.hospital_code
    order by total desc;
    `)
  }

  getImmunizationByTarget(db: Knex) {
    return db.raw(`
    select vi.hospital_code, h.hospital_name, count(1) as total, vpt.total as target
    from visit_immunization vi
    inner join hospital h on h.hospital_code=vi.hospital_code
    inner join view_person_608_target vpt on vpt.hospital_code =vi.hospital_code
    where vi.person_type_id  in (2,3,6)
    group by vi.hospital_code
    order by total desc;
    `)
  }

}