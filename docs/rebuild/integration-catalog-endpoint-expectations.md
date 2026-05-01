# Integration Catalog Endpoint Contract

This document records the backend contract currently used by the Doow integrations catalog and the frontend adapter layer that normalizes it for the UI.


## Endpoint

```txt
GET /integrations/catalog
```

The endpoint supports returning all matching integrations without pagination by default.

## Query Parameters

| Parameter | Type | Required | Default | Behavior |
|---|---:|---:|---|---|
| `category` | `string` | No | none | Exact category label filter. Values come from `GET /integrations/catalog/categories`. |
| `name` | `string` | No | `""` | Case-insensitive partial match over integration name. |
| `grouped` | `"true" \| "false"` | No | `"false"` | Groups the current result set by category when `"true"`. The frontend uses flat mode. |
| `take` | `number` | No | none | Optional pagination size. When omitted with `skip` and `cursor`, return all matching integrations. |
| `skip` | `number` | No | `0` | Offset pagination when `take` is provided and `cursor` is absent. |
| `cursor` | `string` | No | `null` | Optional pagination cursor. Only used when `take` is provided. |

Required examples:

```txt
GET /integrations/catalog
GET /integrations/catalog?category=Accounting%20%26%20Bookkeeping
GET /integrations/catalog?name=quickbooks
GET /integrations/catalog?category=Accounting%20%26%20Bookkeeping&name=quickbooks
```

## Response Shape

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "QuickBooks",
      "category": "Accounting & Bookkeeping",
      "logo_url": "https://...",
      "description": "Accounting software",
      "website_url": "https://quickbooks.intuit.com",
      "metered_vendor_id": "quickbooks"
    }
  ],
  "total": 41,
  "take": 41,
  "skip": 0,
  "nextCursor": null
}
```

Categories are fetched separately:

```json
{
  "data": [
    {
      "category": "Accounting & Bookkeeping",
      "count": 7
    }
  ],
  "total": 8
}
```

## Field Requirements

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `data[].id` | `string` | Yes | Backend integration UUID. |
| `data[].name` | `string` | Yes | Display name. |
| `data[].category` | `string` | Yes | Category label. The frontend slugifies this into `categoryId`. |
| `data[].logo_url` | `string \| null` | Yes | Backend-owned logo URL. Frontend falls back to initials when null/unavailable. |
| `data[].description` | `string \| null` | Yes | Card description. Frontend supplies a generic non-empty fallback when null. |
| `data[].website_url` | `string \| null` | No | Homepage URL for future UI use. |
| `data[].metered_vendor_id` | `string \| null` | No | Vendor identifier for future integration mapping. |
| `total` | `number` | Yes | Count of all integrations matching the current filter/search. |
| `take` | `number` | Yes | Returned page size, or all matching rows when pagination is omitted. |
| `skip` | `number` | Yes | Offset. |
| `nextCursor` | `string \| null` | Yes | `null` when there is no next page. |

## Contract Rules

- Frontend route params remain `categoryId` and `query`; the Next server route maps them to backend `category` and `name`.
- The frontend adapter slugifies backend category labels into stable tab/select IDs.
- Category counts come from `GET /integrations/catalog/categories` and are summed for the "All Categories" count.
- Search is backend-backed by integration name only.
- The frontend does not use mock integrations as a fallback.
- The frontend will call this endpoint through the Next server route so any secret headers remain server-only.
