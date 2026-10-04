# IDEA-001: OAuth clients as tracked inventory and graph-edge context

**Status:** Captured  
**Model/release:** Undecided  
**Date:** 2026-10-04  
**Source:** Owner idea in the product-planning conversation

## Owner intent

Track OAuth clients within the personal system graph. A client may be used on an
edge connecting a system/application to another service, so the edge should be
able to identify which OAuth client is involved.

## Why this matters

A dependency line alone does not explain the registration through which an
application accesses a service. The owner should be able to locate a client,
understand what uses it, and follow a relationship to its authentication context.
This is architectural inventory, not a request to implement an OAuth provider.

## Illustrative interaction

```text
Automation System -- uses_api --> Example API
                         |
                         +-- OAuth client reference: example-client-dev
```

`uses_api` and the fields below are examples, not an accepted relationship/schema.
The inspector for the edge could show the linked client's label, provider, owning
system, environment, and registration-management link. Reusing a client across
edges should refer to the same client record rather than duplicating metadata.
Search could locate the client and show relationships that reference it.

## Candidate inventory metadata

| Field | Purpose / authority |
| --- | --- |
| Stable internal record ID and display name | User-maintained identity and navigation |
| Provider / authorization server | Context for the registration |
| Provider-scoped client identifier | Registration identity when available; do not merge on a raw client ID alone |
| Owning system/application and environment | User architecture context; e.g. development versus production |
| Client type and registered redirect URIs, when known | Registration metadata; manually recorded or observed with provenance |
| Management/documentation link | Navigate to the relevant registration |
| Lifecycle and notes | User-maintained intent/status, including planned clients |
| Credential-storage reference, if desired | Optional link to an inventory resource, not a credential value |

Requested/configured scopes or actual observed grants need a separate distinction
and may belong on the specific connection, not universally on the client record.
A registered client, a user's authorization grant, and a token are not the same
inventory concept. Unknown provider facts remain unknown.

The proposed inventory stores metadata/references, not client secrets, access or
refresh tokens, passwords, or vault contents. This is a modeling boundary for
this idea; credential management is a separate capability if ever requested.

## Representation options to decide

1. Reusable client inventory record referenced by relationship metadata, with an
   edge badge/inspector presentation and a searchable registry.
2. First-class graph entity when a client needs its own identity, relationships,
   navigation, and lifecycle; edges can still reference/present that entity.
3. Simple inline edge annotations only for an initial prototype, accepting limited
   reuse/navigation; avoid silently adopting this as the final schema.

The owner's phrase about clients on edges is captured as authentication context
for relationships. Whether that also needs a standalone node remains open.
Apply ADR-001's identity/lifecycle test before adding a new entity kind.

## Candidate acceptance checks

- Record an OAuth client manually even if no scanner can discover it.
- Reference it from a relationship and inspect the context from that edge.
- Where reuse is supported, two edges reference one identity and show which
  systems/services use it; editing the label updates both presentations.
- Keep manually recorded ownership and notes through provider refreshes.
- Treat missing observation as unknown/stale rather than deleting the client.
- Store inventory metadata and optional references without credential values.

## Open questions and scope

Choose edge annotation versus reusable record versus graph entity; define provider/
tenant identity rules; decide manual-only versus later discovery; decide which
clients/accounts/providers to cover and what metadata is useful. No V0 release
assignment or migration is accepted yet. This idea does not commit to the deferred
OpenConnector/Google topology integration or an OAuth security-policy engine.

Related: REQ-007, 008, 011, 013, 014, 015; ADR-001; IDEA-002.

## Source grounding

[OAuth 2.0 client registration and identifiers](https://www.rfc-editor.org/rfc/rfc6749.html#section-2)
provide terminology: registration/client identity is distinct from tokens, and
client identifiers are scoped to an authorization server. The graph inventory
and representation options above are product proposals, not requirements of OAuth.
