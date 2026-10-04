# IDEA-002: KeePass as a standalone data-layer resource

**Status:** Captured  
**Model/release:** Undecided  
**Date:** 2026-10-04  
**Source:** Owner idea in the product-planning conversation

## Owner intent

KeePass is an important part of the personal system. It can be represented in the
data layer as one node without dependencies. A resource does not need edges to
be worth remembering, classifying, searching, or inspecting.

## Illustrative graph behavior

```text
Node: Personal KeePass vault
Classification: data layer / credential vault
Known dependency relationships: none
```

The label and classifications are examples, not a statement about an existing
vault. Keep the node visible in the appropriate overview and searchable even
with zero edges. Its inspector can explain its purpose, ownership, lifecycle,
and useful navigation/reference information. Adding dependencies later is optional.

Do not invent links to every application merely because KeePass holds credentials.
No known dependency is not the same as proving that a resource has no connections.
An intentionally standalone/manual resource is valid, not an orphan to remove or
an automatically unhealthy component.

## Candidate metadata

Display name; resource role; data-layer classification; owner; purpose/notes;
lifecycle/criticality; optional machine/location reference or documentation link;
authority and updated time. A manually recorded resource need not have provider
observation freshness, repository identity, or runtime mapping.

Metadata describes the resource. The graph does not need passwords, master keys,
key files, vault entries, or decrypted database contents to represent this node.

## Identity and representation still to decide

Clarify whether the node represents the KeePass application, a particular vault/
database, or a logical credential-management system. The owner supplied the
KeePass concept; the data-layer/vault example is a proposed interpretation.
Avoid creating several entities before that distinction is useful.

A minimal initial representation can be an existing manually authored System with
user facets such as `layer=data` and `role=credential-vault`, and zero relationships.
This uses the current model without a new entity kind or provider adapter.
A future DataResource/Vault kind is only justified if independent identity and
behavior require it. Data-layer classification is a facet/presentation choice,
not automatically a persistence entity kind or a dependency edge.

## Candidate acceptance checks

- Create one manually authored KeePass resource with a data-layer classification.
- Save it with zero relationships and restore it after application/server restart.
- Find it in global search and inspect it without any repository or runtime.
- Keep it visible when graph views include standalone nodes, without fabricating
  dependencies or deleting it on rescan.
- Distinguish manual knowledge and absent provider evidence.

## Relationship to OAuth client inventory

[IDEA-001](IDEA-001-oauth-clients.md) may eventually reference this node as a
credential-storage location. That is an optional owner-authored relationship or
reference; KeePass does not need that link to exist or to be tracked. The current
request is satisfied by documenting the standalone resource concept.

## Open questions and scope

Choose application versus vault versus logical system identity; confirm the name
of the layer/facet; decide how the home view includes standalone resources; assign
release priority. No KeePass integration, file scanning/parsing, or secrets manager
implementation is requested or accepted by this record.

Related: REQ-002, 007, 008, 009, 013, 014, 015; ADR-001; IDEA-001.

## Source grounding

[KeePass documentation](https://keepass.info/help/base/security.html) describes
its encrypted database. That supports distinguishing an application from a vault
as possible inventory subjects; the data-layer classification and graph behavior
are owner-driven product ideas, not KeePass implementation requirements.
