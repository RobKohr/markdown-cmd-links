# Markdown Command Links Extension

A VS Code/Cursor extension that makes `cmd:` links in markdown files clickable in code view, allowing you to execute terminal commands by clicking on them.

## Usage

In your markdown files, use the following format:

```markdown
[Run Command](cmd:your-command-here)
```

Or simply:

```markdown
(cmd:your-command-here)
```

When you click on these links in **code view** (not preview), the command will be executed in your terminal.

### Examples

```markdown
- [List files](cmd:ls -la)
- [Open current directory](cmd:open .)
- [Git status](cmd:git status)
- [Open app](cmd:open -a "Application Name" /path/to/file)
- [Run script](cmd:./my-script.sh)
```

**Note:** Commands with spaces should use backslashes to escape them (e.g., `My\ Folder`), or wrap paths in quotes when appropriate.

## Installation

### For Cursor/VS Code (Recommended)

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/RobKohr/markdown-cmd-links.git
   cd markdown-cmd-links
   ```

2. **Install dependencies and compile:**
   ```bash
   npm install
   npm run compile
   ```

3. **Install the extension:**
   
   **For Cursor:**
   ```bash
   cp -r . ~/.cursor/extensions/markdown-cmd-links-0.0.1
   ```
   
   **For VS Code:**
   ```bash
   cp -r . ~/.vscode/extensions/markdown-cmd-links-0.0.1
   ```

4. **Reload the editor:**
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open Command Palette
   - Type: `Developer: Reload Window`
   - Press Enter
   - Or simply restart the editor

### Alternative: Install from Location

1. **Clone and compile:**
   ```bash
   git clone https://github.com/RobKohr/markdown-cmd-links.git
   cd markdown-cmd-links
   npm install
   npm run compile
   ```

2. **In Cursor/VS Code:**
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type: `Developer: Install Extension from Location...`
   - Select the `markdown-cmd-links` folder
   - Reload the window when prompted

### Development Mode (For Testing)

1. **Open the extension folder:**
   ```bash
   cd markdown-cmd-links
   code .  # or `cursor .` for Cursor
   ```

2. **Press `F5`** to launch a new Extension Development Host window
   - The extension will be active in that window
   - Make changes and press `Ctrl+R` (or `Cmd+R` on Mac) in the Extension Development Host to reload

### Package as .vsix (Optional)

If you want to package it for distribution:

```bash
npm install -g vsce
vsce package
```

Then install via Command Palette: `Extensions: Install from VSIX...`

## Updating the Extension

After making changes to the source code:

1. **Recompile:**
   ```bash
   npm run compile
   ```

2. **Update the installed extension:**
   ```bash
   # For Cursor
   cp -r . ~/.cursor/extensions/markdown-cmd-links-0.0.1/
   
   # For VS Code
   cp -r . ~/.vscode/extensions/markdown-cmd-links-0.0.1/
   ```

3. **Reload the editor** (see Installation step 4)

## How It Works

- The extension registers a `DocumentLinkProvider` for markdown files
- It detects links with the `cmd:` protocol using regex pattern: `[text](cmd:command)` or `(cmd:command)`
- When clicked, it executes the command in the active terminal
- Commands are sent to the terminal using VS Code's terminal API (`workbench.action.terminal.sendSequence`)

## Requirements

- VS Code or Cursor (version 1.74.0 or higher)
- Node.js and npm (for building)
- TypeScript (installed via `npm install`)

## Troubleshooting

- **Links not clickable?** Make sure you're in code view, not markdown preview
- **Command not executing?** Ensure you have a terminal open (the extension will try to create one automatically)
- **Extension not loading?** Check that the extension compiled successfully (`out/extension.js` exists) and reload the editor
- **Need to see errors?** Open the Developer Console: `Help > Toggle Developer Tools`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.
