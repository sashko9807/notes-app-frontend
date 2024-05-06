import ReactDOM from "react-dom/client";

import { StartClient } from "@tanstack/react-router-server/client";
import { createRouter } from "./router";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "./common/createEmotionCache";
import theme from "./common/theme";
import { AuthStoreProviders } from "./components/auth/AuthStoreProvider";
import { CssBaseline } from "@mui/material";

const router = createRouter();
const cache = createEmotionCache();

function App() {
  return (
    <AuthStoreProviders
      init={{
        accessToken: router.options.context.auth.accessToken,
        isAuthenticated: router.options.context.auth.isAuthenticated,
      }}
    >
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <StartClient router={router} />
          <CssBaseline />
        </ThemeProvider>
      </CacheProvider>
    </AuthStoreProviders>
  );
}

router.update({
  context: { ...router.options.context, head: "123" },
});
router.hydrate();
ReactDOM.hydrateRoot(document, <App />);
