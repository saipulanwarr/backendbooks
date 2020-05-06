const bookModel = require('../models/book');
const miscHelper = require('../helpers');

module.exports = {
    getAll: async(req, res) => {
        try{
            const result = await bookModel.getAll()
            miscHelper.response(res, 200, result);
        }catch(error){
            miscHelper.customErrorResponse(res, 404, 'Internal Server Error!');
        }
    },
    getDetail: async (req, res) => {
        try {
          const bookId = req.params.bookId
          const result = await bookModel.getDetail(bookId)
          res.json(result)
        } catch (error) {
          console.log(error)
        }
    },
    insertData: async(req, res) => {
        try{
            if(req.body.name == ""){
                return miscHelper.customErrorResponse(res, 400, 'Field name required');
            }
            const data = {
                id: 889,
                name: req.body.name,
                writer: req.body.writer,
                description: req.body.description,
                publisher: req.body.publisher,
                year: req.body.year,
                stock: req.body.stock,
                genre: req.body.genre,
                created_at: new Date(),
                updated_at: new Date()
            };

            const result = await bookModel.insertData(data);
            res.json({
                id: 1000,
                ...data
            });
        }catch(error){
            console.log(error)
        }
    },
    updateData: async(req, res) => {
        try{
            const data = {
                name: req.body.name,
                writer: req.body.writer,
                description: req.body.description,
                publisher: req.body.publisher,
                year: req.body.year,
                stock: req.body.stock,
                genre: req.body.genre,
                created_at: new Date(),
                updated_at: new Date()
            };

            const result = await bookModel.updateData(data, req.params.bookId);
            res.json({
                id: parseInt(req.params.bookId),
                ...data
            });
        }catch(error){
            console.log(error)
        }
    },
    deleteData: async(req, res) => {
        try{
            const result = await bookModel.deleteData(req.params.bookId);
            res.json({
                id: parseInt(req.params.bookId)
            });
        }catch(error){
            console.log(error);
        }
    }
}