import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { logAPI } from '../../../services/logApi';
export const logRouter = createTRPCRouter({
  getActions: protectedProcedure
    .input(z.object({}))
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await logAPI.getActions(input, user.token);
      return resultDoc;
    }),
  getModels: protectedProcedure
    .input(z.object({}))
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await logAPI.getModels(input, user.token);
      return resultDoc;
    }),
  getLogChart: protectedProcedure
    .input(
      z.object({
        organization: z.string().optional(),
        duration: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await logAPI.getLogChart(input, user.token);
      return resultDoc;
    }),
  createOne: protectedProcedure
    .input(
      z.object({
        action: z.string(),
        model: z.string(),
        description: z.string(),
        user: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session?.user;
      return logAPI.create(input, user.token);
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        count: z.number().optional().default(10),
        page: z.number().optional().default(1),
        action: z.string().optional(),
        organization: z.string().optional(),
        user: z.string().optional(),
        model: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await logAPI.getAll(input, user.token);
      return resultDoc;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      return logAPI.getOne(input.id, user.token);
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { update, id } = input;
      const result = await logAPI.update(id, update, user.token);
      return result;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return logAPI.delete(input.id, ctx.session.user.token);
    })
});
