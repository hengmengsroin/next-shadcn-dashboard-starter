import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { userAPI } from '@/services/userApi';

export const userRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        image: z.string().optional(),
        password: z.string(),
        organization: z.string().optional(),
        role: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      const user = {
        name: input.name,
        email: input.email,
        role: input.role,
        image: input.image,
        organization: input.organization,
        password: input.password
      };
      return userAPI.create(user, token);
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        role: z.string().optional(),
        search: z.string().optional(),
        count: z.number().optional().default(10),
        page: z.number().optional().default(1),
        status: z.string().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      const result = await userAPI.getAll(input, token);
      return result;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      return userAPI.getOne(input.id, token);
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      return userAPI.update(input.id, input.update, token);
    }),
  resetPassword: publicProcedure
    .input(
      z.object({ email: z.string(), password: z.string(), code: z.string() })
    )
    .mutation(async ({ input }) => {
      return userAPI.resetPassword(input);
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const token = ctx.session.user.token;
      return userAPI.delete(input.id, token);
    })
});
