import { CodeTabs } from "C:/Users/Administrator/.openclaw/workspace/vuepress-site/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/CodeTabs.js";
import { Tabs } from "C:/Users/Administrator/.openclaw/workspace/vuepress-site/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/Tabs.js";
import "C:/Users/Administrator/.openclaw/workspace/vuepress-site/node_modules/@vuepress/plugin-markdown-tab/dist/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
