import registerSchema from "../models/register.model.js"

export function registerSchemaValidation(req, res, next){

    const { error } = registerSchema.validate(req.body, {abortEarly: false})

    if(error){
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    next()

}