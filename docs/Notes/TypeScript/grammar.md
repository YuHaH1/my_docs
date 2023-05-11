---
lang: zh-CN
title: TypeScript内置类型
description: 关键功能
collapsible: true
---

1. typeof 取对象身上的类型

   ~~~ts
   const person = {
       name: '',
       job: '',
       age:18
   }
   type p = typeof person
   ->>
   type p = {
       name: string;
       job: string;
       age: number;
   }
   ~~~

2. keyof取一个类型的属性明作为一个联合类型

   1. ~~~ts
      const person = {
          name: '',
          job: '',
          age: 18
      }
      type p = typeof person
      type k = keyof p 
      --》》
      type k = "name" | "job" | "age"
      ~~~

3. Partial将传入的泛型中每个属性都变成可选属性 

   1. ~~~ts
      源码
      type Par<T> = {
          [P in keyof T]?:T[P]
      }
      
      
      
      interface person  {
          name: string,
          job: string,
          age: number
      }
      type a = Partial<person>
      -》》
      type a = {
          name?: string | undefined;
          job?: string | undefined;
          age?: number | undefined;
      }
      ~~~

4. Pick在传入泛型T中筛选出指定属性K的类型

   1. ~~~ts
      源码
      type Pick<T,K extends keyof T> = {
          [P in K]:T[P]
      }
      
      interface person {
          name: string,
          job: string,
          age: number
      }
      type pick = Pick<person, 'age'>
      ——》》
      interface person {
          name: string,
          job: string,
          age: number
      }
      ~~~

5. Record将泛型K作为属性名（K可是联合类型） T作为属性类型

   1. ~~~ts
      type Record<K extends keyof any,T> = {
          [P in K]:T
      }
      keyof any = ->>> string | number | symbol
      
      interface person {
          name: string,
          job: string,
          age: number
      }
      type human = 'name' | 'job'
      type record = Record<human, person>
      type record = {
          name: person;
          job: person;
      }
      ~~~

6. Readonly将传入的泛型全部属性变成只读

   1. ~~~ts
      type Readonly<T> = {
          readonly [P in keyof T]:T[P]
      }
      
      interface person {
          name: string,
          job: string,
          age: number
      }
      type readonly = Readonly<person>
      --->
      type readonly = {
          readonly name: string;
          readonly job: string;
          readonly age: number;
      }
      ~~~

7. infer：如果传入泛型T是数组类型就取数组元素的类型否则传入什么类型返回什么类型

   1. ~~~ts
      type TYPE<T> = T extends Array<infer U> ? U : T
      type t = TYPE<(number|string)[]>
      ~~~

      


<CommentService/>