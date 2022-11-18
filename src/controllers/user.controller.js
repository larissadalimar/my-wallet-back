import bcrypt from 'bcrypt'
import usersCollection from '../database/db.js'

async function signUp(req, res) {

    const { name, password, email, confirm_password } = req.body

    const passwordHash = bcrypt.hashSync(password, 10);

    try {

        await usersCollection.insertOne({ name, password: passwordHash, email }) 

        res.sendStatus(201)

    } catch (error) {
        console.log(error)
    }

}

async function signIn(req, res){
    const { email, password } = req.body

    try {
        const user = await usersCollection.findOne({ email });

        if(user && bcrypt.compareSync(password, user.password)) {
            return res.sendStatus(200)
        } else {
            return res.status(422).send("Usuário ou senha incorreto")
        }

    } catch (error) {
        console.log(error)
    }
}