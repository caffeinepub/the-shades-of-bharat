# The Shades of Bharat

## Current State
The platform has state pages, home page, shop, blog, and admin panel. Each state has cultural/spiritual heritage info. There are no artisan profile pages.

## Requested Changes (Diff)

### Add
- `ArtisanProfilePage` component at `/artisan/$artisanId` route
- `ArtisansPage` at `/artisans` showing all artisans with filter by state
- `artisans.ts` data file with 12-15 sample artisan profiles (name, state, craft specialty, story, years of experience, signature craft, portrait placeholder, quote)
- Link to artisans from HomePage artisan spotlight section and state pages
- Route registration in App.tsx

### Modify
- `App.tsx`: add artisanRoute and artisansListRoute
- `StatePage.tsx`: add an "Artisans from this State" section with cards linking to individual artisan profiles
- `HomePage.tsx`: link artisan spotlight cards to artisan profile pages

### Remove
- Nothing

## Implementation Plan
1. Create `src/data/artisans.ts` with 12+ artisans across states, each with: id, name, state, craft, story, experience, quote, specialty items
2. Create `src/pages/ArtisansPage.tsx` — grid of artisan cards, filterable by state
3. Create `src/pages/ArtisanProfilePage.tsx` — full profile: portrait area, story, craft details, spiritual/cultural context of their state, sample products link
4. Register routes in App.tsx
5. Add artisan section to StatePage.tsx
6. Add navigation link to artisans in Header
