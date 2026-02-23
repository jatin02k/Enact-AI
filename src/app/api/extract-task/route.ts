import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { geminiFlash } from '@/lib/ai/gemini'
import { EXTRACT_TASK_PROMPT } from '@/lib/ai/prompts'

export async function POST(req: Request) {
  try {
    // Get the authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { imageUrl } = await req.json()

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    console.log('Extracting task from image:', imageUrl)

    // Use Gemini Vision to extract task from the book page image
    const { text } = await generateText({
      model: geminiFlash,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: EXTRACT_TASK_PROMPT },
            { type: 'image', image: imageUrl },
          ],
        },
      ],
    })

    const taskText = text.trim()
    console.log('Extracted task:', taskText)

    // Save task to database
    const { data: task, error: dbError } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        task_text: taskText,
        image_url: imageUrl,
        status: 'pending',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Still return task text even if DB insert fails
      return NextResponse.json({ task: taskText, saved: false })
    }

    return NextResponse.json({ task: taskText, taskId: task.id, saved: true })
  } catch (error) {
    console.error('Extract task error:', error)
    return NextResponse.json(
      { error: 'Failed to extract task from image' },
      { status: 500 }
    )
  }
}
