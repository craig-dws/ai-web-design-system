# Designer 02: Initial concept directions (Claude Design)

- **Who:** the designer.
- **Tool:** the **Claude Design** product, for concepts only.
- **How often:** at the start of Stage 1, once per project, before any Figma
  high-fidelity work.

## Read this before you use it

- **Claude Design does not export to Figma.** It exports Canva, PDF, PPTX, HTML,
  or a share link. Concepts **inform** the Figma work; they never become it. The
  proper build always happens in Figma.
- **It is rate limited**, roughly 3 to 4 prompts a week on Pro. Treat every shot
  as expensive. That is why this is a filled-in template rather than a chat.
- **Produce one or two directions, not more.** More directions dilute the
  decision and burn your quota.
- Output here is disposable and for divergence and client pitch visuals. Taste
  and the final call stay with you.

## The template

Fill in every bracket from the approved brief before you send it. If you cannot
fill one in, ask the PM rather than guessing.

```
I need initial visual directions for a website. You are acting as the design lead at a
studio known for giving every client a visual identity that could not be mistaken for
anyone else's.

THE BRIEF
- Client and what they do: [CLIENT, ONE LINE]
- The single business goal this site must achieve: [GOAL]
- Primary audience, and what they are trying to do: [AUDIENCE AND THEIR TASK]
- What the client wants to feel like: [THREE ADJECTIVES FROM THE BRIEF]
- What they must NOT feel like: [WHAT TO AVOID]
- Competitors or references, and what is wrong with them: [NAMES AND THE GAP]
- Hard constraints: [REGULATORY, BRAND, IMAGERY, ACCESSIBILITY, ANYTHING FIXED]
- Content we actually have: [REAL COPY, PLACEHOLDER, OR MIXED]

WHAT TO PRODUCE
Give me TWO distinct directions. Not variations of one idea, two genuinely different
points of view. For each direction:

1. A NAME and a one-sentence thesis. What is the idea, in words, before any pixels.
2. A SIGNATURE ELEMENT: the one thing that makes this site itself and would be missed if
   removed. Not a decoration, a device.
3. A compact token system, named, not raw values:
   - 4 to 6 named colours with their roles (not "blue", but the role it plays)
   - 2 or more type roles with the personality they carry
   - the spacing feel and the radius feel
4. The HERO as a thesis, not decoration: what it says, shows, and asks.
5. One content section, one card or list pattern, and the primary call to action.
6. A short rationale tying every choice back to the brief above.

WORK IN TWO PASSES
Pass 1: produce the plan for both directions, in words plus rough layout description.
Pass 2: critique your own plan against the brief and against the traps below, then revise
anything that reads as a default. Show me the critique, not just the revision.

TRAPS TO AVOID, EXPLICITLY
Do not give me any of these, they are what AI-generated design looks like:
- warm cream plus a serif plus terracotta
- near-black plus acid green
- the hairline-ruled broadsheet layout
- everything centred and symmetrical, 50/50 splits, uniform padding everywhere
- conventional hierarchy only, where the heading is always biggest and the CTA always boldest
- default blues and generic greys standing in for a brand palette

Instead, use intentional spatial rhythm, at least one deliberate asymmetry, and at least
one place where the hierarchy is not the obvious one. Every such choice must serve the
thesis, not be different for its own sake.

QUALITY FLOOR, NON NEGOTIABLE
- Legible at real sizes, with genuine contrast. We certify WCAG 2.2 AA later, so do not
  hand me something that cannot get there.
- Motion, if any, is deliberate. Ambient animation reads as AI-generated.
- Copy is design material. Write real words, not lorem ipsum, in British and Australian
  English. No em dashes, no en dashes, no emojis.

Ask me anything you need before starting. Then show me Pass 1 and stop.
```

## After you have a direction

1. Present one or two directions to the client with the rationale. Get **written
   sign-off on one** before building full layouts. That is **Gate 1a**.
2. Then move to Figma and build the approved direction properly, starting from the
   agency base kit. The concept is a reference, not an asset to import.
3. The design system comes next, not the pages. See `03_build_design_system.md`.
