import{_ as l,M as p,p as i,q as c,R as n,t as s,N as a,a1 as t}from"./framework-5866ffd3.js";const u={},r=t(`<h1 id="sequelize" tabindex="-1"><a class="header-anchor" href="#sequelize" aria-hidden="true">#</a> sequelize</h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 这将安装 v6 最新版本的 Sequelize</span>
<span class="token function">yarn</span> <span class="token function">add</span> sequelize

<span class="token comment"># 这将安装 v7 最新 alpha 版本的 Sequelize</span>
<span class="token comment"># yarn add @sequelize/core</span>

<span class="token comment"># 使用 yarn  下面数据库驱动程序 选择一个即可</span>
<span class="token function">yarn</span> <span class="token function">add</span> pg pg-hstore <span class="token comment"># PostgreSQL</span>
<span class="token function">yarn</span> <span class="token function">add</span> mysql2 <span class="token comment"># MySQL</span>
<span class="token function">yarn</span> <span class="token function">add</span> mariadb <span class="token comment"># MariaDB</span>
<span class="token function">yarn</span> <span class="token function">add</span> sqlite3 <span class="token comment"># SQLite</span>
<span class="token function">yarn</span> <span class="token function">add</span> tedious <span class="token comment"># Microsoft SQL Server</span>
<span class="token function">yarn</span> <span class="token function">add</span> ibm_db <span class="token comment"># DB2</span>
<span class="token function">yarn</span> <span class="token function">add</span> odbc <span class="token comment"># IBM i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接数据库" tabindex="-1"><a class="header-anchor" href="#连接数据库" aria-hidden="true">#</a> 连接数据库</h2><p>要连接到数据库,必须创建一个 Sequelize 实例. 这可以通过将连接参数分别传递到 Sequelize 构造函数或通过传递一个连接 URI 来完成：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Sequelize <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;@sequelize/core&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方法 1: 传递一个连接 URI</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token string">&#39;sqlite::memory:&#39;</span><span class="token punctuation">)</span> <span class="token comment">// Sqlite 示例</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token string">&#39;postgres://user:pass@example.com:5432/dbname&#39;</span><span class="token punctuation">)</span> 
<span class="token comment">// Postgres 示例</span>

<span class="token comment">// 方法 2: 分别传递参数 (sqlite)</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">dialect</span><span class="token operator">:</span> <span class="token string">&#39;sqlite&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">storage</span><span class="token operator">:</span> <span class="token string">&#39;path/to/database.sqlite&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方法 3: 分别传递参数 (其它数据库)</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token string">&#39;database&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;username&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;password&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 选择一种支持的数据库:</span>
  <span class="token comment">// &#39;mysql&#39;, &#39;mariadb&#39;, &#39;postgres&#39;, &#39;mssql&#39;, &#39;sqlite&#39;, &#39;snowflake&#39;, &#39;db2&#39; or &#39;ibmi&#39;</span>
  <span class="token literal-property property">dialect</span><span class="token operator">:</span> <span class="token string">&#39;postgres&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Sequelize</code>构造函数的参数介绍</p><p><code>public constructor(database: string, username: string, password: string, options: object)</code></p>`,8),d=n("li",null,[n("code",null,"database:string"),s(":数据库名字")],-1),k=n("li",null,[n("code",null,"username:string"),s("：默认值null，连接数据库用户名")],-1),v=n("li",null,[n("code",null,"password:string"),s(":默认值null，连接数据库密码")],-1),m=n("code",null,"options:object",-1),b=t("<li><code>host：string</code>:默认值localhost，数据库的主机地址</li><li><code>port：number</code>:数据库端口号</li><li><code>username:string</code>：默认值null，连接数据库用户名</li><li><code>password:string</code>:默认值null，连接数据库密码</li><li><code>database:string</code>:数据库名字</li><li><code>hooks:object</code>:在某些生命周期事件之前和之后调用的全局钩子函数的对象。全局钩子将在为同一事件定义的任何特定于模型的钩子之后运行。Init()用于列表)。另外，<code>beforeConnect()</code>、<code>afterConnect()</code>、<code>beforeDisconnect()</code>和<code>afterDisconnect()</code>钩子可以在这里定义。</li><li><code>dialect:string</code>:要链接数据库的语言下面之一<code>[mysql, postgres, sqlite, db2, mariadb , mssql]</code></li><li><code>【dialectModule:string，dialectModulePath:string,dialectOptions 】</code>这些用于自定义数据库驱动程序模块很少用</li>",8),y=n("code",null,"define:object",-1),g=n("code",null,"Model.init",-1),h={href:"https://sequelize.org/api/v6/class/src/model.js~Model.html#static-method-init",target:"_blank",rel:"noopener noreferrer"},T=t("<li><code>options.pool:object</code>:连接池的配置选项</li><li><code>options.pool.max:number</code>最大连接数默认5</li><li><code>options.pool.min:number</code>最小连接数默认0</li><li><code>options.pool.idle:number</code>默认10000，十秒，连接在被释放之前可以空闲的最大时间，以毫秒为单位。</li><li><code>options.pool.acquire:number</code>:默认一分钟60000，该池在抛出错误之前尝试获得连接的最大时间(以毫秒为单位)</li>",5),f=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>Sequelize<span class="token punctuation">,</span>Model<span class="token punctuation">,</span>DataTypes<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;sequlize&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">dialect</span><span class="token operator">:</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span><span class="token string">&quot;127.0.0.1/localhost&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">prot</span><span class="token operator">:</span><span class="token number">3306</span><span class="token punctuation">,</span>
    <span class="token literal-property property">username</span><span class="token operator">:</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">database</span><span class="token operator">:</span><span class="token string">&quot;Mall&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pool</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token literal-property property">max</span><span class="token operator">:</span><span class="token number">10</span><span class="token punctuation">,</span>
         <span class="token literal-property property">min</span><span class="token operator">:</span><span class="token number">0</span>
    <span class="token punctuation">}</span>	
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
User<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">username</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
  <span class="token literal-property property">birthday</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">DATE</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> sequelize<span class="token punctuation">,</span> <span class="token literal-property property">modelName</span><span class="token operator">:</span> <span class="token string">&#39;user&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> sequelize<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> jane <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;janedoe&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">birthday</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">1980</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>jane<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2><p>在模型中定义的每个列都必须具有数据类型。Sequelize提供了许多内置数据类型。要访问内置数据类型，必须导入<code>DataTypes</code></p><p>字符串类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span>             <span class="token comment">// VARCHAR(255)</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span>       <span class="token comment">// VARCHAR(1234)</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">.</span><span class="token constant">BINARY</span>      <span class="token comment">// VARCHAR BINARY</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">TEXT</span>               <span class="token comment">// TEXT</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">TEXT</span><span class="token punctuation">(</span><span class="token string">&#39;tiny&#39;</span><span class="token punctuation">)</span>       <span class="token comment">// TINYTEXT</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">CITEXT</span>             <span class="token comment">// CITEXT          PostgreSQL and SQLite only.</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">TSVECTOR</span>           <span class="token comment">// TSVECTOR        PostgreSQL only.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>布尔值类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>DataTypes<span class="token punctuation">.</span><span class="token constant">BOOLEAN</span>            <span class="token comment">// TINYINT(1)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>数值类型</p><div class="language-Js line-numbers-mode" data-ext="Js"><pre class="language-Js"><code>DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            PostgreSQL only.
DataTypes.REAL(11)           // REAL(11)        PostgreSQL only.
DataTypes.REAL(11, 12)       // REAL(11,12)     PostgreSQL only.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)
// 下面三种类型只有mysql和mariaDB才能设置。 即无符号和零填充
DataTypes.INTEGER.UNSIGNED
DataTypes.INTEGER.ZEROFILL
DataTypes.INTEGER.UNSIGNED.ZEROFILL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日期类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>DataTypes<span class="token punctuation">.</span><span class="token constant">DATE</span>       <span class="token comment">// DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>    <span class="token comment">// DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision</span>
DataTypes<span class="token punctuation">.</span><span class="token constant">DATEONLY</span>   <span class="token comment">// DATE without time</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模型定义" tabindex="-1"><a class="header-anchor" href="#模型定义" aria-hidden="true">#</a> 模型定义</h2><p>模型就是数据库中表的抽象，每个模型都需要继承<code>Model</code>，模型的定义有两种方式</p>`,13),q={href:"https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-define",target:"_blank",rel:"noopener noreferrer"},D=n("code",null,"sequelize.define(modelName, attributes, options)",-1),I={href:"https://sequelize.org/api/v6/class/src/model.js~model#static-method-init",target:"_blank",rel:"noopener noreferrer"},N=n("code",null,"init(attributes, options)",-1),E=n("p",null,"文档参考地址",-1),z={href:"https://sequelize.org/master/manual/model-basics.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://sequelize.org/master/manual/model-basics.html",target:"_blank",rel:"noopener noreferrer"},w={href:"https://sequelize.org/master/manual/validations-and-constraints.html",target:"_blank",rel:"noopener noreferrer"},x=t(`<h3 id="模型的创建" tabindex="-1"><a class="header-anchor" href="#模型的创建" aria-hidden="true">#</a> 模型的创建</h3><p>exapmle创建一个用户表</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Sequelize<span class="token punctuation">,</span> DataTypes <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;sequelize&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span>xxxx<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> User <span class="token operator">=</span> sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;User&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// Model attributes are defined here</span>
  <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
    <span class="token literal-property property">allowNull</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span>
    <span class="token comment">// allowNull defaults to true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// Other model options go here</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// sequelize.define 返回值是我们创建的模型，该模型也被挂载到sequelize.models上</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>User <span class="token operator">===</span> sequelize<span class="token punctuation">.</span>models<span class="token punctuation">.</span>User<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Extend Model创建表</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Sequelize<span class="token punctuation">,</span> DataTypes<span class="token punctuation">,</span> Model <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;sequelize&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span>xxx<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

User<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// Model attributes are defined here</span>
  <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
    <span class="token literal-property property">allowNull</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span>
    <span class="token comment">// allowNull defaults to true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// Other model options go here</span>
  sequelize<span class="token punctuation">,</span> <span class="token comment">// 将数据库连接实例传递过去</span>
  <span class="token literal-property property">modelName</span><span class="token operator">:</span> <span class="token string">&#39;User&#39;</span> <span class="token comment">// 表名</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>User <span class="token operator">===</span> sequelize<span class="token punctuation">.</span>models<span class="token punctuation">.</span>User<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>创建模型的注意事项</p><p>不要添加同名的字段，否则会移除掉框架提供的getter和setter，从而阻止访问模型的实际数据。</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Invalid</span>
<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span> <span class="token punctuation">{</span>
  id<span class="token punctuation">;</span> <span class="token comment">//该字段将对getter和setter进行影子序列化。它应该被移除</span>
  otherPublicField<span class="token punctuation">;</span> <span class="token comment">//这个ok.</span>
<span class="token punctuation">}</span>

User<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">INTEGER</span><span class="token punctuation">,</span>
    <span class="token literal-property property">autoIncrement</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">primaryKey</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> sequelize， <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
user<span class="token punctuation">.</span>id<span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建模型属性参数" tabindex="-1"><a class="header-anchor" href="#创建模型属性参数" aria-hidden="true">#</a> 创建模型属性参数</h3><div class="language-Js line-numbers-mode" data-ext="Js"><pre class="language-Js"><code>const { Model, DataTypes, Deferrable } = require(&quot;sequelize&quot;);

class Foo extends Model {}
Foo.init({
  // 如果未设置，实例化将自动将该标志设置为true
  flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  // 日期的默认值=&gt;当前时间
  myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  // 将allowNull设置为false将为该列添加NOT NULL，这意味着如果该列为空，则在执行查询时将从DB抛出错误。如果希望在查询DB之前检查值是否为空，请验证部分。
  title: { type: DataTypes.STRING, allowNull: false },
  //创建两个具有相同值的对象将抛出错误。唯一属性可以是一个布尔值，或字符串。如果为多个列提供相同的字符串，它们将形成复合唯一键。
  uniqueOne: { type: DataTypes.STRING,  unique: &#39;compositeIndex&#39; },
  uniqueTwo: { type: DataTypes.INTEGER, unique: &#39;compositeIndex&#39; },

  // unique属性是创建唯一约束的简写。
  someUnique: { type: DataTypes.STRING, unique: true },

  // 主键
  identifier: { type: DataTypes.STRING, primaryKey: true },

  // 当新创建时会自增
  incrementMe: { type: DataTypes.INTEGER, autoIncrement: true },

  // 通过&#39;field&#39;属性指定一个自定义的列名:
  fieldWithUnderscores: { type: DataTypes.STRING, field: &#39;field_with_underscores&#39; },

  // 创建外键
  bar_id: {
    type: DataTypes.INTEGER,

    references: {
      // 这里是对另一个模型的引用
      model: Bar,
      // 这是引用模型的列名
      key: &#39;id&#39;,
      // 在PostgreSQL中，可以通过传递deferred类型来声明何时检查外键约束。
      deferrable: Deferrable.INITIALLY_IMMEDIATE
      	// Options:
      	//  Deferrable.INITIALLY_IMMEDIATE -立即检查外键约束
		// Deferrable.INITIALLY_DEFERRED -将所有外键约束检查推迟到事务结束
		// Deferrable.NOT -完全不延迟检查(默认)-这将不允许您动态更改事务中的规则
    }
  },

  // 注释只能添加到MySQL, MariaDB, PostgreSQL和MSSQL的列中
  commentMe: {
    type: DataTypes.INTEGER,
    comment: &#39;This is a column name that has a comment&#39;
  }
}, {
  sequelize,
  modelName: &#39;foo&#39;,
  // 在上面的属性中使用&#39; unique: true &#39;与在模型的选项中创建索引完全相同，建了一个唯一索引，该索引基于 someUnique 字段。
  indexes: [{ unique: true, fields: [&#39;someUnique&#39;] }]
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>allowNull:boolean</code>允许为空</li><li><code>defaultValue</code>默认值</li><li><code>unique:string|boolean</code>:创建唯一约束，如果值是字符串，则相同字符串的将组合成唯一key</li><li><code>primaryKey：boolean</code>是否为主键</li><li><code>field:string</code>自定义属性名</li><li></li></ul><h3 id="创建模型的options参数" tabindex="-1"><a class="header-anchor" href="#创建模型的options参数" aria-hidden="true">#</a> 创建模型的options参数</h3><ul><li><p><code>freezeTableName</code>：表明等于模型的名字</p><ul><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;User&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... (attributes)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">freezeTableName</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> sequelize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sequelize</span><span class="token punctuation">(</span><span class="token string">&#39;sqlite::memory:&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">define</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">freezeTableName</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li></li></ul></li><li><p><code>tableName</code>:指定表名字</p></li><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;User&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... (attributes)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tableName</span><span class="token operator">:</span> <span class="token string">&#39;Employees&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>timestamps:boolean</code>：默认值true。默认情况创建模型时会自动给模型添加<code>createdAt</code>和<code>updatedAt</code>字段，当创建和更新内容是，该字段也会自动被设置。<strong>(这是sequelize完成的，而不是使用SQL触发器完成，因此直接使用SQL不会导致这些自动自动更新)</strong>。需要禁用就给false</p><ul><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;User&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... (attributes)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">timestamps</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>也可以只启用createdAt/updatedAt中的一个，并为这些列提供一个自定义名称:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Foo<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">/* attributes */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  sequelize<span class="token punctuation">,</span>

  <span class="token comment">// don&#39;t forget to enable timestamps!</span>
  <span class="token literal-property property">timestamps</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

  <span class="token comment">// 去掉创建时间</span>
  <span class="token literal-property property">createdAt</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

  <span class="token comment">// 自定义名称</span>
  <span class="token literal-property property">updatedAt</span><span class="token operator">:</span> <span class="token string">&#39;updateTimestamp&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="模型同步" tabindex="-1"><a class="header-anchor" href="#模型同步" aria-hidden="true">#</a> 模型同步</h3><p>当定义一个模型时，如果该表不存在，或者表存在但是有不同的列等等与我们的模型有差异时，调用<code>Model.sync</code>可以使模型与数据库同步。</p><ul><li><code>User.sync()</code>表不存在就创建，如果表存在则不执行任何操作</li><li><code>User.sync({force:true})</code>创建表，如果表存在则先删除该表再创建</li><li><code>User.sync({alter:true})</code>检查数据库中表的状态，然后对表执行必要的更改使表与模型匹配</li></ul><p>如果我们想同步所有的模型可以调用<code>await sequelize.sync({ force: true })</code></p><h3 id="模型删除" tabindex="-1"><a class="header-anchor" href="#模型删除" aria-hidden="true">#</a> 模型删除</h3><p>删除某个模型</p><ul><li><code>await User.drop();</code></li></ul><p>删除所有的模型</p><ul><li><code>await sequelize.drop();</code></li></ul><h3 id="安全检查" tabindex="-1"><a class="header-anchor" href="#安全检查" aria-hidden="true">#</a> 安全检查</h3><p>对于模型的删除和同步操作是破坏性的，Sequelize接受一个匹配选项正则表达式作为安全检查，只有当表名与正则匹配才会执行后续操作</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//只有当数据库名以&#39;_test&#39;结尾时才会运行sync()</span>
sequelize<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">force</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">match</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">_test$</span><span class="token regex-delimiter">/</span></span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="属性设置" tabindex="-1"><a class="header-anchor" href="#属性设置" aria-hidden="true">#</a> 属性设置</h3><p>1.简写</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;User&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 简写方式</span>
sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;User&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.给默认值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;User&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span>
    <span class="token literal-property property">defaultValue</span><span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//可以用特殊值填充</span>
sequelize<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;Foo&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">bar</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">DATETIME</span><span class="token punctuation">,</span>
    <span class="token literal-property property">defaultValue</span><span class="token operator">:</span> DataTypes<span class="token punctuation">.</span><span class="token constant">NOW</span>
    <span class="token comment">// 这样，将使用当前日期/时间填充该列(在插入时)。</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29);function S(j,L){const e=p("ExternalLinkIcon"),o=p("CommentService");return i(),c("div",null,[r,n("ul",null,[d,k,v,n("li",null,[m,s("选项 "),n("ul",null,[b,n("li",null,[y,s(":相当于"),g,s(" 可以参考 "),n("a",h,[s("Model.init"),a(e)]),s(".")]),T])])]),f,n("ul",null,[n("li",null,[n("a",q,[D,a(e)])]),n("li",null,[n("a",I,[N,a(e)])])]),E,n("ul",null,[n("li",null,[n("a",z,[s("Model Basics"),a(e)])]),n("li",null,[n("a",_,[s("Hooks"),a(e)])]),n("li",null,[n("a",w,[s("Validations & Constraints"),a(e)])])]),x,a(o)])}const A=l(u,[["render",S],["__file","sequelize.html.vue"]]);export{A as default};
