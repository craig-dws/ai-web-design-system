# Install the design tools in Claude Cowork

Complete this once before using the Designer workflow.

You need:

1. The DiscoverWeb design-standard skill.
2. The Anthropic Design plugin.
3. The Figma plugin.
4. The Figma connector signed in to the agency account.

## 1. Confirm how the skill will be installed

Ask whether the organisation Owner has installed the skill for everyone.

If it is installed for everyone:

1. Open Cowork.
2. Select `Customize`, then `Skills`.
3. Confirm the DiscoverWeb design-standard skill appears and is enabled.

If it is not installed for everyone:

1. Open Cowork.
2. Select `Customize`, then `Skills`.
3. Select `+`, then `Create skill`.
4. Select `Upload a skill`.
5. Upload `discoverweb-design-standard.zip` from this folder.
6. Confirm the skill appears and is enabled.

If the upload option is unavailable, ask the organisation Owner to enable Skills and Code execution and file creation, or to install the skill for everyone using `SETUP.md`.

## 2. Install the plugins

1. In Cowork, select `Customize`.
2. Open `Plugins`, then select `Browse plugins`.
3. Install the Anthropic Design plugin.
4. Install the Figma plugin from `Anthropic & Partners`.
5. Confirm both plugins are enabled.

## 3. Connect Figma

1. In Cowork, select `Customize`, then `Plugins`.
2. Open the installed Figma plugin.
3. Select its `Connectors` tab.
4. Open the included Figma connector and select `Connect` or `Configure`.
5. Sign in with the Figma account used for agency work.
6. Approve the requested access.
7. Confirm the account can access the agency's Figma files.

The plugin supplies the Figma skills and MCP connection. The connector must still be signed in to the correct Figma account.

## 4. Run a setup check

Paste this into Cowork:

```text
Help me verify my Designer setup one step at a time.

Check that:
1. The DiscoverWeb design-standard skill is installed and enabled.
2. The Anthropic Design plugin is installed.
3. The Figma plugin is installed and enabled.
4. The Figma connector is signed in to the correct account.

Then ask me to provide a safe Figma practice file. Run a read-only DiscoverWeb design
standard check. State what you inspected and what you could not verify. Do not change
the Figma file.

Finish with SETUP READY or SETUP NOT READY and list any missing item.
```

## Setup is complete when

- [ ] The skill is installed and enabled
- [ ] The Anthropic Design plugin is installed
- [ ] The Figma plugin is installed and enabled
- [ ] The Figma connector is signed in to the correct account
- [ ] A read-only practice check works

Once these checks pass, continue with `00_START_HERE.md` in the Designer Pack.
