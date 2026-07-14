# SAP SD Process Chatbot

**Portfolio Project 2 of 5 · SAP SD + AI Series**

An interactive chat-style web application that answers questions about the SAP SD Order-to-Cash (O2C) process. It uses a curated, embedded knowledge base with fuzzy search — no API key required, no hallucination risk, works entirely client-side.

---

## Overview

| Feature | Detail |
|---|---|
| **Topics covered** | 19 O2C knowledge base entries, sap ,sap-sd ,order-to-cash ,o2c react, vite, tailwindcss, portfolio-project
| **Search engine** | `fuse.js` fuzzy matching on titles + question variants |
| **Fallback** | Graceful "did you mean?" suggestions when no good match |
| **Process map** | Live stage highlighting (Order Created → Credit Check → Delivery Due → Goods Issued → Billing Due → Completed) |
| **Category filters** | Order Management, Pricing, Credit Management, Delivery, Billing, Master Data |
| **Stretch goal** | Optional "Ask anything (Beta)" mode via Anthropic API |

---
Website field: sap-sd-process-assistant.vercel.app.

## Design Language

Matches **Project 1 (Sales Order Analyzer)** exactly:

```
Background:      #0a0c0f
Panel:           #131619
Panel (lighter): #1a1e23
Border:          #262b31
Text (primary):  #eae7e0
Text (dim):      #8b9299
Accent amber:    #e7a13c   ← primary accent
Accent teal:     #4fa89a
Accent blue:     #5b8cc4
Danger red:      #d8614f
```

Typography: **Fraunces** (serif headings) + **IBM Plex Mono** (T-codes, labels, footers) + **Inter** (body).

---

## Tech Stack

- **React 18** + **Vite** — fast HMR dev server, optimised production build
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **fuse.js** — fuzzy search over the knowledge base
- **lucide-react** — consistent icon set
- **framer-motion** — available for future animation enhancements

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

---

## Knowledge Base Structure

Each entry in `src/data/knowledgeBase.js` follows this schema:

```js
{
  id:                 String,   // unique slug, e.g. "credit-management"
  category:           String,   // e.g. "Credit Management"
  stage:              String,   // O2C stage that lights up, e.g. "Credit Check"
  title:              String,   // displayed as the card heading
  tcodes:             String[], // SAP transaction codes shown in footer
  tables:             String[], // SAP tables shown in footer
  question_variants:  String[], // strings indexed by Fuse.js for matching
  summary:            String,   // one-paragraph answer shown in the card
  key_points:         String[], // bullet list rendered in the card body
}
```

### Adding a New Topic

1. Open `src/data/knowledgeBase.js`
2. Add a new entry following the schema above
3. Choose the correct `stage` and `category` so the process map and filters work correctly
4. Add 2-4 `question_variants` — natural-language questions a user might type
5. Restart the dev server — Fuse.js re-indexes automatically at runtime

### Valid Stage Values

```
"Order Created" | "Credit Check" | "Delivery Due" | "Goods Issued" | "Billing Due" | "Completed"
```

### Valid Category Values

```
"Order Management" | "Pricing" | "Credit Management" | "Delivery" | "Billing" | "Master Data"
```

---

## Stretch Goal: Ask Anything (Beta)

Click the **Ask Anything** toggle in the header to enable Claude AI answers for questions outside the curated knowledge base.

- Enter your Anthropic API key in the field that appears
- The key is stored **only in React state** — it is never persisted, logged, or sent anywhere except `api.anthropic.com`
- All AI-generated answers are clearly labelled **"AI-generated — verify against official SAP documentation"**
- Model: `claude-3-5-haiku-20241022` (fast, cost-efficient)

---

## Project Structure

```
sd-process-chatbot/
  src/
    data/
      knowledgeBase.js      ← all 19 SAP SD knowledge entries
    components/
      ChatPanel.jsx         ← message thread, search, input, beta toggle
      MessageBubble.jsx     ← user/assistant/fallback/typing variants
      SuggestionChips.jsx   ← clickable question chips
      ProcessMapPanel.jsx   ← O2C stage tracker + category filter
      CategoryFilter.jsx    ← category filter list
    App.jsx                 ← two-column layout, shared state
    main.jsx                ← React entry point
    index.css               ← Tailwind + global styles
  index.html                ← HTML entry, Google Fonts
  tailwind.config.js        ← design tokens
  vite.config.js
  package.json
```

---

## Companion Project

**Project 1: Sales Order Analyzer** — an O2C pipeline dashboard that visualises the same six stages as a metric-driven dashboard. Both projects share the same visual language and are designed to look like a cohesive portfolio series.

---

*SAP® is a registered trademark of SAP SE. This is an independent portfolio project and has no affiliation with SAP SE.*
