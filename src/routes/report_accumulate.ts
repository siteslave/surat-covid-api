import { NextFunction, Request, Response } from "express";

import { Report_accumulateModel } from "../model/report_accumulate";
const report_accumulateModel = new Report_accumulateModel();
var CryptoJS = require("crypto-js");
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const rs: any = await report_accumulateModel.getList(req.db);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.get('/info', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const ampur: any = req.query.ampur;
        const rs: any = await report_accumulateModel.info(req.db, +ampur);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});



module.exports = router;
