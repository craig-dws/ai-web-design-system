# First-Time Designer Setup

Complete this once before starting design work.

The agency supplies two folders on the Shared Drive:

- this Designer Pack
- `claude-cowork-designer`, containing the DiscoverWeb design-standard skill

Confirm both folders are available on the designer's computer before continuing.

## 1. Set up the DiscoverWeb design-standard skill

Choose one installation option. Do not complete both.

### Option A: organisation-wide installation, recommended

The organisation Owner completes this once for the team:

1. Open `Organization settings`, then `Skills`.
2. Enable `Code execution and file creation` and `Skills` if they are not already enabled.
3. Under `Organization skills`, select `+ Add`.
4. Upload `claude-cowork-designer/discoverweb-design-standard.zip`.

The designer then opens Cowork, selects `Customize`, then `Skills`, and confirms that the DiscoverWeb design-standard skill appears and is enabled.

### Option B: individual installation

Use this only if the skill has not been installed for the organisation:

1. Open Cowork and select `Customize`.
2. Open `Skills`, select `+`, then select `Create skill`.
3. Select `Upload a skill`.
4. Upload `claude-cowork-designer/discoverweb-design-standard.zip`.
5. Confirm the skill appears and is enabled.

If the upload option is unavailable, ask the organisation Owner to enable Skills and Code execution and file creation, or to complete Option A.

Official help: [using skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) and [organisation-wide skills](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization).

## 2. Install the Design and Figma plugins

1. In Cowork, select `Customize`.
2. Open `Plugins`, then select `Browse plugins`.
3. Find and install the Anthropic Design plugin.
4. Find and install the Figma plugin from `Anthropic & Partners`.
5. Confirm both plugins are enabled.

If either plugin is unavailable, ask the organisation Owner to make it available.

Official help: [using plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

## 3. Configure the Figma connector

1. In Cowork, select `Customize`, then `Plugins`.
2. Open the installed Figma plugin.
3. Select its `Connectors` tab.
4. Open the included Figma connector and select `Connect` or `Configure`.
5. Sign in with the Figma account used for agency work.
6. Approve the requested access.
7. Confirm the connected account can open the agency's Figma files.

The Figma plugin supplies the Figma skills and MCP connection. The connector must still be signed in to the correct Figma account.

Official help: [browsing connectors](https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory) and the [Figma connector](https://claude.com/connectors/figma).

## 4. Create the Designer System project in Cowork

1. Create a Cowork project named `DiscoverWeb Designer System`.
2. Add this local Designer Pack folder as project context.
3. Paste the following into the project's Instructions field:

```text
This is a DiscoverWeb design project. Follow the DiscoverWeb design standard.

Figma is the approved design source. Use named variables and components for every
colour, typography and spacing decision. Do not invent token names or use raw values
where an approved variable exists.

Before design-system approval and before handoff, run the DiscoverWeb design-standard
skill and report honestly what passes, what fails and what cannot be checked.

Treat every output as a draft until the Designer confirms it. Ask rather than guess.
Use British and Australian English. Do not use em dashes, en dashes or emojis.
```

For client work, create one Cowork project per client. Connect only this Designer Pack and the current client folder. Do not connect unrelated client folders.

## 5. Run the setup check

Start a Cowork task in the `DiscoverWeb Designer System` project and paste this prompt:

```text
Help me verify my Designer setup one step at a time.

Check that you can:
1. Read 00_START_HERE.md and the files in the reference folder.
2. See the Anthropic Design plugin.
3. See the Figma plugin and confirm it is enabled.
4. Confirm that the Figma connector is signed in to the correct account.
5. See and invoke the DiscoverWeb design-standard skill.

Then ask me to provide a safe Figma practice file. Run a read-only DiscoverWeb design
standard check and state what you inspected and what you could not verify.

Do not change the Figma file. Finish with SETUP READY or SETUP NOT READY and list any
missing item.
```

## Setup is complete when

- [ ] Both supplied folders are available on the designer's computer
- [ ] The DiscoverWeb design-standard skill is installed and enabled
- [ ] The Anthropic Design plugin is installed
- [ ] The Figma plugin is installed and enabled
- [ ] The Figma connector uses the correct account and can access agency files
- [ ] Cowork can read this Designer Pack
- [ ] The read-only Figma practice check works

Do not begin a client project until every item passes.
