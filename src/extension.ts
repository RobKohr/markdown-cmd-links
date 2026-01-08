import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register document link provider for markdown files
    const provider = new MarkdownCommandLinkProvider();
    const disposable = vscode.languages.registerDocumentLinkProvider(
        { language: 'markdown', scheme: 'file' },
        provider
    );

    // Register command to execute terminal commands
    const executeCommand = vscode.commands.registerCommand(
        'markdown-cmd-links.executeCommand',
        async (command: string) => {
            // Ensure we have a terminal
            await vscode.commands.executeCommand('workbench.action.terminal.focus');
            // Send the command to the terminal
            await vscode.commands.executeCommand('workbench.action.terminal.sendSequence', {
                text: command + '\n'
            });
        }
    );

    context.subscriptions.push(disposable, executeCommand);
}

class MarkdownCommandLinkProvider implements vscode.DocumentLinkProvider {
    provideDocumentLinks(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.DocumentLink[]> {
        const links: vscode.DocumentLink[] = [];
        const text = document.getText();

        // Match markdown links with cmd: protocol
        // Pattern: [text](cmd:command) or (cmd:command)
        const cmdLinkRegex = /\[([^\]]*)\]\(cmd:([^)]+)\)|\(cmd:([^)]+)\)/g;
        let match;

        while ((match = cmdLinkRegex.exec(text)) !== null) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            // Extract the command (either from group 2 or group 3)
            const command = match[2] || match[3];
            
            if (command) {
                // Create a command URI that will execute the terminal command
                // VS Code command URIs need the args as a JSON string in the query
                const args = encodeURIComponent(JSON.stringify(command));
                const uri = vscode.Uri.parse(`command:markdown-cmd-links.executeCommand?${args}`);
                
                const link = new vscode.DocumentLink(range, uri);
                link.tooltip = `Execute: ${command}`;
                links.push(link);
            }
        }

        return links;
    }
}

export function deactivate() {}

