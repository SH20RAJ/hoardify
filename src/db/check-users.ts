import { db } from "./index";
import { users } from "./schema";

async function checkUsers() {
    const allUsers = await db.select().from(users);
    console.log(`TOTAL_USERS: ${allUsers.length}`);
    process.exit(0);
}

checkUsers();
