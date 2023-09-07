import "dotenv/config.js"
import postgres from "postgres"

const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB} = process.env
const URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`;

export const sql = postgres(URL)