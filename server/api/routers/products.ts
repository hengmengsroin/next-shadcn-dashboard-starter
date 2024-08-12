import { z } from 'zod';
import { productApi } from '../../../services/productApi';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const productRouter = createTRPCRouter({
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
      const result = await productApi.create(input, ctx.session.user.token);
      return result;
    }),
  import: protectedProcedure
    .input(
      z.object({
        organization: z.string(),
        products: z.array(
          z.object({
            name: z.string(),
            code: z.string(),
            price: z.number(),
            cost: z.number(),
            quantity: z.number(),
            note: z.string().optional()
          })
        )
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await productApi.import(input, ctx.session.user.token);
      return result;
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        count: z.number().optional().default(10),
        page: z.number().optional().default(1),
        org: z.string().optional(),
        status: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      const { count, page, status, search, org } = input;

      const resultDoc = await productApi.getAll(
        {
          count,
          page,
          status,
          organization: org,
          search
        },
        token
      );
      return resultDoc;
    }),
  getChart: protectedProcedure
    .input(z.object({}))
    .query(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      return productApi.getProductChart(input, token);
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const token = ctx.session.user.token;
      return productApi.getOne(id, token);
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const { update, id } = input;
      const result = await productApi.update(
        id,
        update,
        ctx.session.user.token
      );
      return result;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return productApi.delete(input.id, ctx.session.user.token);
    })
});
