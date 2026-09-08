import { google } from '@ai-sdk/google';
import { createDataStreamResponse, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Create a structured data stream response that maps text correctly for useChat
  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: google('gemini-1.5-flash'),
        messages,
      });

      // Merge the text chunks straight into your data pipeline stream
      result.mergeIntoDataStream(dataStream);
    },
  });
}
