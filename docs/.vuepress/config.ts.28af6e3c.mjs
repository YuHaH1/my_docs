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
var SUBJECTS = {
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
  ["\u8BA1\u7B97\u673A\u7F51\u7EDC"]: "ComputerNetwork",
  ["\u670D\u52A1\u5668"]: "Server",
  linux: "linux",
  css: "css",
  canvas: "canvas",
  utils: {
    vuepress: "vuepress"
  }
};
var Notes_Sidebar_Setting = [
  [SUBJECTS.react, "fiber.md", "diff.md"],
  [SUBJECTS.vue, "diff.md"],
  [SUBJECTS.sass, "grammar.md"],
  [SUBJECTS.ts, "grammar.md"],
  [SUBJECTS.node, "node\u57FA\u7840\u77E5\u8BC6.md", "common_apis.md", "pm2.md"],
  [SUBJECTS.js, "\u5FC5\u4F1AAPIs.md"],
  [SUBJECTS.docker, "docker\u57FA\u7840\u77E5\u8BC6.md"],
  [SUBJECTS.linux, "linux\u5E38\u7528\u6307\u4EE4.md"],
  [SUBJECTS.css, "\u4F60\u4E0D\u77E5\u9053\u7684css.md"],
  [SUBJECTS.canvas, "canvas\u57FA\u7840.md"]
];
var Interview_Sidebar_Setting = [
  [SUBJECTS.node, "node\u9762\u7ECF.md"],
  [SUBJECTS["\u8BA1\u7B97\u673A\u7F51\u7EDC"], "\u8BA1\u7B97\u673A\u7F51\u7EDC.md"],
  [SUBJECTS.js, "js\u9762\u7ECF.md"],
  [SUBJECTS.css, "css\u9762\u7ECF.md"]
];
var Problems_Sidebar_Setting = [
  [SUBJECTS.node, "pm2.md"],
  [SUBJECTS["\u670D\u52A1\u5668"], "\u670D\u52A1\u5668.md"]
];
var Utils_Sidebar_Setting = [
  [SUBJECTS.utils.vuepress, "Vuepress\u63D2\u4EF6.md"]
];
var my_typora_path = "D:\\typora\u5B89\u88C5\\Typora\\Typora.exe";
var Problems_navbar_Setting = [
  SUBJECTS["\u670D\u52A1\u5668"]
];
var Interview_navbar_Setting = [
  SUBJECTS.node,
  SUBJECTS["\u8BA1\u7B97\u673A\u7F51\u7EDC"]
];
var Utils_navbar_Setting = [
  SUBJECTS.utils.vuepress
];
var Notes_navbar_Setting = [
  SUBJECTS.react,
  SUBJECTS.vue,
  SUBJECTS.sass,
  SUBJECTS.ts,
  SUBJECTS.node,
  SUBJECTS.js,
  SUBJECTS.docker,
  SUBJECTS.linux,
  SUBJECTS.css,
  SUBJECTS.canvas
];

// docs/.vuepress/utils/index.ts
var __vite_injected_original_dirname = "E:/360MoveData/Users/YR/Desktop/\u524D\u7AEF\u5FC5\u4F1A\u624B\u5199\u9898/my_docs/docs/.vuepress/utils";
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
      const framatterString = "---\nlang: zh-CN\ntitle: " + v.split(".")[0] + "\ndescription: \u5173\u952E\u529F\u80FD\ncollapsible: true\n---\n# " + v.split(".")[0] + "\n<CommentService/>";
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
var Utils_sidebar = create_sidebar_md(Utils_Sidebar_Setting, "/Utils/");
var sidebar_all = [...Notes_sidebar, ...Interview_sidebar, ...Problems_sidebar, ...Utils_sidebar];
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
  create_navbar_md(Interview_navbar_Setting, "Interview", "\u9762\u7ECF"),
  create_navbar_md(Utils_navbar_Setting, "Utils", "\u4E0D\u9519\u7684\u5DE5\u5177")
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
import { commentPlugin } from "vuepress-plugin-comment2";
var __vite_injected_original_dirname2 = "E:/360MoveData/Users/YR/Desktop/\u524D\u7AEF\u5FC5\u4F1A\u624B\u5199\u9898/my_docs/docs/.vuepress";
var config_default = defineUserConfig({
  lang: "zh-CN",
  title: "fancy\u2014\u2014Blog",
  theme: theme_config_default,
  public: `${path2.resolve(__vite_injected_original_dirname2, "./public")}`,
  plugins: [
    commentPlugin({
      // your options
      provider: "Giscus",
      comment: true,
      //启用评论功能
      repo: "YuHaH1/my_docs",
      repoId: "R_kgDOJhp_Ig",
      category: "Announcements",
      categoryId: "DIC_kwDOJhp_Is4CWaUE",
      mapping: "title"
    }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3RoZW1lLmNvbmZpZy50cyIsICJkb2NzLy52dWVwcmVzcy91dGlscy9pbmRleC50cyIsICJkb2NzLy52dWVwcmVzcy91dGlscy9jb25zdGFudC50cyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyLnRzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L215X2RvY3MvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXG15X2RvY3NcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9teV9kb2NzL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcsIGRlZmF1bHRUaGVtZSB9IGZyb20gJ3Z1ZXByZXNzJ1xyXG5pbXBvcnQgeyBzZWFyY2hQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXNlYXJjaCdcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4vdGhlbWUuY29uZmlnJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBjb21tZW50UGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1jb21tZW50MlwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XHJcbiAgICBsYW5nOiAnemgtQ04nLFxyXG4gICAgdGl0bGU6ICdmYW5jeVx1MjAxNFx1MjAxNEJsb2cnLFxyXG4gICAgdGhlbWUsXHJcbiAgICBwdWJsaWM6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3B1YmxpYycpfWAsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgY29tbWVudFBsdWdpbih7XHJcbiAgICAgICAgICAgIC8vIHlvdXIgb3B0aW9uc1xyXG4gICAgICAgICAgICBwcm92aWRlcjogXCJHaXNjdXNcIixcclxuICAgICAgICAgICAgY29tbWVudDogdHJ1ZSwgLy9cdTU0MkZcdTc1MjhcdThCQzRcdThCQkFcdTUyOUZcdTgwRkRcclxuICAgICAgICAgICAgcmVwbzogJ1l1SGFIMS9teV9kb2NzJyxcclxuICAgICAgICAgICAgcmVwb0lkOiAnUl9rZ0RPSmhwX0lnJyxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6ICdBbm5vdW5jZW1lbnRzJyxcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogJ0RJQ19rd0RPSmhwX0lzNENXYVVFJyxcclxuICAgICAgICAgICAgbWFwcGluZzogJ3RpdGxlJ1xyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICBzZWFyY2hQbHVnaW4oe1xyXG4gICAgICAgICAgICBsb2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICAnLyc6IHtcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMlx1NTE3M1x1OTUyRVx1OEJDRCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJy96aC8nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgIF1cclxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4L215X2RvY3MvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXDM2ME1vdmVEYXRhXFxcXFVzZXJzXFxcXFlSXFxcXERlc2t0b3BcXFxcXHU1MjREXHU3QUVGXHU1RkM1XHU0RjFBXHU2MjRCXHU1MTk5XHU5ODk4XFxcXG15X2RvY3NcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcdGhlbWUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9teV9kb2NzL2RvY3MvLnZ1ZXByZXNzL3RoZW1lLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmF1bHRUaGVtZSB9IGZyb20gJ3Z1ZXByZXNzJ1xyXG5pbXBvcnQgc2lkZWJhciBmcm9tICcuL3NpZGViYXInXHJcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXInXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRUaGVtZSh7XHJcbiAgICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICAgIGxhc3RVcGRhdGVkVGV4dDogJ1x1NjcwMFx1OEZEMVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXHJcbiAgICBzaWRlYmFyLFxyXG4gICAgbG9nbzogJy9sb2dvLnBuZycsXHJcbiAgICBuYXZiYXIsXHJcblxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC9cdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OTgvbXlfZG9jcy9kb2NzLy52dWVwcmVzcy91dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMzYwTW92ZURhdGFcXFxcVXNlcnNcXFxcWVJcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTVGQzVcdTRGMUFcdTYyNEJcdTUxOTlcdTk4OThcXFxcbXlfZG9jc1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFx1dGlsc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC8lRTUlODklOEQlRTclQUIlQUYlRTUlQkYlODUlRTQlQkMlOUElRTYlODklOEIlRTUlODYlOTklRTklQTIlOTgvbXlfZG9jcy9kb2NzLy52dWVwcmVzcy91dGlscy9pbmRleC50c1wiO2ltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnXHJcbmltcG9ydCB7IG15X3R5cG9yYV9wYXRoIH0gZnJvbSAnLi9jb25zdGFudCdcclxuY29uc3QgY3JlYXRlX25hdmJhcl9tZCA9IChsaWJfYXJyYXk6IEFycmF5PHN0cmluZz4sIGRpcl9uYW1lOiBzdHJpbmcsIHRleHQ6IHN0cmluZywpID0+IHtcclxuXHJcblxyXG4gICAgbGliX2FycmF5LmZvckVhY2gobGliID0+IHtcclxuICAgICAgICBjb25zdCBmaWxlX25hbWUgPSBsaWIuc3BsaXQoJy4nKVswXVxyXG4gICAgICAgIC8vIFx1OTk5Nlx1NUI1N1x1NkJDRFx1NTkyN1x1NTE5OVx1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgIGNvbnN0IHVwU3RyaW5nRmlsZU5hbWUgPSBmaWxlX25hbWVbMF0udG9VcHBlckNhc2UoKSArIGZpbGVfbmFtZS5zdWJzdHJpbmcoMSlcclxuICAgICAgICBjb25zdCBkaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBgLi4vLi4vJHtkaXJfbmFtZX1gLCB1cFN0cmluZ0ZpbGVOYW1lKVxyXG4gICAgICAgIC8vIGNvbnN0IGZpbGUgPSBwYXRoLnJlc29sdmUoZGlyLCBsaWIpXHJcbiAgICAgICAgLy8gY29uc3QgaXNfZXhpc3QgPSBmcy5leGlzdHNTeW5jKGZpbGUpXHJcbiAgICAgICAgY29uc3QgZGlyX2V4aXN0ID0gZnMuZXhpc3RzU3luYyhkaXIpXHJcbiAgICAgICAgLy8gaWYgKCFpc19leGlzdCkge1xyXG4gICAgICAgIC8vICAgICBjb25zdCBmcmFtYXR0ZXJTdHJpbmcgPSAnLS0tXFxubGFuZzogemgtQ05cXG50aXRsZTogJyArIGZpbGVfbmFtZSArICdcXG5kZXNjcmlwdGlvbjogXHU1MTczXHU5NTJFXHU1MjlGXHU4MEZEXFxuY29sbGFwc2libGU6IHRydWVcXG4tLS0nXHJcbiAgICAgICAgaWYgKCFkaXJfZXhpc3QpIHtcclxuICAgICAgICAgICAgZnMubWtkaXIoZGlyLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1x1NTIxQlx1NUVGQVx1NjU4N1x1NEVGNlx1NTkzMVx1OEQyNScsIGRpcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBsaWJfYXJyYXkubWFwKGxpYiA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZV9uYW1lID0gbGliLnNwbGl0KCcuJylbMF1cclxuICAgICAgICBjb25zdCB1cFN0cmluZ0ZpbGVOYW1lID0gZmlsZV9uYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBmaWxlX25hbWUuc3Vic3RyaW5nKDEpXHJcbiAgICAgICAgY29uc3QgZGlycyA9IGZzLnJlYWRkaXJTeW5jKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi8uLi8ke2Rpcl9uYW1lfS8ke3VwU3RyaW5nRmlsZU5hbWV9YCkpXHJcbiAgICAgICAgbGV0IG1kX2ZpbGUgPSBkaXJzLmZpbHRlcih2ID0+IHYgIT09IGxpYilcclxuICAgICAgICBtZF9maWxlID0gbWRfZmlsZS5sZW5ndGggPiAwID8gbWRfZmlsZVttZF9maWxlLmxlbmd0aCAtIDFdIDogW11cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0ZXh0OiB1cFN0cmluZ0ZpbGVOYW1lLFxyXG4gICAgICAgICAgICBsaW5rOiBgLyR7ZGlyX25hbWV9LyR7dXBTdHJpbmdGaWxlTmFtZX0vJHttZF9maWxlfWBcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICBjb25zdCBuYXZfYmFyID0ge1xyXG4gICAgICAgIHRleHQsXHJcbiAgICAgICAgY2hpbGRyZW5cclxuICAgIH1cclxuICAgIHJldHVybiBuYXZfYmFyXHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZV9zaWRlYmFyX21kID0gKGxpYl9hcnJheTogQXJyYXk8QXJyYXk8c3RyaW5nPj4sIGRpcl9uYW1lOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNpZGViYXIgPSBsaWJfYXJyYXkubWFwKGxpYiA9PiB7XHJcbiAgICAgICAgLy8gXHU1QjUwXHU3NkVFXHU1RjU1XHU1NDBEXHU3OUYwXHJcbiAgICAgICAgY29uc3QgZmlsZV9uYW1lID0gbGliLnNoaWZ0KCkhXHJcbiAgICAgICAgY29uc3QgdXBTdHJpbmdGaWxlTmFtZSA9IGZpbGVfbmFtZVswXS50b1VwcGVyQ2FzZSgpICsgZmlsZV9uYW1lLnN1YnN0cmluZygxKVxyXG4gICAgICAgIC8vIFx1NzIzNlx1N0VBN1x1NzZFRVx1NUY1NStcdTgxRUFcdTVERjFcdTc2RUVcdTVGNTVcclxuICAgICAgICBjb25zdCBpbnRlcmdyYXRlX2Rpcl9uYW1lID0gZGlyX25hbWUgKyB1cFN0cmluZ0ZpbGVOYW1lICsgJy8nXHJcbiAgICAgICAgY29uc3Qgc2lkZWJhcl9vYmogPSB7fVxyXG5cclxuICAgICAgICBsaWIuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi8uLi8ke2ludGVyZ3JhdGVfZGlyX25hbWUgKyB2fWApXHJcbiAgICAgICAgICAgIGNvbnN0IGlzX2V4aXN0ID0gZnMuZXhpc3RzU3luYyhmaWxlKVxyXG4gICAgICAgICAgICBjb25zdCBmcmFtYXR0ZXJTdHJpbmcgPSAnLS0tXFxubGFuZzogemgtQ05cXG50aXRsZTogJyArIHYuc3BsaXQoJy4nKVswXSArICdcXG5kZXNjcmlwdGlvbjogXHU1MTczXHU5NTJFXHU1MjlGXHU4MEZEXFxuY29sbGFwc2libGU6IHRydWVcXG4tLS1cXG4jICcgKyB2LnNwbGl0KCcuJylbMF0gKyAnXFxuPENvbW1lbnRTZXJ2aWNlLz4nXHJcbiAgICAgICAgICAgIGlmICghaXNfZXhpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuYXBwZW5kRmlsZShmaWxlLCBmcmFtYXR0ZXJTdHJpbmcsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhlIFwiZGF0YSB0byBhcHBlbmRcIiB3YXMgYXBwZW5kZWQgdG8gZmlsZSEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBleGVjX3R5cG9yYShmaWxlKVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICBzaWRlYmFyX29ialtpbnRlcmdyYXRlX2Rpcl9uYW1lXSA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogdXBTdHJpbmdGaWxlTmFtZSxcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGxpYi5tYXAodiA9PiBpbnRlcmdyYXRlX2Rpcl9uYW1lICsgdilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzaWRlYmFyX29iaik7XHJcbiAgICAgICAgcmV0dXJuIHNpZGViYXJfb2JqXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHNpZGViYXJcclxufVxyXG5cclxuY29uc3QgZXhlY190eXBvcmEgPSAobWRfZmlsZSkgPT4ge1xyXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgfHwgIW15X3R5cG9yYV9wYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCB0eXBvcmFfcGF0aCA9IHBhdGgubm9ybWFsaXplKG15X3R5cG9yYV9wYXRoKVxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHR5cG9yYV9wYXRoKSkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgbWRfZmlsZSA9IHBhdGgubm9ybWFsaXplKG1kX2ZpbGUpXHJcbiAgICBleGVjKGAke3R5cG9yYV9wYXRofSAke21kX2ZpbGV9IGAsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coc3Rkb3V0KTtcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBjcmVhdGVfbmF2YmFyX21kLCBjcmVhdGVfc2lkZWJhcl9tZCB9IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9teV9kb2NzL2RvY3MvLnZ1ZXByZXNzL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxteV9kb2NzXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXHV0aWxzXFxcXGNvbnN0YW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVCRiU4NSVFNCVCQyU5QSVFNiU4OSU4QiVFNSU4NiU5OSVFOSVBMiU5OC9teV9kb2NzL2RvY3MvLnZ1ZXByZXNzL3V0aWxzL2NvbnN0YW50LnRzXCI7Y29uc3QgU1VCSkVDVFMgPSB7XHJcbiAgICByZWFjdDogJ3JlYWN0JyxcclxuICAgIHZ1ZTogJ3Z1ZScsXHJcbiAgICBzYXNzOiAnc2FzcycsXHJcbiAgICB0czogJ3R5cGVTY3JpcHQnLFxyXG4gICAgbm9kZTogJ25vZGUnLFxyXG4gICAganM6ICdqYXZhU2NyaXB0JyxcclxuICAgIGRvY2tlcjogJ2RvY2tlcicsXHJcbiAgICBucG06ICdcdTUzMDVcdTdCQTFcdTc0MDZcdTVERTVcdTUxNzcnLFxyXG4gICAgdml0ZTogJ3ZpdGUnLFxyXG4gICAgd2VicGFjazogJ3dlYnBhY2snLFxyXG4gICAgWydcdThCQTFcdTdCOTdcdTY3M0FcdTdGNTFcdTdFREMnXTogJ0NvbXB1dGVyTmV0d29yaycsXHJcbiAgICBbJ1x1NjcwRFx1NTJBMVx1NTY2OCddOiAnU2VydmVyJyxcclxuICAgIGxpbnV4OiAnbGludXgnLFxyXG4gICAgY3NzOiAnY3NzJyxcclxuICAgIGNhbnZhczogJ2NhbnZhcycsXHJcbiAgICB1dGlsczoge1xyXG4gICAgICAgIHZ1ZXByZXNzOiAndnVlcHJlc3MnXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IE5vdGVzX1NpZGViYXJfU2V0dGluZyA9IFtcclxuICAgIFtTVUJKRUNUUy5yZWFjdCwgJ2ZpYmVyLm1kJywgJ2RpZmYubWQnXSxcclxuICAgIFtTVUJKRUNUUy52dWUsICdkaWZmLm1kJ10sXHJcbiAgICBbU1VCSkVDVFMuc2FzcywgJ2dyYW1tYXIubWQnXSxcclxuICAgIFtTVUJKRUNUUy50cywgJ2dyYW1tYXIubWQnXSxcclxuICAgIFtTVUJKRUNUUy5ub2RlLCAnbm9kZVx1NTdGQVx1Nzg0MFx1NzdFNVx1OEJDNi5tZCcsICdjb21tb25fYXBpcy5tZCcsICdwbTIubWQnXSxcclxuICAgIFtTVUJKRUNUUy5qcywgJ1x1NUZDNVx1NEYxQUFQSXMubWQnXSxcclxuICAgIFtTVUJKRUNUUy5kb2NrZXIsICdkb2NrZXJcdTU3RkFcdTc4NDBcdTc3RTVcdThCQzYubWQnXSxcclxuICAgIFtTVUJKRUNUUy5saW51eCwgJ2xpbnV4XHU1RTM4XHU3NTI4XHU2MzA3XHU0RUU0Lm1kJ10sXHJcbiAgICBbU1VCSkVDVFMuY3NzLCAnXHU0RjYwXHU0RTBEXHU3N0U1XHU5MDUzXHU3Njg0Y3NzLm1kJ10sXHJcbiAgICBbU1VCSkVDVFMuY2FudmFzLCAnY2FudmFzXHU1N0ZBXHU3ODQwLm1kJ11cclxuXHJcbl1cclxuY29uc3QgSW50ZXJ2aWV3X1NpZGViYXJfU2V0dGluZyA9IFtcclxuICAgIFtTVUJKRUNUUy5ub2RlLCAnbm9kZVx1OTc2Mlx1N0VDRi5tZCddLFxyXG4gICAgW1NVQkpFQ1RTWydcdThCQTFcdTdCOTdcdTY3M0FcdTdGNTFcdTdFREMnXSwgJ1x1OEJBMVx1N0I5N1x1NjczQVx1N0Y1MVx1N0VEQy5tZCddLFxyXG4gICAgW1NVQkpFQ1RTLmpzLCAnanNcdTk3NjJcdTdFQ0YubWQnXSxcclxuICAgIFtTVUJKRUNUUy5jc3MsICdjc3NcdTk3NjJcdTdFQ0YubWQnXSxcclxuXVxyXG5jb25zdCBQcm9ibGVtc19TaWRlYmFyX1NldHRpbmcgPSBbXHJcbiAgICBbU1VCSkVDVFMubm9kZSwgJ3BtMi5tZCddLFxyXG4gICAgW1NVQkpFQ1RTWydcdTY3MERcdTUyQTFcdTU2NjgnXSwgJ1x1NjcwRFx1NTJBMVx1NTY2OC5tZCddLFxyXG5dXHJcbmNvbnN0IFV0aWxzX1NpZGViYXJfU2V0dGluZyA9IFtcclxuICAgIFtTVUJKRUNUUy51dGlscy52dWVwcmVzcywgJ1Z1ZXByZXNzXHU2M0QyXHU0RUY2Lm1kJ11cclxuXVxyXG5cclxuXHJcblxyXG5jb25zdCBteV90eXBvcmFfcGF0aCA9IFwiRDpcXFxcdHlwb3JhXHU1Qjg5XHU4OEM1XFxcXFR5cG9yYVxcXFxUeXBvcmEuZXhlXCJcclxuXHJcbmNvbnN0IFByb2JsZW1zX25hdmJhcl9TZXR0aW5nID0gW1xyXG4gICAgU1VCSkVDVFNbJ1x1NjcwRFx1NTJBMVx1NTY2OCddLFxyXG5dXHJcbmNvbnN0IEludGVydmlld19uYXZiYXJfU2V0dGluZyA9IFtcclxuICAgIFNVQkpFQ1RTLm5vZGUsXHJcbiAgICBTVUJKRUNUU1snXHU4QkExXHU3Qjk3XHU2NzNBXHU3RjUxXHU3RURDJ11cclxuXVxyXG5jb25zdCBVdGlsc19uYXZiYXJfU2V0dGluZyA9IFtcclxuICAgIFNVQkpFQ1RTLnV0aWxzLnZ1ZXByZXNzXHJcbl1cclxuY29uc3QgTm90ZXNfbmF2YmFyX1NldHRpbmcgPSBbXHJcbiAgICBTVUJKRUNUUy5yZWFjdCxcclxuICAgIFNVQkpFQ1RTLnZ1ZSxcclxuICAgIFNVQkpFQ1RTLnNhc3MsXHJcbiAgICBTVUJKRUNUUy50cyxcclxuICAgIFNVQkpFQ1RTLm5vZGUsXHJcbiAgICBTVUJKRUNUUy5qcyxcclxuICAgIFNVQkpFQ1RTLmRvY2tlcixcclxuICAgIFNVQkpFQ1RTLmxpbnV4LFxyXG4gICAgU1VCSkVDVFMuY3NzLFxyXG4gICAgU1VCSkVDVFMuY2FudmFzXHJcbl1cclxuZXhwb3J0IHtcclxuICAgIE5vdGVzX1NpZGViYXJfU2V0dGluZyxcclxuICAgIEludGVydmlld19TaWRlYmFyX1NldHRpbmcsXHJcbiAgICBQcm9ibGVtc19TaWRlYmFyX1NldHRpbmcsXHJcbiAgICBQcm9ibGVtc19uYXZiYXJfU2V0dGluZyxcclxuICAgIEludGVydmlld19uYXZiYXJfU2V0dGluZyxcclxuICAgIE5vdGVzX25hdmJhcl9TZXR0aW5nLFxyXG4gICAgbXlfdHlwb3JhX3BhdGgsXHJcbiAgICBVdGlsc19uYXZiYXJfU2V0dGluZyxcclxuICAgIFV0aWxzX1NpZGViYXJfU2V0dGluZ1xyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9teV9kb2NzL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxteV9kb2NzXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXHNpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LzM2ME1vdmVEYXRhL1VzZXJzL1lSL0Rlc2t0b3AvJUU1JTg5JThEJUU3JUFCJUFGJUU1JUJGJTg1JUU0JUJDJTlBJUU2JTg5JThCJUU1JTg2JTk5JUU5JUEyJTk4L215X2RvY3MvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IGNyZWF0ZV9zaWRlYmFyX21kIH0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IHsgTm90ZXNfU2lkZWJhcl9TZXR0aW5nLCBJbnRlcnZpZXdfU2lkZWJhcl9TZXR0aW5nLCBQcm9ibGVtc19TaWRlYmFyX1NldHRpbmcsIFV0aWxzX1NpZGViYXJfU2V0dGluZyB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnQnXHJcblxyXG5jb25zdCBOb3Rlc19zaWRlYmFyID0gY3JlYXRlX3NpZGViYXJfbWQoTm90ZXNfU2lkZWJhcl9TZXR0aW5nLCAnL05vdGVzLycpXHJcbmNvbnN0IEludGVydmlld19zaWRlYmFyID0gY3JlYXRlX3NpZGViYXJfbWQoSW50ZXJ2aWV3X1NpZGViYXJfU2V0dGluZywgJy9JbnRlcnZpZXcvJylcclxuY29uc3QgUHJvYmxlbXNfc2lkZWJhciA9IGNyZWF0ZV9zaWRlYmFyX21kKFByb2JsZW1zX1NpZGViYXJfU2V0dGluZywgJy9Qcm9ibGVtcy8nKVxyXG5jb25zdCBVdGlsc19zaWRlYmFyID0gY3JlYXRlX3NpZGViYXJfbWQoVXRpbHNfU2lkZWJhcl9TZXR0aW5nLCAnL1V0aWxzLycpXHJcbmNvbnN0IHNpZGViYXJfYWxsID0gWy4uLk5vdGVzX3NpZGViYXIsIC4uLkludGVydmlld19zaWRlYmFyLCAuLi5Qcm9ibGVtc19zaWRlYmFyLCAuLi5VdGlsc19zaWRlYmFyXVxyXG5cclxuXHJcbmNvbnN0IHNpZGViYXIgPSB7fVxyXG5cclxuZm9yIChsZXQgdmFsdWUgb2Ygc2lkZWJhcl9hbGwpIHtcclxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcclxuICAgIHNpZGViYXJba2V5c1swXV0gPSB2YWx1ZVtrZXlzWzBdXVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLi4uc2lkZWJhcixcclxufVxyXG5cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOi8zNjBNb3ZlRGF0YS9Vc2Vycy9ZUi9EZXNrdG9wL1x1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OC9teV9kb2NzL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwzNjBNb3ZlRGF0YVxcXFxVc2Vyc1xcXFxZUlxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1NUZDNVx1NEYxQVx1NjI0Qlx1NTE5OVx1OTg5OFxcXFxteV9kb2NzXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXG5hdmJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovMzYwTW92ZURhdGEvVXNlcnMvWVIvRGVza3RvcC8lRTUlODklOEQlRTclQUIlQUYlRTUlQkYlODUlRTQlQkMlOUElRTYlODklOEIlRTUlODYlOTklRTklQTIlOTgvbXlfZG9jcy9kb2NzLy52dWVwcmVzcy9uYXZiYXIudHNcIjtcclxuaW1wb3J0IHsgY3JlYXRlX25hdmJhcl9tZCB9IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCB7IFByb2JsZW1zX25hdmJhcl9TZXR0aW5nLCBJbnRlcnZpZXdfbmF2YmFyX1NldHRpbmcsIE5vdGVzX25hdmJhcl9TZXR0aW5nLCBVdGlsc19uYXZiYXJfU2V0dGluZyB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnQnXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAgY3JlYXRlX25hdmJhcl9tZChOb3Rlc19uYXZiYXJfU2V0dGluZywgJ05vdGVzJywgJ1x1N0IxNFx1OEJCMFx1NjdFNVx1OEJFMicpLFxyXG4gICAgY3JlYXRlX25hdmJhcl9tZChQcm9ibGVtc19uYXZiYXJfU2V0dGluZywgJ1Byb2JsZW1zJywgJ1x1OTVFRVx1OTg5OFx1OEJCMFx1NUY1NScpLFxyXG4gICAgY3JlYXRlX25hdmJhcl9tZChJbnRlcnZpZXdfbmF2YmFyX1NldHRpbmcsICdJbnRlcnZpZXcnLCAnXHU5NzYyXHU3RUNGJyksXHJcbiAgICBjcmVhdGVfbmF2YmFyX21kKFV0aWxzX25hdmJhcl9TZXR0aW5nLCAnVXRpbHMnLCAnXHU0RTBEXHU5NTE5XHU3Njg0XHU1REU1XHU1MTc3JyksXHJcbl1cclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb2EsU0FBUyx3QkFBc0M7QUFDbmQsU0FBUyxvQkFBb0I7OztBQ0RtWixTQUFTLG9CQUFvQjs7O0FDQXhCLE9BQU8sUUFBUTtBQUNwYyxPQUFPLFVBQVU7QUFDakIsU0FBUyxZQUFZOzs7QUNGc2EsSUFBTSxXQUFXO0FBQUEsRUFDeGMsT0FBTztBQUFBLEVBQ1AsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sSUFBSTtBQUFBLEVBQ0osTUFBTTtBQUFBLEVBQ04sSUFBSTtBQUFBLEVBQ0osUUFBUTtBQUFBLEVBQ1IsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsQ0FBQyxnQ0FBTyxHQUFHO0FBQUEsRUFDWCxDQUFDLG9CQUFLLEdBQUc7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLEtBQUs7QUFBQSxFQUNMLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFBQSxJQUNILFVBQVU7QUFBQSxFQUNkO0FBQ0o7QUFFQSxJQUFNLHdCQUF3QjtBQUFBLEVBQzFCLENBQUMsU0FBUyxPQUFPLFlBQVksU0FBUztBQUFBLEVBQ3RDLENBQUMsU0FBUyxLQUFLLFNBQVM7QUFBQSxFQUN4QixDQUFDLFNBQVMsTUFBTSxZQUFZO0FBQUEsRUFDNUIsQ0FBQyxTQUFTLElBQUksWUFBWTtBQUFBLEVBQzFCLENBQUMsU0FBUyxNQUFNLG1DQUFlLGtCQUFrQixRQUFRO0FBQUEsRUFDekQsQ0FBQyxTQUFTLElBQUkscUJBQVc7QUFBQSxFQUN6QixDQUFDLFNBQVMsUUFBUSxtQ0FBZTtBQUFBLEVBQ2pD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QUVsR0EsSUFBTSxnQkFBZ0Isa0JBQWtCLHVCQUF1QixTQUFTO0FBQ3hFLElBQU0sb0JBQW9CLGtCQUFrQiwyQkFBMkIsYUFBYTtBQUNwRixJQUFNLG1CQUFtQixrQkFBa0IsMEJBQTBCLFlBQVk7QUFDakYsSUFBTSxnQkFBZ0Isa0JBQWtCLHVCQUF1QixTQUFTO0FBQ3hFLElBQU0sY0FBYyxDQUFDLEdBQUcsZUFBZSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixHQUFHLGFBQWE7QUFHbEcsSUFBTSxVQUFVLENBQUM7QUFFakIsU0FBUyxTQUFTLGFBQWE7QUFDM0IsUUFBTSxPQUFPLE9BQU8sS0FBSyxLQUFLO0FBQzlCLFVBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQ3BDO0FBR0EsSUFBTyxrQkFBUTtBQUFBLEVBQ1gsR0FBRztBQUNQOzs7QUNmQSxJQUFPLGlCQUFRO0FBQUEsRUFDWCxpQkFBaUIsc0JBQXNCLFNBQVMsMEJBQU07QUFBQSxFQUN0RCxpQkFBaUIseUJBQXlCLFlBQVksMEJBQU07QUFBQSxFQUM1RCxpQkFBaUIsMEJBQTBCLGFBQWEsY0FBSTtBQUFBLEVBQzVELGlCQUFpQixzQkFBc0IsU0FBUyxnQ0FBTztBQUMzRDs7O0FKUEEsSUFBTyx1QkFBUSxhQUFhO0FBQUEsRUFDeEIsYUFBYTtBQUFBLEVBQ2IsaUJBQWlCO0FBQUEsRUFDakI7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOO0FBRUosQ0FBQzs7O0FEUEQsT0FBT0MsV0FBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUo5QixJQUFNQyxvQ0FBbUM7QUFNekMsSUFBTyxpQkFBUSxpQkFBaUI7QUFBQSxFQUM1QixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUDtBQUFBLEVBQ0EsUUFBUSxHQUFHQyxNQUFLLFFBQVFDLG1DQUFXLFVBQVU7QUFBQSxFQUM3QyxTQUFTO0FBQUEsSUFDTCxjQUFjO0FBQUE7QUFBQSxNQUVWLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQTtBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osU0FBUztBQUFBLElBQ2IsQ0FBQztBQUFBLElBRUQsYUFBYTtBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ0wsS0FBSztBQUFBLFVBQ0QsYUFBYTtBQUFBLFFBQ2pCO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDSixhQUFhO0FBQUEsUUFDakI7QUFBQSxNQUNKO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInNpZGViYXIiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
