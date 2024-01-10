import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "toggle-quick-suggestions.toggle",
    async () => {
      const config = vscode.workspace.getConfiguration("editor");
      const quickSuggestions = config.get("quickSuggestions") as {
        other: string;
        comments: string;
        strings: string;
      };

      quickSuggestions.other = quickSuggestions.other === "on" ? "off" : "on";

      await config.update(
        "quickSuggestions",
        quickSuggestions,
        vscode.ConfigurationTarget.Global
      );
      vscode.window.showInformationMessage(
        `Quick Suggestions for 'other' turned ${quickSuggestions.other}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
