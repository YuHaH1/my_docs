---
lang: zh-CN
title: Vue面经
description: 关键功能
collapsible: true
---
# Vue面经

## 动态表单

### 表单配置文件中

~~~ts
import { DyFormConfig } from '../components/DyForm/DyForm.'
import {ElButton,ElInput,ElCheckbox,ElSelect,ElOption,ElSwitch,ElCheckboxGroup,ElRadioGroup,ElRadio,ElCol,ElDatePicker} from 'element-plus'
export class UserForm {
    name?: string
    organization?: string
    date1?: string
    date2?: string
    delivery?: boolean
    type?: []
    resource?: string
    desc?: string
    personInfo?: string
    developerName?: string
    sponsorName?: string
}

export function useDyFormConfig(dyForm: any) {
    const DyFormConfig: DyFormConfig[] = [
        {
            type: ElInput,
            formItemConfig: {
                label: '请输入姓名',
            },
            formConfig: {
                placeholder: '请输入姓名',
            },
            formDataKey: 'name'
        },
        {
            type: ElSelect,
            formItemConfig: {
                label: '请选择组织',
            },
            formConfig: {
                placeholder: '请选择您的组织'
            },
            formDataKey: 'organization',
            children: [
                {
                    type: ElOption,
                    formConfig: { label: '个人', value: 'person' },

                },
                {
                    type: ElOption,
                    formConfig: { label: '公司', value: 'company' }
                },
                {
                    type: ElOption,
                    formConfig: { label: '无', value: 'none' }
                }
            ],
            next(formData) {
                if (formData.organization === 'none') {
                    return {
                        next() {
                            return {
                                type: ElInput,
                                formItemConfig: {
                                    label: '请输入您所属组织'
                                },
                            }
                        }
                    }
                } else if (formData.organization === 'company') {
                    return [
                        {
                            type: 'div',
                            formConfig: {
                                style: {
                                    width: '100%',
                                    display: 'flex'
                                }
                            },
                            formItemConfig: {
                                label: '请选择日期', 
                            },
                            children: [
                                {
                                    type: ElCol,
                                    formConfig: {
                                        span: 11
                                    },
                                    children: [
                                        {
                                            needFormItem: true,
                                            type: ElDatePicker,
                                            formDataKey: 'date1',
                                            formConfig: {
                                                type: "date",
                                                placeholder: "请选择进入公司日期",
                                                style: "width: 100%"
                                            },
                                        }
                                    ]
                                },
                                {
                                    type: ElCol,
                                    formConfig: {
                                        span: 2
                                    },
                                    children: [
                                        {
                                            type: 'span',
                                            children: '-'
                                        }
                                    ]
                                },
                                {
                                    type: ElCol,
                                    formConfig: {
                                        span: 11
                                    },
                                    children: [
                                        {
                                            needFormItem: true,
                                            type: ElDatePicker,
                                            formDataKey: 'date2',
                                            formConfig: {
                                                type: "date",
                                                placeholder: "请选择毕业日期",
                                                style: "width: 100%"
                                            },
                                        }
                                    ]
                                },

                            ],
                            next(formData) {
                                console.log(formData)
                                return [{
                                    type: ElInput,
                                    formItemConfig: {
                                        label: '请输入个人信息'
                                    },
                                    formConfig: {
                                        placeholder: '请输入个人信息'
                                    }
                                }]
                            }
                        },
                    ]
                } else {
                    return [{
                        type: ElInput,
                        formDataKey: 'personInfo',
                        formItemConfig: {
                            label: '请输入个人信息'
                        },
                        formConfig: {
                            placeholder: '请输入个人信息'
                        }
                    }]
                }

            }
        },
        {
            type: ElSwitch,
            formDataKey: 'delivery',
            formItemConfig: {
                label: 'Instant delivery',
            }
        },
        {
            type: ElCheckboxGroup,
            formDataKey: 'type',
            formItemConfig: {
                label: 'Activity type',
            },
            children: [
                { type: ElCheckbox, slots: { default: () => '活动1' }, formConfig: { name: 'type', label: '活动1' } },
                { type: ElCheckbox, slots: { default: () => '活动2' }, formConfig: { name: 'type', label: '活动2' } },
                { type: ElCheckbox, slots: { default: () => '活动3' }, formConfig: { name: 'type', label: '活动3' } },
                { type: ElCheckbox, slots: { default: () => '活动4' }, formConfig: { name: 'type', label: '活动4' } }
            ],

        },
        {
            type: ElRadioGroup,
            formDataKey: 'resource',
            formItemConfig: {
                label: 'Resources'
            },
            children: [
                {
                    type: ElRadio,
                    formConfig: {
                        label: 'Sponsor'
                    }
                },
                {
                    type: ElRadio,
                    formConfig: {
                        label: 'Developer'
                    }
                },
            ],
            next(formData) {
                const resource = formData.resource
                const obj = {
                    'Sponsor': [
                        {
                            type: ElInput,
                            formDataKey: 'sponsorName',
                            formItemConfig: {
                                label: '请输入赞助商名称'
                            },
                        }
                    ],
                    'Developer': [
                        {
                            type: ElInput,
                            formDataKey: 'developerName',
                            formItemConfig: {
                                label: '请输入开发商名称'
                            },
                        }
                    ],
                } as Record<string, DyFormConfig[]>
                if (!resource) {
                    return []
                } else {
                    return obj[resource]
                }
            },
        },
        {
            type: ElInput,
            formConfig: {
                type: 'textarea'
            },
            formDataKey: 'desc',
            formItemConfig: {
                label: 'Activity form',
            }
        },
        {
            type: 'div',
            formConfig: {
                style: {
                    width: "100%",
                    display: "flex"
                }
            },
            children: [
                {
                    type: ElCol,
                    formConfig: {
                        span: 6
                    },
                    children: [
                        {
                            type: ElButton,
                            formConfig: {
                                type: 'warning',
                                onClick: async () => {
                                    const formRef = dyForm!.value!.getFormRef()
                                    formRef.value.validate()
                                }
                            },
                            slots: {
                                default: () => '确认'
                            }
                        }
                    ]
                },
                {
                    type: ElCol,
                    formConfig: {
                        span: 18
                    },
                    children: [
                        {
                            type: ElButton,
                            formConfig: {
                                type: 'danger',
                                onClick: () => {
                                    const formRef = dyForm!.value!.getFormRef()
                                    formRef.value.resetFields()
                                }
                            },
                            slots: {
                                default: () => '取消'
                            }
                        }
                    ]
                }
            ]
        }
    ];
    return {
        DyFormConfig
    }
}
~~~

### 在DyForm.ts中

~~~ts
import { VNode } from "vue"
import { getTypes } from '../../utils/types'
import {type FormInstance,ElForm,ElFormItem } from "element-plus"
import {defineComponent,ref,h} from 'vue'
interface Slots extends Record<string, () => any> {
  default: () => string | VNode
}
type Next = (formData: Props['modelValue']) => DyFormConfig[] | DyFormConfig


export interface DyFormConfig<T = Props['modelValue']> {
  type?: any
  formConfig?: Record<string, any>
  formDataKey?: keyof T
  formItemConfig?: Record<string, any>
  children?: DyFormConfig<T>[] | string
  slots?: Slots
  next?: Next
  needFormItem?: boolean
}
interface Props {
  modelValue: Record<string, any>
  dyFormConfig: DyFormConfig[]
  formConfig: Record<string, any>
}
export const DyForm = defineComponent<Props>(
  (props, { emit, expose }) => {
    expose({
      getFormRef: (): any & FormInstance => formRef
    })
    const rederChild = () => props.dyFormConfig.map((item: DyFormConfig) => {
      const traverChildren = (child: DyFormConfig['children']): any => {
        return child && typeof child !== 'string' && child.map(
          item => {
            if (typeof item.children === 'string') {
              return h(item.type, item.children)
            }
            const childeVnode = h(item.type, item.formDataKey ?
              {
                ...item.formConfig,
                modelValue: props.modelValue[item.formDataKey],
                'onUpdate:modelValue': (value: any) => emit('update:modelValue', { ...props.modelValue, [item.formDataKey as string]: value })
              } :
              item.formConfig,
              {
                default:()=>[item.children && traverChildren(item.children), item.slots && renderSlots(item)]
              }
            )
            if (item.needFormItem) {
              return h(ElFormItem, { ...item?.formItemConfig, prop:item?.formConfig?.prop || item.formDataKey , },{default:()=>childeVnode})
            }
            return childeVnode
          }
        )
      }
      const renderSlots = (options: DyFormConfig): any => {
        return Object.keys(options.slots || {}).map((slot: any) => {
          return options.slots![slot]()
        })
      }
      const render = (options: DyFormConfig): any => {
        return h(ElFormItem, { ...options.formItemConfig, prop: options?.formConfig?.prop || options.formDataKey },
          {
            default:()=>[
              h(
                options.type,
                options.formDataKey ?
                  {
                    ...options.formConfig,
                    modelValue: props.modelValue[options.formDataKey],
                    'onUpdate:modelValue': (value: any) => emit('update:modelValue', { ...props.modelValue, [options.formDataKey as string]: value })
                  } : options.formConfig,
                {
                  default:()=>options.slots ? renderSlots(options) : traverChildren(options.children || [])
                }
              )
            ]
          }
        )
      }
      const renderNext = (item: DyFormConfig): DyFormConfig[] | [] => {
        const nextOptions = item.next?.(props.modelValue) as DyFormConfig
        if (!nextOptions) {
          console.error(`请检查next函数返回值是否有误,目前返回值为${nextOptions}`)
          return []
        }
        if (getTypes(nextOptions) === 'Object' && nextOptions?.next) {
          return renderNext(nextOptions)
        }
        return Array.isArray(nextOptions) ? nextOptions.map(option => render(option)) : render(nextOptions)
      }
      const renderVnode = render(item)
      return item.next ? [renderVnode,renderNext(item)] : [renderVnode]
    })
    const formRef = ref<FormInstance>()

    return () => {
      return h(ElForm, {
        ref: formRef,
        model: props.modelValue,
        ...props.formConfig
      }, {
        default: ()=>rederChild()
      })
    }
  },
  {
    props: {
      modelValue: {
        type: Object,
        required:true,
      },
      dyFormConfig: {
        type: Object,
        required:true,
      },
      formConfig: {
        type: Object,
        default:()=>{}
      }
    },
    emits: ['update:modelValue']
  }
)

~~~

### 使用的时候

~~~ts
<script setup lang="ts">
import {DyForm} from './components/Dyform/DyForm.ts';
import { useDyFormConfig, UserForm } from './utils/constant'
import {ref,reactive} from 'vue'

const dyForm = ref(null)
const { DyFormConfig }  = useDyFormConfig(dyForm)
const form = ref<UserForm>({
    name: '',
    organization: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    personInfo:''
});

const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  delivery: [
    {
      required: true,
      message: 'Please select delivery',
      trigger: 'change',
    },
  ],
  organization: [
    {
      required: true,
      message: 'Please select organization',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
}

const formConfig = reactive({
  labelWidth: '130px',
  rules
})

</script>

<template>
    <DyForm ref="dyForm" v-model="form" :dyFormConfig="DyFormConfig" :formConfig="formConfig" />
</template>

~~~

![](/Vue/dyform.gif)



## Vue2和vue3区别

vue2的缺点：

* 对TypeScript支持不友好（所有属性都放在了this对象上，难以推倒组件的数据类型）
* 大量的API挂载在Vue对象的原型上，难以实现TreeShaking。
* 逻辑复用维护困难，靠mixin存在数据来源不清晰问题。
* 性能上存在问题，例如（响应式会递归对象，而Vue3是懒劫持），编译器也没有做很好的优化。
* 架构层面对跨平台dom渲染开发支持不友好,vue3允许自定义渲染器，扩展能力强（自定义渲染器**可自定义元素的增加、删除、查找等操作**、**可自定义元素自身属性/特性的修改操作**，这样我们就可以将vue代码应用在小程序等其他平台上。）。

Vue3

* Vue3.0更注重模块上的拆分，在2.0中无法单独使用部分模块。需要引入完整的Vuejs(例如只想使用使用响应式部分，但是需要引入完整的Vuejs)， Vue3中的模块之间耦合度低，模块可以独立使用。**拆分模块**
* Vue2中很多方法挂载到了实例中导致没有使用也会被打包（还有很多组件也是一样）。通过构建工具Tree-shaking机制实现按需引入，减少用户打包后体积。**重写API**
* Vue3允许自定义渲染器，扩展能力强。不会发生以前的事情，改写Vue源码改造渲染方式。**扩展更方便**。[自定义渲染器文档](https://cn.vuejs.org/api/custom-renderer.html#createrenderer)
* 对模板的编译进行了优化操作（静态提升，预字符串化）
* 代码采用Monorepo的方式去维护，可以更方便扩展和维护项目对于框架开发者。









## 同构渲染

### 服务端渲染

服务端渲染有以下步骤

1. 浏览器请求站点
2. 服务器调用请求数据的接口
3. 接口将数据返回给服务器
4. 服务器将数据和模版拼接出来HTML字符串
5. 服务器将HTML欺负穿发给浏览器
6. 浏览器解析渲染

这样的方式用户体验很差，为什么呢？每次用户点击页面跳转都会重新执行上面6个步骤，浏览器重新刷新。

### 客户端渲染

1. 浏览器请求站点
2. 服务器返回一个空的HTML只有`<div id='#app'></div>`
3. 浏览器得到后解析执行js，当js执行完成后会有DOM骨架，但是数据还要通过AJAX得到
4. 然后拿到接口数据，渲染出内容

这种方式首屏会慢，其次不利于SEO。但是用户体验好，不需要跳转页面。



### Vue同构渲染

同构渲染就是将CSR和SSR 客户端渲染、服务端渲染结合的方式。

Vue的服务端渲染时，由于保存的是当前应用快照，不存在数据变化重新渲染的情况，因此数据不需要响应式，减少创建响应式的开销，且没有beforeupdate和updated钩子。

由于服务端不需要真实渲染出DOM因此不会执行渲染的副作用函数，也因此服务端渲染没有beforemounted和mounted钩子。

**原理：**

1. 服务端将组件渲染成HTML字符串

2. 浏览器拿到服务端渲染的字符串后渲染DOM

3. 此时客户端需要完成激活操作（也称为注水），也就是将DOM树与虚拟DOM进行关联，并给DOM树的节点添加事件。

   采用广度优先策略遍历DOM，这一块客户端需要将VNODE的el指向真实DOM，如果虚拟DOM类型是组件，则执行`mountComponent`，这个函数会判断VNODE.el是否存在如果存在执行激活`hydrateNode`操作不渲染真实DOM。

4. 之后就按照CSR方式执行。

### 同构渲染存在的问题

跨平台问题。由于组件代码既运行在浏览器又运行在服务器，所以编写代码要尽可能避免使用平台特有的API，例如`localstorage window document`等。

如果需要使用，用`import.meta.env.SSR`包裹，这一块代码如果在服务端在打包阶段会被删掉，如下：

~~~js
if(!import.meta.env.SSR){
    window.xxxx
}
~~~



**第三方依赖如果使用了平台特有API怎么办，这种情况不可控**

方案一（缺点：该模块将只在客户端生效，服务端缺失该模块功能。）

~~~js
if(!import.meta.env.SSR){
    import('xxxx')
}
~~~

方案二用`ClientOnly`组件,直接看实现原理

~~~vue
export const ClientOnly = defineComponent({
	setup(_,{slots}){
		const show = ref(false)
		onMounted(()=>show.value = true)
		return ()=>(show.value && slots.default ? slots.default : null)
	}
})
~~~





**交叉感染问题**

服务端每次调用render函数进行服务端渲染时，都会调用`createSSRApp`创建新的应用实例，避免不同请求共用一个实例污染了状态。例如下面，A访问该站点，组件内`count++`，B也访问，此时`count`值是A的那个，因为是同一个实例对象（**服务器和客户是一对多**）。

~~~vue
<script>
    let count = 0
    export default{
        count++
    }
</script>    
~~~

浏览器和客户是一对一，因此不会出现公用一个实例问题。

因此为了避免交叉感染，在组件内不要使用全局变量





<CommentService/>