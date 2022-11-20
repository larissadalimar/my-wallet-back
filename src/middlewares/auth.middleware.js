import { sessionsCollection, usersCollection } from '../database/db.js'

export default async function authValidation(req, res, next){

    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "")

    try {
        const session = await sessionsCollection.findOne({token})

        const user = await usersCollection.findOne({ _id: session.userId })

        if(!user) return res.status(401).send("Unauthorized")

        req.locals.session = session
        req.locals.user = user

    } catch (error) {
        console.log(error)
    }


    next()
}