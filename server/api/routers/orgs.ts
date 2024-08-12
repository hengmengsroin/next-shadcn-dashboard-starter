import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { orgAPI } from '../../../services/orgApi';
export const orgRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session?.user;
      const { name } = input;
      return orgAPI.create(
        {
          name
        },
        user.token
      );
    }),
  inviteMember: protectedProcedure
    .input(
      z.object({
        team_id: z.string(),
        email: z.string(),
        role: z.string(),
        name: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { team_id, email, role, name } = input;
      return orgAPI.create(
        {
          team: team_id,
          email,
          name,
          inviter: user.id,
          role,
          status: 'pending',
          invited_at: new Date().toISOString()
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
      const resultDoc = await orgAPI.getAll(
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
      return orgAPI.getOne(input.id, user.token);
    }),
  subscribePlan: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        plan: z.string(),
        startDate: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { plan, startDate, id } = input;
      const result = await orgAPI.subscribePlan(
        id,
        plan,
        startDate,
        user.token
      );
      return result;
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), update: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const { update, id } = input;
      const result = await orgAPI.update(id, update, user.token);
      return result;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return orgAPI.delete(input.id, ctx.session.user.token);
    })
});
