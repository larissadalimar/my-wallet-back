import joi from "joi"

const userSchema = joi.object({
    name: joi.string().required().min(5).max(10),
    email: joi.string().email().required(),
    password: joi.string().required().min(8).max(10),
    confirm_password: joi.any().valid(joi.ref('password')).required(),
})

export default userSchema