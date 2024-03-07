import  isBoolean from 'lodash/core.js';
import  has from 'lodash/has.js';
import get  from 'lodash/get.js';
import map from 'lodash/core.js';
import includes from 'lodash/core.js';
import {Schemas} from '../models/schemas.js';


export default function SchemaValidator  (useJoiError = false)  {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = isBoolean(useJoiError) && useJoiError;

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put','patch','delete','get'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false,  // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true  // remove unknown keys from the validated data
  };

  // return the validation middleware
  return (req, res, next) => {
    const route = req.route.path;
  
    const method = req.method.toLowerCase();
   
    if (includes(_supportedMethods, method) && has(Schemas, route)) {
      // get schema for the current route
      const _schema = get(Schemas, route);
   //    console.log(_schema);
      if (_schema) {
      //  console.log(req.body);
        // Validate req.body using the schema and validation options
        const {error,value } = _schema.validate(req.body);
       // return validate(req.body, _schema, _validationOptions, (err, data) => {
     //   console.log("error"+ error);
          if (error) {
            // Joi Error
            const JoiError = {
              status: 'failed',
              error: {
                original: error._object,
                // fetch only message and type from each error
                details: map(error.details, ({message, type}) => ({
                  message: message.replace(/['"]/g, ''),
                  type
                }))
              }
            };

            // Custom Error
            const CustomError = {
              status: 'failed',
              error: 'Invalid request data. Please review request and try again.'
            };

            // Send back the JSON error response
            res.status(422).json(_useJoiError ? JoiError : CustomError);
          } else {
            // Replace req.body with the data after Joi validation
        
            req.body = value;
      
            next();
          }


      //  });



      }
    }else {
      console.log("Sin esquema");
    }
   
  };
};
