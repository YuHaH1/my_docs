// docs/.vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

// docs/.vuepress/theme.config.ts
import { defaultTheme } from "vuepress";

// docs/.vuepress/sidebar.ts
var sidebar_default = {
  "/Notes/React/": [
    {
      text: "React",
      collapsible: true,
      children: [
        "/Notes/React/fiber.md",
        "/Notes/React/diff.md"
      ]
    }
  ],
  "/Notes/Vue/": [
    {
      text: "Vue",
      collapsible: true,
      children: [
        "/Notes/React/fiber.md",
        "/Notes/React/diff.md"
      ]
    }
  ],
  "/Notes/Sass/": [
    {
      text: "Sass",
      collapsible: true,
      children: [
        "/Notes/Sass/grammar.md"
      ]
    }
  ],
  "/Notes/TypeScript": [
    {
      text: "TypeScript",
      collapsible: true,
      children: [
        "/Notes/TypeScript/grammar.md"
      ]
    }
  ],
  "/Notes/Interview": [
    {
      text: "TypeScript",
      collapsible: true,
      children: [
        "/Notes/Interview/"
      ]
    }
  ]
};

// docs/.vuepress/utils/index.ts
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "E:/360MoveData/Users/YR/Desktop/\u524D\u7AEF\u5FC5\u4F1A\u624B\u5199\u9898/Blog/docs/.vuepress/utils";
var common_libraries_file = ["webpack.md", "browser.md", "vue.md", "react.md", "typeScript.md", "node.md", "nginx.md", "packageManager.md"];
var create_md = (v, text) => {
  const children = common_libraries_file.map((lib) => {
    return {
      text: lib.split(".")[0],
      link: `/${v}/${lib}`
    };
  });
  common_libraries_file.forEach((lib) => {
    const file = path.resolve(__vite_injected_original_dirname, `../${v}`, lib);
    const is_exist = fs.existsSync(file);
    if (!is_exist) {
      const framatterString = `---
lang: zh-CN
title: ${lib.split(".")[0]}
description: \u5173\u952E\u529F\u80FD
collapsible: true
---
`;
      fs.appendFile(file, framatterString, (err) => {
        if (err)
          throw err;
        console.log('The "data to append" was appended to file!');
      });
    }
  });
  return {
    text,
    children
  };
};

// docs/.vuepress/navbar.ts
var navbar_default = [
  {
    text: "\u7B14\u8BB0\u67E5\u9605",
    children: [
      {
        text: "React",
        link: "/Notes/React/"
      },
      {
        text: "Vue",
        link: "/Notes/Vue/"
      },
      {
        text: "Sass",
        link: "/Notes/Sass/"
      },
      {
        text: "TypeScript",
        link: "/Notes/TypeScript/"
      }
    ]
  },
  create_md("Problems", "\u95EE\u9898\u8BB0\u5F55"),
  create_md("Problems", "\u9762\u7ECF")
];

// docs/.vuepress/theme.config.ts
var theme_config_default = defaultTheme({
  lastUpdated: true,
  lastUpdatedText: "\u6700\u8FD1\u66F4\u65B0\u65F6\u95F4",
  sidebar: sidebar_default,
  logo: "/logo.png",
  navbar: navbar_default
});

// docs/.vuepress/config.ts
var config_default = defineUserConfig({
  lang: "zh-CN",
  title: "fancy\u2014\u2014Blog",
  theme: theme_config_default,
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "\u641C\u7D22\u5173\u952E\u8BCD"
        },
        "/zh/": {
          placeholder: "\u641C\u7D22"
        }
      }
    })
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3RoZW1lLmNvbmZpZy50cyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3V0aWxzL2luZGV4LnRzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L0Jsb2cvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcsIGRlZmF1bHRUaGVtZSB9IGZyb20gJ3Z1ZXByZXNzJ1xyXG5pbXBvcnQgeyBzZWFyY2hQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXNlYXJjaCdcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4vdGhlbWUuY29uZmlnJ1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVVc2VyQ29uZmlnKHtcclxuICAgIGxhbmc6ICd6aC1DTicsXHJcbiAgICB0aXRsZTogJ2ZhbmN5XHUyMDE0XHUyMDE0QmxvZycsXHJcbiAgICB0aGVtZSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBzZWFyY2hQbHVnaW4oe1xyXG4gICAgICAgICAgICBsb2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICAnLyc6IHtcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMlx1NTE3M1x1OTUyRVx1OEJDRCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJy96aC8nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgIF1cclxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L0Jsb2cvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcdGhlbWUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3RoZW1lLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmF1bHRUaGVtZSB9IGZyb20gJ3Z1ZXByZXNzJ1xyXG5pbXBvcnQgc2lkZWJhciBmcm9tICcuL3NpZGViYXInXHJcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXInXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRUaGVtZSh7XHJcbiAgICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICAgIGxhc3RVcGRhdGVkVGV4dDogJ1x1NjcwMFx1OEZEMVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXHJcbiAgICBzaWRlYmFyLFxyXG4gICAgbG9nbzogJy9sb2dvLnBuZycsXHJcbiAgICBuYXZiYXIsXHJcblxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OTgvQmxvZy9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcWVJcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OThcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXIudHNcIjtleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAnL05vdGVzL1JlYWN0Lyc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdSZWFjdCcsXHJcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgJy9Ob3Rlcy9SZWFjdC9maWJlci5tZCcsXHJcbiAgICAgICAgICAgICAgICAnL05vdGVzL1JlYWN0L2RpZmYubWQnLFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgICcvTm90ZXMvVnVlLyc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdWdWUnLFxyXG4gICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICcvTm90ZXMvUmVhY3QvZmliZXIubWQnLFxyXG4gICAgICAgICAgICAgICAgJy9Ob3Rlcy9SZWFjdC9kaWZmLm1kJyxcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICAnL05vdGVzL1Nhc3MvJzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogJ1Nhc3MnLFxyXG4gICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICcvTm90ZXMvU2Fzcy9ncmFtbWFyLm1kJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgICcvTm90ZXMvVHlwZVNjcmlwdCc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdUeXBlU2NyaXB0JyxcclxuICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAnL05vdGVzL1R5cGVTY3JpcHQvZ3JhbW1hci5tZCdcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICAnL05vdGVzL0ludGVydmlldyc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdUeXBlU2NyaXB0JyxcclxuICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAnL05vdGVzL0ludGVydmlldy8nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L0Jsb2cvZG9jcy8udnVlcHJlc3MvdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcdXRpbHNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvJUU1JTg5JThEJUU3JUFCJUFGJUU1JUJGJTg1JUU0JUJDJTlBJUU2JTg5JThCJUU1JTg2JTk5JUU5JUEyJTk4L0Jsb2cvZG9jcy8udnVlcHJlc3MvdXRpbHMvaW5kZXgudHNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmNvbnN0IGNvbW1vbl9saWJyYXJpZXNfZmlsZSA9IFsnd2VicGFjay5tZCcsICdicm93c2VyLm1kJywgJ3Z1ZS5tZCcsICdyZWFjdC5tZCcsICd0eXBlU2NyaXB0Lm1kJywgJ25vZGUubWQnLCAnbmdpbngubWQnLCAncGFja2FnZU1hbmFnZXIubWQnXVxyXG5jb25zdCBjcmVhdGVfbWQgPSAodiwgdGV4dCkgPT4ge1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBjb21tb25fbGlicmFyaWVzX2ZpbGUubWFwKGxpYiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dDogbGliLnNwbGl0KCcuJylbMF0sXHJcbiAgICAgICAgICAgIGxpbms6IGAvJHt2fS8ke2xpYn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcblxyXG4gICAgY29tbW9uX2xpYnJhcmllc19maWxlLmZvckVhY2gobGliID0+IHtcclxuICAgICAgICBjb25zdCBmaWxlID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgYC4uLyR7dn1gLCBsaWIpXHJcbiAgICAgICAgY29uc3QgaXNfZXhpc3QgPSBmcy5leGlzdHNTeW5jKGZpbGUpXHJcbiAgICAgICAgaWYgKCFpc19leGlzdCkge1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtYXR0ZXJTdHJpbmdcclxuICAgICAgICAgICAgICAgID1cclxuICAgICAgICAgICAgICAgIGAtLS1cclxubGFuZzogemgtQ05cclxudGl0bGU6ICR7bGliLnNwbGl0KCcuJylbMF19XHJcbmRlc2NyaXB0aW9uOiBcdTUxNzNcdTk1MkVcdTUyOUZcdTgwRkRcclxuY29sbGFwc2libGU6IHRydWVcclxuLS0tXHJcbmBcclxuICAgICAgICAgICAgZnMuYXBwZW5kRmlsZShmaWxlLCBmcmFtYXR0ZXJTdHJpbmcsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgXCJkYXRhIHRvIGFwcGVuZFwiIHdhcyBhcHBlbmRlZCB0byBmaWxlIScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRleHQsXHJcbiAgICAgICAgY2hpbGRyZW5cclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBjcmVhdGVfbWQgfSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OTgvQmxvZy9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcWVJcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OThcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxuYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvJUU1JTg5JThEJUU3JUFCJUFGJUU1JUJGJTg1JUU0JUJDJTlBJUU2JTg5JThCJUU1JTg2JTk5JUU5JUEyJTk4L0Jsb2cvZG9jcy8udnVlcHJlc3MvbmF2YmFyLnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBjcmVhdGVfbWQgfSBmcm9tICcuL3V0aWxzJ1xyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1N0IxNFx1OEJCMFx1NjdFNVx1OTYwNScsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlYWN0JyxcclxuICAgICAgICAgICAgICAgIGxpbms6ICcvTm90ZXMvUmVhY3QvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVnVlJyxcclxuICAgICAgICAgICAgICAgIGxpbms6ICcvTm90ZXMvVnVlLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1Nhc3MnLFxyXG4gICAgICAgICAgICAgICAgbGluazogJy9Ob3Rlcy9TYXNzLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1R5cGVTY3JpcHQnLFxyXG4gICAgICAgICAgICAgICAgbGluazogJy9Ob3Rlcy9UeXBlU2NyaXB0LydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuICAgIGNyZWF0ZV9tZCgnUHJvYmxlbXMnLCAnXHU5NUVFXHU5ODk4XHU4QkIwXHU1RjU1JyksXHJcbiAgICBjcmVhdGVfbWQoJ1Byb2JsZW1zJywgJ1x1OTc2Mlx1N0VDRicpLFxyXG5dXHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJaLFNBQVMsd0JBQXNDO0FBQzFjLFNBQVMsb0JBQW9COzs7QUNEMFksU0FBUyxvQkFBb0I7OztBQ0F2QyxJQUFPLGtCQUFRO0FBQUEsRUFDeGEsaUJBQWlCO0FBQUEsSUFDYjtBQUFBLE1BQ0ksTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ047QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDWDtBQUFBLE1BQ0ksTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ047QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxnQkFBZ0I7QUFBQSxJQUNaO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDTjtBQUFBLE1BQ0o7QUFBQSxJQUNK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
