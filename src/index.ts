import { Client } from "@notionhq/client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

require("dotenv").config();

async function main() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || "{}");

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_DAILYLOG_ID || "",
  });

  console.log("Got response:", response);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
