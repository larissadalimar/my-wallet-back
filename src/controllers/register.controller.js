
import registerCollection from '../database/db.js'

async function createRegister(req, res){
    const { description, value, type } = req.body

    try {
        await registerCollection.insertOne({description, value, type, time: dayjs().format("DD/MM")})

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }
}

async function getRegisters(req, res){

    try {
        const registers = await registerCollection.find().toArray()

        res.send(registers)

    } catch (error) {
        console.log(error)
    }
}

async function getSaldo(req, res){
    
    try {
        
    } catch (error) {
        
    }
}