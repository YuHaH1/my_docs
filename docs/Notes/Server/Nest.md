---
lang: zh-CN
title: Nest
description: 关键功能
collapsible: true
---
# Nest

nest中的服务负责处理业务逻辑，service服务于模块要放到module中

## Nest CLI

[使用文档](https://nest.nodejs.cn/cli/usages)

~~~shell
npm install -g @nestjs/cli
// 升级最新版本
npm update -g @nestjs/cli
//创建项目
nest new [项目名] -p pnpm
// 查看帮助
nest -h 
// 使用tsc或者webpack打包代码
nest build
//启动开发服务
nest start
~~~



## HTTP的5种数据传输方式

* url param（`http://fancyfish.top/123`,123就是参数）
* query(`http://fancyfish.top/?name=余&age=24`?后面就是数据，有特殊字符的一般客户端会用`encodeURIComponent(‘余’)编码`)
* form-urlencoded（表单提交数据，放在body中，`content-type=application/x-www-form-urlencoded`）
* form-data（`content-type=multipart/form-data`）
* json（`content-type=application/json`）



### nest获取参数方式

1️⃣url param

~~~ts
import { Controller } from '@nestjs/common';

@Controller('api/test-module')
export class TestModuleController {
    @Get(':id')
    urlParam(@Param(id)id:string){
        return id
    }
}
//前端
axios.get('/api/test-module/123')
~~~

2️⃣query

~~~ts
import { Controller } from '@nestjs/common';

@Controller('api/test-module')
export class TestModuleController {
    @Get('find')
    query(@Query('name')name:string,@Query('age')age:number){
        return name+age
    }
}
//前端
axios.get('/api/test-module/find',{params:{name:'ads',age:123}})
~~~

3️⃣form urlencoded

Nest使用`@Body`装饰器

~~~ts
class CreateUserDto{
    name:string;
    id:number
}
@Controller('api/test-module')
export class TestModuleController {
    @Post()
    body(@Body()userInfo:CreateUserDto){
        return JSON.stringify(userInfo)
    }
}
//前端
axios.post('/api/test-module',
	Qs.stringify({name:'ads',age:123}),
    {
    headers:{'content-type':'application/x-wwww-form-urlencoded'}
    }
)
~~~

4️⃣JSON

服务端都是用`@body`接收参数，`form urlencoded`和`json`都是从`body`取值，Nest内部会根据`content type`使用不同解析方式

~~~ts
class CreateUserDto{
    name:string;
    id:number
}
@Controller('api/test-module')
export class TestModuleController {
    @Post()
    body(@Body()userInfo:CreateUserDto){
        return JSON.stringify(userInfo)
    }
}
//前端
axios.post('/api/test-module',{name:'ads',age:123})
~~~

5️⃣form data

Nest解析form data使用FileInterceptor的拦截器，用@UseInterceptors装饰器启用，然后通过@UploadedFiles取参数.服务端会将接收到的文件存放到根目录的uploads文件夹下

~~~ts
import { AnyFilesInterceptor } from '@nestjs/platform-express';
class CreateUserDto{
    name:string;
    id:number
}
@Controller('api/test-module')
export class TestModuleController {
    @Post(‘file’)
    @UseInterceptors(AnyFilesInterceptor({dest:'uploads/'}))
    body(@Body()userInfo:CreateUserDto){
        return JSON.stringify(userInfo)
    }
}
//前端
const data = new FormData()
data.set('name','ads')
data.set('age','123')
data.set('files1',fileInput.files[0])
axios.post('/api/test-module',data,{headers:{'content-type':'multipart/form-data'}}})
~~~

## HTTP状态码

在Nestjs中HTTP状态码都在`@nestjs/common`中

* `BadRequestException`
* `UnauthorizedException`
* `NotFoundException`
* `ForbiddenException`
* `NotAcceptableException`
* `RequestTimeoutException`
* `ConflictException`
* `GoneException`
* `HttpVersionNotSupportedException`
* `PayloadTooLargeException`
* `UnsupportedMediaTypeException`
* `UnprocessableEntityException`
* `InternalServerErrorException`
* `NotImplementedException`
* `ImATeapotException`
* `MethodNotAllowedException`
* `BadGatewayException`
* `ServiceUnavailableException`
* `GatewayTimeoutException`
* `PreconditionFailedException`

## IOC（Inverse Of Control）

反转控制，解决依赖关系痛点

后端系统中，会有很多对象：

* Controller 对象：接收 http 请求，调用 Service，返回响应
* Service 对象：实现业务逻辑
* Repository 对象：实现对数据库的增删改查

Controller 依赖了 Service 实现业务逻辑，Service 依赖了 Repository 来做增删改查，Repository 依赖 DataSource 来建立连接，DataSource 又需要从 Config 对象拿到用户名密码等信息。在应用初始化的时候，需要理清依赖的先后关系，创建一大堆对象组合起来，还要保证不要多次 new，是不是很麻烦？解决这个痛点的方式就是 IOC（Inverse Of Control）。java 的 Spring 就实现了 IOC，Nest 也同样实现了。

IOC 机制是在 class 上标识哪些是可以被注入的，它的依赖是什么，然后从入口开始扫描这些对象和依赖，自动创建和组装对象。

Nest 里通过 @Controller 声明可以被注入的 controller，通过 @Injectable 声明可以被注入也可以注入别的对象的 provider，然后在 @Module 声明的模块里引入。

并且 Nest 还提供了 Module 和 Module 之间的 import，可以引入别的模块的 provider 来注入。



## Service=Providers

提供者是Nest的一个基本概念。许多基本的Nest类可以被视为提供者——服务、存储库、工厂、助手等等。提供者的主要思想是它可以作为依赖注入，这意味着对象之间可以创建各种各样的关系，并且“连接”这些对象的功能可以在很大程度上委托给Nest运行时系统。

![](/Nest/providers.png)

### 创建服务

~~~shell
nest g service cats
~~~



~~~ts
//cats.service.ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
//interfaces/cat.interface.tsJS

export interface Cat {
  name: string;
  age: number;
  breed: string;
}
~~~



### 注册服务

现在我们已经定义了一个提供者(CatsService)，并且有了该服务的消费者(CatsController)，我们需要向Nest注册该服务，以便它可以执行注入。我们通过编辑模块文件(app.module.ts)并将服务添加到@Module装饰器的providers数组中来实现这一点。

我们的控制器一般处理路由，如果需要在控制器中注册服务如何做？在Moduel中将服务提供出去

~~~ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
~~~

在controller中注入服务`private catsService: CatsService`

~~~ts
//cats.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
~~~



### Optional providers

偶尔，您可能会有不需要解析的依赖项。例如，您的类可能依赖于配置对象，但如果没有传递，则应使用默认值。在这种情况下，依赖项成为可选的，此时缺少配置提供程序不会导致错误。要指出一个提供程序是可选的，可以在构造函数的签名中使用@Optional()装饰器。

~~~ts
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
~~~



### 基于属性注入依赖

在一些非常特殊的情况下，基于属性的注入可能很有用。例如，如果您的顶级类依赖于一个或多个提供程序，那么通过在构造函数的子类中调用super()来传递它们是非常繁琐的。为了避免这种情况，你可以在属性级别使用@Inject()装饰器。

~~~ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
~~~



### 服务的循环依赖

~~~ts
// DddService.service.ts
import { Injectable } from '@nestjs/common';
import { CccService } from './ccc.service';

@Injectable()
export class DddService {
    constructor(private cccService: CccService) {}

    ddd() {
        return this.cccService.ccc()  + 'ddd';
    }
}

// CccService.service.ts
import { Injectable } from '@nestjs/common';
import { DddService } from './ddd.service';

@Injectable()
export class CccService {
    constructor(private dddService: DddService) {}

    ccc() {
        return 'ccc';
    }

    eee() {
        return this.dddService.ddd() + 'eee';
    }
}
~~~

解决办法

~~~ts
@Injectable()
export class DddsService {
  constructor(
    @Inject(forwardRef(() => CccService))
    private cccService: CccService,
  ) {}
}
@Injectable()
export class CccService {
  constructor(
    @Inject(forwardRef(() => DddService))
    private dddService: DddService,
  ) {}
}
~~~





## Module

![](/Nest/Modules_1.png)

每个应用程序至少有一个模块，即根模块。根模块是Nest用来构建应用程序图的起点——这是Nest用来解析模块和提供者关系及依赖关系的内部数据结构。虽然非常小的应用程序理论上可能只有根模块，但这并不是典型的情况。我们要强调的是，强烈推荐使用模块作为组织组件的有效方法。因此，对于大多数应用程序，最终的体系结构将使用多个模块，每个模块。封装一组密切相关的功能。

模块是一个带@Module装饰器的类。@Module装饰器提供了Nest用来组织应用程序结构的元数据。



### Feature Module功能模块

`CatsController`属于`CatsService`同一应用程序域。由于它们密切相关，因此将它们移至功能模块中是有意义的。功能模块只是组织与特定功能相关的代码，保持代码组织并建立清晰的边界。这有助于我们管理复杂性并按照[可靠的](https://en.wikipedia.org/wiki/SOLID)原则进行开发，特别是随着应用程序和/或团队规模的增长。

~~~ts
//cats/cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
//app.module.ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
~~~

我们在文件中定义了`cats.module.ts`，并将与该模块相关的所有内容都移到了`cats`目录中。我们需要做的事是将此模块导入到根模块（文件`AppModule`中定义的 , `app.module.ts`）

目录结构如下

~~~ts
src
	cats
		dto
			create-cat.dto.ts
		interfaces
			cat.interface.ts
		cats.controller.ts
		cats.module.ts
		cats.service.ts
	app.module.ts
main.ts

~~~







### 工厂函数

如果你的服务依赖另一个服务，那可以定义一个工厂函数，工厂函数的参数会接收其他服务。如下

~~~ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModuleModule } from './test_module/test_module.module';
class DBserver { }
@Module({
  imports: [TestModuleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TestFactory',
      inject: [AppService],// 该工厂函数需要用的服务注入进去
      useFactory(injecters) {
        console.log(injecters);
        return new DBserver();
      },
    },
  ],
})
export class AppModule { }

~~~

### 模块共享

![](/Nest/Shared_Module_1.png)

每个模块自动成为一个共享模块。一旦创建，它就可以被任何模块重用。假设我们想要在其他几个模块之间共享CatsService的一个实例。为了做到这一点，我们首先需要通过将其添加到模块的exports数组中来导出CatsService provider，如下所示:

如果A模块想使用B模块（主要是针对于B模块的服务），那B模块需要暴露出去自己的服务

~~~ts
// cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
~~~

现在，任何导入CatsModule的模块都可以访问CatsService，并将与导入它的所有其他模块共享同一个实例。

#### 循环依赖

如果两个module之间互相导入,会报错

~~~ts
//Amodule
@Module({
    imports:[BModule]
})

//Bmodule
@Module({
    imports:[AModule]
})
~~~

解决办法转发模块

~~~ts
//Amodule
@Module({
    imports:[
    	forwardRef(()=>BModule)
    ]
})

//Bmodule
@Module({
    imports:[
        forwardRef(()=>AModule)
    ]
})
~~~







### 动态模块

什么是静态模块。Nest 将模块连接在一起所需的所有信息都已在主机和使用模块中声明。静态模块绑定，使用模块没有机会**影响**主机模块中提供程序的配置方式。为什么这很重要？

**什么是动态模块**？考虑这样的情况：我们有一个通用模块，需要在不同的用例中表现不同。这类似于许多系统中的“插件”概念，其中通用设施需要进行一些配置才能被消费者使用。



Nest 模块系统包含一个名为 **动态模块** 的强大功能。 此功能使你能够轻松创建可自定义的模块，这些模块可以动态注册和配置提供程序。 动态模块 **extend** 返回的属性（而不是覆盖）`@Module()` 装饰器中定义的基本模块元数据。 这就是静态声明的 `Connection` 提供程序 **and** 和动态生成的存储库提供程序从模块中导出的方式。如果要在全局作用域内注册动态模块，请将 `global` 属性设置为 `true`。

~~~ts
//// config.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
// config.service.ts
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Inject } from '@nestjs/common';
import { EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

// 其他模块中动态使用
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
~~~

我们剩下的任务是以某种方式将`register()`步骤中的`options`对象注入到`ConfigService`中，当然，我们将使用`dependency injection`来完成它。这是一个关键点，所以一定要理解它。我们的`ConfigModule`提供了`ConfigService`。`ConfigService`又依赖于仅在运行时提供的`options`对象。因此，在运行时，我们需要首先将options对象绑定到Nest loC容器，然后将Nest注入到ConfigService中。记住，在自定义提供程序一章中，提供程序可以包含任何值，而不仅仅是服务，所以我们可以使用依赖注入来处理简单的`options object`。让我们首先处理将选项对象绑定到loC容器的问题。我们在静态`register()`方法中这样做。记住，我们正在动态地构造一个模块，模块的一个属性会访问它的提供商列表。我们需要做的是将options对象定义为一个提供者。这将使它可以注入到ConfigService中，我们将在下一步中利用它。在下面的代码中，请注意providers数组:



总结：动态模块相当于在我们的模块上绑定静态方法，通过调用该静态方法，返回一些模块。

#### 动态模块的默认标准

您可能已经在一些enestjs/包中看到了forRoot、register和forfeature等方法的使用，并且可能想知道这些方法的区别是什么。关于这一点没有硬性规定，但是enestjs/包尝试遵循这些指导原则:当创建一个带有:

* `register`：用一次模块传一次配置，比如这次调用是 `BbbModule.register({aaa:1})`，下一次就是 `BbbModule.register({aaa:2})` 了。

* `forRoot`:配置一次模块用多次，比如 `XxxModule.forRoot({})` 一次，之后就一直用这个 Module，一般在 AppModule 里 import
* `forFeature`:用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置，比如用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。









### 全局模块

如果你必须在所有地方导入相同的模块集，它会变得乏味。 与 Nest 不同，[Angular](https://angular.io/)`providers` 是在全局作用域内注册的。 一旦定义，它们随处可用。 然而，Nest 将提供程序封装在模块作用域内。 如果不首先导入封装模块，则无法在其他地方使用模块的提供程序。当你想提供一组开箱即用的提供程序时（例如，助手、数据库连接等），请使用 `@Global()` 装饰器制作模块 **global**。



~~~ts
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
~~~

`@Global()` 装饰器使模块具有全局作用域。 全局模块应注册为 **只有一次**，一般由根或核心模块注册。 在上面的示例中，`CatsService` 提供程序将无处不在，希望注入服务的模块将不需要在其导入数组中导入 `CatsModule`。

使用的时候不必`imports`引入了









### 提供者injected

在NestJS中，"injected providers"（被注入的提供者）是指通过依赖注入（Dependency Injection）机制注入到类中的可重用对象或服务。通过将依赖项注入到类中，我们可以解决以下问题：

1. 代码重复：通过将公共逻辑封装在提供者中，我们可以在多个类中共享这些功能，避免了代码的重复编写。
2. 松耦合：通过依赖注入，类与具体实现细节解耦，提高了代码的可维护性和可测试性。我们可以更容易地替换或模拟依赖项，以进行单元测试或集成测试。
3. 可扩展性：通过注入提供者，我们可以轻松地扩展应用程序，添加新的功能或模块，而无需修改现有的类。

:::tip

要使用 CLI 创建服务，只需执行 `nest g service cats` 命令即可。

:::

提供者可以提供service也可提供一些数据。

提供服务eg：

~~~ts
import { Controller, Get, Injectable, Module } from '@nestjs/common';

@Injectable()
class DatabaseService {
  getData(): string {
    return 'Data from database';
  }
}

@Injectable()
class AppService {
  constructor(private readonly databaseService: DatabaseService) {}
  getDataFromDatabase(): string {
    return this.databaseService.getData();
  }
}

@Module({
  providers: [AppService, DatabaseService],// 引入DatabaseService服务
})
class AppModule {}

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): string {
    return this.appService.getDataFromDatabase();
  }
}
~~~

提供数据eg：（可以提供任意数据类型），引用的时候要使用  `@Inject(提供服务的的provide值) `

~~~ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModuleModule } from './test_module/test_module.module';

@Module({
  imports: [TestModuleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TestFactory',
      inject: [AppService],
      useFactory() {
        return new Promise((r) => {
          setTimeout(() => {
            r('2');
          }, 1000);
        });
      },
    },
    {
      provide: 'ProvideValue',
      useValue: 'ProvideValue提供的数据',
    },
  ],
})
export class AppModule { }
//
import { Injectable, Inject } from '@nestjs/common';
import { TestModuleService } from './test_module/test_module.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('ProvideValue') private provideValue: string,
    private cs: TestModuleService,
  ) { }
  getHello(): string {
    return this.provideValue;
  }
}

~~~







### 异步服务提供

~~~ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModuleModule } from './test_module/test_module.module';

@Module({
  imports: [TestModuleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TestFactory',
      inject: [AppService],
      useFactory() {
        return new Promise((r) => {
          setTimeout(() => {
            r('2');
          }, 1000);
        });
      },
    },
  ],
})
export class AppModule { }

~~~





## Controller

**作用**：控制器负责处理传入的请求并向客户端返回响应。控制器就是控制路由的，其目的是接收应用的特定请求。 **routing** 机制控制哪个控制器接收哪些请求。 通常，每个控制器都有不止一条路由，不同的路由可以执行不同的操作。

创建一个基本的控制器，要使用类和装饰器。装饰器将类与所需的元数据关联起来，并使Nest能够创建路由映射(将请求绑定到相应的控制器)。

提示为了快速创建带有内置验证的CRUD控制器，您可以使用CLI的CRUD生成器:`nest g resource [name]`

### 创建控制器

~~~shell
nest g controller cats
~~~

`@Controller()` 装饰器，来定义一个基本控制器。 我们将指定 `cats` 的可选路由路径前缀。 在 `@Controller()` 装饰器中使用路径前缀可以让我们轻松地对一组相关路由进行分组，并最大限度地减少重复代码。 例如，我们可以选择将一组路由分组，这些路由管理与路由 `/cats` 下的猫实体的交互。 在这种情况下，我们可以在 `@Controller()` 装饰器中指定路径前缀 `cats`，这样我们就不必为文件中的每个路由重复该部分路径。

`cats`将作为这个路由分组的公共前缀

~~~ts
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
~~~

:::tip

要使用 CLI 创建控制器，只需执行 `nest g controller [name]` 命令。

:::

### 注册控制器

在定义了上述控制器之后，Nest仍然不知道catscontroller存在，因此不会创建该类的实例。控制器总是属于一个模块，这就是我们在@Module()装饰器中包含控制器数组的原因。因为除了根模块AppModule之外，我们还没有定义任何其他模块，所以我们将用它来引入CatsController:

~~~ts
//app.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
~~~







### 请求和响应对象

处理程序通常需要访问客户端 **request** 的详细信息。 Nest 提供对底层平台请求对象的访问（默认为 Express）。 我们可以通过将 `@Req()` 装饰器添加到处理程序的签名来指示 Nest 注入它来访问请求对象。

**为了利用 `express` 类型（如下面的 `request: Request` 参数示例），安装 `@types/express` 包。**

~~~ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
~~~

#### 请求对象

处理程序通常需要访问客户端 **request** 的详细信息。 Nest 提供对底层平台 [请求对象](https://express.nodejs.cn/en/api.html#req) 的访问（默认为 Express）。 我们可以通过将 `@Req()` 装饰器添加到处理程序的签名来指示 Nest 注入它来访问请求对象。

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

请求对象表示 HTTP 请求，并具有请求查询字符串、参数、HTTP 标头和正文的属性（阅读更多 [此处](https://express.nodejs.cn/en/api.html#req)）。 在大多数情况下，没有必要手动获取这些属性。 我们可以使用开箱即用的专用装饰器，例如 `@Body()` 或 `@Query()`。 下面是提供的装饰器列表和它们代表的普通平台特定对象。

| `@Request(), @Req()`       | `req`                               |
| -------------------------- | ----------------------------------- |
| `@Response(), @Res()`***** | `res`                               |
| `@Next()`                  | `next`                              |
| `@Session()`               | `req.session`                       |
| `@Param(key?: string)`     | `req.params` / `req.params[key]`    |
| `@Body(key?: string)`      | `req.body` / `req.body[key]`        |
| `@Query(key?: string)`     | `req.query` / `req.query[key]`      |
| `@Headers(name?: string)`  | `req.headers` / `req.headers[name]` |
| `@Ip()`                    | `req.ip`                            |
| `@HostParam()`             | `req.hosts`                         |



#### 响应相关

1️⃣响应对象

为了与跨底层 HTTP 平台（例如 Express 和 Fastify）的类型兼容，Nest 提供了 `@Res()` 和 `@Response()` 装饰器。 `@Res()` 只是 `@Response()` 的别名。

当使用响应对象为了兼容底层HTTP平台(例如Express和fasttify)的类型，Nest提供了@Res()和@Response()装饰器。@Res()只是@Response()的别名。在使用它们时，应该为底层库(例如@types/express)导入类型。请注意，**当方法处理程序中注入@Res()或@Response()时，当这样做时，你必须通过调用响应对象(例如，res. json(…)或者res.send(…)来发出某种响应，否则HTTP服务器将挂起。**



2️⃣状态码

 默认情况下响应 **状态码** 始终为 **200**，但 POST 请求除外，其为 **201**。 我们可以通过在处理程序级别添加 `@HttpCode(...)` 装饰器来轻松更改此行为。

3️⃣响应头

要指定自定义响应标头，你可以使用 `@Header()` 装饰器或库特定的响应对象（并直接调用 `res.header()`）。

例如`@Header('Cache-Control', 'none')`从 `@nestjs/common` 包中导入 `Header`。

4️⃣重定向

要将响应重定向到特定 URL，你可以使用 `@Redirect()` 装饰器或库特定的响应对象（并直接调用 `res.redirect()`）。

`@Redirect()` 有两个参数，`url` 和 `statusCode`，两者都是可选的。 如果省略，`statusCode` 的默认值为 `302` (`Found`)。

~~~ts
@Redirect('https://nest.nodejs.cn', 301)
~~~

返回值将覆盖传递给 `@Redirect()` 装饰器的任何参数。 例如：

~~~ts
@Get('docs')
@Redirect('https://nest.nodejs.cn', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://nest.nodejs.cn/v5/' };
  }
}
~~~



## DTO数据传输对象



但首先(如果你使用TypeScript)，我们需要确定DTO(数据传输对象)模式。DTO是定义如何通过网络发送数据的对象。我们可以通过使用TypeScript接口或简单的类来确定DTO模式。有趣的是，我们建议在这里使用类。为什么?类是JavaScript ES6标准的一部分，因此它们在编译后的JavaScript中被保存为真实的实体。另一方面，由于TypeScript接口在编译过程中被删除，所以Nest不能在运行时引用它们。这一点很重要，因为pipe等特性在运行时访问变量的元类型时启用了其他可能性。

~~~ts
//create-cat.dto.ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
//cats.controller.ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
~~~



#### 创建DTO的控制器



~~~ts
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
~~~





## 中间件

![](/Nest/middleware.png)

Nest自定义中间件必须实现`NestMiddleware`,定义`use`方法。下面是具体实现方法以及全局中间件的定义方式。

~~~ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class MyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('brefore');
    next();
    console.log('after');
  }
}
~~~

`@Module()` 装饰器中没有中间件的位置。 相反，我们使用模块类的 `configure()` 方法设置它们。 包含中间件的模块必须实现 `NestModule` 接口。 让我们在 `AppModule` 级别设置 `LoggerMiddleware`。

~~~ts
import { Module,MiddlewareConsumer,NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MyMiddleware} from './MyMiddleware'


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
	configure(consumer:MiddlewareConsumer){
        consumer.apply(MyMiddleware).forRoutes('*')//全局中间件对所有路由都生效
        consumer.apply(MyMiddleware).forRoutes({path:'user*',method:RequestMethod.GET})//对所有用户路由的GET请求生效
    }
     consumer.apply(MyMiddleware).exclude({path:'user',method:RequestMethod.POST}).forRoutes({path:'hello',method:RequestMethod.GET})//对所有hello路由生效并排除掉user路由
    }
}
~~~

## 拦截器

`NestInterceptor<T, R>` 是一个通用接口，其中 `T` 表示 `Observable<T>`（支持响应流）的类型，`R` 是 `Observable<R>` 封装的值的类型。

~~~ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}

//注册局部拦截器
@UseInterceptors(new LoggingInterceptor())
export class CatsController {}
//全局拦截器
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
~~~











## filter过滤器



对错误进行捕获并返回自定义格式的内容。Exception Filter 是在 Nest 应用抛异常的时候，捕获它并返回一个对应的响应。比如路由找不到时返回 404；参数的错误返回 400；服务端报错时返回 500。

我们可以在控制器中抛出异常

~~~ts
throw new BadRequestException('缺少参数id')
/*客户端会收到
{
    "message":'缺少参数id',
    "error":"Bad Request",
    "statusCode":400
}
*/
~~~

我们可以通过过滤器自定义异常处理。

~~~shell
nest g filter testFilter --flat --no-spec
~~~

~~~ts
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
@Catch(BadRequestException)
export class testFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
  	const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    const statusCode = exception.getStatus();

    response.status(statusCode).json({
       code: statusCode,
       message: exception.message,
       error: 'Bad Request',
       xxx: 111
    })
  }
}

~~~

 `catch(exception: 要捕获异常的类型)`

由于过滤器会覆盖掉我们对ATO 管道的验证信息。因此需要做特殊处理

~~~ts
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HelloFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    const statusCode = exception.getStatus();

    const res = exception.getResponse() as { message: string[] };
    
    response.status(statusCode).json({
       code: statusCode,
       message: res?.message?.join ? res?.message?.join(',') : exception.message,
       error: 'Bad Request',
       xxx: 111
    })
  }
}
~~~

### 自定义异常

~~~ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class UnLoginException{
  message: string;
  constructor(message?:string){
    this.message = message;
  }
}

@Catch(UnLoginException)
export class UnloginFilter implements ExceptionFilter {
  catch(exception: UnLoginException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: 'fail',
      data: exception.message || '用户未登录'
    }).end();
  }
}
然后在APP module注册
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {UnloginFilter} from './x'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
      AppService,
      {
          provide:APP_FILTER,
          useClass:UnloginFilter
      }
  ],
})
export class AppModule { }
// 然后在app 控制器中可以抛出异常
throw UnLoginException('用户暂未登录')
~~~





**总结**

* 通过 @Catch 指定要捕获的异常，然后在 catch 方法里拿到异常信息，返回对应的响应。**如果捕获的是 HttpException，要注意兼容下 ValidationPipe 的错误格式的处理。**

* filter 可以通过 @UseFilters 加在 handler 或者 controller 上，也可以在 main.ts 用 app.useGlobalFilters 全局启用。

* 如果 filter 要注入其他 provider，就要通过 AppModule 里注册一个 token 为 APP_FILTER 的 provider 的方式。

* 此外，捕获的 Exception 也是可以自定义的。这样，我们就可以自定义异常和异常返回的响应格式了。

  

  

  







### 全局启用过滤器

~~~ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HelloFilter} from './testFilter.filter'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new testFilter())
  await app.listen(3000);
}
bootstrap();

~~~



### 局部启用过滤器

~~~ts
import { Controller, Get,UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { TestModuleService } from './test_module/test_module.service';
import {HelloFilter} from './testFilter.filter'
@Controller('user')
@UseFilters(HelloFilter)//整个user路由过滤
export class AppController {
  constructor(
    private readonly cs: TestModuleService,
    private readonly appService: AppService,
  ) { }

  @Get()
  @UseFilters(HelloFilter)// user的get请求过滤
  getHello(): string {
    return this.appService.getHello() + this.cs.commonService();
  }
}

~~~



## pip管道

[文档地址](https://docs.nestjs.com/pipes)

**管道是一个带有`@Injectable()`装饰器的类，它实现了`PipeTransform`接口**

**使用场景**：对客户端参数做验证

Pipe 是在参数传给 handler 之前做一些验证和转换的，有 9 个内置的 Pipe 可以直接用。在 pipe 里可以拿到装饰器和 handler 参数的各种信息，基于这些来实现校验和转换就是很简单的事情了。Pipe 是在参数传给 handler 之前对参数做一些验证和转换的 class

**对于post请求需要使用ValidationPipe**

内置的 Pipe 有这些：它们都实现了 PipeTransform 接口：

* ParseIntPipe（将参数转为整数，如果传入不能parse的参数会报错）
* ParseBoolPipe（将参数转为bool值）
* ParseArrayPipe
* ParseUUIDPipe
* DefaultValuePipe
* ParseEnumPipe
* ParseFloatPipe
* ParseFilePipe和ValidationPipe（详见下面）

### 指定管道转换失败的状态码

例如`ParseIntPipe`

~~~ts
create(@Query('age'),new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_FOUND})age:number ):age{
    return age+1
}
~~~

如果转换失败就会将状态码置为404

### 在管道中抛异常

可以自己抛一个异常出来，然后让 exception filter 处理：

~~~ts
test(
    @Query('age',new ParseIntPipe({
    exceptionFactory:(msg)=> throw new MyFilter('xxx'+msg,HttpStatus.NOT_IMPLEMENTED)
})) age:string
)
~~~

### 全局管道



~~~ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes()
  await app.listen(3000);
}
bootstrap();

~~~

### 管道验证参数例子

#### 装饰器验证

~~~shell
pnpm install -D class-validator class-transformer
~~~

~~~ts
class User extends BaseContent{
    @MinLength(10)
    @MaxLength(20)
    name:string
    
    @Contains('id')//id字段必须包含id
    id:string
    
}
const user = new User()
user.name='sad'
user.id='id21213'
validate(user).then(errors=>{
    console.log(errors)
})
~~~

#### 将参数数组每一项转成Number

~~~ts
@Get('test')
test(
    @Query('arr',new ParseArrayPipe({items:Number}))
    arr:Array<number>
){
    
}
~~~

指定 item 的类型。这样就把数组每一项处理为 number 了。

#### 指定参数分隔符

~~~ts
@Get('test')
test(
    @Query('arr',new ParseArrayPipe({sperator:''}))
    arr:Array<any>
){
    
}
~~~

url必须类似于localhost:3000/arr?arr=a..b..c，否则报错

#### 指定枚举参数

指定枚举参数有两个好处

* 限制参数的取值范围
* 直接做类型转换，转换成枚举的类型（下面的123直接整型）



~~~ts
enum ESeason{
    '1'='spring',
    '2'='summer',
    '3'='fall',
    '4'='winter'
    '5'=123
}
@Get('test')
test(
    @Query('arr',new ParseEnumPipe(ESeason))
    arr:ESeason
){
  }
~~~

url中必须携带枚举中的任意一个localhost:3000/arr/spring



### 自定义管道

自己写一个 pipe 也很简单，就是实现 PipeTransform 接口的 transform 方法，它的返回值就是传给 handler 的值。

自己实现一个将参数转成整数的管道

~~~shell
nest g pipe testPip --flat --no-spec
~~~

~~~ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TestPipPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return parseInt(value);
  }
}
//在handler中
@Get('user/:id')
test(@Query('age',TestPipPipe)age:string,@Param('id',TestPipPipe)id:number){
    console.log(value,metadata)
}
//  123 {metatype:[Function:Number],type:'param',data:id}

//  2333 {metatype:[Function:Number],type:'query',data:'age'}
~~~

url：`localhost:3000/user/123?age=2333`

### ValidationPipe 

安装依赖

~~~shell
pnpm i --save class-validator class-transformer
~~~

然后全局注册`ValidationPipe`

~~~ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
~~~

之后在dto中进行验证

~~~ts
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class Post {
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;

  @IsDate()
  createDate: Date;
}

let post = new Post();
post.title = 'Hello'; // should not pass
post.text = 'this is a great post about hell world'; // should not pass
post.rating = 11; // should not pass
post.email = 'google.com'; // should not pass
post.site = 'googlecom'; // should not pass

~~~



post 请求的数据是通过 @Body 装饰器来取，并且要有一个 dto class 来接收：（dto就是一个类，定义前段传递的参数类型即可）

~~~ts
export class UserDTO{
    username:string,
    password:string
}
@Post('user')
create(@Body()user:UserDTO){
    console.log(user)
}
//前端传递的body就会打印出来
~~~

但是如果前端的username传递数字也可以接收，而这可能会导致后续逻辑出错，此时我们可以用`ValidationPipe` 验证DTO它需要两个依赖包：[class-validator](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclass-validator) 包提供了基于装饰器声明的规则对对象做校验的功能;而 [class-transformer](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclass-transformer) 则是把一个普通对象转换为某个 class 的实例对象的.

原理：**我们声明了参数的类型为 dto 类，pipe 里拿到这个类，把参数对象通过 class-transformer 转换为 dto 类的对象，之后再用 class-validator 包来对这个对象做验证。**

~~~shell
pnpm install class-validator class-transformer
~~~

~~~ts
export class UserDTO{
    @isString
    username:string,
    password:string
}
@Post('user')
create(@Body(new ValidationPipe())user:UserDTO){
    console.log(user)
}
//前端传递的body就会打印出来
~~~











####  DTO（Data Transfer Object）

DTO代表数据传输对象（Data Transfer Object）

DTO对象通常是只读的，不包含业务逻辑，主要用于数据的封装和传输。它可以包含与业务实体相对应的属性，但通常只包含必要的数据，以减少网络传输的开销，并且可以避免不必要的数据暴露。



## Guards

**守卫是有`@injectable`装饰器的类，实现了CanActivate接口**

**使用场景**：决定客户端请求是否交给某路由处理，一般用于做角色和权限验证。

**守卫相对于中间件区别**:守卫可以访问`ExecutionContext`实例，因此可以确切知道接下来要执行什么。而中间件 next函数后并不知道接下来调用哪个处理程序。

**执行时机**：guard在所有中间件之后执行，但在任何拦截器或pipe.之前执行

守卫需要返回布尔值决定是否接受该请求

### 定义一个守卫

`validateRequest`函数由自己定义根据请求`request`决定是否接收该请求。

~~~ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
~~~



### 控制器级别的守卫

~~~ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

~~~

@UseGuards()装饰器是从@nestjs/common包中导入的。

~~~ts
import { UseGuards } from '@nestjs/common';
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
~~~



### 全局守卫

全局守卫有两种方式

1️⃣这种方式无法在守卫构造函数中注入依赖

~~~ts
// main.ts
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
~~~

2️⃣如果需要使用其他依赖则推荐这种方式

~~~ts
//app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
~~~



## Reflector和Metadata

**使用场景**：注入角色权限，标注该路由的权限，守卫通过user参数，查询权限是否包含该路由的角色权限，有才放行。

Nest 的实现原理就是通过装饰器给 class 或者对象添加元数据，然后初始化的时候取出这些元数据，进行依赖的分析，然后创建对应的实例对象就可以了。

我们可以在控制器上加元数据，然后在守卫或拦截器里通过reflector取出来

~~~ts
import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { TestModuleService } from './test_module/test_module.service';

@Controller()
export class AppController {
  constructor(
    private readonly cs: TestModuleService,
    private readonly appService: AppService,
  ) { }

  @Get()
  @UseGuards(TestGuard)
  @useInterceptors(TestInterceptor)
  @SetMetadata('role',['admin'])
  getHello(): string {
    return this.appService.getHello() + this.cs.commonService();
  }
}

canActivate(){
    this.reflector('roles',context.getHandler())//['admin']
}
~~~



Nest 的装饰器的实现原理就是 Reflect.getMetadata、Reflect.defineMetadata 这些 api。通过在 class、method 上添加 metadata，然后扫描到它的时候取出 metadata 来做相应的处理来完成各种功能。

Nest 的 Controller、Module、Service 等等所有的装饰器都是通过 Reflect.meatdata 给类或对象添加元数据的，然后初始化的时候取出来做依赖的扫描，实例化后放到 IOC 容器里。

实例化对象还需要构造器参数的类型，这个开启 ts 的 emitDecoratorMetadata 的编译选项之后， ts 就会自动添加一些元数据，也就是 design:type、design:paramtypes、design:returntype 这三个，分别代表被装饰的目标的类型、参数的类型、返回值的类型。

当然，reflect metadata 的 api 还在草案阶段，需要引入 reflect metadata 的包做 polyfill。

Nest 还提供了 @SetMetadata 的装饰器，可以在 controller 的 class 和 method 上添加 metadata，然后在 interceptor 和 guard 里通过 reflector 的 api 取出来。

理解了 metadata，nest 的实现原理就很容易搞懂了。









## Typeorm

[TypeORM](https://github.com/typeorm/typeorm) 绝对是 node.js 世界中可用的最成熟的对象关系映射器 (ORM)。 由于它是用 TypeScript 编写的，因此可以很好地与 Nest 框架配合使用。



### 1.安装

~~~shell
pnpm install --save typeorm mysql2
~~~



### 2.建立数据库连接

配置文件格式如下yarm

~~~yaml
app:
  port: 3000

db:
  type: 'mysql'
  host: 'localhost'
  port: 3306
  username: 'root'
  password: 'root'
  database: 'typeorm'
  logging: true
  poolSize: 10
  connectorPackage: 'mysql2'
~~~



①读取配置文件

~~~ts
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
interface Database extends MysqlConnectionOptions {
  type: 'mysql' | 'mariadb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  poolSize: number;
  connectorPackage: 'mysql' | 'mysql2';
}
interface IConfig {
  app: {
    port: number;
  };
  db: Database
}
export const configLoad =  async () => {
  const configFilePath = join(process.cwd(), `${process.env.NODE_ENV}.yaml`);
  const config = await readFile(configFilePath, {
    encoding: 'utf-8',
  });
  return yaml.load(config) as Promise<IConfig>;
};
~~~



创建database.providers.ts文件

```typescript
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
]
```

:::warning

synchronize: true不应在生产中使用 - 否则可能会丢失生产数据。

:::

然后在database.module.ts文件中

~~~ts
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
~~~

最后将数据库的模块注册到app.module.ts中

~~~dart
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
~~~

### 3.操作表

①创建一个photo表

~~~ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;
}

~~~

②创建服务提供者photo.providers.ts

~~~ts
import { DataSource } from 'typeorm';
import { Photo } from './photo.entity';

export const photoProviders = [
  {
    provide: 'PHOTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
    inject: ['DATA_SOURCE'],
  },
];
~~~

photo.service.ts

~~~ts
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
}
~~~

③注册服务photo.module.ts



~~~ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...photoProviders,
    PhotoService,
  ],
})
export class PhotoModule {}
~~~

④`PhotoModule` 导入根 `AppModule`。

~~~ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules';
import {PhotoModule} from './xxx'
@Module({
  imports: [DatabaseModule，PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

~~~



### 实体Entity

[实体文档](https://typeorm.io/entities)

实体是映射数据库表的类。如下：

~~~ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}
~~~

#### 实体的装饰器

* `@PrimaryColumn `标识主键
* `@PrimaryGeneratedColumn `自增主键
* `@CreateDateColumn`会被自动设置实体的创建日期。此列-它将自动设置。
* `@UpdateDateColumn`每次调用实体manager或者repository的save方法时会更新这个时间。此列-它将自动设置。
* `@DeleteDateColumn`软删除的时间。此列-它将自动设置。
* `@VersionColumn`每次调用实体manager或repository的save时自动设置为实体的版本(增量编号)。此列-它将自动设置。

#### 查找实体

可以用 `manager.findOneBy` or `repository.findOneBy`，如下:(Person是实体)

~~~ts
// find one by id with single primary key
const person = await dataSource.manager.findOneBy(Person, { id: 1 })
const person = await dataSource.getRepository(Person).findOneBy({ id: 1 })

// find one by id with composite primary keys
const user = await dataSource.manager.findOneBy(User, {
    firstName: "Timber",
    lastName: "Saw",
})
const user = await dataSource.getRepository(User).findOneBy({
    firstName: "Timber",
    lastName: "Saw",
})
~~~







### 一对一

在其中一方添加`@OneToTone`并指定 `@JoinColum` 也就是外键列，例如

~~~ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: 'id_card'
})
export class IdCard {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        comment: '身份证号'
    })
    cardName: string
    
    @JoinColumn()
    @OneToOne(()=>User)
}


~~~

我们正常在更新表的时候如果不添加级联更新需要如下操作，（要分别保存 user 和 idCard，能不能自动按照关联关系来保存呢？）

~~~ts
import { AppDataSource } from "./data-source"
import { IdCard } from "./entity/IdCard"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    const user = new User();
    user.firstName = 'guang';
    user.lastName = 'guang';
    user.age = 20;
    
    const idCard = new IdCard();
    idCard.cardName = '1111111';
    idCard.user = user;
    
    await AppDataSource.manager.save(user);
    await AppDataSource.manager.save(idCard);

}).catch(error => console.log(error))

~~~

可以在 @OneToOne 那里指定 cascade 为 true：`@OneToOne(()=>User,{cascade:true})`

查询的时候我们需要指定relation字段才能够将关联的表的信息查询出来

~~~ts
const ics = await AppDataSource.manager.find(IdCard, {
    relations: {
        user: true
    }
});
~~~



### 一对多

创建部门和员工表。

在一的一方添加 `oneToMany` 装饰器，在多的一方添加`@ManyToOne`。(**在多的一方`@ManyToOne`去掉级联不然，双方都级联保存，那就无限循环了**)

~~~ts
import { Column, Entity, PrimaryGeneratedColumn,oneToMany } from "typeorm"

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    d_id: number;

    @Column({
        length: 50
    })
    name: string;
    @oneToMany(()=>Department,(employee)=>employee.department},{cascade:true})//这里要通过第二个参数指定外键列在 employee.department 维护。
    department:Department;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 50
    })
    name: string;
    @ManyToOne(()=>Department)
    @JoinColumn({//默认一对多外键在多的一方保存，JoinColumn可以省略，除非需要指定一些选项
        name:d_id
    })
    department:Department
}
~~~



### 多对多

将多对多拆成两个一对多。例如文章和标签两个实体。

~~~ts
import { Column, Entity, PrimaryGeneratedColumn,ManyToMany,JoinTable } from "typeorm"

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        comment: '文章标题'
    })
    title: string;

    @Column({
        type: 'text',
        comment: '文章内容'
    })
    content: string;
    @ManyToMany(()=>Tag,(tag)=>tag.article)
    @JoinTable({
        name:'xxx'//指定中间表的名称
    })
    tags:Tag[]
}
//Tag
import { Column, Entity, PrimaryGeneratedColumn，ManyToMany } from "typeorm"

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;
    @ManyToMany(()=>Article,(article)=>article.tags)
    articles:Article[]
}

~~~







~~~ts
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const swaggerOptions = new DocumentBuilder().setTitle('nest api document').setDescription('xxproject api document').setVersion('1.0.0').addBearerAuth().build()
    const ducoment = 
  const app = await NestFactory.create(AppModule);
    SwaggerModule.createDocument(app,swaggerOptions)
    SwaggerModule.setup('doc',app,document)
    //然后打开localhost:3000/doc可以看到
  await app.listen(3000);
}
bootstrap();


~~~

## node-redis

[文档地址](https://github.com/redis/node-redis)





## Nest项目初始化

①创建项目`nest new [project] -p pnpm`

②安装`js-yaml`和`cross-env`依赖做环境配置

~~~shell
pnpm install js-yaml @nestjs/config 
pnpm install -D cross-env
~~~

③配置yaml(该文件放到src下便于打包)和package.json文件配置

~~~yaml
app:
  port: 3000
db:
  type: 'mysql'
  host: 'localhost'
  port: 3306
  username: 'root'
  password: 'root'
  database: 'typeorm'
  logging: true
  poolSize: 10
  connectorPackage: 'mysql2'
redis:
  host: 'localhost'
  port: 6379
~~~

~~~json
"scripts": {
    "build": "cross-env NODE_ENV=production nest build",
    "dev": "cross-env NODE_ENV=development nest start --watch",
  },
~~~

配置nest-cli.json

~~~json
{
  "compilerOptions": {
    "watchAssets": true,
    "assets": ["**/*.yaml"]// 将环境配置一起打包
  }
}
~~~

创建配置的服务`nest g pr config --no-spec`

~~~ts
import { Provider } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
interface Database extends MysqlConnectionOptions {
  type: 'mysql' | 'mariadb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  poolSize: number;
  connectorPackage: 'mysql' | 'mysql2';
}
interface Redis {
  host: string;
  port: number;
}
interface IConfig {
  app: {
    port: number;
  };
  db: Database;
  redis: Redis;
}
const yamlLoad = async () => {
  const configFilePath = join(
    process.cwd(),
    `./src/${process.env.NODE_ENV}.yaml`,
  );
  const config = await readFile(configFilePath, {
    encoding: 'utf-8',
  });
  return yaml.load(config) as Promise<IConfig>;
};

export const configProviders: Provider[] = [
  {
    provide: 'CONFIG_PROVIDERS',
    useFactory: yamlLoad,
  },
];
export class ConfigService {//暴露给main.ts使用
  static async get() {
    return await yamlLoad();
  }
}

~~~

然后创建配置模块`nest g mo config --no-spec` 

~~~ts
import { Module } from '@nestjs/common';
import { configProviders } from './config.provider';

@Module({
  providers: [...configProviders],
  exports: [...configProviders],
})
export class ConfigModule {}
~~~

④继承TypeORM数据库

~~~shell
pnpm install typeorm mysql2
~~~

创建数据库的服务

~~~ts
import { DataSource } from 'typeorm';
import { User, Role, Permission } from '@/user/entities';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (config) => {
      const dataSource = new DataSource({
        ...config.db,
        entities: [User, Role, Permission],
        logging: process.env.NODE_ENV !== 'production',
        synchronize: process.env.NODE_ENV !== 'production',
      });
      return dataSource.initialize();
    },
    inject: ['CONFIG_PROVIDERS'],
  },
];
~~~

创建数据库模块

~~~ts
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigModule } from '../config/config.module';
@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
~~~

⑤安装参数验证模块

[class-validator文档](https://github.com/typestack/class-validator)

~~~shell
pnpm install class-transformer class-validator
~~~

然后在main.ts入口文件中做配置

~~~ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  app.useGlobalPipes(new ValidationPipe());
}
~~~

⑥安装redis。`pnpm install redis`









<CommentService/>