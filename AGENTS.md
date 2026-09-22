# Agent directions

## Use existing helpers and types

Before adding a helper, type, or list of values, look for one that already exists and reuse it.

Check `client/src/helpers`, `client/src/types`, and feature helpers such as `client/src/features/facilities`. If a type is derived from a const array, use that array instead of writing the values out again.

```ts
// Prefer the existing list and its derived type
options={toSelectOptions(FACILITY_UNIT_STATUSES)}

// Avoid copying the same statuses into a new array or union
const STATUSES = ['committed', 'operating', 'commissioning', 'retired']
```
