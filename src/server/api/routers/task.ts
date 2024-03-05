import { z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


export const taskRouter = createTRPCRouter({
  getAllTask: publicProcedure.query(async ({ ctx }) => {
    try {
      const tasks = await ctx.db.task.findMany();
      return tasks;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch tasks",
        cause: error,
      });
    }
  }),

  createdTask: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { title, content } = input;
        const createTask = await ctx.db.task.create({
          data: {
            title,
            content,
          },
        });
        return createTask;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed To Create New Task",
          cause: error,
        });
      }
    }),
});
