import type { APIRoute } from 'astro'
import { readFileSync } from 'fs'
import path from 'node:path'

export const GET: APIRoute = async ({ request }) => {
    const pdf = readFileSync(
        path.join(process.cwd(), 'public', 'resume-murtuzaali-surti.pdf'),
        {
            encoding: 'binary'
        }
    )
    const pdfBuffer = Buffer.from(pdf, 'binary')

    return new Response(
        Uint8Array.from(pdfBuffer).buffer,
        {
            headers: {
                "Content-Type": "application/pdf"
            }
        }
    )
}