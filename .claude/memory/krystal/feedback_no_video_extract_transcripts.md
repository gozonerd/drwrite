---
name: Krystal hates videos as learning content; extract transcripts whenever a video is the only/primary source
description: For any learning/research workflow where videos appear as content (Sage Research Methods, YouTube tutorials, Coursera, conference talks), extract the transcript and present as readable text — Krystal would rather read 100 pages of academic literature than watch a 25-minute video lesson
type: feedback
originSessionId: 5bbbce8a-f733-4014-ad8f-1544228ee698
user: krystal
---
**Rule:** When learning content or research material is delivered as video, extract the transcript and present as readable markdown text rather than directing Krystal to watch the video. If no transcript is available, build one (closed captions / VTT track / speech-to-text fallback).

**Why:** Krystal stated 2026-04-28 verbatim: "i hate videos. include writing a script to extract transcripts from them somehow. i would rather read 100 pages of academic literature than watch a 25 minute lesson." This is a strong durable preference rooted in (a) her constructivist learning style — she internalizes via reading + doing, not passive watching, (b) her ADHD pattern — text she can scan/skim/reread; video locks her into someone else's pacing, (c) her vision accommodations — print/text supports her better than screens of moving content for sustained learning sessions.

**How to apply:**
- For Sage Research Methods, Coursera, edX, YouTube tutorials, conference talks, podcast episodes — when the source is video/audio, extract transcript first; only present video URL as a backup if transcript extraction fails.
- Extraction methods (try in order):
  1. Official transcript on the same page (Sage RM, TED, most academic videos provide one) — scrape via DOM
  2. VTT/SRT closed-caption track in the HTML5 video element — fetch + convert to plain text with timestamps stripped
  3. YouTube auto-caption via youtube-transcript-api or yt-dlp's --write-auto-subs flag
  4. Speech-to-text fallback via OpenAI Whisper (only if 1-3 fail; flag time + cost cost)
- Format extracted transcripts as: `# <Title>\n**Speaker(s):** <names>\n**Source:** <URL>\n\n<full transcript with paragraph breaks>` — saved as `.md` per content piece
- Do NOT include timestamps in the body text by default (she's reading for content, not navigating); include a 3-5 line summary header instead
- Don't summarize away from her — give her the FULL transcript text, not a summary; she's an expert reader
- This rule applies to learning-experience generation as a whole; her LE Generation Pipeline already prefers PDF/markdown sources, but explicit-video sources need conversion first
