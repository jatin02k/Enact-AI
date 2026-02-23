import { google } from '@ai-sdk/google'

// Gemini 1.5 Flash - fast and multimodal (supports images)
export const geminiFlash = google('gemini-1.5-flash')

// Gemini 1.5 Pro - more powerful, for complex tasks
export const geminiPro = google('gemini-1.5-pro')
