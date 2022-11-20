import { usersCollection } from '../database/db.js'
import bcrypt from 'bcrypt'

export async function signInValidation(req, res, next){
    const { email, password } = req.body

    try {
        const user = await usersCollection.findOne({ email })

        if(user && bcrypt.compareSync(password, user.password)) {

            res.locals.user = user
            next()

        } else {
            return res.status(422).send("Usuário ou senha incorreto")
        }

    } catch(error){
        console.log(error)
    }

    
}