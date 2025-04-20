# 📌 TODO Report

Total unique TODOs: **228**

## TODO

- `inline.js:34366` — Refactor login logic @alice #auth type=refactor _( priority=high, due=2025-06-01 )_
- `inline.ts:1` — Refatorar este método _( priority=high, due=2025-06-01 )_
- `inline.js:34821` — improve retry logic for API errors _( priority=high )_
- `inline.js:4` — Refactor this module
- `inline.js:2227` — type `options.auth` based on `options.authStrategy`.
- `inline.js:3994` — support preAuth = false where it hooks on 401
- `inline.js:5413` — create separate package.
- `inline.js:6310` — need to fix on node itself
- `inline.js:11005` — Does this need queueMicrotask?
- `inline.js:11183` — Avoid finished. It registers an unnecessary amount of listeners.
- `inline.js:11544` — Implement.
- `inline.js:11558` — Is this the best way to force a lock?
- `inline.js:12616` — the spec is wrong, this is needed to pass WPTs
- `inline.js:13445` — for H2 we need to gracefully flush the remaining enqueued
- `inline.js:13466` — (fix): Should we error here with ClientDestroyedError?
- `inline.js:14719` — Should we call onConnect immediately or on stream ready event?
- `inline.js:14762` — unref only if current streams count is 0
- `inline.js:14889` — Support aborted
- `inline.js:14893` — Support timeout
- `inline.js:14897` — Suppor push
- `inline.js:14901` — Support trailers
- `inline.js:16236` — session re-use does not wait for the first
- `inline.js:16330` — Add support for h2c
- `inline.js:16339` — (fix): Can a session become invalid once established? Don't think so?
- `inline.js:17100` — (fix): This might be a bad idea?
- `inline.js:17132` — adjust to support H2
- `inline.js:17139` — Migrate header parsing here, to make Requests
- `inline.js:19633` — argument idl type check
- `inline.js:19652` — 
- `inline.js:20892` — (fix): Find and fix root cause for leaked listener.
- `inline.js:21111` — given global’s relevant settings object’s cross-origin isolated
- `inline.js:21254` — What if request.client is null?
- `inline.js:21362` — should fetching request be blocked as mixed content?
- `inline.js:21363` — should request be blocked by Content Security Policy?
- `inline.js:22075` — cache
- `inline.js:22218` — https://github.com/whatwg/fetch/issues/1285#issuecomment-896560129
- `inline.js:22233` — credentials
- `inline.js:22239` — proxy-authentication
- `inline.js:22338` — Invoke some kind of callback?
- `inline.js:22365` — (spec): The spec doesn't specify this but we need to cancel
- `inline.js:22782` — (fix): Do we need connection here?
- `inline.js:23310` — could this be simplified with AbortSignal.any
- `inline.js:24014` — base-URL?
- `inline.js:25520` — add comment explaining why this error occurs.
- `inline.js:27602` — (fix): Provide some way for the user to cache the file to e.g. /tmp
- `inline.js:27604` — (fix): Do we need 100-expect support to provide a way to do this properly?
- `inline.js:27619` — (fix): We can't access ReadableStream internal state
- `inline.js:27629` — Should we allow re-using iterable if !this.opts.idempotent
- `inline.js:28314` — should we allow it with HTTP?
- `inline.js:28375` — use RFC
- `inline.js:30392` — enable once permessage-deflate is supported
- `inline.js:31374` — optimize this
- `inline.js:32537` — query stuff
- `inline.js:38648` — handle blob, arraybuffer, other content types, etc.
- `inline.js:39222` — add support for Cloudflare workers, etc.
- `inline.js:41016` — clean this logic up
- `inline.js:41120` — support audio here
- `inline.js:42355` — these types are incompatible
- `inline.js:46192` — Is this where the error should be thrown?
- `inline.js:46579` — make nested formats configurable
- `inline.js:5` — Refactor this logic to improve performance
- `inline.js:40` — Eventually support sourceRoot, which has to be removed because the sources are already
- `inline.js:138` — We should eventually support async loading of sourcemap files.
- `inline.js:111` — Binary search (check overhead)
- `inline.js:138` — un-copy these from resolve-uri; see if they can be exported from that lib
- `inline.js:392` — Remove now that windows path support was added to resolve-uri and thus trace-mapping?
- `inline.js:629` — is there a better way to reliably get an instance of NodeError?
- `inline.js:452` — Use performance.now() once it's mocked
- `inline.js:824` — do we need to define the generics twice?
- `inline.js:129` — type `octokit.auth` based on passed options.authStrategy
- `inline.ts:2` — remove once this package no longer supports TS 5.1, and replace with a
- `inline.ts:2` — these methods are not used within @types/node, and should be removed at the next
- `inline.ts:6` — remove once this package no longer supports TS 5.5, and replace NodeJS.BuiltinIteratorReturn with BuiltinIteratorReturn.
- `inline.ts:97` — Add `EventEmitter` close
- `inline.ts:439` — In next major @types/node version, change default TReturn to undefined.
- `inline.ts:734` — consider removing in a future major version update
- `inline.ts:46` — remove empty ConnectOpts placeholder at next major @types/node version.
- `inline.ts:2227` — change the export to a wrapper function once node@0db38f0 is merged (breaking change)
- `inline.ts:69` — remove in a future major version bump
- `inline.js:2243` — investigate whether there's ever a case where we hit this logic with 1:many sources.
- `inline.js:2423` — could we move the resolving logic for 1:1 source maps to the final
- `inline.js:102` — is an absolute `cwd` supposed to be resolved against `root`?
- `inline.ts:54` — Remove this for the next major release, refactor the whole definition to:
- `inline.js:75` — Remove this for the next major release
- `inline.js:122` — Looks like there is bug in Node fs.createReadStream
- `inline.js:347` — instead of injecting the start/end at this point, just return
- `inline.js:3` — increment this version if there are schema changes
- `inline.js:3` — switch to class private field when targetting node.js 12
- `inline.js:365` — check & read HasteFS instead of reading the filesystem:
- `inline.js:28` — remove re-export in Jest 30
- `inline.js:32` — in Jest 30 remove `SpyInstance` in favour of `Spied`
- `inline.js:487` — build?
- `inline.js:246` — Add appropriate type check
- `inline.js:296` — At some point it would make sense to make use of
- `inline.js:1621` — rework to inline fn with no type cast?
- `inline.js:3002` — Add tag format check.
- `inline.js:131` — is this block necessary?...
- `inline.js:830` — last chunk in the array may not be the last chunk, if it's moved...
- `inline.js:1029` — deprecate this? not really very useful
- `inline.js:1310` — there's a bunch of this sort of thing, needs cleaning up
- `inline.js:54` — use media-typer
- `inline.js:78` — should this even be in this module?
- `inline.js:91` — use content-type or other module
- `inline.js:491` — It would probably be faster to determine this
- `inline.js:65` — handle errors
- `inline.ts:425` — These should be described using static getter/setter pairs:
- `inline.ts:193` — a type could likely be implemented that can infer the return type
- `inline.ts:30` — remove this in the next major version, refactor the whole definition to:
- `inline.js:8` — remove this in the next major version
- `inline.js:33` — test perf of fs/promises realpath vs realpathCB,
- `inline.js:17440` — we are pretending it was not found while it should behave like "undefined"
- `inline.js:6874` — emit errors properly. Example: EMFILE on Macos.
- `inline.js:7508` — real check
- `inline.js:7996` — Strange thing: "should not choke on an ignored watch path" will be failed without 2 ready calls -__-
- `inline.js:8145` — this is not equal to path-normalize module - investigate why
- `inline.js:9114` — throws or warn? Currently just ignore, uses new event
- `inline.js:36` — fallback to string parsing?
- `inline.js:454` — this comes from BootstrapState
- `inline.js:304` — compute baseUrl
- `inline.js:103` — file://./foo sets `hostname` to `'.'`.  Perhaps we should special-case this.
- `inline.js:227` — switch to getCanonicalFileName we already create later in scope
- `inline.js:390` — ordering of this with getScriptVersion?  Should they sync up?
- `inline.js:126` — Figure out how to handle completion here.
- `inline.js:156` — should evalCode API get the same error-handling benefits?
- `inline.js:203` — assert that `service` is set; remove all `service!` non-null assertions
- `inline.js:101` — consider using `ts.loadWithTypeDirectiveCache`
- `inline.js:107` — cache the results of this; slightly faster
- `inline.js:135` — technically breaks if projectOption is path to a file, not a directory,
- `inline.js:20` — Use this set when resolving pkg#exports conditions in loader.js.
- `inline.js:179` — Add the requireStack as well.
- `inline.js:92` — receive cached fs implementations here
- `inline.js:50` — handle errors somehow
- `inline.js:10369` — don't use slice
- `inline.js:14563` — These aren't valid TypeNodes, but we treat them as such because of `isPartOfTypeNode`, which returns `true` for things that aren't `TypeNode`s.
- `inline.js:16003` — Should prefix `++` and `--` be moved to the `Update` precedence?
- `inline.js:27152` — GH#18217
- `inline.js:30562` — JSDoc parameters don't have names (except `this`/`new`), should we manufacture an empty identifier?
- `inline.js:54234` — https://github.com/microsoft/TypeScript/pull/32372#discussion_r328386357
- `inline.js:104221` — Does this need to be parented?
- `inline.js:144642` — What should be the containerName when the container has a computed name?
- `inline.js:156361` — Maybe we should handle this? See fourslash test `refactorConvertToEs6Module_export_object_shorthand.ts`.
- `inline.js:164589` — Handle auto quote preference.
- `inline.js:170969` — GH#23879
- `inline.js:174930` — should have its own kind?
- `inline.js:192900` — correctly type the handlers
- `inline.js:24431` — replace this whole reduce with a concat
- `inline.js:24984` — is this correct?
- `inline.js:26050` — Use `??=` when targeting Node.js 16.
- `inline.js:44065` — Pass actual filename here, which can also be passed to esbuild's
- `inline.js:2214` — Remove in next major version?
- `inline.js:1874` — (special)
- `inline.js:3691` — create home() in prompt types (e.g. TextPrompt)
- `inline.js:3693` — create end() in prompt types (e.g. TextPrompt)

## hack

- `inline.js:1470` — would
- `inline.js:8784` — makes
- `inline.js:9473` — for old IIS and Apache servers
- `inline.js:9970` — y. This is necessary to avoid http-parser leaks.
- `inline.js:36321` — because streams2 _always_ doesn't emit 'end' until nextTick, so let
- `inline.js:194` — to prevent unexpected line breaks in the generated code
- `inline.js:3220` — to not allow integers end with `_`
- `inline.js:3296` — 
- `inline.js:23563` — stolen from "mitt": ">>> 0" does not change numbers >= 0, but -1
- `inline.js:66` — ; remove when we drop node12 support
- `inline.js:74` — y workarounds, but it's not worth the complexity and flakiness.
- `inline.js:17671` — and set the `readable` member to false.
- `inline.js:32581` — is needed because the `__proto__` property is still inherited in
- `inline.js:40240` — to avoid expensive fs checks for React apps.
- `inline.js:41277` — to allow 'as' & 'query' exist at the same time

## bug

- `inline.js:6308` — fix here.
- `inline.js:21153` — ?
- `inline.js:28` — .js.map
- `inline.js:19` — ging will be slightly less informative
- `inline.js:760` — scheduling
- `inline.js:412` — zilla.mozilla.org/show_bug.cgi?id=745678
- `inline.js:6104` — tracker][ghbt] to report issues.
- `inline.js:73` — in Bash, but since the goal of
- `inline.js:134` — ? http://stackoverflow.com/a/398120/376773
- `inline.js:228` — isn't set in LS, and we're in Electron, try to load $DEBUG
- `inline.js:141` — instances
- `inline.js:4087` — ger-statement
- `inline.js:31` — mode. A backtrace uses ~1000 bytes of heap space and
- `inline.js:209` — in V8 v6.X with --harmony enabled.
- `inline.js:324` — ger to easily see which
- `inline.js:137` — / --inspect flags while preserving others (like --harmony).
- `inline.js:369` — in Jest itself.
- `inline.js:104` — ging.
- `inline.js:206` — ging and testing
- `inline.js:32` — s that would otherwise result in us iterating indefinitely
- `inline.js:11222` — ging
- `inline.js:326` — zil.la/1090768.
- `inline.js:331` — zil.la/1188982.
- `inline.js:341` — zil.la/889492.
- `inline.js:773` — zilla.mozilla.org/show_bug.cgi?id=885597.
- `inline.js:539` — on old versions.
- `inline.js:284` — .assert(array.length !== 0);
- `inline.js:1210` — .ts
- `inline.js:1647` — 's new customDescriptionGenerator in launch.json
- `inline.js:24536` — s.chromium.org/p/v8/issues/detail?id=9560)
- `inline.js:188313` — .js
- `inline.js:189` — ger setup because by the time we run, node has already
- `inline.js:18` — mode first before requiring the CLI.
- `inline.js:30` — ging multiple flags with comma-separated list
- `inline.js:19225` — gy property enumeration order in older V8 versions.
- `inline.js:19227` — s.chromium.org/p/v8/issues/detail?id=4118
- `inline.js:19234` — s.chromium.org/p/v8/issues/detail?id=3056
- `inline.js:44211` — via `window` and `location` global
- `inline.ts:4` — that makes <reference types="vite/types/importMeta" />

## Hack

- `inline.js:9975` — y.
- `inline.js:590` — to work around lack of negative lookbehind in JS
- `inline.js:141` — for first rule in CSS
- `inline.js:3` — to avoid Module.runMain on node 18.6.0
- `inline.js:17647` — to have stream not keep the event loop alive.

## FIXME

- `inline.js:15388` — remove workaround when the Node bug is fixed
- `inline.js:17669` — Should probably have an option in net.Socket to create a
- `inline.js:17677` — Hack to have stream not keep the event loop alive.
- `inline.ts:3` — Corrigir possível vazamento de memória
- `inline.py:1` — Handle edge case

## Todo

- `inline.js:35187` — sWithStructuredTagsFromDir.ts
- `inline.js:4` — .ts
- `inline.js:1` — (Babel 8): remove this file as Babel 8 drop support of core-js 2
- `inline.js:1` — (Babel 8): remove this file now that it is included in babel-plugin-polyfill-corejs3
- `inline.ts:1` — sWithStructuredTags.ts

## todo

- `inline.ts:231` — real token type
- `inline.js:395` — is:

## BUG

- `inline.ts:6` — Corrigir lógica de ordenação _( due=2025-01-01 )_
- `inline.js:89` — lDLENBU2xDOzs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLGdCQUFnQixDQUFDRSxNQUFyQyxFQUE2Q0UsQ0FBQyxFQUE5QyxFQUFrRDtBQUNoRCxRQUFJQyxJQUFJLEdBQUdMLGdCQUFnQixDQUFDSSxDQUFELENBQTNCOztBQUVBLFFBQUlBLENBQUMsR0FBRyxDQUFKLElBQVMsQ0FBQyxLQUFLRSxPQUFMLENBQWFDLGNBQTNCLEVBQTJDO0FBQ3pDUixNQUFBQSxRQUFRLENBQUNBLFFBQVEsQ0FBQ0csTUFBVCxHQUFrQixDQUFuQixDQUFSLElBQWlDRyxJQUFqQztBQUNELEtBRkQsTUFFTztBQUNMLFVBQUksS0FBS0MsT0FBTCxDQUFhRSxnQkFBakIsRUFBbUM7QUFDakNILFFBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDSSxJQUFMLEVBQVA7QUFDRDs7QUFDRFYsTUFBQUEsUUFBUSxDQUFDVyxJQUFULENBQWNMLElBQWQ7QUFDRDtBQUNGOztBQUVELFNBQU9OLFFBQVA7QUFDRCxDQXhCRDs7QUEwQk8sU0FBU1ksU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkJDLE1BQTNCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUFFLFNBQU9uQixRQUFRLENBQUNvQixJQUFULENBQWNILE1BQWQsRUFBc0JDLE1BQXRCLEVBQThCQyxRQUE5QixDQUFQO0FBQWlEOztBQUNoRyxTQUFTRSxnQkFBVCxDQUEwQkosTUFBMUIsRUFBa0NDLE1BQWxDLEVBQTBDQyxRQUExQyxFQUFvRDtBQUN6RCxNQUFJUixPQUFPO0FBQUc7QUFBQTtBQUFBOztBQUFBVztBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBQTtBQUFBO0FBQUEsR0FBZ0JILFFBQWhCLEVBQTBCO0FBQUNOLElBQUFBLGdCQUFnQixFQUFFO0FBQW5CLEdBQTFCLENBQWQ7QUFDQSxTQUFPYixRQUFRLENBQUNvQixJQUFULENBQWNILE1BQWQsRUFBc0JDLE1BQXRCLEVBQThCUCxPQUE5QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlmZiBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHtnZW5lcmF0ZU9wdGlvbnN9IGZyb20gJy4uL3V0aWwvcGFyYW1zJztcblxuZXhwb3J0IGNvbnN0IGxpbmVEaWZmID0gbmV3IERpZmYoKTtcbmxpbmVEaWZmLnRva2VuaXplID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgbGV0IHJldExpbmVzID0gW10sXG4gICAgICBsaW5lc0FuZE5ld2xpbmVzID0gdmFsdWUuc3BsaXQoLyhcXG58XFxyXFxuKS8pO1xuXG4gIC8vIElnbm9yZSB0aGUgZmluYWwgZW1wdHkgdG9rZW4gdGhhdCBvY2N1cnMgaWYgdGhlIHN0cmluZyBlbmRzIHdpdGggYSBuZXcgbGluZVxuICBpZiAoIWxpbmVzQW5kTmV3bGluZXNbbGluZXNBbmROZXdsaW5lcy5sZW5ndGggLSAxXSkge1xuICAgIGxpbmVzQW5kTmV3bGluZXMucG9wKCk7XG4gIH1cblxuICAvLyBNZXJnZSB0aGUgY29udGVudCBhbmQgbGluZSBzZXBhcmF0b3JzIGludG8gc2luZ2xlIHRva2Vuc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzQW5kTmV3bGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgbGluZSA9IGxpbmVzQW5kTmV3bGluZXNbaV07XG5cbiAgICBpZiAoaSAlIDIgJiYgIXRoaXMub3B0aW9ucy5uZXdsaW5lSXNUb2tlbikge1xuICAgICAgcmV0TGluZXNbcmV0TGluZXMubGVuZ3RoIC0gMV0gKz0gbGluZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5pZ25vcmVXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGxpbmUgPSBsaW5lLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldExpbmVzLnB1c2gobGluZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldExpbmVzO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZMaW5lcyhvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spIHsgcmV0dXJuIGxpbmVEaWZmLmRpZmYob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKTsgfVxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZUcmltbWVkTGluZXMob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7XG4gIGxldCBvcHRpb25zID0gZ2VuZXJhdGVPcHRpb25zKGNhbGxiYWNrLCB7aWdub3JlV2hpdGVzcGFjZTogdHJ1ZX0pO1xuICByZXR1cm4gbGluZURpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG59XG4iXX0=

## HACK

- `inline.js:59` — technically, this function is not marked @internal so it's possible
- `inline.js:462` — workaround node regression

