import db from '../common/connection-db';
import { DataResult } from '../core/data-result';
import { RESULT_MESSAGE ,RESULT_CODE } from '../core/result-constant';
import { booksAttributes } from '../db-export-default/books';

const model = db.initModels; 
const books = model.books;

export class BookServices {
    //Find book by book ID 
    async getBookById(key: any) {
        const result : DataResult = {};
        console.log('key: ', key)
        try {
            const book = await books.findByPk(key);
            if (book === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return result;
            }
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = book;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = 'error: ' + error;
        }
        return result; 
    }
    
    //Find book by book name
    async getBookByName(key: string) {
        const result : DataResult = {}
        try {
            const book = await books.findOne({where: {name: {key}}});
            if (book === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return;
            }
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = book;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = 'error: ' + error;
        }
        return result; 
    }

    //Change book information
    async changeBookInfo(info: booksAttributes, key: any) {
        const result : DataResult = {};
        try {
            const book = await books.findByPk(key);
            if (book === null) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.NOT_FOUND;
                return result;
            }
            const changes = await books.update(info, {where: {id: book.id}});
            if (changes === [0]) {
                result.message = RESULT_MESSAGE.ERROR;
                result.status = RESULT_CODE.ERROR;
                return result;
            }
            result.message = RESULT_MESSAGE.SUCCESS;
            result.status = RESULT_CODE.CREATED;
            result.data = 'number of changes: ' + changes;
        } catch (error: any) {
            result.status = RESULT_CODE.ERROR; 
            result.message = RESULT_MESSAGE.ERROR + error;
        }
        return result;
    }

    //Delete book 
    async deleteBook(key: any) {
       const result : DataResult = {};
       try {
            const book = await books.findByPk(key);
            if (book === null) {
                result.message = RESULT_MESSAGE.ERROR + "can not find book"; 
                result.status = RESULT_CODE.NOT_FOUND;
                return result;
            }
            await books.destroy({where: {id: key}});
            result.message = RESULT_MESSAGE.SUCCESS; 
            result.status = RESULT_CODE.SUCCESS;
            result.data = 'deleted';
            console.log('response: ', result);
       } catch (error: any) {
            result.status = RESULT_CODE.ERROR;
            result.message = RESULT_MESSAGE.ERROR + error
       }
       return result;
    }
}