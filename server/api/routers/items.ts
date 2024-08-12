import { z } from 'zod';
import { itemAPI } from '../../../services/itemApi';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const itemRouter = createTRPCRouter({
  createOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        message: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const token = ctx.session?.user.token;
      const result = await itemAPI.create(input, token);
      return result;
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
      const token = ctx.session?.user.token;
      const { count, page, status, search } = input;
      const resultDoc = await itemAPI.getAll(
        {
          count,
          page,
          status,
          search
        },
        token
      );
      return resultDoc;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const token = ctx.session?.user.token;
      const { id } = input;
      return itemAPI.getOne(id, token);
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const token = ctx.session?.user.token;
      const { update, id } = input;
      const result = await itemAPI.update(id, update, token);
      return result;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const token = ctx.session?.user.token;
      return itemAPI.delete(input.id, token);
    })
});
