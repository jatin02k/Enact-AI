import { model } from '@/lib/ai/gemini';
import { generateObject } from 'ai';
import { ExtractionSchema } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { EXTRACT_TASK_PROMPT } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, filePath } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Authenticate user
    let user = null;
    let authError = null;
    
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getUser();
        user = data.user;
        authError = error;
    } catch (e) {
        console.error("Supabase auth error in extract-task:", e);
        authError = e;
    }
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in' },
        { status: 401 }
      );
    }

    // Verify the file belongs to the authenticated user
    // File path format: {user_id}/{filename}
    if (filePath && !filePath.startsWith(`${user.id}/`)) {
      return NextResponse.json(
        { error: 'Forbidden - you can only process your own images' },
        { status: 403 }
      );
    }

    // Fetch the image and convert to base64
    // This avoids CORS/auth issues with Supabase Storage
    console.log('Fetching image from URL:', imageUrl);
    const imageResponse = await fetch(imageUrl);
    console.log('Image fetch response status:', imageResponse.status);
    
    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error('Image fetch failed:', errorText);
      throw new Error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`);
    }
    
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    const { object } = await generateObject({
      model: model,
      schema: ExtractionSchema,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: EXTRACT_TASK_PROMPT },
            { type: 'image', image: dataUrl }
          ],
        },
      ],
    });

    return NextResponse.json({ 
      success: true,
      core_principle: object.core_principle,
      tasks: object.tasks 
    });

  } catch (error: unknown) {
    console.error('Error extracting task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Failed to extract task', details: errorMessage },
      { status: 500 }
    );
  }
}