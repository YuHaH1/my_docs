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
var subject = {
  react: "react",
  vue: "vue",
  sass: "sass",
  ts: "typeScript",
  node: "node",
  js: "javaScript",
  docker: "docker",
  npm: "\u5305\u7BA1\u7406\u5DE5\u5177",
  vite: "vite",
  webpack: "webpack",
  ["\u8BA1\u7B97\u673A\u7F51\u7EDC"]: "\u8BA1\u7B97\u673A\u7F51\u7EDC",
  ["\u670D\u52A1\u5668"]: "\u670D\u52A1\u5668"
};
var Notes_Sidebar_Setting = [
  [subject.react, "fiber.md", "diff.md"],
  [subject.vue],
  [subject.sass, "grammar.md"],
  [subject.ts, "grammar.md"],
  [subject.node, "node\u57FA\u7840\u77E5\u8BC6.md", "common_apis.md", "pm2.md"],
  [subject.js, "\u5FC5\u4F1AAPIs.md"],
  [subject.docker, "docker\u57FA\u7840\u77E5\u8BC6.md"]
];
var Interview_Sidebar_Setting = [
  [subject.node, "node\u9762\u7ECF.md"],
  [subject["\u8BA1\u7B97\u673A\u7F51\u7EDC"], "\u8BA1\u7B97\u673A\u7F51\u7EDC\u76F8\u5173\u9762\u8BD5\u9898.md"]
];
var Problems_Sidebar_Setting = [
  [subject.node, "pm2.md"],
  [subject["\u670D\u52A1\u5668"], "\u670D\u52A1\u5668\u76F8\u5173\u95EE\u9898.md"]
];
var my_typora_path = "D:\\typora\u5B89\u88C5\\Typora\\Typora.exe";
var Problems_navbar_Setting = [
  subject,
  "browser",
  "vue",
  "react",
  "typeScript",
  subject["\u670D\u52A1\u5668"],
  "nginx",
  "packageManager",
  "Server"
];
var Interview_navbar_Setting = [
  "webpack",
  "browser",
  "vue",
  "react",
  "typeScript",
  subject.node,
  "nginx",
  "packageManager",
  subject["\u8BA1\u7B97\u673A\u7F51\u7EDC"]
];
var Notes_navbar_Setting = [
  subject.react,
  subject.vue,
  subject.sass,
  subject.ts,
  subject.node,
  subject.js,
  subject.docker
];

// docs/.vuepress/utils/index.ts
var __vite_injected_original_dirname = "E:/360MoveData/Users/YR/Desktop/\u524D\u7AEF\u5FC5\u4F1A\u624B\u5199\u9898/Blog/docs/.vuepress/utils";
var create_navbar_md = (lib_array, dir_name, text) => {
  lib_array.forEach((lib) => {
    const file_name = lib.split(".")[0];
    const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1);
    const dir = path.resolve(__vite_injected_original_dirname, `../../${dir_name}`, upStringFileName);
    const dir_exist = fs.existsSync(dir);
    if (!dir_exist) {
      fs.mkdir(dir, (err) => {
        if (err) {
          console.log("\u521B\u5EFA\u6587\u4EF6\u5931\u8D25", dir);
        }
      });
    }
  });
  const children = lib_array.map((lib) => {
    const file_name = lib.split(".")[0];
    const upStringFileName = file_name[0].toUpperCase() + file_name.substring(1);
    const dirs = fs.readdirSync(path.resolve(__vite_injected_original_dirname, `../../${dir_name}/${upStringFileName}`));
    let md_file = dirs.filter((v) => v !== lib);
    md_file = md_file.length > 0 ? md_file[md_file.length - 1] : [];
    return {
      text: upStringFileName,
      link: `/${dir_name}/${upStringFileName}/${md_file}`
    };
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
    console.log(sidebar_obj);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3RoZW1lLmNvbmZpZy50cyIsICJkb2NzLy52dWVwcmVzcy91dGlscy9pbmRleC50cyIsICJkb2NzLy52dWVwcmVzcy91dGlscy9jb25zdGFudC50cyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyLnRzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L0Jsb2cvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcsIGRlZmF1bHRUaGVtZSB9IGZyb20gJ3Z1ZXByZXNzJ1xyXG5pbXBvcnQgeyBzZWFyY2hQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXNlYXJjaCdcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4vdGhlbWUuY29uZmlnJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xyXG4gICAgbGFuZzogJ3poLUNOJyxcclxuICAgIHRpdGxlOiAnZmFuY3lcdTIwMTRcdTIwMTRCbG9nJyxcclxuICAgIHRoZW1lLFxyXG4gICAgcHVibGljOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9wdWJsaWMnKX1gLFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHNlYXJjaFBsdWdpbih7XHJcbiAgICAgICAgICAgIGxvY2FsZXM6IHtcclxuICAgICAgICAgICAgICAgICcvJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnXHU2NDFDXHU3RDIyXHU1MTczXHU5NTJFXHU4QkNEJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnL3poLyc6IHtcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgXVxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OTgvQmxvZy9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcWVJcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OThcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFx0aGVtZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvJUU1JTg5JThEJUU3JUFCJUFGJUU1JUJGJTg1JUU0JUJDJTlBJUU2JTg5JThCJUU1JTg2JTk5JUU5JUEyJTk4L0Jsb2cvZG9jcy8udnVlcHJlc3MvdGhlbWUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSAndnVlcHJlc3MnXHJcbmltcG9ydCBzaWRlYmFyIGZyb20gJy4vc2lkZWJhcidcclxuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhcidcclxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdFRoZW1lKHtcclxuICAgIGxhc3RVcGRhdGVkOiB0cnVlLFxyXG4gICAgbGFzdFVwZGF0ZWRUZXh0OiAnXHU2NzAwXHU4RkQxXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JyxcclxuICAgIHNpZGViYXIsXHJcbiAgICBsb2dvOiAnL2xvZ28ucG5nJyxcclxuICAgIG5hdmJhcixcclxuXHJcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxCbG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXHV0aWxzXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3V0aWxzL2luZGV4LnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcclxuaW1wb3J0IHsgbXlfdHlwb3JhX3BhdGggfSBmcm9tICcuL2NvbnN0YW50J1xyXG5jb25zdCBjcmVhdGVfbmF2YmFyX21kID0gKGxpYl9hcnJheTogQXJyYXk8c3RyaW5nPiwgZGlyX25hbWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCkgPT4ge1xyXG5cclxuXHJcbiAgICBsaWJfYXJyYXkuZm9yRWFjaChsaWIgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbGVfbmFtZSA9IGxpYi5zcGxpdCgnLicpWzBdXHJcbiAgICAgICAgLy8gXHU5OTk2XHU1QjU3XHU2QkNEXHU1OTI3XHU1MTk5XHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICAgICAgY29uc3QgdXBTdHJpbmdGaWxlTmFtZSA9IGZpbGVfbmFtZVswXS50b1VwcGVyQ2FzZSgpICsgZmlsZV9uYW1lLnN1YnN0cmluZygxKVxyXG4gICAgICAgIGNvbnN0IGRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi8uLi8ke2Rpcl9uYW1lfWAsIHVwU3RyaW5nRmlsZU5hbWUpXHJcbiAgICAgICAgLy8gY29uc3QgZmlsZSA9IHBhdGgucmVzb2x2ZShkaXIsIGxpYilcclxuICAgICAgICAvLyBjb25zdCBpc19leGlzdCA9IGZzLmV4aXN0c1N5bmMoZmlsZSlcclxuICAgICAgICBjb25zdCBkaXJfZXhpc3QgPSBmcy5leGlzdHNTeW5jKGRpcilcclxuICAgICAgICAvLyBpZiAoIWlzX2V4aXN0KSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGZyYW1hdHRlclN0cmluZyA9ICctLS1cXG5sYW5nOiB6aC1DTlxcbnRpdGxlOiAnICsgZmlsZV9uYW1lICsgJ1xcbmRlc2NyaXB0aW9uOiBcdTUxNzNcdTk1MkVcdTUyOUZcdTgwRkRcXG5jb2xsYXBzaWJsZTogdHJ1ZVxcbi0tLSdcclxuICAgICAgICBpZiAoIWRpcl9leGlzdCkge1xyXG4gICAgICAgICAgICBmcy5ta2RpcihkaXIsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnXHU1MjFCXHU1RUZBXHU2NTg3XHU0RUY2XHU1OTMxXHU4RDI1JywgZGlyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IGxpYl9hcnJheS5tYXAobGliID0+IHtcclxuICAgICAgICBjb25zdCBmaWxlX25hbWUgPSBsaWIuc3BsaXQoJy4nKVswXVxyXG4gICAgICAgIGNvbnN0IHVwU3RyaW5nRmlsZU5hbWUgPSBmaWxlX25hbWVbMF0udG9VcHBlckNhc2UoKSArIGZpbGVfbmFtZS5zdWJzdHJpbmcoMSlcclxuICAgICAgICBjb25zdCBkaXJzID0gZnMucmVhZGRpclN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgYC4uLy4uLyR7ZGlyX25hbWV9LyR7dXBTdHJpbmdGaWxlTmFtZX1gKSlcclxuICAgICAgICBsZXQgbWRfZmlsZSA9IGRpcnMuZmlsdGVyKHYgPT4gdiAhPT0gbGliKVxyXG4gICAgICAgIG1kX2ZpbGUgPSBtZF9maWxlLmxlbmd0aCA+IDAgPyBtZF9maWxlW21kX2ZpbGUubGVuZ3RoIC0gMV0gOiBbXVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHQ6IHVwU3RyaW5nRmlsZU5hbWUsXHJcbiAgICAgICAgICAgIGxpbms6IGAvJHtkaXJfbmFtZX0vJHt1cFN0cmluZ0ZpbGVOYW1lfS8ke21kX2ZpbGV9YFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxuICAgIGNvbnN0IG5hdl9iYXIgPSB7XHJcbiAgICAgICAgdGV4dCxcclxuICAgICAgICBjaGlsZHJlblxyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2cobmF2X2Jhcik7XHJcbiAgICByZXR1cm4gbmF2X2JhclxyXG59XHJcblxyXG5jb25zdCBjcmVhdGVfc2lkZWJhcl9tZCA9IChsaWJfYXJyYXk6IEFycmF5PEFycmF5PHN0cmluZz4+LCBkaXJfbmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gbGliX2FycmF5Lm1hcChsaWIgPT4ge1xyXG4gICAgICAgIC8vIFx1NUI1MFx1NzZFRVx1NUY1NVx1NTQwRFx1NzlGMFxyXG4gICAgICAgIGNvbnN0IGZpbGVfbmFtZSA9IGxpYi5zaGlmdCgpIVxyXG4gICAgICAgIGNvbnN0IHVwU3RyaW5nRmlsZU5hbWUgPSBmaWxlX25hbWVbMF0udG9VcHBlckNhc2UoKSArIGZpbGVfbmFtZS5zdWJzdHJpbmcoMSlcclxuICAgICAgICAvLyBcdTcyMzZcdTdFQTdcdTc2RUVcdTVGNTUrXHU4MUVBXHU1REYxXHU3NkVFXHU1RjU1XHJcbiAgICAgICAgY29uc3QgaW50ZXJncmF0ZV9kaXJfbmFtZSA9IGRpcl9uYW1lICsgdXBTdHJpbmdGaWxlTmFtZSArICcvJ1xyXG4gICAgICAgIGNvbnN0IHNpZGViYXJfb2JqID0ge31cclxuXHJcbiAgICAgICAgbGliLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBgLi4vLi4vJHtpbnRlcmdyYXRlX2Rpcl9uYW1lICsgdn1gKVxyXG4gICAgICAgICAgICBjb25zdCBpc19leGlzdCA9IGZzLmV4aXN0c1N5bmMoZmlsZSlcclxuICAgICAgICAgICAgY29uc3QgZnJhbWF0dGVyU3RyaW5nID0gJy0tLVxcbmxhbmc6IHpoLUNOXFxudGl0bGU6ICcgKyB2LnNwbGl0KCcuJylbMF0gKyAnXFxuZGVzY3JpcHRpb246IFx1NTE3M1x1OTUyRVx1NTI5Rlx1ODBGRFxcbmNvbGxhcHNpYmxlOiB0cnVlXFxuLS0tXFxuIyAnICsgdi5zcGxpdCgnLicpWzBdXHJcbiAgICAgICAgICAgIGlmICghaXNfZXhpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuYXBwZW5kRmlsZShmaWxlLCBmcmFtYXR0ZXJTdHJpbmcsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhlIFwiZGF0YSB0byBhcHBlbmRcIiB3YXMgYXBwZW5kZWQgdG8gZmlsZSEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBleGVjX3R5cG9yYShmaWxlKVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICBzaWRlYmFyX29ialtpbnRlcmdyYXRlX2Rpcl9uYW1lXSA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogdXBTdHJpbmdGaWxlTmFtZSxcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGxpYi5tYXAodiA9PiBpbnRlcmdyYXRlX2Rpcl9uYW1lICsgdilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgICBjb25zb2xlLmxvZyhzaWRlYmFyX29iaik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHNpZGViYXJfb2JqXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHNpZGViYXJcclxufVxyXG5cclxuY29uc3QgZXhlY190eXBvcmEgPSAobWRfZmlsZSkgPT4ge1xyXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgfHwgIW15X3R5cG9yYV9wYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCB0eXBvcmFfcGF0aCA9IHBhdGgubm9ybWFsaXplKG15X3R5cG9yYV9wYXRoKVxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHR5cG9yYV9wYXRoKSkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgbWRfZmlsZSA9IHBhdGgubm9ybWFsaXplKG1kX2ZpbGUpXHJcbiAgICBleGVjKGAke3R5cG9yYV9wYXRofSAke21kX2ZpbGV9IGAsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coc3Rkb3V0KTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBjcmVhdGVfbmF2YmFyX21kLCBjcmVhdGVfc2lkZWJhcl9tZCB9IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxCbG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXHV0aWxzXFxcXGNvbnN0YW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3V0aWxzL2NvbnN0YW50LnRzXCI7Y29uc3Qgc3ViamVjdCA9IHtcclxuICAgIHJlYWN0OiAncmVhY3QnLFxyXG4gICAgdnVlOiAndnVlJyxcclxuICAgIHNhc3M6ICdzYXNzJyxcclxuICAgIHRzOiAndHlwZVNjcmlwdCcsXHJcbiAgICBub2RlOiAnbm9kZScsXHJcbiAgICBqczogJ2phdmFTY3JpcHQnLFxyXG4gICAgZG9ja2VyOiAnZG9ja2VyJyxcclxuICAgIG5wbTogJ1x1NTMwNVx1N0JBMVx1NzQwNlx1NURFNVx1NTE3NycsXHJcbiAgICB2aXRlOiAndml0ZScsXHJcbiAgICB3ZWJwYWNrOiAnd2VicGFjaycsXHJcbiAgICBbJ1x1OEJBMVx1N0I5N1x1NjczQVx1N0Y1MVx1N0VEQyddOiAnXHU4QkExXHU3Qjk3XHU2NzNBXHU3RjUxXHU3RURDJyxcclxuICAgIFsnXHU2NzBEXHU1MkExXHU1NjY4J106ICdcdTY3MERcdTUyQTFcdTU2NjgnXHJcbn1cclxuXHJcblxyXG5jb25zdCBOb3Rlc19TaWRlYmFyX1NldHRpbmcgPSBbXHJcbiAgICBbc3ViamVjdC5yZWFjdCwgJ2ZpYmVyLm1kJywgJ2RpZmYubWQnXSxcclxuICAgIFtzdWJqZWN0LnZ1ZV0sXHJcbiAgICBbc3ViamVjdC5zYXNzLCAnZ3JhbW1hci5tZCddLFxyXG4gICAgW3N1YmplY3QudHMsICdncmFtbWFyLm1kJ10sXHJcbiAgICBbc3ViamVjdC5ub2RlLCAnbm9kZVx1NTdGQVx1Nzg0MFx1NzdFNVx1OEJDNi5tZCcsICdjb21tb25fYXBpcy5tZCcsICdwbTIubWQnXSxcclxuICAgIFtzdWJqZWN0LmpzLCAnXHU1RkM1XHU0RjFBQVBJcy5tZCddLFxyXG4gICAgW3N1YmplY3QuZG9ja2VyLCAnZG9ja2VyXHU1N0ZBXHU3ODQwXHU3N0U1XHU4QkM2Lm1kJ11cclxuXVxyXG5jb25zdCBJbnRlcnZpZXdfU2lkZWJhcl9TZXR0aW5nID0gW1xyXG4gICAgW3N1YmplY3Qubm9kZSwgJ25vZGVcdTk3NjJcdTdFQ0YubWQnXSxcclxuICAgIFtzdWJqZWN0WydcdThCQTFcdTdCOTdcdTY3M0FcdTdGNTFcdTdFREMnXSwgJ1x1OEJBMVx1N0I5N1x1NjczQVx1N0Y1MVx1N0VEQ1x1NzZGOFx1NTE3M1x1OTc2Mlx1OEJENVx1OTg5OC5tZCddLFxyXG5dXHJcbmNvbnN0IFByb2JsZW1zX1NpZGViYXJfU2V0dGluZyA9IFtcclxuICAgIFtzdWJqZWN0Lm5vZGUsICdwbTIubWQnXSxcclxuICAgIFtzdWJqZWN0WydcdTY3MERcdTUyQTFcdTU2NjgnXSwgJ1x1NjcwRFx1NTJBMVx1NTY2OFx1NzZGOFx1NTE3M1x1OTVFRVx1OTg5OC5tZCddLFxyXG5dXHJcblxyXG5cclxuXHJcbmNvbnN0IG15X3R5cG9yYV9wYXRoID0gXCJEOlxcXFx0eXBvcmFcdTVCODlcdTg4QzVcXFxcVHlwb3JhXFxcXFR5cG9yYS5leGVcIlxyXG5cclxuXHJcbmNvbnN0IFByb2JsZW1zX25hdmJhcl9TZXR0aW5nID0gW1xyXG4gICAgc3ViamVjdCxcclxuICAgICdicm93c2VyJyxcclxuICAgICd2dWUnLFxyXG4gICAgJ3JlYWN0JyxcclxuICAgICd0eXBlU2NyaXB0JyxcclxuICAgIHN1YmplY3RbJ1x1NjcwRFx1NTJBMVx1NTY2OCddLFxyXG4gICAgJ25naW54JyxcclxuICAgICdwYWNrYWdlTWFuYWdlcicsXHJcbiAgICAnU2VydmVyJ1xyXG5dXHJcbmNvbnN0IEludGVydmlld19uYXZiYXJfU2V0dGluZyA9IFtcclxuICAgICd3ZWJwYWNrJyxcclxuICAgICdicm93c2VyJyxcclxuICAgICd2dWUnLFxyXG4gICAgJ3JlYWN0JyxcclxuICAgICd0eXBlU2NyaXB0JyxcclxuICAgIHN1YmplY3Qubm9kZSxcclxuICAgICduZ2lueCcsXHJcbiAgICAncGFja2FnZU1hbmFnZXInLFxyXG4gICAgc3ViamVjdFsnXHU4QkExXHU3Qjk3XHU2NzNBXHU3RjUxXHU3RURDJ11cclxuXVxyXG5jb25zdCBOb3Rlc19uYXZiYXJfU2V0dGluZyA9IFtcclxuICAgIHN1YmplY3QucmVhY3QsXHJcbiAgICBzdWJqZWN0LnZ1ZSxcclxuICAgIHN1YmplY3Quc2FzcyxcclxuICAgIHN1YmplY3QudHMsXHJcbiAgICBzdWJqZWN0Lm5vZGUsXHJcbiAgICBzdWJqZWN0LmpzLFxyXG4gICAgc3ViamVjdC5kb2NrZXIsXHJcbl1cclxuZXhwb3J0IHtcclxuICAgIE5vdGVzX1NpZGViYXJfU2V0dGluZyxcclxuICAgIEludGVydmlld19TaWRlYmFyX1NldHRpbmcsXHJcbiAgICBQcm9ibGVtc19TaWRlYmFyX1NldHRpbmcsXHJcbiAgICBQcm9ibGVtc19uYXZiYXJfU2V0dGluZyxcclxuICAgIEludGVydmlld19uYXZiYXJfU2V0dGluZyxcclxuICAgIE5vdGVzX25hdmJhcl9TZXR0aW5nLFxyXG4gICAgbXlfdHlwb3JhX3BhdGhcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OTgvQmxvZy9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcWVJcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OThcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3NpZGViYXIudHNcIjtpbXBvcnQgeyBjcmVhdGVfc2lkZWJhcl9tZCB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IE5vdGVzX1NpZGViYXJfU2V0dGluZywgSW50ZXJ2aWV3X1NpZGViYXJfU2V0dGluZywgUHJvYmxlbXNfU2lkZWJhcl9TZXR0aW5nIH0gZnJvbSAnLi91dGlscy9jb25zdGFudCdcclxuXHJcbmNvbnN0IE5vdGVzX3NpZGViYXIgPSBjcmVhdGVfc2lkZWJhcl9tZChOb3Rlc19TaWRlYmFyX1NldHRpbmcsICcvTm90ZXMvJylcclxuY29uc3QgSW50ZXJ2aWV3X3NpZGViYXIgPSBjcmVhdGVfc2lkZWJhcl9tZChJbnRlcnZpZXdfU2lkZWJhcl9TZXR0aW5nLCAnL0ludGVydmlldy8nKVxyXG5jb25zdCBQcm9ibGVtc19zaWRlYmFyID0gY3JlYXRlX3NpZGViYXJfbWQoUHJvYmxlbXNfU2lkZWJhcl9TZXR0aW5nLCAnL1Byb2JsZW1zLycpXHJcbmNvbnN0IHNpZGViYXJfYWxsID0gWy4uLk5vdGVzX3NpZGViYXIsIC4uLkludGVydmlld19zaWRlYmFyLCAuLi5Qcm9ibGVtc19zaWRlYmFyXVxyXG5cclxuXHJcbmNvbnN0IHNpZGViYXIgPSB7fVxyXG5cclxuZm9yIChsZXQgdmFsdWUgb2Ygc2lkZWJhcl9hbGwpIHtcclxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcclxuICAgIHNpZGViYXJba2V5c1swXV0gPSB2YWx1ZVtrZXlzWzBdXVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLi4uc2lkZWJhcixcclxufVxyXG5cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9CbG9nL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxCbG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXG5hdmJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC8lRTUlODklOEQlRTclQUIlQUYlRTUlQkYlODUlRTQlQkMlOUElRTYlODklOEIlRTUlODYlOTklRTklQTIlOTgvQmxvZy9kb2NzLy52dWVwcmVzcy9uYXZiYXIudHNcIjtcclxuaW1wb3J0IHsgY3JlYXRlX25hdmJhcl9tZCB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IFByb2JsZW1zX25hdmJhcl9TZXR0aW5nLCBJbnRlcnZpZXdfbmF2YmFyX1NldHRpbmcsIE5vdGVzX25hdmJhcl9TZXR0aW5nIH0gZnJvbSAnLi91dGlscy9jb25zdGFudCdcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgICBjcmVhdGVfbmF2YmFyX21kKE5vdGVzX25hdmJhcl9TZXR0aW5nLCAnTm90ZXMnLCAnXHU3QjE0XHU4QkIwXHU2N0U1XHU4QkUyJyksXHJcbiAgICBjcmVhdGVfbmF2YmFyX21kKFByb2JsZW1zX25hdmJhcl9TZXR0aW5nLCAnUHJvYmxlbXMnLCAnXHU5NUVFXHU5ODk4XHU4QkIwXHU1RjU1JyksXHJcbiAgICBjcmVhdGVfbmF2YmFyX21kKEludGVydmlld19uYXZiYXJfU2V0dGluZywgJ0ludGVydmlldycsICdcdTk3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WUFBWSwwQkFBTTtBQUFBLEVBQzVELGlCQUFpQiwwQkFBMEIsYUFBYSxjQUFJO0FBQ2hFOzs7QUpOQSxJQUFPLHVCQUFRLGFBQWE7QUFBQSxFQUN4QixhQUFhO0FBQUEsRUFDYixpQkFBaUI7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ047QUFFSixDQUFDOzs7QURQRCxPQUFPQyxXQUFVO0FBSGpCLElBQU1DLG9DQUFtQztBQU16QyxJQUFPLGlCQUFRLGlCQUFpQjtBQUFBLEVBQzVCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQO0FBQUEsRUFDQSxRQUFRLEdBQUdDLE1BQUssUUFBUUMsbUNBQVcsVUFBVTtBQUFBLEVBQzdDLFNBQVM7QUFBQSxJQUNMLGFBQWE7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNMLEtBQUs7QUFBQSxVQUNELGFBQWE7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ0osYUFBYTtBQUFBLFFBQ2pCO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJzaWRlYmFyIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
