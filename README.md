# RenewMap code challenge

## Getting started

This is a starter repo intended to help you complete the coding challenge provided by the interviewer.

### Pre-requisites

This repository requires Node version 22 and `yarn`:

- Install [fnm](https://github.com/Schniz/fnm)
- Run `fnm use`
- Install yarn `npm install --global yarn`

### Start locally

```bash
# install dependencies
yarn

# start the app
yarn dev
```

Visit: http://localhost:5173

## Layout

You can find the repository layout as follows:

```
📂 rm-challenge
- 📂 client
  - src/App.tsx <-- Frontend entrypoint
- 📂 server
  - src/index.ts <-- Backend entrypoint
```

### Frontend

React + Vite (config found here: `client/vite.config.ts`)

Documentation: https://vite.dev/guide/

### Backend

Cloudflare workers runtime (config found here: `server/wrangler.toml`)

Documentation: https://developers.cloudflare.com/workers/

# Solution

### AI Written Code

- The code has been written with the assistance of AI however it has been heavily reviewed and modified to be the way I want it to be.
- The only things that are fully AI generated are the CSS files.

### Features

- Filters: The user can filter by status, state and tech (group).
  - Reasoning: All 3 insights need these filters. State: QLD, NSW, "my state", Status: Online & Offline, Tech: "Wind, Solar, Battery (Alice & Bob), "existing fossil fuel facilities".
- Sorting: The user can sort by any of the columns in ascending or descending order.
  - Reasoning: we only need sort by commencement date to see "when new facilities have come online" for insight 1 however since it's a generic component anyways, added to its all since its tidier and easier + better UX.
- Filtering list: We show what we are filtering by so the user can easily view the filters instead of clicking into the filters themselves.
- Table scrollbar: We have a scrollbar for the Table to ensure that the summary always remains on the page. The user can easily see these details on the site for reporting.
- Table Summary: Shows the total amount of facilities and sums the total capacity of capacity after the filters are applied. Important for reporting.

### Deprioritised

- Details page: We do not list additional details or have a details page with a list of units for facilities for now as it does not directly address user concerns.

### Additional Features to Add

- Adding filter shortcuts for Offline/Online
  - Left this out for now since it may be too simplistic + assuming users are able to determine offline/online from the status filters. However, it is kind of annoying that you have to select 3 filters for "Online" so a shortcut would be nice.
- Adding filter shortcuts for Renewable/Non-renewable/Other
  - Didn't implement this but this would be a nice improvement especially since there are so many groups. Same reasoning as previous point.
- Select all in the filters would be nice.
- Note: filter shortcuts would be a generic component
- Showing the capacity of each facility in the table
  - This may be an important detail in the table (or not)
- There is much to be desired in terms of prettiness & colour.

- Unit tests would be nice especially since there are so many helpers!! However, if I was adding unit tests (for this exercise), these would be vibe code so leaving it out.
- Also a unit test or contract/integration test should definitely be added for the API call.

### Other notes

- There is an assumption in facility.ts that the status of the facility is defined by the first unit in the unit list. We currently do not handle the case where the facility returns multiple units with different statuses. I could not find documentation in the docs outlining how status is defined (maybe I did not look hard enough).
- Defaulted SNOWY (deprecated in the docs) to NSW
- Added a little AGENTS.md file
