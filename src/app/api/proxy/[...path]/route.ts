import { NextRequest, NextResponse } from 'next/server'

// Fixed backend API base URL (no env needed as requested)
const TARGET = 'https://my-project-backend-seven.vercel.app/api'

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params)
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params)
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params)
}

export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params)
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params)
}

export async function OPTIONS(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params)
}

async function forward(req: NextRequest, { path }: { path: string[] }) {
  // Preserve query string
  const search = req.nextUrl.search || ''
  const targetUrl = `${TARGET}/${path.join('/')}${search}`

  // Clone incoming headers, drop hop-by-hop and Next internal headers
  const incomingHeaders = new Headers(req.headers)
  const headers = new Headers()
  incomingHeaders.forEach((value, key) => {
    const k = key.toLowerCase()
    if (k.startsWith('x-nextjs-') || k === 'host' || k === 'connection' || k === 'content-length') return
    headers.set(key, value)
  })

  // Set origin to backend origin to avoid backend CORS confusion
  headers.set('origin', new URL(TARGET).origin)

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: 'manual'
  }

  // For non-GET/HEAD, stream the body through to preserve multipart boundaries
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    ;(init as any).duplex = 'half'
    init.body = req.body as any
  }

  try {
    const resp = await fetch(targetUrl, init)

    // Clone response headers and strip CORS headers (same-origin proxy)
    const resHeaders = new Headers(resp.headers)
    resHeaders.delete('access-control-allow-origin')
    resHeaders.delete('access-control-allow-headers')
    resHeaders.delete('access-control-allow-methods')
    resHeaders.delete('access-control-allow-credentials')

    return new NextResponse(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers: resHeaders
    })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || 'Proxy error' }, { status: 502 })
  }
}


