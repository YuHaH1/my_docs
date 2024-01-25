<template><div><h1 id="vue面经" tabindex="-1"><a class="header-anchor" href="#vue面经" aria-hidden="true">#</a> Vue面经</h1>
<h2 id="动态表单" tabindex="-1"><a class="header-anchor" href="#动态表单" aria-hidden="true">#</a> 动态表单</h2>
<h3 id="表单配置文件中" tabindex="-1"><a class="header-anchor" href="#表单配置文件中" aria-hidden="true">#</a> 表单配置文件中</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> DyFormConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../components/DyForm/DyForm.'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>ElButton<span class="token punctuation">,</span>ElInput<span class="token punctuation">,</span>ElCheckbox<span class="token punctuation">,</span>ElSelect<span class="token punctuation">,</span>ElOption<span class="token punctuation">,</span>ElSwitch<span class="token punctuation">,</span>ElCheckboxGroup<span class="token punctuation">,</span>ElRadioGroup<span class="token punctuation">,</span>ElRadio<span class="token punctuation">,</span>ElCol<span class="token punctuation">,</span>ElDatePicker<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'element-plus'</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserForm</span> <span class="token punctuation">{</span>
    name<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    organization<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    date1<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    date2<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    delivery<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
    type<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    resource<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    desc<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    personInfo<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    developerName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
    sponsorName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useDyFormConfig</span><span class="token punctuation">(</span>dyForm<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> DyFormConfig<span class="token operator">:</span> DyFormConfig<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                label<span class="token operator">:</span> <span class="token string">'请输入姓名'</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                placeholder<span class="token operator">:</span> <span class="token string">'请输入姓名'</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            formDataKey<span class="token operator">:</span> <span class="token string">'name'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> ElSelect<span class="token punctuation">,</span>
            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                label<span class="token operator">:</span> <span class="token string">'请选择组织'</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                placeholder<span class="token operator">:</span> <span class="token string">'请选择您的组织'</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            formDataKey<span class="token operator">:</span> <span class="token string">'organization'</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    type<span class="token operator">:</span> ElOption<span class="token punctuation">,</span>
                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">'个人'</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token string">'person'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>

                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    type<span class="token operator">:</span> ElOption<span class="token punctuation">,</span>
                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">'公司'</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token string">'company'</span> <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    type<span class="token operator">:</span> ElOption<span class="token punctuation">,</span>
                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">'无'</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token string">'none'</span> <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token function">next</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>formData<span class="token punctuation">.</span>organization <span class="token operator">===</span> <span class="token string">'none'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token punctuation">{</span>
                        <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                                type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
                                formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                    label<span class="token operator">:</span> <span class="token string">'请输入您所属组织'</span>
                                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>formData<span class="token punctuation">.</span>organization <span class="token operator">===</span> <span class="token string">'company'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            type<span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
                            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                style<span class="token operator">:</span> <span class="token punctuation">{</span>
                                    width<span class="token operator">:</span> <span class="token string">'100%'</span><span class="token punctuation">,</span>
                                    display<span class="token operator">:</span> <span class="token string">'flex'</span>
                                <span class="token punctuation">}</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                label<span class="token operator">:</span> <span class="token string">'请选择日期'</span><span class="token punctuation">,</span> 
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                            children<span class="token operator">:</span> <span class="token punctuation">[</span>
                                <span class="token punctuation">{</span>
                                    type<span class="token operator">:</span> ElCol<span class="token punctuation">,</span>
                                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                        span<span class="token operator">:</span> <span class="token number">11</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                    children<span class="token operator">:</span> <span class="token punctuation">[</span>
                                        <span class="token punctuation">{</span>
                                            needFormItem<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                                            type<span class="token operator">:</span> ElDatePicker<span class="token punctuation">,</span>
                                            formDataKey<span class="token operator">:</span> <span class="token string">'date1'</span><span class="token punctuation">,</span>
                                            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                                type<span class="token operator">:</span> <span class="token string">"date"</span><span class="token punctuation">,</span>
                                                placeholder<span class="token operator">:</span> <span class="token string">"请选择进入公司日期"</span><span class="token punctuation">,</span>
                                                style<span class="token operator">:</span> <span class="token string">"width: 100%"</span>
                                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                        <span class="token punctuation">}</span>
                                    <span class="token punctuation">]</span>
                                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                <span class="token punctuation">{</span>
                                    type<span class="token operator">:</span> ElCol<span class="token punctuation">,</span>
                                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                        span<span class="token operator">:</span> <span class="token number">2</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                    children<span class="token operator">:</span> <span class="token punctuation">[</span>
                                        <span class="token punctuation">{</span>
                                            type<span class="token operator">:</span> <span class="token string">'span'</span><span class="token punctuation">,</span>
                                            children<span class="token operator">:</span> <span class="token string">'-'</span>
                                        <span class="token punctuation">}</span>
                                    <span class="token punctuation">]</span>
                                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                <span class="token punctuation">{</span>
                                    type<span class="token operator">:</span> ElCol<span class="token punctuation">,</span>
                                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                        span<span class="token operator">:</span> <span class="token number">11</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                    children<span class="token operator">:</span> <span class="token punctuation">[</span>
                                        <span class="token punctuation">{</span>
                                            needFormItem<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                                            type<span class="token operator">:</span> ElDatePicker<span class="token punctuation">,</span>
                                            formDataKey<span class="token operator">:</span> <span class="token string">'date2'</span><span class="token punctuation">,</span>
                                            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                                type<span class="token operator">:</span> <span class="token string">"date"</span><span class="token punctuation">,</span>
                                                placeholder<span class="token operator">:</span> <span class="token string">"请选择毕业日期"</span><span class="token punctuation">,</span>
                                                style<span class="token operator">:</span> <span class="token string">"width: 100%"</span>
                                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                        <span class="token punctuation">}</span>
                                    <span class="token punctuation">]</span>
                                <span class="token punctuation">}</span><span class="token punctuation">,</span>

                            <span class="token punctuation">]</span><span class="token punctuation">,</span>
                            <span class="token function">next</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span>
                                <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
                                    type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
                                    formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                        label<span class="token operator">:</span> <span class="token string">'请输入个人信息'</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                        placeholder<span class="token operator">:</span> <span class="token string">'请输入个人信息'</span>
                                    <span class="token punctuation">}</span>
                                <span class="token punctuation">}</span><span class="token punctuation">]</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
                        type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
                        formDataKey<span class="token operator">:</span> <span class="token string">'personInfo'</span><span class="token punctuation">,</span>
                        formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                            label<span class="token operator">:</span> <span class="token string">'请输入个人信息'</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                        formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                            placeholder<span class="token operator">:</span> <span class="token string">'请输入个人信息'</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">]</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> ElSwitch<span class="token punctuation">,</span>
            formDataKey<span class="token operator">:</span> <span class="token string">'delivery'</span><span class="token punctuation">,</span>
            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                label<span class="token operator">:</span> <span class="token string">'Instant delivery'</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> ElCheckboxGroup<span class="token punctuation">,</span>
            formDataKey<span class="token operator">:</span> <span class="token string">'type'</span><span class="token punctuation">,</span>
            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                label<span class="token operator">:</span> <span class="token string">'Activity type'</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> type<span class="token operator">:</span> ElCheckbox<span class="token punctuation">,</span> slots<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'活动1'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> formConfig<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'type'</span><span class="token punctuation">,</span> label<span class="token operator">:</span> <span class="token string">'活动1'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> type<span class="token operator">:</span> ElCheckbox<span class="token punctuation">,</span> slots<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'活动2'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> formConfig<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'type'</span><span class="token punctuation">,</span> label<span class="token operator">:</span> <span class="token string">'活动2'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> type<span class="token operator">:</span> ElCheckbox<span class="token punctuation">,</span> slots<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'活动3'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> formConfig<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'type'</span><span class="token punctuation">,</span> label<span class="token operator">:</span> <span class="token string">'活动3'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> type<span class="token operator">:</span> ElCheckbox<span class="token punctuation">,</span> slots<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'活动4'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> formConfig<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'type'</span><span class="token punctuation">,</span> label<span class="token operator">:</span> <span class="token string">'活动4'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> ElRadioGroup<span class="token punctuation">,</span>
            formDataKey<span class="token operator">:</span> <span class="token string">'resource'</span><span class="token punctuation">,</span>
            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                label<span class="token operator">:</span> <span class="token string">'Resources'</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    type<span class="token operator">:</span> ElRadio<span class="token punctuation">,</span>
                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                        label<span class="token operator">:</span> <span class="token string">'Sponsor'</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    type<span class="token operator">:</span> ElRadio<span class="token punctuation">,</span>
                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                        label<span class="token operator">:</span> <span class="token string">'Developer'</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token function">next</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> resource <span class="token operator">=</span> formData<span class="token punctuation">.</span>resource
                <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">'Sponsor'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
                            formDataKey<span class="token operator">:</span> <span class="token string">'sponsorName'</span><span class="token punctuation">,</span>
                            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                label<span class="token operator">:</span> <span class="token string">'请输入赞助商名称'</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token string-property property">'Developer'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
                            formDataKey<span class="token operator">:</span> <span class="token string">'developerName'</span><span class="token punctuation">,</span>
                            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                label<span class="token operator">:</span> <span class="token string">'请输入开发商名称'</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span> <span class="token keyword">as</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> DyFormConfig<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>resource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> obj<span class="token punctuation">[</span>resource<span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                type<span class="token operator">:</span> <span class="token string">'textarea'</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            formDataKey<span class="token operator">:</span> <span class="token string">'desc'</span><span class="token punctuation">,</span>
            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                label<span class="token operator">:</span> <span class="token string">'Activity form'</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                style<span class="token operator">:</span> <span class="token punctuation">{</span>
                    width<span class="token operator">:</span> <span class="token string">"100%"</span><span class="token punctuation">,</span>
                    display<span class="token operator">:</span> <span class="token string">"flex"</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    type<span class="token operator">:</span> ElCol<span class="token punctuation">,</span>
                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                        span<span class="token operator">:</span> <span class="token number">6</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    children<span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            type<span class="token operator">:</span> ElButton<span class="token punctuation">,</span>
                            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                type<span class="token operator">:</span> <span class="token string">'warning'</span><span class="token punctuation">,</span>
                                <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                                    <span class="token keyword">const</span> formRef <span class="token operator">=</span> dyForm<span class="token operator">!</span><span class="token punctuation">.</span>value<span class="token operator">!</span><span class="token punctuation">.</span><span class="token function">getFormRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                    formRef<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                <span class="token punctuation">}</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                            slots<span class="token operator">:</span> <span class="token punctuation">{</span>
                                <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'确认'</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    type<span class="token operator">:</span> ElCol<span class="token punctuation">,</span>
                    formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                        span<span class="token operator">:</span> <span class="token number">18</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    children<span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            type<span class="token operator">:</span> ElButton<span class="token punctuation">,</span>
                            formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                                type<span class="token operator">:</span> <span class="token string">'danger'</span><span class="token punctuation">,</span>
                                <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                                    <span class="token keyword">const</span> formRef <span class="token operator">=</span> dyForm<span class="token operator">!</span><span class="token punctuation">.</span>value<span class="token operator">!</span><span class="token punctuation">.</span><span class="token function">getFormRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                    formRef<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">resetFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                <span class="token punctuation">}</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                            slots<span class="token operator">:</span> <span class="token punctuation">{</span>
                                <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'取消'</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        DyFormConfig
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在dyform-ts中" tabindex="-1"><a class="header-anchor" href="#在dyform-ts中" aria-hidden="true">#</a> 在DyForm.ts中</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> VNode <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getTypes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../../utils/types'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span><span class="token keyword">type</span> <span class="token class-name">FormInstance</span><span class="token punctuation">,</span>ElForm<span class="token punctuation">,</span>ElFormItem <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"element-plus"</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>defineComponent<span class="token punctuation">,</span>ref<span class="token punctuation">,</span>h<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">interface</span> <span class="token class-name">Slots</span> <span class="token keyword">extends</span> <span class="token class-name">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span></span> <span class="token builtin">any</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">string</span> <span class="token operator">|</span> VNode
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Next</span> <span class="token operator">=</span> <span class="token punctuation">(</span>formData<span class="token operator">:</span> Props<span class="token punctuation">[</span><span class="token string">'modelValue'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> DyFormConfig<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> DyFormConfig


<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">DyFormConfig<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> Props<span class="token punctuation">[</span><span class="token string">'modelValue'</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  type<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span>
  formConfig<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span>
  formDataKey<span class="token operator">?</span><span class="token operator">:</span> <span class="token keyword">keyof</span> <span class="token constant">T</span>
  formItemConfig<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span>
  children<span class="token operator">?</span><span class="token operator">:</span> DyFormConfig<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token builtin">string</span>
  slots<span class="token operator">?</span><span class="token operator">:</span> Slots
  next<span class="token operator">?</span><span class="token operator">:</span> Next
  needFormItem<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token punctuation">{</span>
  modelValue<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span>
  dyFormConfig<span class="token operator">:</span> DyFormConfig<span class="token punctuation">[</span><span class="token punctuation">]</span>
  formConfig<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> DyForm <span class="token operator">=</span> <span class="token generic-function"><span class="token function">defineComponent</span><span class="token generic class-name"><span class="token operator">&lt;</span>Props<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span>props<span class="token punctuation">,</span> <span class="token punctuation">{</span> emit<span class="token punctuation">,</span> expose <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">expose</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      getFormRef<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">&amp;</span> FormInstance <span class="token operator">=></span> formRef
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token function-variable function">rederChild</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> props<span class="token punctuation">.</span>dyFormConfig<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token operator">:</span> DyFormConfig<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> traverChildren <span class="token operator">=</span> <span class="token punctuation">(</span>child<span class="token operator">:</span> DyFormConfig<span class="token punctuation">[</span><span class="token string">'children'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> child <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> child <span class="token operator">!==</span> <span class="token string">'string'</span> <span class="token operator">&amp;&amp;</span> child<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>
          item <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> item<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>type<span class="token punctuation">,</span> item<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">const</span> childeVnode <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>type<span class="token punctuation">,</span> item<span class="token punctuation">.</span>formDataKey <span class="token operator">?</span>
              <span class="token punctuation">{</span>
                <span class="token operator">...</span>item<span class="token punctuation">.</span>formConfig<span class="token punctuation">,</span>
                modelValue<span class="token operator">:</span> props<span class="token punctuation">.</span>modelValue<span class="token punctuation">[</span>item<span class="token punctuation">.</span>formDataKey<span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string-property property">'onUpdate:modelValue'</span><span class="token operator">:</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'update:modelValue'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token operator">...</span>props<span class="token punctuation">.</span>modelValue<span class="token punctuation">,</span> <span class="token punctuation">[</span>item<span class="token punctuation">.</span>formDataKey <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span> <span class="token operator">:</span>
              item<span class="token punctuation">.</span>formConfig<span class="token punctuation">,</span>
              <span class="token punctuation">{</span>
                <span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">[</span>item<span class="token punctuation">.</span>children <span class="token operator">&amp;&amp;</span> <span class="token function">traverChildren</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">,</span> item<span class="token punctuation">.</span>slots <span class="token operator">&amp;&amp;</span> <span class="token function">renderSlots</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">]</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>needFormItem<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>ElFormItem<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token operator">...</span>item<span class="token operator">?.</span>formItemConfig<span class="token punctuation">,</span> prop<span class="token operator">:</span>item<span class="token operator">?.</span>formConfig<span class="token operator">?.</span>prop <span class="token operator">||</span> item<span class="token punctuation">.</span>formDataKey <span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>childeVnode<span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> childeVnode
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> renderSlots <span class="token operator">=</span> <span class="token punctuation">(</span>options<span class="token operator">:</span> DyFormConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>slots <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>slot<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> options<span class="token punctuation">.</span>slots<span class="token operator">!</span><span class="token punctuation">[</span>slot<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token punctuation">(</span>options<span class="token operator">:</span> DyFormConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>ElFormItem<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token operator">...</span>options<span class="token punctuation">.</span>formItemConfig<span class="token punctuation">,</span> prop<span class="token operator">:</span> options<span class="token operator">?.</span>formConfig<span class="token operator">?.</span>prop <span class="token operator">||</span> options<span class="token punctuation">.</span>formDataKey <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">[</span>
              <span class="token function">h</span><span class="token punctuation">(</span>
                options<span class="token punctuation">.</span>type<span class="token punctuation">,</span>
                options<span class="token punctuation">.</span>formDataKey <span class="token operator">?</span>
                  <span class="token punctuation">{</span>
                    <span class="token operator">...</span>options<span class="token punctuation">.</span>formConfig<span class="token punctuation">,</span>
                    modelValue<span class="token operator">:</span> props<span class="token punctuation">.</span>modelValue<span class="token punctuation">[</span>options<span class="token punctuation">.</span>formDataKey<span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token string-property property">'onUpdate:modelValue'</span><span class="token operator">:</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'update:modelValue'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token operator">...</span>props<span class="token punctuation">.</span>modelValue<span class="token punctuation">,</span> <span class="token punctuation">[</span>options<span class="token punctuation">.</span>formDataKey <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span>
                  <span class="token punctuation">}</span> <span class="token operator">:</span> options<span class="token punctuation">.</span>formConfig<span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                  <span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>options<span class="token punctuation">.</span>slots <span class="token operator">?</span> <span class="token function">renderSlots</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">traverChildren</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>children <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">)</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> renderNext <span class="token operator">=</span> <span class="token punctuation">(</span>item<span class="token operator">:</span> DyFormConfig<span class="token punctuation">)</span><span class="token operator">:</span> DyFormConfig<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> nextOptions <span class="token operator">=</span> item<span class="token punctuation">.</span>next<span class="token operator">?.</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>modelValue<span class="token punctuation">)</span> <span class="token keyword">as</span> DyFormConfig
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>nextOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">请检查next函数返回值是否有误,目前返回值为</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>nextOptions<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
          <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getTypes</span><span class="token punctuation">(</span>nextOptions<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'Object'</span> <span class="token operator">&amp;&amp;</span> nextOptions<span class="token operator">?.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">renderNext</span><span class="token punctuation">(</span>nextOptions<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token builtin">Array</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>nextOptions<span class="token punctuation">)</span> <span class="token operator">?</span> nextOptions<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>option <span class="token operator">=></span> <span class="token function">render</span><span class="token punctuation">(</span>option<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">render</span><span class="token punctuation">(</span>nextOptions<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> renderVnode <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
      <span class="token keyword">return</span> item<span class="token punctuation">.</span>next <span class="token operator">?</span> <span class="token punctuation">[</span>renderVnode<span class="token punctuation">,</span><span class="token function">renderNext</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span>renderVnode<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> formRef <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span>FormInstance<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>ElForm<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        ref<span class="token operator">:</span> formRef<span class="token punctuation">,</span>
        model<span class="token operator">:</span> props<span class="token punctuation">.</span>modelValue<span class="token punctuation">,</span>
        <span class="token operator">...</span>props<span class="token punctuation">.</span>formConfig
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token function">rederChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    props<span class="token operator">:</span> <span class="token punctuation">{</span>
      modelValue<span class="token operator">:</span> <span class="token punctuation">{</span>
        type<span class="token operator">:</span> Object<span class="token punctuation">,</span>
        required<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      dyFormConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
        type<span class="token operator">:</span> Object<span class="token punctuation">,</span>
        required<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      formConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
        type<span class="token operator">:</span> Object<span class="token punctuation">,</span>
        <span class="token function-variable function">default</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    emits<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'update:modelValue'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用的时候" tabindex="-1"><a class="header-anchor" href="#使用的时候" aria-hidden="true">#</a> 使用的时候</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token operator">&lt;</span>script setup lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>DyForm<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./components/Dyform/DyForm.ts'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useDyFormConfig<span class="token punctuation">,</span> UserForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./utils/constant'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>ref<span class="token punctuation">,</span>reactive<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">const</span> dyForm <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> DyFormConfig <span class="token punctuation">}</span>  <span class="token operator">=</span> <span class="token function">useDyFormConfig</span><span class="token punctuation">(</span>dyForm<span class="token punctuation">)</span>
<span class="token keyword">const</span> form <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span>UserForm<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    organization<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    date1<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    date2<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    delivery<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    type<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    resource<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    desc<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    personInfo<span class="token operator">:</span><span class="token string">''</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> rules <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'Please input Activity name'</span><span class="token punctuation">,</span> trigger<span class="token operator">:</span> <span class="token string">'blur'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> min<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'Length should be 3 to 5'</span><span class="token punctuation">,</span> trigger<span class="token operator">:</span> <span class="token string">'blur'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  region<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'Please select Activity zone'</span><span class="token punctuation">,</span>
      trigger<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  delivery<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'Please select delivery'</span><span class="token punctuation">,</span>
      trigger<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  organization<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'Please select organization'</span><span class="token punctuation">,</span>
      trigger<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  date1<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">'date'</span><span class="token punctuation">,</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'Please pick a date'</span><span class="token punctuation">,</span>
      trigger<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  date2<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">'date'</span><span class="token punctuation">,</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'Please pick a time'</span><span class="token punctuation">,</span>
      trigger<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">'array'</span><span class="token punctuation">,</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'Please select at least one activity type'</span><span class="token punctuation">,</span>
      trigger<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  resource<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      message<span class="token operator">:</span> <span class="token string">'Please select activity resource'</span><span class="token punctuation">,</span>
      trigger<span class="token operator">:</span> <span class="token string">'change'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  desc<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'Please input activity form'</span><span class="token punctuation">,</span> trigger<span class="token operator">:</span> <span class="token string">'blur'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> formConfig <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  labelWidth<span class="token operator">:</span> <span class="token string">'130px'</span><span class="token punctuation">,</span>
  rules
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>DyForm ref<span class="token operator">=</span><span class="token string">"dyForm"</span> v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"form"</span> <span class="token operator">:</span>dyFormConfig<span class="token operator">=</span><span class="token string">"DyFormConfig"</span> <span class="token operator">:</span>formConfig<span class="token operator">=</span><span class="token string">"formConfig"</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/Vue/dyform.gif" alt=""></p>
<h2 id="vue2和vue3区别" tabindex="-1"><a class="header-anchor" href="#vue2和vue3区别" aria-hidden="true">#</a> Vue2和vue3区别</h2>
<p>vue2的缺点：</p>
<ul>
<li>对TypeScript支持不友好（所有属性都放在了this对象上，难以推倒组件的数据类型）</li>
<li>大量的API挂载在Vue对象的原型上，难以实现TreeShaking。</li>
<li>逻辑复用维护困难，靠mixin存在数据来源不清晰问题。</li>
<li>性能上存在问题，例如（响应式会递归对象，而Vue3是懒劫持），编译器也没有做很好的优化。</li>
<li>架构层面对跨平台dom渲染开发支持不友好,vue3允许自定义渲染器，扩展能力强（自定义渲染器<strong>可自定义元素的增加、删除、查找等操作</strong>、<strong>可自定义元素自身属性/特性的修改操作</strong>，这样我们就可以将vue代码应用在小程序等其他平台上。）。</li>
</ul>
<p>Vue3</p>
<ul>
<li>Vue3.0更注重模块上的拆分，在2.0中无法单独使用部分模块。需要引入完整的Vuejs(例如只想使用使用响应式部分，但是需要引入完整的Vuejs)， Vue3中的模块之间耦合度低，模块可以独立使用。<strong>拆分模块</strong></li>
<li>Vue2中很多方法挂载到了实例中导致没有使用也会被打包（还有很多组件也是一样）。通过构建工具Tree-shaking机制实现按需引入，减少用户打包后体积。<strong>重写API</strong></li>
<li>Vue3允许自定义渲染器，扩展能力强。不会发生以前的事情，改写Vue源码改造渲染方式。<strong>扩展更方便</strong>。<a href="https://cn.vuejs.org/api/custom-renderer.html#createrenderer" target="_blank" rel="noopener noreferrer">自定义渲染器文档<ExternalLinkIcon/></a></li>
<li>对模板的编译进行了优化操作（静态提升，预字符串化）</li>
<li>代码采用Monorepo的方式去维护，可以更方便扩展和维护项目对于框架开发者。</li>
</ul>
<h2 id="同构渲染" tabindex="-1"><a class="header-anchor" href="#同构渲染" aria-hidden="true">#</a> 同构渲染</h2>
<h3 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染" aria-hidden="true">#</a> 服务端渲染</h3>
<p>服务端渲染有以下步骤</p>
<ol>
<li>浏览器请求站点</li>
<li>服务器调用请求数据的接口</li>
<li>接口将数据返回给服务器</li>
<li>服务器将数据和模版拼接出来HTML字符串</li>
<li>服务器将HTML欺负穿发给浏览器</li>
<li>浏览器解析渲染</li>
</ol>
<p>这样的方式用户体验很差，为什么呢？每次用户点击页面跳转都会重新执行上面6个步骤，浏览器重新刷新。</p>
<h3 id="客户端渲染" tabindex="-1"><a class="header-anchor" href="#客户端渲染" aria-hidden="true">#</a> 客户端渲染</h3>
<ol>
<li>浏览器请求站点</li>
<li>服务器返回一个空的HTML只有<code v-pre>&lt;div id='#app'&gt;&lt;/div&gt;</code></li>
<li>浏览器得到后解析执行js，当js执行完成后会有DOM骨架，但是数据还要通过AJAX得到</li>
<li>然后拿到接口数据，渲染出内容</li>
</ol>
<p>这种方式首屏会慢，其次不利于SEO。但是用户体验好，不需要跳转页面。</p>
<h3 id="vue同构渲染" tabindex="-1"><a class="header-anchor" href="#vue同构渲染" aria-hidden="true">#</a> Vue同构渲染</h3>
<p>同构渲染就是将CSR和SSR 客户端渲染、服务端渲染结合的方式。</p>
<p>Vue的服务端渲染时，由于保存的是当前应用快照，不存在数据变化重新渲染的情况，因此数据不需要响应式，减少创建响应式的开销，且没有beforeupdate和updated钩子。</p>
<p>由于服务端不需要真实渲染出DOM因此不会执行渲染的副作用函数，也因此服务端渲染没有beforemounted和mounted钩子。</p>
<p><strong>原理：</strong></p>
<ol>
<li>
<p>服务端将组件渲染成HTML字符串</p>
</li>
<li>
<p>浏览器拿到服务端渲染的字符串后渲染DOM</p>
</li>
<li>
<p>此时客户端需要完成激活操作（也称为注水），也就是将DOM树与虚拟DOM进行关联，并给DOM树的节点添加事件。</p>
<p>采用广度优先策略遍历DOM，这一块客户端需要将VNODE的el指向真实DOM，如果虚拟DOM类型是组件，则执行<code v-pre>mountComponent</code>，这个函数会判断VNODE.el是否存在如果存在执行激活<code v-pre>hydrateNode</code>操作不渲染真实DOM。</p>
</li>
<li>
<p>之后就按照CSR方式执行。</p>
</li>
</ol>
<h3 id="同构渲染存在的问题" tabindex="-1"><a class="header-anchor" href="#同构渲染存在的问题" aria-hidden="true">#</a> 同构渲染存在的问题</h3>
<p>跨平台问题。由于组件代码既运行在浏览器又运行在服务器，所以编写代码要尽可能避免使用平台特有的API，例如<code v-pre>localstorage window document</code>等。</p>
<p>如果需要使用，用<code v-pre>import.meta.env.SSR</code>包裹，这一块代码如果在服务端在打包阶段会被删掉，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">SSR</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    window<span class="token punctuation">.</span>xxxx
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三方依赖如果使用了平台特有API怎么办，这种情况不可控</strong></p>
<p>方案一（缺点：该模块将只在客户端生效，服务端缺失该模块功能。）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">SSR</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'xxxx'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方案二用<code v-pre>ClientOnly</code>组件,直接看实现原理</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>export const ClientOnly = defineComponent({
	setup(_,{slots}){
		const show = ref(false)
		onMounted(()=>show.value = true)
		return ()=>(show.value &amp;&amp; slots.default ? slots.default : null)
	}
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>交叉感染问题</strong></p>
<p>服务端每次调用render函数进行服务端渲染时，都会调用<code v-pre>createSSRApp</code>创建新的应用实例，避免不同请求共用一个实例污染了状态。例如下面，A访问该站点，组件内<code v-pre>count++</code>，B也访问，此时<code v-pre>count</code>值是A的那个，因为是同一个实例对象（<strong>服务器和客户是一对多</strong>）。</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
        count<span class="token operator">++</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器和客户是一对一，因此不会出现公用一个实例问题。</p>
<p>因此为了避免交叉感染，在组件内不要使用全局变量</p>
<CommentService/></div></template>


