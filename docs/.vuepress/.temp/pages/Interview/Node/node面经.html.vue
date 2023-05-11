<template><div><h1 id="node面经" tabindex="-1"><a class="header-anchor" href="#node面经" aria-hidden="true">#</a> node面经</h1>
<h2 id="_1-2、垃圾回收机制" tabindex="-1"><a class="header-anchor" href="#_1-2、垃圾回收机制" aria-hidden="true">#</a> 1.2、垃圾回收机制</h2>
<h3 id="_1-2-1、内存分代" tabindex="-1"><a class="header-anchor" href="#_1-2-1、内存分代" aria-hidden="true">#</a> 1.2.1、内存分代</h3>
<p>人们发现没有任何垃圾回收算法能够胜任所有场景（对象生存周期的长短不一）,不同的算法只能针对特定的情况具有最好的效果。因此现代的垃圾回收算法中按照对象的存活时间将内存的垃圾回收进行不同的分代（新生代和老生代），然后分别对不同分代的内存施以更高效的算法，<strong>新生代的对象为存活时间较短的对象，老生代的对象为存活时间较长或常驻内存的对象。V8堆的整体大小就是新生代+老生代的内存空间</strong></p>
<h4 id="_1-2-1-1、新生代内存" tabindex="-1"><a class="header-anchor" href="#_1-2-1-1、新生代内存" aria-hidden="true">#</a> 1.2.1.1、新生代内存</h4>
<p>新生代内存由<strong>两个</strong>reserved_semispace_size所构成，按机器位数在64为上reserved_semispace_size的值为16MB，32位的是8MB。所以新生代内存空间最大值在64位系统和32位系统上分别位32MB和16MB</p>
<p><img src="/Node/memory.png" alt=""></p>
<p>从该图片我们可以得知，V8最大保留空间是4*reserved_semispace_size_+max_old_gendration_size_</p>
<h3 id="_1-2-2、scavenge算法-针对于新生代" tabindex="-1"><a class="header-anchor" href="#_1-2-2、scavenge算法-针对于新生代" aria-hidden="true">#</a> 1.2.2、scavenge算法-针对于新生代</h3>
<p>在Scavenge具体实现中，主要采用了Cheney算法，Cheney算法采用一种复制方式实现垃圾回收算法，</p>
<blockquote>
<h1 id="cheney算法原理" tabindex="-1"><a class="header-anchor" href="#cheney算法原理" aria-hidden="true">#</a> Cheney算法原理</h1>
</blockquote>
<ol>
<li>划分空间，将堆内存一分为二，每一部分空间成为semispace，在这两个semispace空间中，只有一个处于使用中，另一个处于闲置状态，使用状态的semispace空间成为From空间，处于限制状态的空间成为To空间。</li>
<li>赋值，当我们分配对象时，先在From空间进行分配。当开始进行垃圾回收时，会检查From空间中存活的对象，将存活的对象复制到To空间中，而非存活对象占用的空间将被释放。</li>
<li>完成复制后，From空间和To空间角色发对换。简而言之，就是垃圾回收过程中，通过将存活对象在两个semispace空间之间进行复制。</li>
</ol>
<blockquote>
<h1 id="scavenge算法的缺点" tabindex="-1"><a class="header-anchor" href="#scavenge算法的缺点" aria-hidden="true">#</a> Scavenge算法的缺点</h1>
</blockquote>
<ol>
<li>只能使用内存的一半，典型的空间换时间，但由于scavenge由于只赋值存活对象，并且对于生命周期短的场景存活对象只占少部分，因此时间效率比较高</li>
<li>空间换时间的这种算法，无法大规模应用到所有垃圾回收中，因此scavene只适合在新生代中。</li>
</ol>
<p><img src="/Node/generation-1.png" alt="image-20220811084318568"></p>
<blockquote>
<h1 id="晋升机制-晋升条件" tabindex="-1"><a class="header-anchor" href="#晋升机制-晋升条件" aria-hidden="true">#</a> 晋升机制/晋升条件</h1>
</blockquote>
<ol>
<li>当一个对象经过多次复制依然存活时，它将会被认为是生命周期较长的对象。这种对象随后会被移动到老生代总，采用新的算法进行管理。</li>
<li>是否经历过Scavenge回收
<ul>
<li>对象从From空间到To空间时，就会检查它的内存地址来判断该对象是否经历过一次Scavenge回收，如果已经经历过了，会将该对象从From空间复制到老生代空间中，如果没有就复制到To空间中。</li>
</ul>
</li>
<li>To空间内存占用比超过限制
<ul>
<li>当从From空间到To空间时，如果To空间使用已经超过了25%，则该对象直接晋升到老生代空间中。</li>
<li>设置25%限制原因：因为Scavenge回收完成后，这个To空间会变成From空间，接下来内存会在该空间进行分配，如果占比过高，会影响后续内存分配</li>
</ul>
</li>
</ol>
<h3 id="_1-2-3、mark-sweep-mark-compact-针对于老生代" tabindex="-1"><a class="header-anchor" href="#_1-2-3、mark-sweep-mark-compact-针对于老生代" aria-hidden="true">#</a> 1.2.3、Mark-Sweep &amp; Mark-Compact-针对于老生代</h3>
<blockquote>
<h1 id="老生代不采用scavenge算法原因" tabindex="-1"><a class="header-anchor" href="#老生代不采用scavenge算法原因" aria-hidden="true">#</a> 老生代不采用Scavenge算法原因</h1>
</blockquote>
<ol>
<li>老生代中存活对象占比大，因此复制存活对象效率低。</li>
<li>浪费一半空间</li>
</ol>
<blockquote>
<h1 id="mark-sweep标记清除" tabindex="-1"><a class="header-anchor" href="#mark-sweep标记清除" aria-hidden="true">#</a> Mark-Sweep标记清除</h1>
</blockquote>
<p>Mark-Sweep在标记阶段遍历堆中所有对象，并标记存活对象，在随后清除阶段中，只清除没有被标记的对象。**因为在老生代中死对象占据较小一部分，而Mark-Sweep只清除死亡对象，就像Scavenge算法，新生代中存活对象占小部分，其算法只处理存活对象，**这样效率就有了提升。</p>
<blockquote>
<h1 id="mark-sweep算法的缺点" tabindex="-1"><a class="header-anchor" href="#mark-sweep算法的缺点" aria-hidden="true">#</a> Mark-Sweep算法的缺点</h1>
</blockquote>
<p>该算法最大问题在于进行一次标记清除回收后**，内存空间会出现不连续的情况**。这种内存碎片会对后续的内存分配造成问题。<strong>因为很可能出现需要分配一个大对象的情况，而碎片空间无法完成分配，就会提前触发垃圾回收，而这次回收是不必要的。</strong></p>
<p><img src="/Node/generation-2.png" alt="image-20220811090125259"></p>
<blockquote>
<h1 id="mark-compact弥补mark-sweep碎片空间缺点" tabindex="-1"><a class="header-anchor" href="#mark-compact弥补mark-sweep碎片空间缺点" aria-hidden="true">#</a> Mark-Compact弥补Mark-Sweep碎片空间缺点</h1>
</blockquote>
<p>Mark-Compact是标记整理，该算法将存活对象往一端进行移动，移动完成后，<strong>直接清理掉最右边存活对象后面的内存区域完成回收</strong>。</p>
<p><img src="/Node/generation-3.png" alt=""></p>
<p>缺点：速度慢-需要整理对象</p>
<p>优点：空间开销少</p>
<h3 id="_1-2-4、incremental-marking-针对垃圾回收引起全停顿" tabindex="-1"><a class="header-anchor" href="#_1-2-4、incremental-marking-针对垃圾回收引起全停顿" aria-hidden="true">#</a> 1.2.4、Incremental Marking-针对垃圾回收引起全停顿</h3>
<p>为了避免JS应用逻辑和垃圾回收期看到的不一致，垃圾回收的3中基本算法都需要将逻辑暂停下来，等垃圾回收完成后再继续执行，这种行为被称为<code v-pre>全停顿</code>，<strong>在V8分代式垃圾回收中，一次小垃圾回收只收集新生代，由于新生代默认配置小，存活对象少，因此即使是全停顿也影响不大，而对于老生代通常配置大，存活对象多，全堆垃圾回收的标记、清理、整理等动作造成的停顿会比较可怕。</strong></p>
<p>V8为了降低全堆垃圾回收带来的停顿时间，先从标记阶段入手将原本一口气停顿完成的动作改为增量标记，拆分许多小“步进”，每做完一“步进”就让JS应用逻辑执行一小会儿，<strong>垃圾回收和JS逻辑交替执行，直到标记阶段完成</strong>，V8经过标记改进后，垃圾回收的最大停顿时间减少到了原本的1/6.</p>
<p>V8后续还引进了延迟清理Lazy-Sweeping和增量式整理incremental Compaction，让清理与整理动作也变成增量式，同时还计划引入并行标记和并行清理，进一步利用多核性能降低每次停顿时间。</p>
</div></template>


