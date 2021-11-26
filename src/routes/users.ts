import { NextFunction, Request, Response } from "express";

import { UsersModel } from "../model/users";
const usersModel = new UsersModel();
var CryptoJS = require("crypto-js");
var express = require('express');
var router = express.Router();
import { JwtModel } from '../model/jwt';
const jwtModel = new JwtModel();

/* GET users listing. */
router.get('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const rs: any = await usersModel.getList(req.db);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.get('/info', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.query.id;
        const rs: any = await usersModel.info(req.db, +id);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        if (body.firstName && body.lastName && body.password) {
            const users: any = await usersModel.findUsername(req.db, body.email);
            if (users.length === 0) {
                const obj: any = {
                    first_name: body.firstName,
                    last_name: body.lastName,
                    email: body.email,
                    password: CryptoJS.MD5(body.password).toString()
                }
                const rs: any = await usersModel.saveUser(req.db, obj);
                const payload: any = {
                    "userId": rs[0],
                    "name": `${body.first_name} ${body.last_name}`,
                    "email": body.email,
                };
                const token = await jwtModel.sign(payload);

                res.send({ ok: true, token })
            } else {
                res.send({ ok: false, error: 'Username ซ้ำ' });
            }
        } else {
            res.send({ ok: false, error: 'ไม่พบ parameter' })
        }
    } catch (error: any) {
        console.log(error);
        res.send({ ok: false, error: error.message })
    }
});

router.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.params.id;
        const rs: any = await usersModel.delete(req.db, +id);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.put('/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.params.id;
        const body: any = req.body;
        const rs: any = await usersModel.update(req.db, +id, body);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});


module.exports = router;
