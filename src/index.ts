import * as config from "./configs";
import serverLoader from "./loaders";
import { shutdown } from "./lib/helper/debug";

const createServer = async () => {
  const server = await serverLoader();

  server.app.listen({ port: config.Port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${config.Port}${server.apolloServer.graphqlPath}ql`
    )
  );
};

createServer().catch((err) => shutdown(err, "creating error"));
