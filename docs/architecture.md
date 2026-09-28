# Architecture

```text
App / integration service
  -> Shopify Admin GraphQL API
  -> pagination + throttling layer
  -> domain mapper
  -> inventory / product / order workflow
  -> logging + retry policy
```

Production integrations should isolate API transport, domain mapping, and retry/idempotency behavior.
