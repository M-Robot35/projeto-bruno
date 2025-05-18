'use server'
import WhatsappMessage from "../services/evolution/evolution"
import { 
    ISettings, 
    TypeWebhookOutput, 
    IWebhookSetOptions,
    TypeGroupOutput,
    TypeParticipants,
    TypeGroupParticipants
} from "../services/evolution/evoluitonTypes/instances-type"

type dataConfig={apikey: string, instanceName: string}
type dataConfigUp={apikey: string, instanceName: string, options:ISettings}
type dataUpdateProxy={apikey: string, instanceName: string, options:any}
type dataUpdateWebhook={apikey: string, instanceName: string, options:IWebhookSetOptions}
type dataUpdateGroupParticipants={apikey: string, instanceName: string, groupId:string}

// ---------------------------------------------------------------------------------
// SETTINGS
// ---------------------------------------------------------------------------------
export async function settingsGetAction(_:any,data:dataConfig):Promise<ISettings|null>{
    const execute= await WhatsappMessage.settingsGet(data.apikey,data.instanceName)
    return execute
}

export async function settingsUpdateAction(_:any,data:dataConfigUp):Promise<ISettings|null>{
    const execute= await WhatsappMessage.settingsUpdate(
        data.apikey,
        data.instanceName, 
        data.options
    )
    return execute
}

// ---------------------------------------------------------------------------------
// PROXY
// ---------------------------------------------------------------------------------
export async function proxyGetAction(_:any,data:dataConfig){
    const execute= await WhatsappMessage.proxyGet(data.apikey, data.instanceName)
    return execute
}

export async function proxyUpdateAction(_:any,data:dataUpdateProxy){
    const execute= await WhatsappMessage.proxyUpdate(data.apikey, data.instanceName,data.options)
    return execute
}

// ---------------------------------------------------------------------------------
// WEBHOOKS
// ---------------------------------------------------------------------------------
export async function webhookGetAction(_:any,data:dataConfig):Promise<TypeWebhookOutput|null>{
    const execute= await WhatsappMessage.webhookGet(data.apikey, data.instanceName)
    return execute
}

export async function webhookUpdateAction(_:any,data:dataUpdateWebhook):Promise<TypeWebhookOutput|null>{
    const execute= await WhatsappMessage.webhookUpdate(data.apikey, data.instanceName,data.options)
    return execute
}

// ---------------------------------------------------------------------------------
// GRUPOS
// ---------------------------------------------------------------------------------
export async function gruposGetAction(_:any,data:dataConfig):Promise<TypeGroupOutput[]|null>{
    const execute= await WhatsappMessage.grupos.groupsAll( data.instanceName, data.apikey)
    return execute
}

export default async function groupParticipants(instanceName:string, apikey:string, grupoId:string):Promise<TypeGroupParticipants|null>{
    const participantes= await WhatsappMessage
        .grupos
        .groupsBuscarParticipants(
            instanceName, 
            apikey,
            grupoId
    )
    if(!participantes) return null
    return participantes
}

export async function* fetchParticipantsGenerator(usersSend:string[], instanceNamee:string, apikeyy:string) {
    if (!usersSend || usersSend.length === 0) {
        yield null;
        return;
    }
    const allParticipants:TypeGroupParticipants  = { participants: [] };

    for (let i = 0; i < usersSend.length; i++) {
        const groupId = usersSend[i];
        const result = await groupParticipants(instanceNamee, apikeyy, groupId);

        if (result) {
            allParticipants.participants = [...allParticipants.participants, ...result.participants];
            yield allParticipants;
        }
    }

    allParticipants.participants = Array.from(
        new Map(allParticipants.participants.map(p => [p.id, p])).values()
    );
    yield allParticipants;
}