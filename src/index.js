import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Layout } from "./Layout";
import { theme } from "./theme";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { ThemeProvider } from "@aws-amplify/ui-react";

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Layout>
      <App />
    </Layout>
  </ThemeProvider>
);
