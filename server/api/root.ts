import { productRouter } from './routers/products';
import { createCallerFactory, createTRPCRouter } from './trpc';
import { userRouter } from './routers/users';
import { generalRouter } from './routers/general';
import { invoiceRouter } from './routers/invoices';
import { orgRouter } from './routers/orgs';
import { itemRouter } from './routers/items';
import { orderRouter } from './routers/orders';
import { logRouter } from './routers/logs';
import { listRouter } from './routers/lists';
import { unitRouter } from './routers/units';
import { planRouter } from './routers/plans';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  general: generalRouter,
  users: userRouter,
  invoices: invoiceRouter,
  logs: logRouter,
  orgs: orgRouter,
  units: unitRouter,
  items: itemRouter,
  products: productRouter,
  orders: orderRouter,
  lists: listRouter,
  plans: planRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
