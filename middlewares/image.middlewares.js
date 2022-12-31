
import formidable from 'formidable-serverless';
import fs from 'fs';
const formid = (req, res, next) => {
    try {
      var form = new formidable.IncomingForm({ multiples: true,allowEmptyFiles:true })
      // remember its .filepath not path for ordinary formidable when you want to access the paths
    // const form = formidable({ multiples: true,allowEmptyFiles:true });
    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        
        req.files = files;
       req.filePath =  fs.readFileSync(files.image.path);

        req.body=fields;
        next();
      });
    } catch (error) {
      utils.handleResponse(res, 401, false, error.toString());
      }
}

export default formid;
