import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { generalApi } from '../../../services/generalApi';
import { questionAPI } from '../../../services/questionApi';

export const generalRouter = createTRPCRouter({
  getDashboardInfo: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const user = ctx.session.user;
      const resultDoc = await generalApi.getDashboardInfo(user.token);
      return resultDoc;
    }),

  sendContact: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        subject: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const result = await questionAPI.create(input);
      return result;
    }),
  addEmail: protectedProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await generalApi.addEmail(
        input.email,
        ctx.session.user.token
      );
      return result;
    }),
  getSettings: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input, ctx }) => {
      const result = await generalApi.getSettings(
        input.key,
        ctx.session.user.token
      );
      return result;
    }),
  uploadQrcode: protectedProcedure
    .input(z.object({ file: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await generalApi.uploadQrcode(
        input.file,
        ctx.session.user.token
      );
      return result;
    }),
  deleteSetting: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await generalApi.deleteSetting(
        input.id,
        ctx.session.user.token
      );
      return result;
    }),
  sendResetPwdEmailVerificationMail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      const { email } = input;
      return generalApi.sendResetPwdEmailVerificationMail(email);
    }),
  checkout: protectedProcedure
    .input(
      z.object({
        first_name: z.string(),
        email: z.string(),
        last_name: z.string(),
        phone_number: z.string(),
        method: z.string()
      })
    )
    .mutation(async ({ input }) => {
      console.log({ input });
      return true;
    })
});
