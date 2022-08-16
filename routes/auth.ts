import express from 'express';
import bcrypt from 'bcrypt';
import passport, { authenticate } from 'passport'; 
import {Strategy as LocalStrategy} from 'passport-local';

import db from '../common/connection-db';
import { DataResult } from '../core/data-result';
import { customersAttributes } from '../db-export-default/customers';
import { CustomerServices } from '../services/customer-service';

const model = db.initModels;
const customers = model.customers;
const customerServices = new CustomerServices();

const router = express.Router();

//Local Strategy
passport.use(new LocalStrategy({usernameField: 'email'},
    async (email, password, done) => {
        const customer = customerServices.getCustomerByEmail(email);
        if (customer === null) {
            return done(null, false, { message: 'No user with that email' });
        }
        try {
            if (await bcrypt.compare(password, (customer as DataResult).data.password)) {
                return done(null, customer);
            } else {
                return done(null, false, { message: ' password incorrect '});
            }
        } catch (error) {
            return done(error);
        }
    }
))
passport.serializeUser((user, done) => {});
passport.deserializeUser((user, done) => {})

//register route 
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newCustomer = customers.create({
            id: req.body.id,
            first_name: req.body.first_name, 
            last_name: req.body.last_name,
            email: req.body.email, 
            phoneNum: req.body.phoneNum,
            password: hashedPassword
        })
        res.json(newCustomer);
        res.redirect('/login');
    } catch (error) {
        res.status(200).json({message: error.message})
    }
})
