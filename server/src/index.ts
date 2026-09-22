import {Hono} from "hono";

interface Env {
    OPEN_ELECTRICITY_API_TOKEN: string;
}

const OPEN_ELECTRICITY_FACILITIES_URL = "https://api.openelectricity.org.au/v4/facilities";
const VALID_STATUS_IDS = new Set(["committed", "operating", "commissioning", "retired"]);

const app = new Hono<{ Bindings: Env }>();

app.get("/api/facilities", async (c) => {
    const requestUrl = new URL(c.req.url);
    const upstreamUrl = new URL(OPEN_ELECTRICITY_FACILITIES_URL);
    const statusIds = requestUrl.searchParams.getAll("status_id");

    for (const statusId of statusIds) {
        if (!VALID_STATUS_IDS.has(statusId)) {
            return c.json({
                success: false,
                error: `Invalid status_id: ${statusId}`
            }, 400);
        }

        upstreamUrl.searchParams.append("status_id", statusId);
    }

    return fetch(upstreamUrl, {
        headers: {
            Authorization: `Bearer ${c.env.OPEN_ELECTRICITY_API_TOKEN}`
        }
    });
});

export default app;
