============================================================
                AI VS CODE EXTENSION – CODEMATE
============================================================

This is a Visual Studio Code extension that integrates a React-based web chat interface powered by AI. 
The extension includes contextual awareness from the current code workspace and allows users to interact 
with the assistant via a friendly webview panel.

------------------------------------------------------------
                    FEATURES
------------------------------------------------------------

• AI CHAT ASSISTANT
  Integrated chat interface for AI-based help.

• FILE & IMAGE MENTIONS
  Supports @filename syntax to attach code, text, or images from the current project.

• REACT FRONTEND
  Fully built in React with WebView integration.

• CODEMATE-AI FOLDER
  Subfolder that contains reusable AI logic and assets.

• CONTEXT-AWARE CODE HELP
  The assistant can access open files or project context.


------------------------------------------------------------
                    PROJECT STRUCTURE
------------------------------------------------------------

Vs_code_extension/
├── src/
│   ├── extension.ts              → VS Code extension entry point
│   └── components/
│       ├── ChatInterface.tsx     → React chat UI component
│       └── chatApi.ts            → Frontend API logic
├── codemate-ai/                  → Shared AI scripts, prompts, and handlers
├── test-deepseek.mjs             → Optional test script
├── package.json                  → Extension and web dependencies
├── tsconfig.json                 → TypeScript config
├── README.txt                    → This file (optional)

------------------------------------------------------------
                  GETTING STARTED
------------------------------------------------------------

1. CLONE THE REPO

   git clone https://github.com/baswalara/AI_vs_code_extension.git
   cd AI_vs_code_extension

2. INSTALL DEPENDENCIES

   npm install

3. RUN THE EXTENSION

   npm run watch

   Then press F5 in VS Code to launch the Extension Development Host 
   with the integrated webview.


------------------------------------------------------------
                HOW IT WORKS (OVERVIEW)
------------------------------------------------------------

• Webview opens a panel in VS Code to load the React chat interface.
• ChatInterface.tsx handles user input and renders AI responses.
• codemate-ai folder contains AI-specific logic, prompts, or custom handlers.
• chatApi.ts manages communication with the AI backend (e.g., OpenAI, DeepSeek).


------------------------------------------------------------
              FUTURE IMPROVEMENTS
------------------------------------------------------------

• Add syntax-aware AI suggestions
• Support per-file chat memory and context
• Code explanation or generation from selected text
• API key configuration panel
• Connect to local or cloud-based LLMs


------------------------------------------------------------
                    LICENSE
------------------------------------------------------------

MIT License – You are free to use, modify, and improve this project.


------------------------------------------------------------
                    CREDITS
------------------------------------------------------------

Developed by Aradhya Baswal  
GitHub: https://github.com/baswalara  
Built with ❤️ using React, TypeScript, and VS Code API.
