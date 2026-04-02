# The Shades of Bharat

## Current State
StatePage.tsx shows a header with state name, native name, Sanskrit name, and a short one-line description, plus craft badges. The `IndianState` interface has a single `description` field (one short sentence). All 10 sample products already have `imageUrl` pointing to generated images that exist in `/assets/generated/`.

## Requested Changes (Diff)

### Add
- Three new fields to `IndianState` interface: `history: string`, `culturalRoots: string`, `geographicalIdentity: string` — each a rich descriptive paragraph
- Rich content for all 36 states/UTs for these three fields
- A "Cultural Heritage" section in StatePage.tsx below the header, showing three cards: History, Cultural Roots, Geographical Identity — each with an icon and the paragraph text

### Modify
- `IndianState` interface in `indianStates.ts` — add the three new paragraph fields
- All 36 state objects in `INDIAN_STATES` — populate the three new fields with authentic, rich content
- `StatePage.tsx` — add the cultural heritage section between the header and products grid

### Remove
- Nothing

## Implementation Plan
1. Update `IndianState` interface to add `history`, `culturalRoots`, `geographicalIdentity` string fields
2. Add rich paragraphs for all 36 states in `INDIAN_STATES` array
3. Update StatePage.tsx to render a 3-card cultural section showing History, Cultural Roots, Geographical Identity with icons and styled prose
