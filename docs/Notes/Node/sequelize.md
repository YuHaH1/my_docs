---
lang: zh-CN
title: sequelize
description: 关键功能
collapsible: true
---
# sequelize

## 安装

~~~shell
# 这将安装 v6 最新版本的 Sequelize
yarn add sequelize

# 这将安装 v7 最新 alpha 版本的 Sequelize
# yarn add @sequelize/core

# 使用 yarn  下面数据库驱动程序 选择一个即可
yarn add pg pg-hstore # PostgreSQL
yarn add mysql2 # MySQL
yarn add mariadb # MariaDB
yarn add sqlite3 # SQLite
yarn add tedious # Microsoft SQL Server
yarn add ibm_db # DB2
yarn add odbc # IBM i
~~~

## 连接数据库

要连接到数据库,必须创建一个 Sequelize 实例. 这可以通过将连接参数分别传递到 Sequelize 构造函数或通过传递一个连接 URI 来完成：

~~~js
const { Sequelize } = require('@sequelize/core');

// 方法 1: 传递一个连接 URI
const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') 
// Postgres 示例

// 方法 2: 分别传递参数 (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  // 选择一种支持的数据库:
  // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
  dialect: 'postgres'
});
~~~

`Sequelize`构造函数的参数介绍

`public constructor(database: string, username: string, password: string, options: object)`

* `database:string`:数据库名字
* `username:string`：默认值null，连接数据库用户名
* `password:string`:默认值null，连接数据库密码
* `options:object`选项
  * `host：string`:默认值localhost，数据库的主机地址
  * `port：number`:数据库端口号
  * `username:string`：默认值null，连接数据库用户名
  * `password:string`:默认值null，连接数据库密码
  * `database:string`:数据库名字
  * `hooks:object`:在某些生命周期事件之前和之后调用的全局钩子函数的对象。全局钩子将在为同一事件定义的任何特定于模型的钩子之后运行。Init()用于列表)。另外，`beforeConnect()`、`afterConnect()`、`beforeDisconnect()`和`afterDisconnect()`钩子可以在这里定义。
  * `dialect:string`:要链接数据库的语言下面之一`[mysql, postgres, sqlite, db2, mariadb , mssql]`
  * `【dialectModule:string，dialectModulePath:string,dialectOptions 】`这些用于自定义数据库驱动程序模块很少用
  * `define:object`:相当于`Model.init` 可以参考 [Model.init](https://sequelize.org/api/v6/class/src/model.js~Model.html#static-method-init).
  * `options.pool:object`:连接池的配置选项
  * `options.pool.max:number`最大连接数默认5
  * `options.pool.min:number`最小连接数默认0
  * `options.pool.idle:number`默认10000，十秒，连接在被释放之前可以空闲的最大时间，以毫秒为单位。
  * `options.pool.acquire:number`:默认一分钟60000，该池在抛出错误之前尝试获得连接的最大时间(以毫秒为单位)

~~~js
const {Sequelize,Model,DataTypes} = require("sequlize")
const sequelize = new Sequelize({
    dialect:"mysql",
    host:"127.0.0.1/localhost",
    prot:3306,
    username:"root",
    password:"xxx",
    database:"Mall",
    pool:{
		max:10,
         min:0
    }	
})
class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();
~~~



## 数据类型

在模型中定义的每个列都必须具有数据类型。Sequelize提供了许多内置数据类型。要访问内置数据类型，必须导入`DataTypes`

字符串类型

```js
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          PostgreSQL and SQLite only.
DataTypes.TSVECTOR           // TSVECTOR        PostgreSQL only.
```

布尔值类型

~~~js
DataTypes.BOOLEAN            // TINYINT(1)
~~~

数值类型

~~~Js
DataTypes.INTEGER            // INTEGER
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
~~~

日期类型

~~~js
DataTypes.DATE       // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATE(6)    // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
DataTypes.DATEONLY   // DATE without time
~~~







## 模型定义

模型就是数据库中表的抽象，每个模型都需要继承`Model`，模型的定义有两种方式

* [`sequelize.define(modelName, attributes, options)`](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-define)
* [`init(attributes, options)`](https://sequelize.org/api/v6/class/src/model.js~model#static-method-init)

文档参考地址

* [Model Basics](https://sequelize.org/master/manual/model-basics.html) 
* [Hooks](https://sequelize.org/master/manual/model-basics.html) 
* [Validations & Constraints](https://sequelize.org/master/manual/validations-and-constraints.html) 

### 模型的创建

exapmle创建一个用户表

~~~~js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(xxxx);

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// sequelize.define 返回值是我们创建的模型，该模型也被挂载到sequelize.models上
console.log(User === sequelize.models.User); // true
~~~~

Extend Model创建表

~~~js
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(xxx);

class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // 将数据库连接实例传递过去
  modelName: 'User' // 表名
});

console.log(User === sequelize.models.User); // true
~~~

::: tip

创建模型的注意事项

不要添加同名的字段，否则会移除掉框架提供的getter和setter，从而阻止访问模型的实际数据。

:::

~~~js
// Invalid
class User extends Model {
  id; //该字段将对getter和setter进行影子序列化。它应该被移除
  otherPublicField; //这个ok.
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, { sequelize， });

const user = new User({ id: 1 });
user.id; // undefined
~~~



### 创建模型属性参数

~~~Js
const { Model, DataTypes, Deferrable } = require("sequelize");

class Foo extends Model {}
Foo.init({
  // 如果未设置，实例化将自动将该标志设置为true
  flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  // 日期的默认值=>当前时间
  myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  // 将allowNull设置为false将为该列添加NOT NULL，这意味着如果该列为空，则在执行查询时将从DB抛出错误。如果希望在查询DB之前检查值是否为空，请验证部分。
  title: { type: DataTypes.STRING, allowNull: false },
  //创建两个具有相同值的对象将抛出错误。唯一属性可以是一个布尔值，或字符串。如果为多个列提供相同的字符串，它们将形成复合唯一键。
  uniqueOne: { type: DataTypes.STRING,  unique: 'compositeIndex' },
  uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },

  // unique属性是创建唯一约束的简写。
  someUnique: { type: DataTypes.STRING, unique: true },

  // 主键
  identifier: { type: DataTypes.STRING, primaryKey: true },

  // 当新创建时会自增
  incrementMe: { type: DataTypes.INTEGER, autoIncrement: true },

  // 通过'field'属性指定一个自定义的列名:
  fieldWithUnderscores: { type: DataTypes.STRING, field: 'field_with_underscores' },

  // 创建外键
  bar_id: {
    type: DataTypes.INTEGER,

    references: {
      // 这里是对另一个模型的引用
      model: Bar,
      // 这是引用模型的列名
      key: 'id',
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
    comment: 'This is a column name that has a comment'
  }
}, {
  sequelize,
  modelName: 'foo',
  // 在上面的属性中使用' unique: true '与在模型的选项中创建索引完全相同，建了一个唯一索引，该索引基于 someUnique 字段。
  indexes: [{ unique: true, fields: ['someUnique'] }]
});
~~~





* `allowNull:boolean`允许为空
* `defaultValue`默认值
* `unique:string|boolean`:创建唯一约束，如果值是字符串，则相同字符串的将组合成唯一key
* `primaryKey：boolean`是否为主键
* `field:string`自定义属性名
* 



### 创建模型的options参数

* `freezeTableName`：表明等于模型的名字

  * ~~~js
    sequelize.define('User', {
      // ... (attributes)
    }, {
      freezeTableName: true
    });
    const sequelize = new Sequelize('sqlite::memory:', {
      define: {
        freezeTableName: true
      }
    });
    ~~~

  * 

*  `tableName`:指定表名字

  * ~~~js
    sequelize.define('User', {
      // ... (attributes)
    }, {
      tableName: 'Employees'
    });
    ~~~

* `timestamps:boolean`：默认值true。默认情况创建模型时会自动给模型添加`createdAt`和`updatedAt`字段，当创建和更新内容是，该字段也会自动被设置。**(这是sequelize完成的，而不是使用SQL触发器完成，因此直接使用SQL不会导致这些自动自动更新)**。需要禁用就给false

  * ~~~js
    sequelize.define('User', {
      // ... (attributes)
    }, {
      timestamps: false
    });
    ~~~

  * 也可以只启用createdAt/updatedAt中的一个，并为这些列提供一个自定义名称:
    ~~~js
    class Foo extends Model {}
    Foo.init({ /* attributes */ }, {
      sequelize,
    
      // don't forget to enable timestamps!
      timestamps: true,
    
      // 去掉创建时间
      createdAt: false,
    
      // 自定义名称
      updatedAt: 'updateTimestamp'
    });
    ~~~

    



### 模型同步

当定义一个模型时，如果该表不存在，或者表存在但是有不同的列等等与我们的模型有差异时，调用`Model.sync`可以使模型与数据库同步。

* `User.sync()`表不存在就创建，如果表存在则不执行任何操作
* `User.sync({force:true})`创建表，如果表存在则先删除该表再创建
* `User.sync({alter:true})`检查数据库中表的状态，然后对表执行必要的更改使表与模型匹配

如果我们想同步所有的模型可以调用`await sequelize.sync({ force: true })`



### 模型删除

删除某个模型

* `await User.drop();`

删除所有的模型

* `await sequelize.drop();`

### 安全检查

对于模型的删除和同步操作是破坏性的，Sequelize接受一个匹配选项正则表达式作为安全检查，只有当表名与正则匹配才会执行后续操作

~~~js
//只有当数据库名以'_test'结尾时才会运行sync()
sequelize.sync({ force: true, match: /_test$/ });
~~~



### 属性设置

1.简写

~~~js
sequelize.define('User', {
  name: {
    type: DataTypes.STRING
  }
});

// 简写方式
sequelize.define('User', { name: DataTypes.STRING });
~~~

2.给默认值

~~~js
sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    defaultValue: "John Doe"
  }
});
//可以用特殊值填充
sequelize.define('Foo', {
  bar: {
    type: DataTypes.DATETIME,
    defaultValue: DataTypes.NOW
    // 这样，将使用当前日期/时间填充该列(在插入时)。
  }
});
~~~







<CommentService/>