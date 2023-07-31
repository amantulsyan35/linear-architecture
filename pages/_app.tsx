import Head from "next/head";
import { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "react-query";

import { queryClient } from "../src/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydrateState}>
          <main className="">
            <Component {...pageProps} />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
