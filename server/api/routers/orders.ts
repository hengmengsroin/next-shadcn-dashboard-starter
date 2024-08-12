import { z } from 'zod';
import { orderApi } from '../../../services/orderApi';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const orderRouter = createTRPCRouter({
  getSaleChart: protectedProcedure
    .input(
      z.object({
        organization: z.string().optional(),
        duration: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await orderApi.getSaleChart(input, user.token);
      return resultDoc;
    }),
  getRevenueChart: protectedProcedure
    .input(
      z.object({
        organization: z.string().optional(),
        duration: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await orderApi.getRevenueChart(input, user.token);
      return resultDoc;
    }),
  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string(),
        color: z.string(),
        layout: z.string(),
        material: z.string(),
        payment_method: z.string(),
        amount: z.number(),
        plan: z.string(),
        billing_info: z.any(),
        remark: z.string().optional(),
        creator: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      input.creator = ctx.session.user.id;
      const result = await orderApi.create(input, ctx.session.user.token);
      return result;
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        count: z.number().optional().default(10),
        page: z.number().optional().default(1),
        status: z.string().optional(),
        organization: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      const resultDoc = await orderApi.getAll(input, token);
      return resultDoc;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const token = ctx.session.user.token;
      return orderApi.getOne(id, token);
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const { update, id } = input;
      const result = await orderApi.update(id, update, ctx.session.user.token);
      return result;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return orderApi.delete(input.id, ctx.session.user.token);
    })
});
