import db from '../common/connection-db';
import { DataResult } from '../core/data-result';
import { RESULT_MESSAGE ,RESULT_CODE } from '../core/result-constant';
import { customersAttributes } from '../db-export-default/customers';

const model = db.initModels; 
const customers = model.customers;

export class CustomerServices {
    //Find customer by customer ID 
    async getCustomerById(key: any) {
        const result : DataResult = {};
        console.log('key: ', key)
        try {
            const customer = await customers.findByPk(key);
            if (customer === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return result;
            }
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = customer;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = 'error: ' + error;
        }
        return result; 
    }
    
    //Find customer by customer email
    async getCustomerByEmail(key: string) {
        const result : DataResult = {}
        try {
            const customer = await customers.findOne({where: {email: {key}}});
            if (customer === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return;
            }
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = customer;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = 'error: ' + error;
        }
        return result; 
    }
}