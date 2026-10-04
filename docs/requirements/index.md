# Requirements register

Recorded 2026-10-04. All requirements below are **captured, implementation not
verified**. Sources are the [Draft PRD](../prd/personal-system-graph.md) and
[accepted ADR-001](../adr/001-user-curated-graph.md). Later deployment requirements cite [ADR-004](../adr/004-home-server-and-clients.md),
which records the owner's direction. Acceptance checks are derived
workspace checks, not additional accepted architecture decisions.

| ID | Requirement | Source | Derived acceptance check |
| --- | --- | --- | --- |
| REQ-001 | Provide a local-first, graph-first home for one owner's ecosystem. | PRD §§1, 3, 4, 6, 8 | The owner can open the persisted personal graph and navigate from a high-level system to its source/runtime. Local operation boundaries need a later implementation decision. |
| REQ-002 | Model System, Repository, Checkout, Machine, and Runtime separately; allow recursively contained Systems. | PRD §5; ADR decision §§1–4 | One system contains a nested system; one repository has checkouts on two machines and a distinct runtime. Ports and branches remain attributes. |
| REQ-003 | Import GitHub personal and organization repositories and resolve repository identity from normalized remotes where possible. | PRD §§6, 8; ADR decision §3 | Personal and organization repositories import; equivalent remote identities map multiple checkouts to one repository; ambiguous matches require user resolution. |
| REQ-004 | Let the user choose the canonical repository/remote. | PRD §6; ADR decision §§3, 5 | The chosen canonical source persists independently of provider observations and can be changed by the owner. |
| REQ-005 | Scan configured folders on local/remote machines and detect multiple checkouts. | PRD §§6, 8 | Known working copies on two configured machines link to one repository with distinct paths/machines; unresolved copies remain explicit. Scanner protocol is open. |
| REQ-006 | Import LocalLink runtime observations and map them to Checkout, Repository, or System. | PRD §§5, 6, 8; ADR decision §§4, 11 | A process/container remains distinct from source; resolved mappings attach it appropriately and unresolved mappings can be manually linked. |
| REQ-007 | Store desired architecture independently of observed facts and expose Design, Reality, and Combined lenses. | PRD §§3, 6; ADR decision §§5, 8 | A planned system and manual dependency remain visible in Design; observations appear in Reality; Combined exposes missing/unexpected supporting observations without overwriting intent. |
| REQ-008 | Allow manual System/node creation, grouping, repositioning, and typed edge creation; preserve manual relationships. | PRD §6; ADR decision §6 and UI implications | The owner creates/groups/connects nodes; a rescan preserves the manual edge and attaches matching evidence without duplicating the conceptual edge. |
| REQ-009 | Persist visual layout separately from topology and support semantic zoom. | PRD §§3, 6, 8; ADR decision §9 and UI implications | Positions/collapse state survive restart and rescan; new observations do not rearrange established nodes; zoom changes displayed detail. |
| REQ-010 | Persist graph data using SQLite. | PRD §8; ADR decision §10 | Entities, relationships, facets, observations/evidence, and layout survive application restart. Exact tables and schema remain open. |
| REQ-011 | Record provider provenance, observation time/data, and the associated entity or relationship; distinguish stale/unknown from confirmed absence. | PRD §§3, 5, 6, 8; ADR decision §§6–8 | An unavailable provider makes evidence stale/unknown without deleting user intent; the inspector exposes source and observation time. Freshness thresholds remain open. |
| REQ-012 | Discover through GitHub, filesystem/machine, and LocalLink adapters using pull-based scanning. | PRD §8; ADR decision §§11, 12 | Manual Scan Now refreshes observations through adapters. Scan on open is a permitted option, not a fixed obligation; continuous synchronization is unnecessary for V0. |
| REQ-013 | Provide an inspector with metadata, relationships, observations, freshness, and useful navigation actions. | PRD §§6, 8; ADR UI implications | Selecting a node displays its intended and observed information and offers supported GitHub/folder/terminal/coding-agent navigation. Integration contracts remain open. |
| REQ-014 | Provide global search that focuses matching graph nodes. | PRD §§6, 8 | Search locates each of the five entity kinds and focuses the selected result in the graph. |
| REQ-015 | Keep user facets and provider-owned facts distinct; AI suggestions require acceptance as user decisions. | PRD §7; ADR decision §§5, 8, 13 | A provider update changes observed visibility without overwriting user maturity/criticality; a suggestion does not become authoritative automatically. |
| REQ-016 | Highlight potentially stale checkouts or local-only work without automatically deleting or moving them. | PRD §6 | Known evidence of stale/local-only work is surfaced; viewing or scanning leaves the working copy in place. Detection criteria remain open. |
| REQ-017 | Keep AI advisory and prohibit automatic infrastructure mutation in V0. | PRD §§3, 9, 11; ADR decision §13 | Suggestions cannot directly alter authoritative graph intent or execute infrastructure changes. Future AI/query features are not required in V0. |
| REQ-018 | Provide a read-only mobile PWA hosted by the home server, with API-enforced viewer permissions. | Owner clarification 2026-10-04; ADR-004 | Mobile browses/searches/inspects the graph; viewer credentials cannot mutate architecture or submit scanner batches; no offline edit queue exists. |
| REQ-019 | Keep authoritative graph/SQLite on the home server; connect GPUI editing and machine-local scanners through APIs; mobile access uses Tailscale. | Owner direction 2026-10-04; ADR-004 | Desktop edits persist on the server; scanner reports are accepted for the enrolled machine; a mobile device reads through the private HTTPS endpoint. |

## End-to-end acceptance scenario

Based on PRD §10: use a representative old project with nested systems, two
checkouts on different machines, a canonical repository, and a known LocalLink
runtime. The owner should be able to answer:

1. What systems/projects exist?
2. How are they grouped and connected?
3. Which repository is the canonical source?
4. Where is it checked out?
5. What instances are known to run from it?
6. When was the supporting information last observed?
7. Can they navigate to the relevant source/runtime quickly?

Repeat with stale provider evidence and a manually created relationship. Intent
and layout must survive; stale evidence must remain distinguishable. No numerical
speed or scale target has been supplied.

## Scope control

The [scope exclusions](../scope.md) apply to all requirements. Documentation site
checks live in the [proposed site brief](../documentation-site.md) because they
describe the delivery process, not product V0 features. Link future research,
ADRs, and implementation outputs to these stable requirement IDs.
