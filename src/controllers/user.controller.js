import bcrypt from 'bcrypt'
import { usersCollection, sessionsCollection } from '../database/db.js'
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {

    const { name, password, email} = req.body

    const passwordHash = bcrypt.hashSync(password, 10);

    try {

        await usersCollection.insertOne({ name, password: passwordHash, email }) 

        res.sendStatus(201)

    } catch (error) {
        console.log(error)
    }

}

export async function signIn(req, res){

    const user = res.locals.user

    try {

        const token = uuid()

        await sessionsCollection.insertOne({
            token,
            userId: user._id
        })

        res.send({name: user.name, token})

    } catch (error) {
        console.log(error)
    }
}

export async function signOut (req, res){

    const session = req.locals.session

    try {

        await sessionsCollection.deleteOne(session)
        
        res.sendStatus(200)

    } catch (error) {
        console.log(error)
    }
}