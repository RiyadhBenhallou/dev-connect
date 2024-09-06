import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// for query purposes
const queryClient = postgres(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle(queryClient, { schema });
