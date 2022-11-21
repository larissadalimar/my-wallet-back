import bcrypt from 'bcrypt'
import { usersCollection, sessionsCollection, saldoCollection } from '../database/db.js'
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {

    const { name, password, email} = req.body

    const passwordHash = bcrypt.hashSync(password, 10);

    try {

        await usersCollection.insertOne({ name, password: passwordHash, email }) 

        const user = await usersCollection.findOne({ email })

        await saldoCollection.insertOne({userId: user._id, value: 0.0})

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

    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "")

    try {

        await sessionsCollection.deleteOne({token})
        
        res.sendStatus(200)

    } catch (error) {
        console.log(error)
    }
}