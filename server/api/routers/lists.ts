import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { listAPI } from '../../../services/listApi';
export const listRouter = createTRPCRouter({
  getLogChart: protectedProcedure
    .input(
      z.object({
        organization: z.string().optional(),
        duration: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await listAPI.getLogChart(input, user.token);
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
      return listAPI.create(input, user.token);
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        count: z.number().optional().default(10),
        page: z.number().optional().default(1),
        status: z.string().optional(),
        action: z.string().optional(),
        organization: z.string().optional(),
        user: z.string().optional(),
        model: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await listAPI.getAll(input, user.token);
      return resultDoc;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      return listAPI.getOne(input.id, user.token);
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { update, id } = input;
      const result = await listAPI.update(id, update, user.token);
      return result;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return listAPI.delete(input.id, ctx.session.user.token);
    })
});
