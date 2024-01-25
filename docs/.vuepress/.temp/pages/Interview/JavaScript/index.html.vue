<template><div><h1 id="dy-form" tabindex="-1"><a class="header-anchor" href="#dy-form" aria-hidden="true">#</a> dy_form</h1>
<p>dy_form is a Dynamic forms for Elementplus and Vue3</p>
<h1 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h1>
<ul>
<li>
<p><code v-pre>formConfig</code>,formConfig will be passed to ElForm as its argument.</p>
</li>
<li>
<p><code v-pre>dyFormConfig</code></p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">FormItemConfig<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> Props<span class="token punctuation">[</span><span class="token string">'modelValue'</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  type<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token comment">//component </span>
  formConfig<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token comment">// As a property of the current type component</span>
  formDataKey<span class="token operator">?</span><span class="token operator">:</span> <span class="token keyword">keyof</span> <span class="token constant">T</span> <span class="token comment">// Mapping key of the v-model</span>
  formItemConfig<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token comment">//As an attribute value for ElFormItem</span>
  children<span class="token operator">?</span><span class="token operator">:</span> FormItemConfig<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token builtin">string</span>
  slots<span class="token operator">?</span><span class="token operator">:</span> Slots <span class="token comment">// Transferable slot</span>
  next<span class="token operator">?</span><span class="token operator">:</span> Next <span class="token comment">// Dynamically determine which form to return</span>
  needFormItem<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token comment">//If true, the ElFormItem is automatically added to the item</span>
<span class="token punctuation">}</span>
dyFormConfig<span class="token operator">:</span>FormItemConfig<span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">interface</span> <span class="token class-name">Slots</span> <span class="token keyword">extends</span> <span class="token class-name">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span></span> <span class="token builtin">any</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">string</span> <span class="token operator">|</span> VNode
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Next</span> <span class="token operator">=</span> <span class="token punctuation">(</span>formData<span class="token operator">:</span> Props<span class="token punctuation">[</span><span class="token string">'modelValue'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> DyFormConfig<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> DyFormConfig
eg<span class="token operator">:</span>
    <span class="token keyword">const</span> dyFormConfig<span class="token operator">:</span> FormItemConfig<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            type<span class="token operator">:</span> ElInput<span class="token punctuation">,</span>
            formItemConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
                label<span class="token operator">:</span> <span class="token string">'请输入姓名'</span><span class="token punctuation">,</span>
                prop<span class="token operator">:</span> <span class="token string">"name"</span>
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
                prop<span class="token operator">:</span><span class="token string">'organization'</span>
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
                <span class="token punctuation">}</span> <span class="token keyword">as</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> FormItemConfig<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>resource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> obj<span class="token punctuation">[</span>resource<span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>      
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> dyForm <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> dyFormConfig <span class="token punctuation">}</span>  <span class="token operator">=</span> <span class="token function">useDyFormConfig</span><span class="token punctuation">(</span>dyForm<span class="token punctuation">)</span>
<span class="token keyword">const</span> form <span class="token operator">=</span> ref<span class="token operator">&lt;</span>UserForm<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token literal-property property">organization</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token literal-property property">date1</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token literal-property property">date2</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token literal-property property">delivery</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">resource</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token literal-property property">desc</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token literal-property property">personInfo</span><span class="token operator">:</span><span class="token string">''</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> formConfig <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">labelWidth</span><span class="token operator">:</span> <span class="token string">'130px'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>DyForm</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dyForm<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span> <span class="token attr-name">:dyFormConfig</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dyFormConfig<span class="token punctuation">"</span></span> <span class="token attr-name">:formConfig</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>formConfig<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://fancyfish.top/Vue/dyform.gif" target="_blank" rel="noopener noreferrer">项目演示地址<ExternalLinkIcon/></a></p>
</div></template>


