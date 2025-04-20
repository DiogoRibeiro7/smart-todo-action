"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIssueTitleAndBodyLLM = generateIssueTitleAndBodyLLM;
const openai_1 = __importDefault(require("openai"));
const core = __importStar(require("@actions/core"));
const openai = new openai_1.default({
    apiKey: core.getInput('openai-api-key'), // correto agora
});
const model = core.getInput('openai-model') || 'gpt-3.5-turbo';
async function generateIssueTitleAndBodyLLM(todo) {
    const prompt = `
You are a helpful assistant converting inline TODO comments from source code into GitHub Issues.

The TODO is:
- Tag: ${todo.tag}
- Text: ${todo.text}
- File: ${todo.file}
- Line: ${todo.line}
- Metadata: ${JSON.stringify(todo.metadata)}

Generate a concise and descriptive GitHub issue title, followed by a detailed body with context.

Format:
TITLE: <title>
BODY:
<detailed body>
`;
    // 👇 Adiciona aqui
    console.log('[DEBUG] OpenAI key starts with:', process.env.OPENAI_API_KEY?.slice(0, 5));
    console.log('[DEBUG] Using model:', model);
    console.log('[DEBUG] Sending prompt to OpenAI...');
    try {
        const response = await openai.chat.completions.create({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.4,
        });
        // TODO(priority=high): improve retry logic for API errors
        const result = response.choices[0].message?.content || '';
        const match = result.match(/TITLE:\s*(.+?)\s*BODY:\s*([\s\S]*)/i);
        if (!match) {
            throw new Error('Failed to parse LLM response.');
        }
        const [, title, body] = match;
        return { title: title.trim(), body: body.trim() };
    }
    catch (err) {
        console.error('[ERROR] OpenAI call failed:', err);
        throw err;
    }
}
