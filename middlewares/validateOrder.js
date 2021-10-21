import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import ajvFormats from "ajv-formats";

const ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    allowUnionTypes: true
});

ajvErrors(ajv);
ajvFormats(ajv);

const schema = {
    type: "object",
    additionalProperties: true,
    required: ["name", "detail", "date", "customerId", "price", "driver", "isDelivered"],
    properties: {
        name: {
            type: "string",
            minLength: 3,
            maxLength: 20,
        },
        detail: {
            type: "string"
        },
        date: {
            type: "string"
        },
        customerId: {
            type: "string",
        },
        price: {
            type: "string",
        },
        driver: {
            type: "string",
        },
        isDelivered: {
            type: "string"
        }
    }
};

const validation = (schema) => {
    return (req, res, next) => {
        const test = ajv.compile(schema);
        const result = test(req.body); // Buraya kontrol edilecek array ya da objekt

        if (!result) return res.status(400).json(test.errors);

        next();
    };
};

export default validation;