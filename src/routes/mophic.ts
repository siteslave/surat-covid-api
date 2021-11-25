import { NextFunction, Request, Response } from "express";

import { MophicModel } from "../model/mophic";
const mophicModel = new MophicModel();
var express = require('express');
var router = express.Router();

router.get('/history', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const rs: any = await mophicModel.getImmunizationHistoryDate(req.db);
    res.send({ ok: true, rows: rs[0] })
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


module.exports = router;
