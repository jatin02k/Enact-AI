import { model } from '@/lib/ai/gemini';
import { generateObject } from 'ai';
import { VerificationSchema } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { VERIFY_PROOF_PROMPT } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    // 1. Read the request body
    const { imageBase64, textProof, taskTitle } = await req.json();

    // 2. Validate required fields
    if (!taskTitle) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      );
    }

    if (!imageBase64 && !textProof) {
      return NextResponse.json(
        { error: 'At least one proof type is required' },
        { status: 400 }
      );
    }

    // 3. Auth check — copied exactly from extract-task
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();
    if (authError || !data.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 4. Build the message content dynamically
    // This is the key difference from extract-task
    // Proof can be image, text, or both — so we build content array conditionally
    const content: any[] = [
      { type: 'text', text: VERIFY_PROOF_PROMPT(taskTitle) }
    ]

    if (imageBase64) {
      content.push({ type: 'image', image: imageBase64 })
    }

    if (textProof) {
      content.push({ type: 'text', text: `User's written proof: ${textProof}` })
    }

    // 5. Call Gemini — same pattern as extract-task
    const { object } = await generateObject({
      model: model,
      schema: VerificationSchema,
      messages: [
        {
          role: 'user',
          content: content
        }
      ]
    });

    // 6. Return verdict and reason to frontend
    return NextResponse.json({
      success: true,
      verdict: object.verdict,
      reason: object.reason
    });

  } catch (error: unknown) {
    console.error('Error verifying proof:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to verify proof', details: errorMessage },
      { status: 500 }
    );
  }
}