# 📌 TODO Report

Total unique TODOs: **200**

## TODO

- `/home/runner/work/smart-todo-action/smart-todo-action/tests/example.ts:1` — Refatorar este método _( priority=high, due=2025-06-01 )_
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:34814` — improve retry logic for API errors _( priority=high )_
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/core/__tests__/fixtures/one-file.js:4` — Refactor this module
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:2227` — type `options.auth` based on `options.authStrategy`.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:3994` — support preAuth = false where it hooks on 401
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:5413` — create separate package.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:6310` — need to fix on node itself
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:11005` — Does this need queueMicrotask?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:11183` — Avoid finished. It registers an unnecessary amount of listeners.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:11544` — Implement.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:11558` — Is this the best way to force a lock?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:12616` — the spec is wrong, this is needed to pass WPTs
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:13445` — for H2 we need to gracefully flush the remaining enqueued
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:13466` — (fix): Should we error here with ClientDestroyedError?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:14719` — Should we call onConnect immediately or on stream ready event?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:14762` — unref only if current streams count is 0
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:14889` — Support aborted
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:14893` — Support timeout
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:14897` — Suppor push
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:14901` — Support trailers
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:16236` — session re-use does not wait for the first
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:16330` — Add support for h2c
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:16339` — (fix): Can a session become invalid once established? Don't think so?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:17100` — (fix): This might be a bad idea?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:17132` — adjust to support H2
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:17139` — Migrate header parsing here, to make Requests
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:19633` — argument idl type check
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:19652` — 
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:20892` — (fix): Find and fix root cause for leaked listener.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:21111` — given global’s relevant settings object’s cross-origin isolated
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:21254` — What if request.client is null?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:21362` — should fetching request be blocked as mixed content?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:21363` — should request be blocked by Content Security Policy?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:22075` — cache
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:22218` — https://github.com/whatwg/fetch/issues/1285#issuecomment-896560129
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:22233` — credentials
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:22239` — proxy-authentication
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:22338` — Invoke some kind of callback?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:22365` — (spec): The spec doesn't specify this but we need to cancel
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:22782` — (fix): Do we need connection here?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:23310` — could this be simplified with AbortSignal.any
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:24014` — base-URL?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:25520` — add comment explaining why this error occurs.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:27602` — (fix): Provide some way for the user to cache the file to e.g. /tmp
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:27604` — (fix): Do we need 100-expect support to provide a way to do this properly?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:27619` — (fix): We can't access ReadableStream internal state
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:27629` — Should we allow re-using iterable if !this.opts.idempotent
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:28314` — should we allow it with HTTP?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:28375` — use RFC
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:30392` — enable once permessage-deflate is supported
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:31374` — optimize this
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:32537` — query stuff
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:38463` — handle blob, arraybuffer, other content types, etc.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:39037` — add support for Cloudflare workers, etc.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:40831` — clean this logic up
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:40935` — support audio here
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:42170` — these types are incompatible
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:46007` — Is this where the error should be thrown?
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:46394` — make nested formats configurable
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/testTodo.js:5` — Refactor this logic to improve performance
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@ampproject/remapping/dist/remapping.umd.js:40` — Eventually support sourceRoot, which has to be removed because the sources are already
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@ampproject/remapping/dist/remapping.umd.js:138` — We should eventually support async loading of sourcemap files.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@bcoe/v8-coverage/src/lib/range-tree.js:111` — Binary search (check overhead)
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@cspotcode/source-map-support/source-map-support.js:138` — un-copy these from resolve-uri; see if they can be exported from that lib
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@cspotcode/source-map-support/source-map-support.js:392` — Remove now that windows path support was added to resolve-uri and thus trace-mapping?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@cspotcode/source-map-support/source-map-support.js:629` — is there a better way to reliably get an instance of NodeError?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@octokit/core/dist-src/index.js:129` — type `octokit.auth` based on passed options.authStrategy
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/compatibility/disposable.d.ts:2` — remove once this package no longer supports TS 5.1, and replace with a
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/compatibility/indexable.d.ts:2` — these methods are not used within @types/node, and should be removed at the next
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/compatibility/iterators.d.ts:6` — remove once this package no longer supports TS 5.5, and replace NodeJS.BuiltinIteratorReturn with BuiltinIteratorReturn.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/fs/promises.d.ts:97` — Add `EventEmitter` close
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/globals.d.ts:439` — In next major @types/node version, change default TReturn to undefined.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/module.d.ts:734` — consider removing in a future major version update
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/net.d.ts:46` — remove empty ConnectOpts placeholder at next major @types/node version.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/test.d.ts:2227` — change the export to a wrapper function once node@0db38f0 is merged (breaking change)
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@types/node/timers.d.ts:69` — remove in a future major version bump
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@vitest/coverage-v8/dist/provider.js:2243` — investigate whether there's ever a case where we hit this logic with 1:many sources.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@vitest/coverage-v8/dist/provider.js:2423` — could we move the resolving logic for 1:1 source maps to the final
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/form-data/lib/form_data.js:122` — Looks like there is bug in Node fs.createReadStream
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/istanbul-lib-report/lib/report-base.js:3` — switch to class private field when targetting node.js 12
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/magic-string/dist/magic-string.cjs.js:131` — is this block necessary?...
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/magic-string/dist/magic-string.cjs.js:830` — last chunk in the array may not be the last chunk, if it's moved...
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/magic-string/dist/magic-string.cjs.js:1029` — deprecate this? not really very useful
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/magic-string/dist/magic-string.cjs.js:1310` — there's a bunch of this sort of thing, needs cleaning up
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/mime-types/index.js:54` — use media-typer
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/mime-types/index.js:78` — should this even be in this module?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/mime-types/index.js:91` — use content-type or other module
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/minimatch/dist/commonjs/ast.js:347` — instead of injecting the start/end at this point, just return
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/openai/lib/EventEmitter.js:65` — handle errors
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/openai/node_modules/@types/node/events.d.ts:425` — These should be described using static getter/setter pairs:
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/openai/node_modules/undici-types/webidl.d.ts:193` — a type could likely be implemented that can infer the return type
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/path-key/index.d.ts:34` — Remove this for the next major release, refactor the whole definition to:
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/path-key/index.js:15` — Remove this for the next major release
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/path-scurry/dist/commonjs/index.js:33` — test perf of fs/promises realpath vs realpathCB,
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/node-entry.js:17440` — we are pretending it was not found while it should behave like "undefined"
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/watch.js:6874` — emit errors properly. Example: EMFILE on Macos.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/watch.js:7508` — real check
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/watch.js:7996` — Strange thing: "should not choke on an ignored watch path" will be failed without 2 ready calls -__-
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/watch.js:8145` — this is not equal to path-normalize module - investigate why
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/watch.js:9114` — throws or warn? Currently just ignore, uses new event
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/semver/classes/range.js:487` — build?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/stackback/index.js:36` — fallback to string parsing?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/string-width-cjs/index.d.ts:23` — remove this in the next major version, refactor the whole definition to:
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/string-width-cjs/index.js:46` — remove this in the next major version
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/bin.js:454` — this comes from BootstrapState
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/configuration.js:304` — compute baseUrl
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/esm.js:103` — file://./foo sets `hostname` to `'.'`.  Perhaps we should special-case this.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/index.js:227` — switch to getCanonicalFileName we already create later in scope
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/index.js:390` — ordering of this with getScriptVersion?  Should they sync up?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/repl.js:126` — Figure out how to handle completion here.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/repl.js:156` — should evalCode API get the same error-handling benefits?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/repl.js:203` — assert that `service` is set; remove all `service!` non-null assertions
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/resolver-functions.js:101` — consider using `ts.loadWithTypeDirectiveCache`
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/transpilers/swc.js:107` — cache the results of this; slightly faster
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/util.js:135` — technically breaks if projectOption is path to a file, not a directory,
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/node-internal-modules-cjs-helpers.js:20` — Use this set when resolving pkg#exports conditions in loader.js.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/node-internal-modules-cjs-loader.js:179` — Add the requireStack as well.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:92` — receive cached fs implementations here
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/node-options.js:50` — handle errors somehow
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:10369` — don't use slice
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:14563` — These aren't valid TypeNodes, but we treat them as such because of `isPartOfTypeNode`, which returns `true` for things that aren't `TypeNode`s.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:16003` — Should prefix `++` and `--` be moved to the `Update` precedence?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:27152` — GH#18217
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:30562` — JSDoc parameters don't have names (except `this`/`new`), should we manufacture an empty identifier?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:54234` — https://github.com/microsoft/TypeScript/pull/32372#discussion_r328386357
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:104221` — Does this need to be parented?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/typescript.js:144642` — What should be the containerName when the container has a computed name?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/typescript.js:156361` — Maybe we should handle this? See fourslash test `refactorConvertToEs6Module_export_object_shorthand.ts`.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/typescript.js:164589` — Handle auto quote preference.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/typescript.js:170969` — GH#23879
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/typescript.js:174930` — should have its own kind?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/typescript.js:192900` — correctly type the handlers
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:24431` — replace this whole reduce with a concat
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:24984` — is this correct?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:26050` — Use `??=` when targeting Node.js 16.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:44065` — Pass actual filename here, which can also be passed to esbuild's
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vitest/dist/chunks/coverage.SfnlalVs.js:2214` — Remove in next major version?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vitest/dist/chunks/index.DBIGubLC.js:1874` — (special)
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vitest/dist/chunks/index.DBIGubLC.js:3691` — create home() in prompt types (e.g. TextPrompt)
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vitest/dist/chunks/index.DBIGubLC.js:3693` — create end() in prompt types (e.g. TextPrompt)

## hack

- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:1470` — would
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:8784` — makes
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:9473` — for old IIS and Apache servers
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:9970` — y. This is necessary to avoid http-parser leaks.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:36136` — because streams2 _always_ doesn't emit 'end' until nextTick, so let
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/node-entry.js:23563` — stolen from "mitt": ">>> 0" does not change numbers >= 0, but -1
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/node-internal-modules-cjs-helpers.js:66` — ; remove when we drop node12 support
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/node-internal-modules-cjs-loader.js:74` — y workarounds, but it's not worth the complexity and flakiness.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/node-internal-modules-cjs-loader.js:475` — 
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:17671` — and set the `readable` member to false.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:32581` — is needed because the `__proto__` property is still inherited in
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:40240` — to avoid expensive fs checks for React apps.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:41277` — to allow 'as' & 'query' exist at the same time

## bug

- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:6308` — fix here.
- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:21153` — ?
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@vitest/pretty-format/dist/index.js:760` — scheduling
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/acorn/dist/acorn.js:412` — zilla.mozilla.org/show_bug.cgi?id=745678
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/acorn/dist/acorn.js:6104` — tracker][ghbt] to report issues.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/brace-expansion/index.js:72` — in Bash, but since the goal of
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/debug/src/browser.js:134` — ? http://stackoverflow.com/a/398120/376773
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/debug/src/browser.js:228` — isn't set in LS, and we're in Electron, try to load $DEBUG
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/debug/src/common.js:141` — instances
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/minipass/dist/commonjs/index.js:206` — ging and testing
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/openai/_vendor/zod-to-json-schema/zodToJsonSchema.js:32` — s that would otherwise result in us iterating indefinitely
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/rollup/dist/es/shared/node-entry.js:11222` — ging
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/source-map-js/lib/source-map-consumer.js:326` — zil.la/1090768.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/source-map-js/lib/source-map-consumer.js:331` — zil.la/1188982.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/source-map-js/lib/source-map-consumer.js:341` — zil.la/889492.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/source-map-js/lib/source-map-consumer.js:773` — zilla.mozilla.org/show_bug.cgi?id=885597.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/bin.js:539` — on old versions.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/ts-internals.js:284` — .assert(array.length !== 0);
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:1210` — .ts
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:1647` — 's new customDescriptionGenerator in launch.json
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/_tsc.js:24536` — s.chromium.org/p/v8/issues/detail?id=9560)
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/typescript/lib/typescript.js:188313` — .js
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/v8-compile-cache-lib/v8-compile-cache.js:189` — ger setup because by the time we run, node has already
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/bin/vite.js:18` — mode first before requiring the CLI.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/bin/vite.js:30` — ging multiple flags with comma-separated list
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:19225` — gy property enumeration order in older V8 versions.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:19227` — s.chromium.org/p/v8/issues/detail?id=4118
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:19234` — s.chromium.org/p/v8/issues/detail?id=3056
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:44211` — via `window` and `location` global
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/types/import-meta.d.ts:4` — that makes <reference types="vite/types/importMeta" />
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vitest/dist/chunks/vi.B-PuvDzu.js:843` — ging will be slightly less informative

## Hack

- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:9975` — y.
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/postcss/lib/stringifier.js:141` — for first rule in CSS
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist-raw/runmain-hack.js:3` — to avoid Module.runMain on node 18.6.0
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:17647` — to have stream not keep the event loop alive.

## FIXME

- `/home/runner/work/smart-todo-action/smart-todo-action/dist/index.js:15388` — remove workaround when the Node bug is fixed
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:17669` — Should probably have an option in net.Socket to create a
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/vite/dist/node/chunks/dep-BuM4AdeL.js:17677` — Hack to have stream not keep the event loop alive.
- `/home/runner/work/smart-todo-action/smart-todo-action/tests/example.ts:3` — Corrigir possível vazamento de memória
- `/home/runner/work/smart-todo-action/smart-todo-action/tests/fixtures/nested/inner.py:1` — Handle edge case

## Todo

- `/home/runner/work/smart-todo-action/smart-todo-action/dist/testTodo.js:4` — .ts

## todo

- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/@babel/parser/typings/babel-parser.d.ts:231` — real token type
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/minimatch/dist/commonjs/ast.js:395` — is:

## BUG

- `/home/runner/work/smart-todo-action/smart-todo-action/tests/example.ts:6` — Corrigir lógica de ordenação _( due=2025-01-01 )_
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/diff/lib/diff/line.js:89` — lDLENBU2xDOzs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLGdCQUFnQixDQUFDRSxNQUFyQyxFQUE2Q0UsQ0FBQyxFQUE5QyxFQUFrRDtBQUNoRCxRQUFJQyxJQUFJLEdBQUdMLGdCQUFnQixDQUFDSSxDQUFELENBQTNCOztBQUVBLFFBQUlBLENBQUMsR0FBRyxDQUFKLElBQVMsQ0FBQyxLQUFLRSxPQUFMLENBQWFDLGNBQTNCLEVBQTJDO0FBQ3pDUixNQUFBQSxRQUFRLENBQUNBLFFBQVEsQ0FBQ0csTUFBVCxHQUFrQixDQUFuQixDQUFSLElBQWlDRyxJQUFqQztBQUNELEtBRkQsTUFFTztBQUNMLFVBQUksS0FBS0MsT0FBTCxDQUFhRSxnQkFBakIsRUFBbUM7QUFDakNILFFBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDSSxJQUFMLEVBQVA7QUFDRDs7QUFDRFYsTUFBQUEsUUFBUSxDQUFDVyxJQUFULENBQWNMLElBQWQ7QUFDRDtBQUNGOztBQUVELFNBQU9OLFFBQVA7QUFDRCxDQXhCRDs7QUEwQk8sU0FBU1ksU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkJDLE1BQTNCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUFFLFNBQU9uQixRQUFRLENBQUNvQixJQUFULENBQWNILE1BQWQsRUFBc0JDLE1BQXRCLEVBQThCQyxRQUE5QixDQUFQO0FBQWlEOztBQUNoRyxTQUFTRSxnQkFBVCxDQUEwQkosTUFBMUIsRUFBa0NDLE1BQWxDLEVBQTBDQyxRQUExQyxFQUFvRDtBQUN6RCxNQUFJUixPQUFPO0FBQUc7QUFBQTtBQUFBOztBQUFBVztBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBO0FBQUEsR0FBZ0JILFFBQWhCLEVBQTBCO0FBQUNOLElBQUFBLGdCQUFnQixFQUFFO0FBQW5CLEdBQTFCLENBQWQ7QUFDQSxTQUFPYixRQUFRLENBQUNvQixJQUFULENBQWNILE1BQWQsRUFBc0JDLE1BQXRCLEVBQThCUCxPQUE5QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlmZiBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHtnZW5lcmF0ZU9wdGlvbnN9IGZyb20gJy4uL3V0aWwvcGFyYW1zJztcblxuZXhwb3J0IGNvbnN0IGxpbmVEaWZmID0gbmV3IERpZmYoKTtcbmxpbmVEaWZmLnRva2VuaXplID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgbGV0IHJldExpbmVzID0gW10sXG4gICAgICBsaW5lc0FuZE5ld2xpbmVzID0gdmFsdWUuc3BsaXQoLyhcXG58XFxyXFxuKS8pO1xuXG4gIC8vIElnbm9yZSB0aGUgZmluYWwgZW1wdHkgdG9rZW4gdGhhdCBvY2N1cnMgaWYgdGhlIHN0cmluZyBlbmRzIHdpdGggYSBuZXcgbGluZVxuICBpZiAoIWxpbmVzQW5kTmV3bGluZXNbbGluZXNBbmROZXdsaW5lcy5sZW5ndGggLSAxXSkge1xuICAgIGxpbmVzQW5kTmV3bGluZXMucG9wKCk7XG4gIH1cblxuICAvLyBNZXJnZSB0aGUgY29udGVudCBhbmQgbGluZSBzZXBhcmF0b3JzIGludG8gc2luZ2xlIHRva2Vuc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzQW5kTmV3bGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgbGluZSA9IGxpbmVzQW5kTmV3bGluZXNbaV07XG5cbiAgICBpZiAoaSAlIDIgJiYgIXRoaXMub3B0aW9ucy5uZXdsaW5lSXNUb2tlbikge1xuICAgICAgcmV0TGluZXNbcmV0TGluZXMubGVuZ3RoIC0gMV0gKz0gbGluZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5pZ25vcmVXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGxpbmUgPSBsaW5lLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldExpbmVzLnB1c2gobGluZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldExpbmVzO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZMaW5lcyhvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spIHsgcmV0dXJuIGxpbmVEaWZmLmRpZmYob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKTsgfVxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZUcmltbWVkTGluZXMob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7XG4gIGxldCBvcHRpb25zID0gZ2VuZXJhdGVPcHRpb25zKGNhbGxiYWNrLCB7aWdub3JlV2hpdGVzcGFjZTogdHJ1ZX0pO1xuICByZXR1cm4gbGluZURpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG59XG4iXX0=

## HACK

- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/bin.js:59` — technically, this function is not marked @internal so it's possible
- `/home/runner/work/smart-todo-action/smart-todo-action/node_modules/ts-node/dist/bin.js:462` — workaround node regression

