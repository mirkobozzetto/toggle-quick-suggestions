import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Your extension "toggle-quick-suggestions" is now active!');

  let disposable = vscode.commands.registerCommand(
    "toggle-quick-suggestions.toggle",
    async () => {
      const config = vscode.workspace.getConfiguration("editor");
      const quickSuggestions = config.get("quickSuggestions") as any;

      const newQuickSuggestions = {
        ...quickSuggestions,
        other: quickSuggestions.other !== "on" ? "on" : "off",
      };

      await config.update(
        "quickSuggestions",
        newQuickSuggestions,
        vscode.ConfigurationTarget.Global
      );
      vscode.window.showInformationMessage(
        `Quick Suggestions turned ${newQuickSuggestions.other}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
