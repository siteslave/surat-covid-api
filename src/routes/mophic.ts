import { NextFunction, Request, Response } from "express";
import moment from 'moment';

import { MophicModel } from "../model/mophic";
const mophicModel = new MophicModel();
var express = require('express');
var router = express.Router();

router.get('/history', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const rs: any = await mophicModel.getImmunizationHistoryDate(req.db);
    res.send({
      ok: true, rows: rs[0].map((v: any) => {
        v.immunization_date = moment(v.immunization_date).format("YYYY-MM-DD");
        return v;
      })
    })
  } catch (error) {
    res.send({ ok: false, error: error })
  }
});

router.get('/overall', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const rs: any = await mophicModel.getImmunizationOverall(req.db);
    res.send({ ok: true, rows: rs[0] })
  } catch (error) {
    res.send({ ok: false, error: error })
  }
});

router.get('/target', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const rs: any = await mophicModel.getImmunizationByTarget(req.db);
    res.send({ ok: true, rows: rs[0] })
  } catch (error) {
    res.send({ ok: false, error: error })
  }
});

router.get('/dashboard/target/current', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const rs: any = await mophicModel.getImmunizationDashboardByTarget(req.db);
    res.send({
      ok: true, rows: rs[0].map((v: any) => {
        v.result_608 = +v.t608 * 100 / v.target_608;
        v.result_501 = +v.t501 * 100 / v.target_501;
        v.result_502 = +v.t502 * 100 / v.target_502;

        return v;
      })
    })
  } catch (error) {
    res.send({ ok: false, error: error })
  }
});

router.get('/dashboard/chart/608', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const rs: any = await mophicModel.getImmunization608PlanNo1(req.db);
    res.send({
      ok: true, rows: rs[0].map((v: any) => {
        v.result_608 = +v.total_no1 * 100 / v.total_target;
        return v;
      })
    })
  } catch (error) {
    res.send({ ok: false, error: error })
  }
});


module.exports = router;
