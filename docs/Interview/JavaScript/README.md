# dy_form
dy_form is a Dynamic forms for Elementplus and Vue3

# Usage

* `formConfig`,formConfig will be passed to ElForm as its argument.

* `dyFormConfig`

  * ~~~ts
    interface FormItemConfig<T = Props['modelValue']> {
      type?: any //component 
      formConfig?: Record<string, any>// As a property of the current type component
      formDataKey?: keyof T // Mapping key of the v-model
      formItemConfig?: Record<string, any>//As an attribute value for ElFormItem
      children?: FormItemConfig<T>[] | string
      slots?: Slots // Transferable slot
      next?: Next // Dynamically determine which form to return
      needFormItem?: boolean //If true, the ElFormItem is automatically added to the item
    }
    dyFormConfig:FormItemConfig[]
    interface Slots extends Record<string, () => any> {
      default: () => string | VNode
    }
    type Next = (formData: Props['modelValue']) => DyFormConfig[] | DyFormConfig
    eg:
        const dyFormConfig: FormItemConfig[] = [
            {
                type: ElInput,
                formItemConfig: {
                    label: '请输入姓名',
                    prop: "name"
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
                    prop:'organization'
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
                    } as Record<string, FormItemConfig[]>
                    if (!resource) {
                        return []
                    } else {
                        return obj[resource]
                    }
                },
            }      
    ]
    ~~~

~~~vue
<script setup lang="ts">
const dyForm = ref(null)
const { dyFormConfig }  = useDyFormConfig(dyForm)
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

const formConfig = reactive({
  labelWidth: '130px',
})

</script>

<template>
    <DyForm ref="dyForm" v-model="form" :dyFormConfig="dyFormConfig" :formConfig="formConfig" />
</template>
~~~

[项目演示地址](https://fancyfish.top/Vue/dyform.gif)