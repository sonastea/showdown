import { appRouter } from "@router/_app";
import * as trpcNext from "@trpc/server/adapters/next";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
