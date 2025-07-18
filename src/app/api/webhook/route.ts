import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import {
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { streamVideo } from "@/lib/stream-video";

import { db } from "@/db";
import { agents, meetings } from "@/db/schema";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Missing signature or API key" },
      { status: 400 }
    );
  }

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "upcoming")));

    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const call = streamVideo.video.call("default", meetingId);

    try {
      const realtimeClient = await streamVideo.video.connectOpenAi({
        call,
        openAiApiKey: process.env.OPENAI_API_KEY!,
        agentUserId: existingAgent.id,
        model: "gpt-4o-realtime-preview",
      });

      realtimeClient.updateSession({
        instructions: existingAgent.instructions,
      });
    } catch (error) {
      console.error("Failed to connect OpenAI agent:", error);

      await db
        .update(meetings)
        .set({ status: "upcoming", startedAt: null })
        .where(eq(meetings.id, existingMeeting.id));

      return NextResponse.json(
        { error: "Failed to initialize AI agent" },
        { status: 500 }
      );
    }
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }

    const call = streamVideo.video.call("default", meetingId);

    await call.end();
  }

  return NextResponse.json({ status: "ok" });
}
