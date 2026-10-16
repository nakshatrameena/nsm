
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const key = process.env.TINYFISH_API_KEY;

  if (!q || q.length > 400) {
    return NextResponse.json(
      { error: "Enter a search query up to 400 characters." },
      { status: 400 }
    );
  }

  if (!Number.isInteger(page) || page < 1 || page > 10) {
    return NextResponse.json(
      { error: "Page must be between 1 and 10." },
      { status: 400 }
    );
  }

  if (!key) {
    return NextResponse.json(
      { error: "Add TINYFISH_API_KEY to .env.local." },
      { status: 503 }
    );
  }

  try {
    const params = new URLSearchParams({
      query: q,
      location: "IN",
      language: "en",
    });

    const response = await fetch(
      `https://api.search.tinyfish.ai/?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
          "X-API-Key": key,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            response.status === 429
              ? "Search rate limit reached. Please wait and try again."
              : response.status === 401 || response.status === 403
                ? "TinyFish rejected the API key. Check your credentials."
                : "TinyFish search is temporarily unavailable.",
        },
        {
          status:
            response.status === 429 ? 429 :
            response.status === 401 || response.status === 403 ? 502 : 502,
        }
      );
    }

    const data = await response.json();

    const results = (Array.isArray(data.results) ? data.results : [])
      .map((item: {
        title?: string;
        url?: string;
        snippet?: string;
        site_name?: string;
        position?: number;
      }) => ({
        title: item.title ?? "Untitled page",
        url: item.url ?? "",
        description: item.snippet ?? "",
        domain: item.site_name ?? "",
        position: item.position,
      }))
      .filter((item: { url: string }) => {
        try {
          const url = new URL(item.url);
          return url.protocol === "https:" || url.protocol === "http:";
        } catch {
          return false;
        }
      });

    return NextResponse.json({
      query: q,
      page,
      results,
      hasMore: false,
      totalResults: data.total_results ?? results.length,
      provider: "TinyFish",
      note: page > 1
        ? "TinyFish pagination is not yet configured."
        : undefined,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach TinyFish. Check your internet connection." },
      { status: 502 }
    );
  }
}

