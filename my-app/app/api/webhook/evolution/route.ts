// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { WebhookMsgUpsert } from "@/app/services/evolution/ev-webhook/webhook-msg-upsert";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    switch(body.event){
      case "messages.upsert":
        const upsert= new WebhookMsgUpsert(body)
        upsert.execute()
        return NextResponse.json({ success: true });


      default:
        return NextResponse.json({ success: false, message: 'Evento não encontrado' }, { status: 401 });
    }
    
  } catch (err) {
    console.error('[WEBHOOK][ERROR]', err);
    return NextResponse.json({ success: false, message: 'Erro ao processar' }, { status: 500 });
  }
}