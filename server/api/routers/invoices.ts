import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const invoiceRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        teamId: z.string()
      })
    )
    .mutation(async () => {
      return '';
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        teamId: z.string().optional(),
        search: z.string().optional(),
        count: z.number().optional().default(10),
        page: z.number().optional().default(1),
        status: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { teamId, page, count, status } = input;
      const query: any = { page, count, status };
      if (!teamId) {
        query.owner = user.email;
      } else {
        query.team = teamId;
      }
      return '';
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return '';
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      return '';
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return '';
    })
});
