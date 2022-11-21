import joi from "joi"

const registerSchema = joi.object({
    description: joi.string().min(3).max(30).required(),
    value: joi.number().positive().required(),
    type: joi.any().valid("entrada", "saida")
})

export default registerSchema