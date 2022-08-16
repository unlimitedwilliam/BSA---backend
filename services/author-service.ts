import db from '../common/connection-db';
import { DataResult } from '../core/data-result';
import { RESULT_MESSAGE ,RESULT_CODE } from '../core/result-constant';
import { authorsAttributes } from '../db-export-default/authors';

const model = db.initModels; 
const authors = model.authors;

export class AuthorServices {
    //Find author by author ID 
    async getAuthorById(key: any) {
        const result : DataResult = {};
        console.log('key: ', key)
        try {
            const author = await authors.findByPk(key);
            if (author === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return result;
            }
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = author;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = 'error: ' + error;
        }
        return result; 
    }
    
    //Find author by author name
    async getAuthorByName(key: string) {
        const result : DataResult = {}
        try {
            const author = await authors.findOne({where: {name: {key}}});
            if (author === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return;
            }
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = author;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = 'error: ' + error;
        }
        return result; 
    }

    //Change author information
    async changeAuthorInfo(info: authorsAttributes, key: any) {
        const result : DataResult = {};
        try {
            const author = await authors.findByPk(key);
            if (author === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return result;
            }
            const changes = await authors.update(info, {where: {id: author.id}});
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = 'number of changes: ' + changes;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = RESULT_MESSAGE.ERROR + error;
        }
        return result;
    }

    //Delete author 
    async deleteAuthor(key: any) {
       const result : DataResult = {};
       try {
            const author = await authors.findByPk(key);
            if (author === null) {
                result.message = RESULT_MESSAGE.ERROR + "can not find author"; 
                result.status = RESULT_CODE.NOT_FOUND;
                return result;
            }
            await authors.destroy({where: {id: key}});
            result.message = RESULT_MESSAGE.SUCCESS; 
            result.status = RESULT_CODE.SUCCESS;
            result.data = 'deleted';
       } catch (error: any) {
            result.status = RESULT_CODE.ERROR;
            result.message = RESULT_MESSAGE.ERROR + error
       }
       return result;
    }
}