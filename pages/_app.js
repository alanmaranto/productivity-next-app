/* eslint-disable @next/next/no-page-custom-font */
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Container, Button } from "@alanmaranto/components";
import Head from "next/head";
import Link from "next/link";

import "minireset.css";
import "@alanmaranto/components/styles/main.css";
import "@alanmaranto/components/styles/tokens.css";
import "../styles/globals.css";
import "../styles/main.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {["/", "/home", "/planning"].map((link) => (
          <span key={link} style={{ marginRight: 10 }}>
            <Link passHref href={link}>
              <Button type="tertiary">
                {link.replace("/", "") || "/index"}
              </Button>
            </Link>
          </span>
        ))}
      </div>
      <Container>
        <Component {...pageProps} />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
