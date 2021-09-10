import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Container } from "@alanmaranto/components";

import "minireset.css";
import "@alanmaranto/components/styles/main.css";
import "@alanmaranto/components/styles/tokens.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Container>
    </QueryClientProvider>
  );
}

export default MyApp;
