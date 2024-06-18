import { Fragment } from "react";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import OpenGraphTags from "utils/OpenGraphTags";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import "nprogress/nprogress.css";
import "simplebar/dist/simplebar.min.css";
import "../src/__server__";
//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done()); // small change

nProgress.configure({
  showSpinner: false,
});

const App = ({ Component, pageProps }) => {
  const AnyComponent = Component;

  const getLayout = AnyComponent.getLayout ?? ((page) => page);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="React Next.js ecommerce website. Build SEO friendly Online store, delivery app and Multivendor store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <OpenGraphTags />
        <title>FourGemsShop</title>
      </Head>

      <SettingsProvider>
        <AppProvider>
          <MuiTheme>
            <SnackbarProvider>
              <RTL>{getLayout(<AnyComponent {...pageProps} />)}</RTL>
            </SnackbarProvider>
          </MuiTheme>
        </AppProvider>
      </SettingsProvider>
    </Fragment>
  );
}; // Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default App;
