import{_ as n,M as t,p as i,q as a,N as o,a1 as c}from"./framework-f7ec573f.js";const r={},s=c('<h1 id="ci-cd" tabindex="-1"><a class="header-anchor" href="#ci-cd" aria-hidden="true">#</a> CI-CD</h1><p>持续集成持续部署。CI/CD是软件开发领域中的两个重要概念，分别代表持续集成（Continuous Integration）和持续部署（Continuous Deployment）。</p><p>持续集成（CI）是一种开发实践，旨在通过频繁地将团队成员的代码集成到共享代码库中，以便及早地发现和解决潜在的问题。在CI中，开发人员通常会将他们的代码提交到版本控制系统，并通过自动化的构建和测试过程，将代码集成到主干（或开发分支）中。这样可以确保团队成员的代码与其他人的代码保持一致，并快速发现和解决集成问题。</p><p>持续部署（CD）是在持续集成的基础上延伸的概念，它的目标是将经过集成和测试的代码自动部署到生产环境中。持续部署依赖于自动化的构建、测试和部署流程，以确保软件的快速、可靠和可重复的部署。通过持续部署，团队可以更快地交付新功能、修复bug，并及时响应用户需求。</p><p>综合来说，CI/CD是一种软件开发流程和实践，它强调通过持续集成和持续部署的自动化流程，提高团队的工作效率、软件质量和交付速度。通过CI/CD，开发团队可以更快地构建、集成、测试和部署软件，减少手动操作和人为错误，提高软件开发的可靠性和可维护性。</p><p>CI/CD 一般需要找到流水线设置，常规前端项目自动化部署分为 3 个阶段</p><ol><li>设置 git 源</li><li>构建（比如前端项目执行 npm run build）、此时可以选择分支，是否执行 npm install</li><li>部署（使用构建生成的文件部署）</li></ol><h2 id="jenkins" tabindex="-1"><a class="header-anchor" href="#jenkins" aria-hidden="true">#</a> Jenkins</h2>',8);function l(C,d){const e=t("CommentService");return i(),a("div",null,[s,o(e)])}const h=n(r,[["render",l],["__file","CI-CD.html.vue"]]);export{h as default};