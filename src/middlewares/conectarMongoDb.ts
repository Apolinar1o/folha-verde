import mongoose, { mongo } from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const conectarMongoDb = (handler: NextApiHandler) => 
    async( req: NextApiRequest, res: NextApiResponse) => {
        

        if(mongoose.connections[0].readyState) {
            return handler(req, res);
        }


        const {MONGO_DB_URL} = process.env;

        if(!MONGO_DB_URL) {
            return  res.status(500).json({erro: "Env de configuração do banco, não informado"});

        }

        try {
            mongoose.connection.on("connected", () => console.log("Banco de dados conectado"));
            mongoose.connection.on('error', error => console.log(`Ocorreu erro ao conectar no banco: ${error}`));;
            await mongoose.connect(MONGO_DB_URL)

        } catch(e) {
            console.log("erro ao tentar conectar com o banco: ", e )
            return res.status(500).json({erro: "erro ao tentar conectar com o banco"})
        }

        return handler(req, res);

    }
    
    

    