
import { registersCollection } from '../database/db.js'

export async function createRegister(req, res){
    const { description, value, type } = req.body
    const user = req.locals.user

    try {
        await registersCollection.insertOne({description, value, type, time: dayjs().format("DD/MM"), user: user._id})

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }
}

export async function getRegisters(req, res){

    const user = req.locals.user

    try {
        const registers = await registersCollection.find({user: user._id}).toArray()

        res.send(registers)

    } catch (error) {
        console.log(error)
    }
}

export async function getSaldo(req, res){
    
    try {
        
    } catch (error) {
        
    }
}