# Setup and Installation

## Install the skill

1. Open Claude Desktop and select `Cowork`.
2. Open `Customize` in the left sidebar.
3. Open `Skills`.
4. Upload `discoverweb-design-standard.zip`.
5. Confirm the skill appears and is enabled.

If Skills are unavailable, ask the agency Claude administrator to enable Skills for the account.

## Install the required plugins

1. In Cowork, open `Customize`.
2. Open `Plugins`, then select `Browse plugins`.
3. Install the Design plugin.
4. Install the Figma plugin from `Anthropic & Partners`.
5. Confirm both plugins are enabled.

## Configure the Figma connector

1. In Cowork, open `Customize`, then `Plugins`.
2. Open the installed Figma plugin and select its `Connectors` tab.
3. Open the included Figma connector and select `Connect` or `Configure`.
4. Sign in with the Figma account used for agency work and approve the requested access.

The Design plugin supplies general design, accessibility and handoff checks. The Figma plugin supplies Figma skills and the MCP connection. Without an authenticated Figma connector, the skill can check only the supplied screenshots or descriptions and must state that limitation.

## Test the setup

Connect a safe Figma practice file and ask:

```text
Run the DiscoverWeb design-standard skill over this Figma practice file. Do not change
the file. State whether you inspected the live canvas or only a screenshot, then report
PASS or FAIL and list any check you could not perform.
```

The setup passes when Claude identifies the skill, reads the Figma source and returns the audit mode and result without changing the file.
