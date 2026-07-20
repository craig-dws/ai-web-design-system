# PM 02: New site brief (Stage 0)

- **Who:** the Project Manager.
- **Tool:** either, and they are not equivalent in effort:
  - **In Claude Code, prefer the skill.** Just say
    *"I need a new site for BRAND"* and let the **`site-brief`** skill run. It
    reads the docs itself, asks the clarifying questions, researches, and writes
    the brief into the client folder. Nothing to paste.
  - **In Cowork, use the paste-in below.** Repository skills do not load there,
    so this is the same workflow done by hand.
- **When:** the start of every project, before any design work.

The brief is what makes short prompts possible everywhere downstream. Once it
exists, nobody has to write an essay to the AI again, because the brief carries
the context.

```
I need to turn a new client request into a proper project brief for a website build. You
are helping me as the project manager. Work through this with me; do not write the brief
until you have my answers.

THE REQUEST, in my words: [FOR EXAMPLE, "I need a new site for BRAND"]

STEP 1. Ask me the clarifying questions I may not have thought of, grouped and in a
sensible order. Cover at least:
- Business goals, and what success looks like in twelve months
- Primary and secondary audiences, and what each is trying to do
- The page list and a rough sitemap
- Tone, brand personality, and any non-negotiable brand rules
- Named competitors, and admired reference sites, and what is wrong with each
- Constraints: deadline, budget tier, accessibility obligations, any regulated niche
- Content: where it is coming from, and whether it exists yet
- Assets to hand: logo, imagery, existing brand guidelines
Ask them, then STOP and wait for my answers. Do not guess or fill them in for me.

STEP 2. Once I have answered, research the brand and its market. Use /competitive-brief
for the competitors. Record your sources. Do not assert anything you cannot support, and
tell me plainly where the evidence is thin.

STEP 3. Recommend a BUILD TARGET and give me your reasoning, flagging that I must confirm
it with the Dev Lead:
- Target A, WordPress plus Breakdance: the client wants to self-edit layout visually, on
  one low-ops host, and no-code turnaround matters more than raw performance.
- Target B, Astro plus Payload: performance and crawler fidelity lead, the developer owns
  the front end in code, and the client mainly edits structured content. Note it is a
  heavier ops surface: an always-on Node service plus a database.
The target is chosen now, not mid-build. Changing it later is expensive.

STEP 4. Write the brief, with these sections:
- The one-paragraph summary: who, what, why, by when
- Goals and success measures
- Audiences, and the job each is trying to do
- Sitemap and page inventory
- Tone and brand rules
- Competitive summary, with sources
- Chosen build target, and why
- Content source, and whether it exists yet
- Asset inventory, and what is still missing
- Constraints, risks, and open questions

STEP 5. Give me a short list of what is still unresolved and who needs to answer each.

RULES:
- Ask before assuming. Never invent a business goal, an audience, or a competitor.
- CONTENT NEVER BLOCKS THIS. Content is a pluggable input from any source: the client,
  ZilvaEdge, or realistic placeholder for a pilot. Record which source is expected and
  move on. A pilot with placeholder content is valid. Do not treat missing content as a
  blocker or a dependency.
- British and Australian English. No em dashes, no en dashes, no emojis.
- This is a draft for humans to approve. Flag anything you are unsure about rather than
  smoothing over it.
```

## The gate

The brief is approved by **you and the client**. **Design does not start without
it.** Once approved, hand the designer:

1. the approved brief,
2. her documents folder (`designer-pack/documents/`, produced by
   `bash designer-pack/assemble.sh`),
3. the assets and any real content you have.

She then starts at `designer/02_concept_directions.md`.
