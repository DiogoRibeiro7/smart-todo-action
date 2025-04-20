"use strict";
// src/utils/isTextFile.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAG_ALIASES = void 0;
exports.isTextFile = isTextFile;
exports.normalizeTag = normalizeTag;
/**
 * Checks whether a filename likely corresponds to a text-based source file.
 * Useful for filtering files before parsing for TODOs.
 */
function isTextFile(filename) {
    return /\.(ts|js|jsx|tsx|py|rb|sh|go|java|html|css|json|md|txt|xml|yaml|yml)$/i.test(filename);
}
/**
 * List of known multilingual aliases for TODO-related tags.
 */
exports.TAG_ALIASES = {
    TODO: ['TODO', 'A FAZER', 'À FAIRE', 'ZU TUN'],
    FIXME: ['FIXME', 'A CORRIGIR', 'À CORRIGER', 'ZU BEHEBEN'],
    BUG: ['BUG', 'ERRO', 'ERREUR', 'FEHLER'],
    HACK: ['HACK'],
};
/**
 * Normalizes a raw tag (e.g. 'À FAIRE') into a canonical tag (e.g. 'TODO')
 */
function normalizeTag(raw) {
    const upper = raw.toUpperCase();
    for (const [canonical, aliases] of Object.entries(exports.TAG_ALIASES)) {
        if (aliases.includes(upper))
            return canonical;
    }
    return undefined;
}
