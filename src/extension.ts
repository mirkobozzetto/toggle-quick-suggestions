import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "toggle-quick-suggestions.toggle",
    async () => {
      const editorConfig = vscode.workspace.getConfiguration("editor");
      const quickSuggestions = editorConfig.get("quickSuggestions") as {
        other: string;
        comments: string;
        strings: string;
      };
      const suggestOnTriggerCharacters = editorConfig.get(
        "suggestOnTriggerCharacters"
      ) as boolean;

      const newQuickSuggestionsState =
        quickSuggestions.other === "on" ? "off" : "on";

      const newSuggestOnTriggerCharactersState = !suggestOnTriggerCharacters;

      await editorConfig.update(
        "quickSuggestions",
        {
          other: newQuickSuggestionsState,
          comments: newQuickSuggestionsState,
          strings: newQuickSuggestionsState,
        },
        vscode.ConfigurationTarget.Global
      );

      await editorConfig.update(
        "suggestOnTriggerCharacters",
        newSuggestOnTriggerCharactersState,
        vscode.ConfigurationTarget.Global
      );

      vscode.window.showInformationMessage(
        `Quick Suggestions turned ${newQuickSuggestionsState} and Suggest on Trigger Characters turned ${
          newSuggestOnTriggerCharactersState ? "on" : "off"
        }`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

//  & old and incomplete version (simple backup)...
// import * as vscode from "vscode";

// export function activate(context: vscode.ExtensionContext) {
//   let disposable = vscode.commands.registerCommand(
//     "toggle-quick-suggestions.toggle",
//     async () => {
//       const config = vscode.workspace.getConfiguration("editor");
//       const quickSuggestions = config.get("quickSuggestions") as {
//         other: string;
//         comments: string;
//         strings: string;
//       };

//       quickSuggestions.other = quickSuggestions.other === "on" ? "off" : "on";

//       await config.update(
//         "quickSuggestions",
//         quickSuggestions,
//         vscode.ConfigurationTarget.Global
//       );
//       vscode.window.showInformationMessage(
//         `Quick Suggestions for 'other' turned ${quickSuggestions.other}`
//       );
//     }
//   );

//   context.subscriptions.push(disposable);
// }

// export function deactivate() {}
