import { readFileSync } from 'fs'
import path from 'node:path'

export async function GET(req: Request) {
    const pdf = readFileSync(
        path.join(process.cwd(), 'public', 'resumeLight.pdf'),
        {
            encoding: 'binary'
        }
    )
    const pdfBuffer = Buffer.from(pdf, 'binary')

    return new Response(
        pdfBuffer,
        {
            headers: {
                "Content-Type": "application/pdf"
            }
        }
    )
}