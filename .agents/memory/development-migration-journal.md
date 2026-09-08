---
name: Development migration journal
description: Prevent baseline Drizzle migrations from being replayed against the existing development leads table.
---

The development database can contain legacy tables without matching entries in the Drizzle migration-history journal. In that state, a migration runner can try to replay baseline schema that already exists.

**Why:** The schema can predate the project’s current migration journal, so replaying baseline migrations fails before newer changes are reached.

**How to apply:** Before running migrations against an established development database, verify that the journal matches the existing schema. Investigate and reconcile a mismatch before relying on the migration runner for future schema changes.