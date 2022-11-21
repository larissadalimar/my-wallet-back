
import { registersCollection, saldoCollection } from '../database/db.js'
import dayjs from 'dayjs'

export async function createRegister(req, res){
    const { description, value, type } = req.body
    const user = res.locals.user
    const valueNum = Number(value)

    try {
        await registersCollection.insertOne({description, value, type, time: dayjs().format("DD/MM"), user: user._id})

        if(type === "entrada")
            await saldoCollection.updateOne({userId: user._id}, { $inc: {"value": valueNum}})
        else if (type === "saida")
            await saldoCollection.updateOne({userId: user._id}, { $inc: {"value": -valueNum}})
        
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }
}

export async function getRegisters(req, res){

    const user = res.locals.user

    try {
        const registers = await registersCollection.find({user: user._id}).toArray()

        const saldo = await saldoCollection.findOne({userId: user._id})
        
        res.send({registers: registers, saldo: saldo.value})

    } catch (error) {
        console.log(error)
    }
}