# Start here: install the design standard in Claude Cowork

For the designer, or anyone on the team who works in Cowork. No terminal, no Git, no repository. It takes about ten minutes, once.

You are installing three things:

1. The DiscoverWeb design standard skill (the file `discoverweb-design-standard.skill`).
2. The Design plugin (for the generic design and accessibility commands).
3. The Figma plugin (so Claude can read and check your Figma canvas).

The easiest way is to let Claude walk you through it. Skip to "The easy way" below. If you would rather do it by hand, the manual steps are underneath.

## The easy way: let Claude guide you

1. Open Claude Cowork in the desktop app.
2. Make sure you have the file `discoverweb-design-standard.skill` saved somewhere you can find it (your Downloads folder is fine).
3. Paste the prompt below into Cowork and follow along. Claude will check what you already have, tell you exactly what to click for anything missing, and confirm at the end that everything works.

```
I want to set up the DiscoverWeb design standard in Claude Cowork. I am not
technical. I work in Figma and I use Cowork to help. Please walk me through this
one step at a time, waiting for me after each step, and keep the language plain.

1. First, tell me how to install a skill file. I have a file called
   discoverweb-design-standard.skill saved on my computer. Tell me exactly where to
   click in the Claude app to upload it (Settings, then Capabilities, then Skills),
   and how I confirm it installed.

2. Then check I have the two plugins I need, both from claude.com/plugins:
   - the Design plugin
   - the Figma plugin (this one needs a paid Figma Dev or Full seat)
   For any I am missing, give me the exact steps to install it, then wait while I do
   it.

3. Once all three are in, run a quick test: ask me to share a screenshot of a Figma
   screen, or connect my Figma file, then run the DiscoverWeb design standard skill
   over it and show me the PASS or FAIL report, so I know it is working.

Rules for you: British and Australian English, no em dashes, no en dashes, no
emojis. Ask me rather than assume. If something is not available on my account, say
so plainly and tell me who to ask.
```

That is it. Once it is installed, it stays installed. You do not repeat this.

## Using it day to day

Once set up, you do not need any special command. Just ask, for example:

- "Run the DiscoverWeb design standard over this Figma file and tell me honestly what fails."
- "I am about to hand this to the developer. Audit it against our standard first."

Claude will produce a PASS or FAIL report, name the exact frames or layers that fail, list what you must fix, and tell you whether the file would be accepted or rejected.

Two things to know:

- The audit is deepest when Claude can see your Figma file through the Figma plugin. If you only give it a screenshot, it will still check the visual and copy items, but it will tell you which checks it could not run.
- If Claude ever says the standard and its own general design knowledge disagree, it follows our standard. That is correct.

## The manual way (if you prefer)

Install the skill:

1. In the Claude app, open Settings, then Capabilities, then Skills.
2. Upload `discoverweb-design-standard.skill`.
3. Confirm it appears and is switched on.

Install the plugins:

1. Go to claude.com/plugins.
2. Install the Design plugin.
3. Install the Figma plugin, and sign in with a Figma account that has a Dev or Full seat.

Note: skills need Code Execution and File Creation turned on for your account. If the upload is not available, ask your admin, they may need to enable these or install the skill for the whole team.

## For your admin

If you would rather every team member get this automatically without each person installing it, the admin can provision it once for the whole workspace. Those steps are in `SETUP.md`.
