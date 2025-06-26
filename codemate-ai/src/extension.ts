import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('✅ CodeMate AI extension activated');

  let disposable = vscode.commands.registerCommand('codemate-ai.startChat', () => {
    vscode.window.showInformationMessage('🧠 Opening CodeMate AI...');

    const panel = vscode.window.createWebviewPanel(
      'chatbotView',
      'CodeMate AI',
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.html = getWebviewContent();
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent() {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; height:100vh;">
      <iframe src="http://localhost:5173" width="100%" height="100%" style="border:none;"></iframe>
    </body>
    </html>
  `;
}

export function deactivate() {}
