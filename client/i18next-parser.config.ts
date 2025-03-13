module.exports = {
    locales: ['en', 'ru'],
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    defaultNamespace: 'translation',
    useKeysAsDefaultValue: true,
    useKeysAsDefaultValueForDerivedKeys: true,
    useKeysAsDefaultValueForLanguages: ['ru'],
    sort: true,
    lexers: {
        tsx: ['JsxLexer'],
        ts: ['JsxLexer'],
    },
};
