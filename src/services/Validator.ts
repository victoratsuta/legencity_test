import Ajv from 'ajv';
import {ValidationException} from "../exceptions/validation.exception";

export class Validator {
    public validate(schema: object, data: object | null) {
        const ajv = new Ajv({$data: true});

        const valid = ajv.validate(schema, data);

        if (!valid) {
            throw new ValidationException(ajv.errors)
        }
    }
}