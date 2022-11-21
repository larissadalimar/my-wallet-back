import { usersCollection } from "../database/db.js"
import userSchema from "../models/user.model.js"

export async function signUpValidation(req, res, next){

    const { error } = userSchema.validate(req.body, {abortEarly: false})

    if(error){
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    try {
        const user = await usersCollection.findOne({email: req.body.email})

        if(user) return res.status(422).send("Usuário já existente")

    } catch (error) {
        console.log(error)
    }

    next()

}