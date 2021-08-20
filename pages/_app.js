import "minireset.css";
import "@alanmaranto/components/styles/main.css";
import "@alanmaranto/components/styles/tokens.css";

function MyApp({ Component, pageProps }) {
  return (
    // Move to a Container
    <div
      style={{
        width: 375,
        padding: "40px 30px",
        margin: "0 auto",
        border: "1px solid rebeccapurple",
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
