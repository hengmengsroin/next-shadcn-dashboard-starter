import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { planAPI } from '../../../services/planApi';
export const planRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        duration: z.number()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session?.user;
      const { name, price, duration } = input;
      return planAPI.create(
        {
          name,
          price,
          duration
        },
        user.token
      );
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        count: z.number().optional().default(10),
        page: z.number().optional().default(1),
        status: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { search, count, page, status } = input;
      const resultDoc = await planAPI.getAll(
        {
          search,
          page,
          count,
          status
        },
        user.token
      );
      return resultDoc;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      return planAPI.getOne(input.id, user.token);
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { update, id } = input;
      const result = await planAPI.update(id, update, user.token);
      return result;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return planAPI.delete(input.id, ctx.session.user.token);
    })
});
