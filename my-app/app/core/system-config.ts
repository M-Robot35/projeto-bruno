import dotenv from 'dotenv'; 
dotenv.config();

export const Env ={
    "NEXTAUTH_URL_INTERNAL": process.env.NEXTAUTH_URL_INTERNAL?? null,
    "NEXTAUTH_URL": process.env.NEXTAUTH_URL?? null,
    "AUTH_SECRET": process.env.AUTH_SECRET?? null,
    "EVOLUTION_URL": process.env.EVOLUTION_URL?? null,
    "EVOLUTION_APIKEY": process.env.EVOLUTION_APIKEY?? null,
    "NEXTAUTH_SECRET": process.env.NEXTAUTH_SECRET?? '',
    "WEBSOCKET_CLIENT_URL": process.env.WEBSOCKET_CLIENT_URL?? null,
    "WEBSOCKET_CLIENT_DELAY_RECONNECT": Number(process.env.WEBSOCKET_CLIENT_DELAY_RECONNECT)?? null,
    
    "SKIP_DB": process.env.SKIP_DB ? (process.env.SKIP_DB.toLowerCase() == 'true') : false    
}


export const configSystem = {
    system: {
        logs:{
            success: false,
            error: true,
        }
    },

    websocketClient: {
        url: Env.WEBSOCKET_CLIENT_URL? Env.WEBSOCKET_CLIENT_URL: 'ws://localhost:3000',
        delayReconnect: Env.WEBSOCKET_CLIENT_DELAY_RECONNECT? Env.WEBSOCKET_CLIENT_DELAY_RECONNECT: 10000,
    },

    evolution:{
        url: Env.EVOLUTION_URL,
        apikey: Env.EVOLUTION_APIKEY,    
    }
};