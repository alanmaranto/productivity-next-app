import { Container } from "@alanmaranto/components";

import "minireset.css";
import "@alanmaranto/components/styles/main.css";
import "@alanmaranto/components/styles/tokens.css";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
