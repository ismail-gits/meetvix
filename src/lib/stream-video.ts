import "server-only";

import { StreamClient } from "@stream-io/node-sdk";

if (!process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_STREAM_VIDEO_API_KEY not set"
  );
}
if (!process.env.STREAM_VIDEO_SECRET_KEY) {
  throw new Error("Environment variable STREAM_VIDEO_SECRET_KEY not set");
}

export const streamVideo = new StreamClient(
  process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  process.env.STREAM_VIDEO_SECRET_KEY
);
