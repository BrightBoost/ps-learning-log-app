# API Reference

This document provides a reference for the learning log API.

## Entry Model

The `Entry` object has the following structure:

| Field | Type | Description |
|---|---|---|
| `id` | string | The unique identifier for the entry. |
| `title` | string | The title of the entry. |
| `topic` | string | The topic of the entry. |
| `date` | Date | The date of the entry. |
| `notes` | string | (Optional) Notes for the entry. |
| `confidenceRating` | number \| null | (Optional) A rating from 1-5 of your confidence in the topic. |

---

## Create an Entry

Creates a new learning log entry.

*   **HTTP Method:** `POST`
*   **Path:** `/entries`

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | The title of the entry. |
| `topic` | string | Yes | The topic of the entry. |
| `date` | string | No | The date of the entry in ISO 8601 format. Defaults to the current date and time. |
| `notes` | string | No | Notes for the entry. |
| `confidenceRating` | number | No | A rating from 1-5 of your confidence in the topic. |

### Example Request

```json
{
  "title": "Learned about Express routing",
  "topic": "Node.js",
  "notes": "Today I learned how to create routes in Express and how to handle different HTTP methods.",
  "confidenceRating": 4
}
```

### Example Response

```json
{
  "id": "1",
  "title": "Learned about Express routing",
  "topic": "Node.js",
  "date": "2026-03-29T10:00:00.000Z",
  "notes": "Today I learned how to create routes in Express and how to handle different HTTP methods.",
  "confidenceRating": 4
}
```

### Possible Error Responses

*   **Code:** `400 Bad Request`
    **Content:**
    ```json
    {
      "error": "title and topic are required"
    }
    ```

---

## Get All Entries

Retrieves all learning log entries.

*   **HTTP Method:** `GET`
*   **Path:** `/entries`

### Request Body

None.

### Example Request

```
GET /entries
```

### Example Response

```json
[
  {
    "id": "1",
    "title": "Learned about Express routing",
    "topic": "Node.js",
    "date": "2026-03-29T10:00:00.000Z",
    "notes": "Today I learned how to create routes in Express and how to handle different HTTP methods.",
    "confidenceRating": 4
  },
  {
    "id": "2",
    "title": "Learned about TypeScript",
    "topic": "TypeScript",
    "date": "2026-03-28T14:30:00.000Z",
    "notes": "Today I learned about static typing in TypeScript.",
    "confidenceRating": 3
  }
]
```

### Possible Error Responses

None.

---

## Get an Entry by ID

Retrieves a single learning log entry by its ID.

*   **HTTP Method:** `GET`
*   **Path:** `/entries/:id`

### URL Parameters

| Parameter | Type | Description |
|---|---|---|
| `id` | string | The ID of the entry to retrieve. |

### Request Body

None.

### Example Request

```
GET /entries/1
```

### Example Response

```json
{
  "id": "1",
  "title": "Learned about Express routing",
  "topic": "Node.js",
  "date": "2026-03-29T10:00:00.000Z",
  "notes": "Today I learned how to create routes in Express and how to handle different HTTP methods.",
  "confidenceRating": 4
}
```

### Possible Error Responses

*   **Code:** `404 Not Found`
    **Content:**
    ```json
    {
      "error": "Entry not found"
    }
    ```

---

## Update an Entry

Updates an existing learning log entry.

*   **HTTP Method:** `PUT`
*   **Path:** `/entries/:id`

### URL Parameters

| Parameter | Type | Description |
|---|---|---|
| `id` | string | The ID of the entry to update. |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | No | The title of the entry. |
| `topic` | string | No | The topic of the entry. |
| `date` | string | No | The date of the entry in ISO 8601 format. |
| `notes` | string | No | Notes for the entry. |
| `confidenceRating` | number | No | A rating from 1-5 of your confidence in the topic. |

### Example Request

```json
{
  "title": "Mastered Express routing",
  "confidenceRating": 5
}
```

### Example Response

```json
{
  "id": "1",
  "title": "Mastered Express routing",
  "topic": "Node.js",
  "date": "2026-03-29T10:00:00.000Z",
  "notes": "Today I learned how to create routes in Express and how to handle different HTTP methods.",
  "confidenceRating": 5
}
```

### Possible Error Responses

*   **Code:** `404 Not Found`
    **Content:**
    ```json
    {
      "error": "Entry not found"
    }
    ```
*   **Code:** `400 Bad Request`
    **Content:**
    ```json
    {
      "error": "Invalid date format"
    }
    ```

---

## Delete an Entry

Deletes a learning log entry.

*   **HTTP Method:** `DELETE`
*   **Path:** `/entries/:id`

### URL Parameters

| Parameter | Type | Description |
|---|---|---|
| `id` | string | The ID of the entry to delete. |

### Request Body

None.

### Example Request

```
DELETE /entries/1
```

### Example Response

*   **Code:** `204 No Content`

### Possible Error Responses

*   **Code:** `404 Not Found`
    **Content:**
    ```json
    {
      "error": "Entry not found"
    }
    ```

---
