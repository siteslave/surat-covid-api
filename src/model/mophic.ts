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

  getImmunizationDashboardByTarget(db: Knex) {
    return db.raw(`
      select (select count(1)
      from visit_immunization vi
      where vi.person_type_id  in (2,3,6)
      and vi.vaccine_plan_no=1
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t608_no1,
      (select count(1)
      from visit_immunization vi
      where vi.person_type_id  in (2,3,6)
      and vi.vaccine_plan_no=2
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t608_no2,
      (select count(1)
      from visit_immunization vi
      where vi.person_type_id  in (2,3,6)
      and vi.vaccine_plan_no=3
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t608_no3,
      (select count(1)
      from visit_immunization vi
      where vi.person_type_id  in (2,3,6)
      and vi.vaccine_plan_no=1) as t608,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 501
      and vi.vaccine_plan_no=1
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t501_no1,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 501
      and vi.vaccine_plan_no=2
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t501_no2,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 501
      and vi.vaccine_plan_no=3
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t501_no3,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 501
      and vi.vaccine_plan_no=1) as t501,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 502
      and vi.vaccine_plan_no=1
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t502_no1,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 502
      and vi.vaccine_plan_no=2
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t502_no2,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 502
      and vi.vaccine_plan_no=3
      and vi.immunization_date = date_sub(current_date(), interval 1 day)) as t502_no3,
      (select count(1)
      from visit_immunization vi
      where vi.person_risk_type_id = 502
      and vi.vaccine_plan_no=1) as t502,
      (select sum(vpt.total) from view_person_target vpt where vpt.person_risk_type_id in (201, 301, 302,303,304,305,306,307,308, 601)) as target_608,
      (select sum(vpt.total) from view_person_target vpt where vpt.person_risk_type_id in (501)) as target_501,
      (select sum(vpt.total) from view_person_target vpt where vpt.person_risk_type_id in (502)) as target_502;
    `)
  }

}