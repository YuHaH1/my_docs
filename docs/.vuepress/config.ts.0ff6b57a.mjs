// docs/.vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

// docs/.vuepress/theme.config.ts
import { defaultTheme } from "vuepress";

// docs/.vuepress/utils/index.ts
import fs from "fs";
import path from "path";
import { exec } from "child_process";

// docs/.vuepress/utils/constant.ts
var Notes_Sidebar_Setting = [
  ["react", "fiber.md", "diff.md"],
  ["vue", "fiber.md", "diff.md"],
  ["sass", "grammar.md"],
  ["TypeScript", "grammar.md"],
  ["node", "node\u57FA\u7840\u77E5\u8BC6.md", "common_apis.md", "pm2.md"],
  ["javaScript", "\u5FC5\u4F1AAPIs.md"]
];
var Interview_Sidebar_Setting = [
  ["node", "node\u9762\u7ECF.md"]
];
var Problems_Sidebar_Setting = [
  ["node", "pm2.md"],
  ["Server", "\u670D\u52A1\u5668\u76F8\u5173\u95EE\u9898.md"]
];
var my_typora_path = "D:\\typora\u5B89\u88C5\\Typora\\Typora.exe";
var Problems_navbar_Setting = ["webpack.md", "browser.md", "vue.md", "react.md", "typeScript.md", "node.md", "nginx.md", "packageManager.md", "Server.md"];
var Interview_navbar_Setting = ["webpack.md", "browser.md", "vue.md", "react.md", "typeScript.md", "node.md", "nginx.md", "packageManager.md"];
var Notes_navbar_Setting = ["react.md", "vue.md", "sass.md", "typeScript.md", "node.md", "javaScript.md"];

// docs/.vuepress/utils/index.ts
var __vite_injected_original_dirname = "E:/360MoveData/Users/YR/Desktop/\u524D\u7AEF\u5FC5\u4F1A\u624B\u5199\u9898/Blog/docs/.vuepress/utils";
var create_navbar_md = (lib_array, dir_name, text) => {
  const children = lib_array.map((lib) => {
    const file_name = lib.split(".")[0];
    const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1);
    return {
      text: upStringFileName,
      link: `/${dir_name}/${upStringFileName}/${lib}`
    };
  });
  lib_array.forEach((lib) => {
    const file_name = lib.split(".")[0];
    const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1);
    const dir = path.resolve(__vite_injected_original_dirname, `../../${dir_name}`, upStringFileName);
    const file = path.resolve(dir, lib);
    const is_exist = fs.existsSync(file);
    const dir_exist = fs.existsSync(dir);
    try {
      if (!is_exist) {
        const framatterString = "---\nlang: zh-CN\ntitle: " + file_name + "\ndescription: \u5173\u952E\u529F\u80FD\ncollapsible: true\n---";
        if (!dir_exist) {
          fs.mkdir(dir, (err) => {
            if (!err) {
              fs.appendFile(file, framatterString, (err2) => {
                if (err2)
                  throw err2;
                console.log('The "data to append" was appended to file!');
              });
            } else {
              console.log("\u521B\u5EFA\u6587\u4EF6\u5931\u8D25", dir);
            }
          });
        } else {
          fs.appendFile(file, framatterString, (err) => {
            if (err)
              throw err;
            console.log('The "data to append" was appended to file!');
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  const nav_bar = {
    text,
    children
  };
  return nav_bar;
};
var create_sidebar_md = (lib_array, dir_name) => {
  const sidebar2 = lib_array.map((lib) => {
    const file_name = lib.shift();
    const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1);
    const intergrate_dir_name = dir_name + upStringFileName + "/";
    const sidebar_obj = {};
    lib.forEach((v) => {
      const file = path.resolve(__vite_injected_original_dirname, `../../${intergrate_dir_name + v}`);
      const is_exist = fs.existsSync(file);
      const framatterString = "---\nlang: zh-CN\ntitle: " + v.split(".")[0] + "\ndescription: \u5173\u952E\u529F\u80FD\ncollapsible: true\n---\n# " + v.split(".")[0];
      if (!is_exist) {
        try {
          fs.appendFile(file, framatterString, (err) => {
            if (err)
              throw err;
            console.log('The "data to append" was appended to file!');
          });
          exec_typora(file);
        } catch (error) {
          console.log(error);
        }
      }
    });
    sidebar_obj[intergrate_dir_name] = [
      {
        text: upStringFileName,
        collapsible: true,
        children: lib.map((v) => intergrate_dir_name + v)
      }
    ];
    return sidebar_obj;
  });
  return sidebar2;
};
var exec_typora = (md_file) => {
  if (process.env.NODE_ENV === "production" || !my_typora_path) {
    return;
  }
  const typora_path = path.normalize(my_typora_path);
  if (!fs.existsSync(typora_path)) {
    return;
  }
  md_file = path.normalize(md_file);
  exec(`${typora_path} ${md_file} `, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
};

// docs/.vuepress/sidebar.ts
var Notes_sidebar = create_sidebar_md(Notes_Sidebar_Setting, "/Notes/");
var Interview_sidebar = create_sidebar_md(Interview_Sidebar_Setting, "/Interview/");
var Problems_sidebar = create_sidebar_md(Problems_Sidebar_Setting, "/Problems/");
var sidebar_all = [...Notes_sidebar, ...Interview_sidebar, ...Problems_sidebar];
var sidebar = {};
for (let value of sidebar_all) {
  const keys = Object.keys(value);
  sidebar[keys[0]] = value[keys[0]];
}
var sidebar_default = {
  ...sidebar
};

// docs/.vuepress/navbar.ts
var navbar_default = [
  create_navbar_md(Notes_navbar_Setting, "Notes", "\u7B14\u8BB0\u67E5\u8BE2"),
  create_navbar_md(Problems_navbar_Setting, "Problems", "\u95EE\u9898\u8BB0\u5F55"),
  create_navbar_md(Interview_navbar_Setting, "Interview", "\u9762\u7ECF")
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
import path2 from "path";
var __vite_injected_original_dirname2 = "E:/360MoveData/Users/YR/Desktop/\u524D\u7AEF\u5FC5\u4F1A\u624B\u5199\u9898/Blog/docs/.vuepress";
var config_default = defineUserConfig({
  lang: "zh-CN",
  title: "fancy\u2014\u2014Blog",
  theme: theme_config_default,
  public: `${path2.resolve(__vite_injected_original_dirname2, "./public")}`,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3RoZW1lLmNvbmZpZy50cyIsICJkb2NzLy52dWVwcmVzcy91dGlscy9pbmRleC50cyIsICJkb2NzLy52dWVwcmVzcy91dGlscy9jb25zdGFudC50cyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyLnRzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L0Jsb2cvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcsIGRlZmF1bHRUaGVtZSB9IGZyb20gJ3Z1ZXByZXNzJ1xyXG5pbXBvcnQgeyBzZWFyY2hQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXNlYXJjaCdcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4vdGhlbWUuY29uZmlnJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xyXG4gICAgbGFuZzogJ3poLUNOJyxcclxuICAgIHRpdGxlOiAnZmFuY3lcdTIwMTRcdTIwMTRCbG9nJyxcclxuICAgIHRoZW1lLFxyXG4gICAgcHVibGljOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9wdWJsaWMnKX1gLFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHNlYXJjaFBsdWdpbih7XHJcbiAgICAgICAgICAgIGxvY2FsZXM6IHtcclxuICAgICAgICAgICAgICAgICcvJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnXHU2NDFDXHU3RDIyXHU1MTczXHU5NTJFXHU4QkNEJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnL3poLyc6IHtcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgXVxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OTgvQmxvZy9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcWVJcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OThcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFx0aGVtZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvJUU1JTg5JThEJUU3JUFCJUFGJUU1JUJGJTg1JUU0JUJDJTlBJUU2JTg5JThCJUU1JTg2JTk5JUU5JUEyJTk4L0Jsb2cvZG9jcy8udnVlcHJlc3MvdGhlbWUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSAndnVlcHJlc3MnXHJcbmltcG9ydCBzaWRlYmFyIGZyb20gJy4vc2lkZWJhcidcclxuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhcidcclxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdFRoZW1lKHtcclxuICAgIGxhc3RVcGRhdGVkOiB0cnVlLFxyXG4gICAgbGFzdFVwZGF0ZWRUZXh0OiAnXHU2NzAwXHU4RkQxXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JyxcclxuICAgIHNpZGViYXIsXHJcbiAgICBsb2dvOiAnL2xvZ28ucG5nJyxcclxuICAgIG5hdmJhcixcclxuXHJcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxCbG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXHV0aWxzXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3V0aWxzL2luZGV4LnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcclxuaW1wb3J0IHsgbXlfdHlwb3JhX3BhdGggfSBmcm9tICcuL2NvbnN0YW50J1xyXG5jb25zdCBjcmVhdGVfbmF2YmFyX21kID0gKGxpYl9hcnJheTogQXJyYXk8c3RyaW5nPiwgZGlyX25hbWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCkgPT4ge1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBsaWJfYXJyYXkubWFwKGxpYiA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZV9uYW1lID0gbGliLnNwbGl0KCcuJylbMF1cclxuICAgICAgICBjb25zdCB1cFN0cmluZ0ZpbGVOYW1lID0gZmlsZV9uYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBmaWxlX25hbWUuc3Vic3RyaW5nKDEpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dDogdXBTdHJpbmdGaWxlTmFtZSxcclxuICAgICAgICAgICAgbGluazogYC8ke2Rpcl9uYW1lfS8ke3VwU3RyaW5nRmlsZU5hbWV9LyR7bGlifWBcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGxpYl9hcnJheS5mb3JFYWNoKGxpYiA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZV9uYW1lID0gbGliLnNwbGl0KCcuJylbMF1cclxuICAgICAgICAvLyBcdTk5OTZcdTVCNTdcdTZCQ0RcdTU5MjdcdTUxOTlcdTY1ODdcdTRFRjZcdTU5MzlcclxuICAgICAgICBjb25zdCB1cFN0cmluZ0ZpbGVOYW1lID0gZmlsZV9uYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBmaWxlX25hbWUuc3Vic3RyaW5nKDEpXHJcbiAgICAgICAgY29uc3QgZGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgYC4uLy4uLyR7ZGlyX25hbWV9YCwgdXBTdHJpbmdGaWxlTmFtZSlcclxuICAgICAgICBjb25zdCBmaWxlID0gcGF0aC5yZXNvbHZlKGRpciwgbGliKVxyXG4gICAgICAgIGNvbnN0IGlzX2V4aXN0ID0gZnMuZXhpc3RzU3luYyhmaWxlKVxyXG4gICAgICAgIGNvbnN0IGRpcl9leGlzdCA9IGZzLmV4aXN0c1N5bmMoZGlyKVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICghaXNfZXhpc3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1hdHRlclN0cmluZyA9ICctLS1cXG5sYW5nOiB6aC1DTlxcbnRpdGxlOiAnICsgZmlsZV9uYW1lICsgJ1xcbmRlc2NyaXB0aW9uOiBcdTUxNzNcdTk1MkVcdTUyOUZcdTgwRkRcXG5jb2xsYXBzaWJsZTogdHJ1ZVxcbi0tLSdcclxuICAgICAgICAgICAgICAgIGlmICghZGlyX2V4aXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMubWtkaXIoZGlyLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy5hcHBlbmRGaWxlKGZpbGUsIGZyYW1hdHRlclN0cmluZywgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhlIFwiZGF0YSB0byBhcHBlbmRcIiB3YXMgYXBwZW5kZWQgdG8gZmlsZSEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1x1NTIxQlx1NUVGQVx1NjU4N1x1NEVGNlx1NTkzMVx1OEQyNScsIGRpcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZzLmFwcGVuZEZpbGUoZmlsZSwgZnJhbWF0dGVyU3RyaW5nLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBcImRhdGEgdG8gYXBwZW5kXCIgd2FzIGFwcGVuZGVkIHRvIGZpbGUhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxuICAgIGNvbnN0IG5hdl9iYXIgPSB7XHJcbiAgICAgICAgdGV4dCxcclxuICAgICAgICBjaGlsZHJlblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5hdl9iYXJcclxufVxyXG5cclxuY29uc3QgY3JlYXRlX3NpZGViYXJfbWQgPSAobGliX2FycmF5OiBBcnJheTxBcnJheTxzdHJpbmc+PiwgZGlyX25hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3Qgc2lkZWJhciA9IGxpYl9hcnJheS5tYXAobGliID0+IHtcclxuICAgICAgICAvLyBcdTVCNTBcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcclxuICAgICAgICBjb25zdCBmaWxlX25hbWUgPSBsaWIuc2hpZnQoKSFcclxuICAgICAgICBjb25zdCB1cFN0cmluZ0ZpbGVOYW1lID0gZmlsZV9uYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBmaWxlX25hbWUuc3Vic3RyaW5nKDEpXHJcbiAgICAgICAgLy8gXHU3MjM2XHU3RUE3XHU3NkVFXHU1RjU1K1x1ODFFQVx1NURGMVx1NzZFRVx1NUY1NVxyXG4gICAgICAgIGNvbnN0IGludGVyZ3JhdGVfZGlyX25hbWUgPSBkaXJfbmFtZSArIHVwU3RyaW5nRmlsZU5hbWUgKyAnLydcclxuICAgICAgICBjb25zdCBzaWRlYmFyX29iaiA9IHt9XHJcblxyXG4gICAgICAgIGxpYi5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgYC4uLy4uLyR7aW50ZXJncmF0ZV9kaXJfbmFtZSArIHZ9YClcclxuICAgICAgICAgICAgY29uc3QgaXNfZXhpc3QgPSBmcy5leGlzdHNTeW5jKGZpbGUpXHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1hdHRlclN0cmluZyA9ICctLS1cXG5sYW5nOiB6aC1DTlxcbnRpdGxlOiAnICsgdi5zcGxpdCgnLicpWzBdICsgJ1xcbmRlc2NyaXB0aW9uOiBcdTUxNzNcdTk1MkVcdTUyOUZcdTgwRkRcXG5jb2xsYXBzaWJsZTogdHJ1ZVxcbi0tLVxcbiMgJyArIHYuc3BsaXQoJy4nKVswXVxyXG4gICAgICAgICAgICBpZiAoIWlzX2V4aXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZzLmFwcGVuZEZpbGUoZmlsZSwgZnJhbWF0dGVyU3RyaW5nLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBcImRhdGEgdG8gYXBwZW5kXCIgd2FzIGFwcGVuZGVkIHRvIGZpbGUhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhlY190eXBvcmEoZmlsZSlcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHNpZGViYXJfb2JqW2ludGVyZ3JhdGVfZGlyX25hbWVdID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB1cFN0cmluZ0ZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGxpYi5tYXAodiA9PiBpbnRlcmdyYXRlX2Rpcl9uYW1lICsgdilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgICByZXR1cm4gc2lkZWJhcl9vYmpcclxuICAgIH0pXHJcbiAgICByZXR1cm4gc2lkZWJhclxyXG59XHJcblxyXG5jb25zdCBleGVjX3R5cG9yYSA9IChtZF9maWxlKSA9PiB7XHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyB8fCAhbXlfdHlwb3JhX3BhdGgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHR5cG9yYV9wYXRoID0gcGF0aC5ub3JtYWxpemUobXlfdHlwb3JhX3BhdGgpXHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmModHlwb3JhX3BhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBtZF9maWxlID0gcGF0aC5ub3JtYWxpemUobWRfZmlsZSlcclxuICAgIGV4ZWMoYCR7dHlwb3JhX3BhdGh9ICR7bWRfZmlsZX0gYCwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhzdGRvdXQpO1xyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZV9uYXZiYXJfbWQsIGNyZWF0ZV9zaWRlYmFyX21kIH0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L0Jsb2cvZG9jcy8udnVlcHJlc3MvdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcdXRpbHNcXFxcY29uc3RhbnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvJUU1JTg5JThEJUU3JUFCJUFGJUU1JUJGJTg1JUU0JUJDJTlBJUU2JTg5JThCJUU1JTg2JTk5JUU5JUEyJTk4L0Jsb2cvZG9jcy8udnVlcHJlc3MvdXRpbHMvY29uc3RhbnQudHNcIjtjb25zdCBOb3Rlc19TaWRlYmFyX1NldHRpbmcgPSBbXHJcbiAgICBbJ3JlYWN0JywgJ2ZpYmVyLm1kJywgJ2RpZmYubWQnXSxcclxuICAgIFsndnVlJywgJ2ZpYmVyLm1kJywgJ2RpZmYubWQnXSxcclxuICAgIFsnc2FzcycsICdncmFtbWFyLm1kJ10sXHJcbiAgICBbJ1R5cGVTY3JpcHQnLCAnZ3JhbW1hci5tZCddLFxyXG4gICAgWydub2RlJywgJ25vZGVcdTU3RkFcdTc4NDBcdTc3RTVcdThCQzYubWQnLCAnY29tbW9uX2FwaXMubWQnLCAncG0yLm1kJ10sXHJcbiAgICBbJ2phdmFTY3JpcHQnLCAnXHU1RkM1XHU0RjFBQVBJcy5tZCddXHJcbl1cclxuY29uc3QgSW50ZXJ2aWV3X1NpZGViYXJfU2V0dGluZyA9IFtcclxuICAgIFsnbm9kZScsICdub2RlXHU5NzYyXHU3RUNGLm1kJ10sXHJcbl1cclxuY29uc3QgUHJvYmxlbXNfU2lkZWJhcl9TZXR0aW5nID0gW1xyXG4gICAgWydub2RlJywgJ3BtMi5tZCddLFxyXG4gICAgWydTZXJ2ZXInLCAnXHU2NzBEXHU1MkExXHU1NjY4XHU3NkY4XHU1MTczXHU5NUVFXHU5ODk4Lm1kJ11cclxuXVxyXG5cclxuXHJcblxyXG5jb25zdCBteV90eXBvcmFfcGF0aCA9IFwiRDpcXFxcdHlwb3JhXHU1Qjg5XHU4OEM1XFxcXFR5cG9yYVxcXFxUeXBvcmEuZXhlXCJcclxuXHJcbmNvbnN0IFByb2JsZW1zX25hdmJhcl9TZXR0aW5nID0gWyd3ZWJwYWNrLm1kJywgJ2Jyb3dzZXIubWQnLCAndnVlLm1kJywgJ3JlYWN0Lm1kJywgJ3R5cGVTY3JpcHQubWQnLCAnbm9kZS5tZCcsICduZ2lueC5tZCcsICdwYWNrYWdlTWFuYWdlci5tZCcsICdTZXJ2ZXIubWQnXVxyXG5jb25zdCBJbnRlcnZpZXdfbmF2YmFyX1NldHRpbmcgPSBbJ3dlYnBhY2subWQnLCAnYnJvd3Nlci5tZCcsICd2dWUubWQnLCAncmVhY3QubWQnLCAndHlwZVNjcmlwdC5tZCcsICdub2RlLm1kJywgJ25naW54Lm1kJywgJ3BhY2thZ2VNYW5hZ2VyLm1kJ11cclxuY29uc3QgTm90ZXNfbmF2YmFyX1NldHRpbmcgPSBbJ3JlYWN0Lm1kJywgJ3Z1ZS5tZCcsICdzYXNzLm1kJywgJ3R5cGVTY3JpcHQubWQnLCAnbm9kZS5tZCcsICdqYXZhU2NyaXB0Lm1kJ11cclxuZXhwb3J0IHtcclxuICAgIE5vdGVzX1NpZGViYXJfU2V0dGluZyxcclxuICAgIEludGVydmlld19TaWRlYmFyX1NldHRpbmcsXHJcbiAgICBQcm9ibGVtc19TaWRlYmFyX1NldHRpbmcsXHJcbiAgICBQcm9ibGVtc19uYXZiYXJfU2V0dGluZyxcclxuICAgIEludGVydmlld19uYXZiYXJfU2V0dGluZyxcclxuICAgIE5vdGVzX25hdmJhcl9TZXR0aW5nLFxyXG4gICAgbXlfdHlwb3JhX3BhdGhcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OTgvQmxvZy9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcWVJcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OThcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXIudHNcIjtpbXBvcnQgeyBjcmVhdGVfc2lkZWJhcl9tZCB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IE5vdGVzX1NpZGViYXJfU2V0dGluZywgSW50ZXJ2aWV3X1NpZGViYXJfU2V0dGluZywgUHJvYmxlbXNfU2lkZWJhcl9TZXR0aW5nIH0gZnJvbSAnLi91dGlscy9jb25zdGFudCdcclxuXHJcbmNvbnN0IE5vdGVzX3NpZGViYXIgPSBjcmVhdGVfc2lkZWJhcl9tZChOb3Rlc19TaWRlYmFyX1NldHRpbmcsICcvTm90ZXMvJylcclxuY29uc3QgSW50ZXJ2aWV3X3NpZGViYXIgPSBjcmVhdGVfc2lkZWJhcl9tZChJbnRlcnZpZXdfU2lkZWJhcl9TZXR0aW5nLCAnL0ludGVydmlldy8nKVxyXG5jb25zdCBQcm9ibGVtc19zaWRlYmFyID0gY3JlYXRlX3NpZGViYXJfbWQoUHJvYmxlbXNfU2lkZWJhcl9TZXR0aW5nLCAnL1Byb2JsZW1zLycpXHJcbmNvbnN0IHNpZGViYXJfYWxsID0gWy4uLk5vdGVzX3NpZGViYXIsIC4uLkludGVydmlld19zaWRlYmFyLCAuLi5Qcm9ibGVtc19zaWRlYmFyXVxyXG5cclxuXHJcbmNvbnN0IHNpZGViYXIgPSB7fVxyXG5cclxuZm9yIChsZXQgdmFsdWUgb2Ygc2lkZWJhcl9hbGwpIHtcclxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcclxuICAgIHNpZGViYXJba2V5c1swXV0gPSB2YWx1ZVtrZXlzWzBdXVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLi4uc2lkZWJhcixcclxufVxyXG5cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxCbG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXG5hdmJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC8lRTUlODklOEQlRTclQUIlQUYlRTUlQkYlODUlRTQlQkMlOUElRTYlODklOEIlRTUlODYlOTklRTklQTIlOTgvQmxvZy9kb2NzLy52dWVwcmVzcy9uYXZiYXIudHNcIjtcclxuaW1wb3J0IHsgY3JlYXRlX25hdmJhcl9tZCB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IFByb2JsZW1zX25hdmJhcl9TZXR0aW5nLCBJbnRlcnZpZXdfbmF2YmFyX1NldHRpbmcsIE5vdGVzX25hdmJhcl9TZXR0aW5nIH0gZnJvbSAnLi91dGlscy9jb25zdGFudCdcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgICBjcmVhdGVfbmF2YmFyX21kKE5vdGVzX25hdmJhcl9TZXR0aW5nLCAnTm90ZXMnLCAnXHU3QjE0XHU4QkIwXHU2N0U1XHU4QkUyJyksXHJcbiAgICBjcmVhdGVfbmF2YmFyX21kKFByb2JsZW1zX25hdmJhcl9TZXR0aW5nLCAnUHJvYmxlbXMnLCAnXHU5NUVFXHU5ODk4XHU4QkIwXHU1RjU1JyksXHJcbiAgICBjcmVhdGVfbmF2YmFyX21kKEludGVydmlld19uYXZiYXJfU2V0dGluZywgJ0ludGVydmlldycsICdcdTk3NjJcdTdFQ0YnKSxcclxuXVxyXG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyWixTQUFTLHdCQUFzQztBQUMxYyxTQUFTLG9CQUFvQjs7O0FDRDBZLFNBQVMsb0JBQW9COzs7QUNBeEIsT0FBTyxRQUFRO0FBQzNiLE9BQU8sVUFBVTtBQUNqQixTQUFTLFlBQVk7OztBQ0Y2WixJQUFNLHdCQUF3QjtBQUFBLEVBQzVjLENBQUMsU0FBUyxZQUFZLFNBQVM7QUFBQSxFQUMvQixDQUFDLE9BQU8sWUFBWSxTQUFTO0FBQUEsRUFDN0IsQ0FBQyxRQUFRLFlBQVk7QUFBQSxFQUNyQixDQUFDLGNBQWMsWUFBWTtBQUFBLEVBQzNCLENBQUMsUUFBUSxtQ0FBZSxrQkFBa0IsUUFBUTtBQUFBLEVBQ2xELENBQUMsY0FBYyxxQkFBVztBQUM5QjtBQUNBLElBQU0sNEJBQTRCO0FBQUEsRUFDOUIsQ0FBQyxRQUFRLHFCQUFXO0FBQ3hCO0FBQ0EsSUFBTSwyQkFBMkI7QUFBQSxFQUM3QixDQUFDLFFBQVEsUUFBUTtBQUFBLEVBQ2pCLENBQUMs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QUssQ0FBQyxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQztBQUNwQztBQUdBLElBQU8sa0JBQVE7QUFBQSxFQUNYLEdBQUc7QUFDUDs7O0FDZEEsSUFBTyxpQkFBUTtBQUFBLEVBQ1gsaUJBQWlCLHNCQUFzQixTQUFTLDBCQUFNO0FBQUEsRUFDdEQsaUJBQWlCLHlCQUF5QixZQUFZLDBCQUFNO0FBQUEsRUFDNUQsaUJBQWlCLDBCQUEwQixhQUFhLGNBQUk7QUFDaEU7OztBSk5BLElBQU8sdUJBQVEsYUFBYTtBQUFBLEVBQ3hCLGFBQWE7QUFBQSxFQUNiLGlCQUFpQjtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTjtBQUVKLENBQUM7OztBRFBELE9BQU9DLFdBQVU7QUFIakIsSUFBTUMsb0NBQW1DO0FBTXpDLElBQU8saUJBQVEsaUJBQWlCO0FBQUEsRUFDNUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1A7QUFBQSxFQUNBLFFBQVEsR0FBR0MsTUFBSyxRQUFRQyxtQ0FBVyxVQUFVO0FBQUEsRUFDN0MsU0FBUztBQUFBLElBQ0wsYUFBYTtBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ0wsS0FBSztBQUFBLFVBQ0QsYUFBYTtBQUFBLFFBQ2pCO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDSixhQUFhO0FBQUEsUUFDakI7QUFBQSxNQUNKO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbImVyciIsICJzaWRlYmFyIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K