import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getAllTask: publicProcedure.query(({ctx})=> {
    return ctx.db.task.findMany();
  })
});
