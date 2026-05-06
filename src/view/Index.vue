<template>
    <div id="app">
        <!-- 动态渐变背景 -->
        <div class="gradient-bg"></div>
        <!-- 扫描线效果 -->
        <div class="scanline-effect"></div>
        <!-- 网格背景 -->
        <div class="grid-bg"></div>
        <!-- 粒子背景 -->
        <div class="particle-bg" ref="particleContainer"></div>
        <!-- 鼠标跟随效果 -->
        <div class="cursor-follower" ref="cursorFollower"></div>
        
        <section class="hero-section" id="hero">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">
                        <span class="letter" v-for="(letter, index) in titleLetters" :key="index" :style="{ animationDelay: index * 0.1 + 's' }">
                            {{ letter }}
                        </span>
                    </h1>
                    <!-- <p class="hero-subtitle">Creative Developer</p> -->
                    <!-- 打字机效果组件 -->
                    <StreamTyping
                        mode="type"
                        :text="'Hello World，欢迎造访前端开发者 Lzy 的个人空间！'"
                        :speed="50"
                    />
                    <!-- <StreamTyping mode="stream" :stream="streamText" /> -->
                    <!-- <div class="scroll-hint">
                        <span></span>
                        <div class="scroll-line"></div>
                    </div> -->
                </div>
            </div>
        </section>
        
        <!-- 项目介绍 -->
        <section 
            v-for="(project, pIndex) in projects" 
            :key="project.title"
            :id="'project-' + (pIndex + 1)"
            class="project-detail-section"
        >
            <div class="project-detail-header">
                <div class="section-title">
                    <span class="title-line"></span>
                    <h2>{{ project.title }}</h2>
                    <span class="title-line"></span>
                </div>
                <div class="project-detail-tags">
                    <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
                </div>
            </div>
            
            <div class="project-detail-content">
                <div class="project-detail-gallery">
                    <div 
                        v-for="(img, imgIndex) in project.galleryImages.slice(0, 6)" 
                        :key="imgIndex"
                        class="project-detail-image animate-on-scroll"
                        :style="{ '--delay': imgIndex * 0.1 + 's' }"
                        @click="openProjectImage(project, imgIndex)"
                    >
                        <img :src="img" :alt="project.title + ' - 图片 ' + (imgIndex + 1)" />
                        <div class="image-click-overlay">
                            <span class="click-icon">+</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    v-if="project.galleryImages.length > 6" 
                    class="view-all-btn animate-on-scroll"
                    @click="openProjectImage(project, 0)"
                >
                    <span>查看全部 {{ project.galleryImages.length }} 张图片</span>
                    <span class="view-all-arrow">→</span>
                </button>
                
                <div class="project-detail-description animate-on-scroll">
                    <p>{{ project.description }}</p>
                </div>
            </div>
        </section>
        
        <!-- 关于我 -->
        <section class="about-section" id="about">
            <div class="about-content">
                <div class="about-image-container animate-on-scroll">
                    <div class="about-image-wrapper">
                        <img src="../assets/img/mine.png" alt="About Me" class="about-image" />
                        <div class="image-border"></div>
                        <div class="image-shadow"></div>
                    </div>
                </div>
                <div class="about-text animate-on-scroll" style="--delay: 0.2s;">
                    <h2 class="about-title">ABOUT ME</h2>
                    <p class="about-description">
                        我是一名前端开发工程师，热爱设计与开发，享受日常开发中从需求拆解、项目搭建到功能落地的完整过程，沉浸于解决问题、持续迭代优化的每一刻，在创作与实践中收获成就感与乐趣。
                    </p>
                    <p class="about-description">
                        掘金博客：<a href="https://juejin.cn/user/1424622661933991" target="_blank">https://juejin.cn/user/1745282846683045</a>
                    </p>
                    <p class="about-description">
                        NPM 开源贡献：<a href="https://www.npmjs.com/~lzy-ctrl" target="_blank">https://www.npmjs.com/~lzy-ctrl</a>
                    </p>
                    <div class="about-stats">
                        <div class="stat-item">
                            <span class="stat-number">4+</span>
                            <span class="stat-label">Years Experience</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">20+</span>
                            <span class="stat-label">Projects</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- 联系我 -->
        <section class="contact-section" id="contact">
            <div class="contact-content animate-on-scroll">
                <h2 class="contact-title">GET IN TOUCH</h2>
                <p class="contact-subtitle">Let's create something amazing together</p>
                <form class="contact-form" @submit.prevent="sendEmail()">
                    <div class="form-group">
                        <input type="text" placeholder="YOUR NAME" class="form-input" v-model="formData.name" />
                        <span class="input-border"></span>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="YOUR EMAIL" class="form-input" v-model="formData.email" />
                        <span class="input-border"></span>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="YOUR MESSAGE" class="form-textarea" v-model="formData.message"></textarea>
                        <span class="input-border"></span>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span>SEND MESSAGE</span>
                        <span class="btn-glow"></span>
                    </button>
                </form>
            </div>
        </section>
        
    </div>
    
    <div v-if="imagePreviewOpen" class="image-preview-modal" @click.self="closeImagePreview">
        <button class="preview-close" @click="closeImagePreview">×</button>
        <button class="preview-prev" @click.stop="prevImage" :disabled="currentPreviewIndex === 0">‹</button>
        <button class="preview-next" @click.stop="nextImage" :disabled="currentPreviewIndex === (currentPreviewProject?.galleryImages.length - 1)">›</button>
        
        <div class="preview-content">
            <img 
                :src="currentPreviewProject?.galleryImages[currentPreviewIndex]" 
                :alt="currentPreviewProject?.title + ' - 图片 ' + (currentPreviewIndex + 1)" 
                class="preview-image" 
            />
            <div class="preview-info">
                <span class="preview-title">{{ currentPreviewProject?.title }}</span>
                <span class="preview-counter">{{ currentPreviewIndex + 1 }} / {{ currentPreviewProject?.galleryImages.length }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import StreamTyping from '../components/StreamTyping.vue'
import emailjs from '@emailjs/browser';
export default {
    components: {
        StreamTyping
    },  
    setup() {
        const streamText = ref("");
        const mockStream = async () => {
            const chunks = ["Hello ", "Vue ", "流式 ", "渲染！"];
            for (const chunk of chunks) {
                await new Promise(r => setTimeout(r, 500));
                streamText.value += chunk;
                // console.log(streamText.value);
            }
        };
        mockStream();

        const projects = ref([
            {
                title: '作品-智慧牧场',
                description: '智慧牧场依托物联网与大数据技术，采用牛胃智能胶囊无感监测方案。将胶囊设备置入牛胃，全天候实时采集牛胃温度、三轴运动偏移等核心数据。通过平台智能分析研判，掌握牛只健康状态、活动规律与消化情况，替代传统经验养殖，为牧场主提供健康预警、精准饲喂、科学管护等养殖方案，助力牧场科学养殖。',
                image: new URL('../assets/img/mc/mc1.png', import.meta.url).href,
                tags: ['胶囊', '数据采集', '生命周期', '科学养殖'],
                galleryImages: [
                    new URL('../assets/img/mc/mc1.png', import.meta.url).href,
                    new URL('../assets/img/mc/mc2.png', import.meta.url).href,
                    new URL('../assets/img/mc/mc3.png', import.meta.url).href,
                    new URL('../assets/img/mc/mc4.png', import.meta.url).href,
                    new URL('../assets/img/mc/mc5.png', import.meta.url).href,
                    new URL('../assets/img/mc/mc6.png', import.meta.url).href,
                    new URL('../assets/img/mc/mc7.jpg', import.meta.url).href,
                    new URL('../assets/img/mc/mc8.PNG', import.meta.url).href,
                    new URL('../assets/img/mc/mc9.PNG', import.meta.url).href,
                    new URL('../assets/img/mc/mc10.PNG', import.meta.url).href,
                    new URL('../assets/img/mc/mc11.jpg', import.meta.url).href
                ]
            },
            {
                title: '作品-零售平台',
                description: '零售平台项目，分为运营平台与商户平台两大模块。运营端统一管控商品上架、统筹配货调度；商户端自主上架货品、一键提交配货申请，同时支持收银机登录桌面收银系统，实现商品称重、线下零售收银全流程，打通总部统筹 + 门店零售的一体化牛肉售卖管理体系。',
                image: new URL('../assets/img/nr/nr1.png', import.meta.url).href,
                tags: ['零售', '门店运营', '称重收银'],
                galleryImages: [
                    new URL('../assets/img/nr/nr1.png', import.meta.url).href,
                    new URL('../assets/img/nr/nr2.png', import.meta.url).href,
                    new URL('../assets/img/nr/nr3.png', import.meta.url).href,
                    new URL('../assets/img/nr/nr4.png', import.meta.url).href,
                    new URL('../assets/img/nr/nr5.png', import.meta.url).href,
                    new URL('../assets/img/nr/nr6.png', import.meta.url).href,
                    new URL('../assets/img/nr/nr7.png', import.meta.url).href,
                    new URL('../assets/img/nr/nr8.png', import.meta.url).href
                ]
            },
            {
                title: '作品-星梦短剧',
                description: '星梦短剧项目采用多站点架构，后台支持多 APP 站点统一管理，可对短剧剧集、会员权限、售卖价格等内容进行配置，同时兼顾订单数据统筹管理。用户在 APP 端可浏览短剧内容，完成点赞、收藏等互动操作，支持支付宝支付，可自主购买会员或单部剧集，打造短剧观看与付费消费体验。',
                image: new URL('../assets/img/xm/xm1.PNG', import.meta.url).href,
                tags: ['多站管理', 'APP', '短剧'],
                galleryImages: [
                    new URL('../assets/img/xm/xm1.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm2.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm3.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm4.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm5.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm8.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm7.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm9.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm10.PNG', import.meta.url).href,
                    new URL('../assets/img/xm/xm11.PNG', import.meta.url).href
                ]
            },
            {
                title: '作品-无人机配送',
                description: '无人机智能配送项目采用多端协同架构。中台系统统一管理智能机柜、无人机站点、调度中心及骑手提现审核等核心业务；商户后台支持商品上架、订单处理、发货管理等门店运营操作；骑手 H5 端可完成接单、取货确认、送达完成等流程操作，同时查询入账明细与自主提现；用户商城 H5 端支持微信支付下单、收货地址配置、订单及实时物流轨迹查询，依托无人机自动化配送，实现高效、短途即时配送全链路服务。',
                image: new URL('../assets/img/wrj/wrj1.PNG', import.meta.url).href,
                tags: ['电商', '无人机', '多端协同'],
                galleryImages: [
                    new URL('../assets/img/wrj/wrj1.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj2.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj3.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj4.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj5.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj6.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj7.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj8.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj9.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj10.PNG', import.meta.url).href,
                    new URL('../assets/img/wrj/wrj11.PNG', import.meta.url).href
                ]
            },
            {
                title: '作品-集宿',
                description: '集宿项目整合多端管理与文旅住宿服务。运营中心审核民宿入驻申请、统筹策划线上活动；民宿老板通过 PMS 管理后台，管控客房入住、消费账单，沉淀私域客户资源；用户依托小程序，在线预订客房、线上支付，同步查看平台与地方政府联合推出的特色文旅活动，实现民宿运营数字化、住宿服务一体化。',
                image: new URL('../assets/img/js/js1.jpg', import.meta.url).href,
                tags: ['民宿管控', 'PMS管理', '文旅联动'],
                galleryImages: [
                    new URL('../assets/img/js/js1.jpg', import.meta.url).href,
                    new URL('../assets/img/js/js2.jpg', import.meta.url).href,
                    new URL('../assets/img/js/js3.png', import.meta.url).href,
                    new URL('../assets/img/js/js4.jpg', import.meta.url).href,
                    new URL('../assets/img/js/js5.png', import.meta.url).href,
                    new URL('../assets/img/js/js7.png', import.meta.url).href,
                    new URL('../assets/img/js/js8.PNG', import.meta.url).href,
                    new URL('../assets/img/js/js9.PNG', import.meta.url).href,
                    new URL('../assets/img/js/js10.PNG', import.meta.url).href,
                    new URL('../assets/img/js/js11.PNG', import.meta.url).href
                ]
            }
        ]);

        const formData = ref({
            name: '',
            email: '',
            message: ''
        });
        const PUBLIC_KEY = 'zWuCyw444THpWcbz9'
        const SERVICE_ID = 'service_z6lik6c'
        const TEMPLATE_ID = 'template_m709y4c'

        const activeIndex = ref(0);
        const currentSection = ref('');
        
        const projectGalleryOpen = ref(false);
        const currentProject = ref(null);
        const projectImageIndex = ref(0);
        
        const imagePreviewOpen = ref(false);
        const currentPreviewProject = ref(null);
        const currentPreviewIndex = ref(0);

        // 将标题字符串转换为单个字母数组，用于动画显示
        const titleLetters = computed(() => 'DEVELOPER'.split(''));

        /**
         * 打开图片预览
         * @param {object} project - 项目对象
         * @param {number} index - 图片索引
         */
        const openProjectImage = (project, index) => {
            currentPreviewProject.value = project;
            currentPreviewIndex.value = index;
            imagePreviewOpen.value = true;
            document.body.style.overflow = 'hidden';
        };

        /**
         * 关闭图片预览
         */
        const closeImagePreview = () => {
            imagePreviewOpen.value = false;
            currentPreviewProject.value = null;
            document.body.style.overflow = '';
        };

        /**
         * 上一张图片
         */
        const prevImage = () => {
            if (!currentPreviewProject.value || currentPreviewIndex.value === 0) return;
            currentPreviewIndex.value--;
        };

        /**
         * 下一张图片
         */
        const nextImage = () => {
            if (!currentPreviewProject.value) return;
            const total = currentPreviewProject.value.galleryImages.length;
            if (currentPreviewIndex.value >= total - 1) return;
            currentPreviewIndex.value++;
        };

        /**
         * 处理表单提交
         */
        const sendEmail = async () => {
            // 验证表单数据
            if (!formData.value.email || !formData.value.message) {
                alert('请输入邮箱和消息');
                return;
            }

            const params = {
                user_email: formData.value.email,
                name: formData.value.name || '匿名用户',
                message: formData.value.message
            }

            try {
                await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)
                alert('发送成功！')
                formData.value = { name: '', email: '', message: '' };
            } catch (err) {
                alert('发送失败：' + err.text)
            }            
        };

        // 粒子元素数组，用于组件卸载时清理
        let particles = [];

        const createParticles = () => {
            const container = document.querySelector('.particle-bg');
            if (!container) return;

            // 创建100个粒子
            for (let i = 0; i < 100; i++) {
                // 创建粒子DOM元素
                const particle = document.createElement('div');
                particle.className = 'particle';
                // 随机位置（百分比）
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                // 随机大小（2-6px）
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                // 随机动画延迟（0-5s）
                particle.style.animationDelay = Math.random() * 5 + 's';
                // 随机动画时长（10-20s）
                particle.style.animationDuration = Math.random() * 10 + 10 + 's';
                // 随机颜色（青色或粉色）
                particle.style.background = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
                // 添加到容器
                container.appendChild(particle);
                // 保存引用以便清理
                particles.push(particle);
            }
        };

        /**
         * IntersectionObserver回调函数
         * 当元素进入视口时触发动画
         * @param {IntersectionObserverEntry[]} entries - 观察条目数组
         */
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                // 如果元素进入视口
                if (entry.isIntersecting) {
                    // 添加动画类名
                    entry.target.classList.add('animate-in');
                    
                    // 获取元素的区块ID并更新当前区块状态
                    const sectionId = entry.target.getAttribute('data-section');
                    if (sectionId) {
                        currentSection.value = sectionId;
                    }
                }
            });
        };

        /**
         * 初始化滚动动画观察器
         */
        const initScrollAnimation = () => {
            // 观察器配置选项
            const observerOptions = {
                threshold: 0.1,           // 元素10%进入视口时触发
                rootMargin: '0px 0px -100px 0px'  // 底部向内缩进100px
            };

            // 创建IntersectionObserver实例
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            
            // 获取所有需要动画的元素
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            // 开始观察每个元素
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        };

        // 滚动状态标志 - 防止滚动过程中触发新的滚动
        let isScrolling = false;
        // 当前页码索引
        let currentPage = 0;
        // 页面区块ID数组
        const sections = ['hero', 'project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'about', 'contact'];
        // 滚动状态重置计时器
        let scrollResetTimeout = null;
        // 手势结束计时器
        let gestureEndTimeout = null;

        /**
         * 滚动到指定区块
         * @param {number} index - 目标区块索引
         */
        const scrollToSection = (index) => {
            if (index < 0 || index >= sections.length) return;
            
            currentPage = index;
            currentSection.value = sections[index];
            
            const element = document.getElementById(sections[index]);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        /**
         * 处理鼠标滚轮事件
         * @param {WheelEvent} e - 滚轮事件对象
         */
        const handleWheel = (e) => {
            e.preventDefault();
            
            if (isScrolling) return;
            
            isScrolling = true;
            
            const direction = e.deltaY > 0 ? 1 : -1;
            scrollToSection(currentPage + direction);
            
            if (gestureEndTimeout) {
                clearTimeout(gestureEndTimeout);
            }
            
            gestureEndTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1200);
        };

        /**
         * 处理键盘事件
         * @param {KeyboardEvent} e - 键盘事件对象
         */
        const handleKeydown = (e) => {
            if (imagePreviewOpen.value) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextImage();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    closeImagePreview();
                }
                return;
            }
            
            if (isScrolling) return;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                isScrolling = true;
                scrollToSection(currentPage + 1);
                
                if (gestureEndTimeout) {
                    clearTimeout(gestureEndTimeout);
                }
                gestureEndTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 500);
            } 
            else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                isScrolling = true;
                scrollToSection(currentPage - 1);
                
                if (gestureEndTimeout) {
                    clearTimeout(gestureEndTimeout);
                }
                gestureEndTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }
        };

        /**
         * 处理鼠标移动事件 - 鼠标跟随效果
         * @param {MouseEvent} e - 鼠标事件对象
         */
        const handleMouseMove = (e) => {
            const follower = document.querySelector('.cursor-follower');
            if (follower) {
                // 使用requestAnimationFrame实现平滑跟随
                requestAnimationFrame(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                });
            }
        };

        /**
         * 组件挂载时执行的初始化操作
         */
        onMounted(() => {
            createParticles();
            
            setTimeout(() => {
                initScrollAnimation();
            }, 100);
            
            currentSection.value = 'hero';
            
            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('keydown', handleKeydown);
            
            if (!window.matchMedia('(max-width: 768px)').matches) {
                window.addEventListener('mousemove', handleMouseMove);
            }
        });

        /**
         * 组件卸载时执行的清理操作
         */
        onUnmounted(() => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeydown);
            
            if (scrollResetTimeout) {
                clearTimeout(scrollResetTimeout);
            }
            
            if (gestureEndTimeout) {
                clearTimeout(gestureEndTimeout);
            }
            
            if (!window.matchMedia('(max-width: 768px)').matches) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            
            particles.forEach(p => p.remove());
        });

        return {
            projects,
            formData,
            PUBLIC_KEY,
            SERVICE_ID,
            TEMPLATE_ID,
            activeIndex,
            currentSection,
            titleLetters,
            streamText,
            sendEmail,
            scrollToSection,
            projectGalleryOpen,
            currentProject,
            projectImageIndex,
            imagePreviewOpen,
            currentPreviewProject,
            currentPreviewIndex,
            openProjectImage,
            closeImagePreview,
            prevImage,
            nextImage
        };
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Arial', sans-serif;
    background: #0a0a1a;
    color: white;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

body::-webkit-scrollbar {
    display: none;
}

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

#app {
    position: relative;
}

/* 动态渐变背景 */
.gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a002a 0%, #1a004a 25%, #0a002a 50%, #2a006a 75%, #0a002a 100%);
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
    z-index: 0;
}

@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* 扫描线效果 */
.scanline-effect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.02) 2px,
        rgba(0, 255, 255, 0.02) 4px
    );
    pointer-events: none;
    z-index: 1;
    animation: scanline-move 8s linear infinite;
}

@keyframes scanline-move {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
}

/* 网格背景 */
.grid-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 1;
    animation: grid-pulse 4s ease-in-out infinite;
}

@keyframes grid-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

/* 鼠标跟随效果 */
.cursor-follower {
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease-out;
    mix-blend-mode: screen;
}

.cursor-follower::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #00ffff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
}

@media screen and (max-width: 768px) {
    .cursor-follower {
        display: none;
    }
}

.particle-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.particle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
    animation: float-particle linear infinite;
}

@keyframes float-particle {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 0.6;
    }
    90% {
        opacity: 0.6;
    }
    100% {
        transform: translateY(-100vh) translateX(50px);
        opacity: 0;
    }
}

.hero-section {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.hero-title {
    font-size: clamp(50px, 15vw, 120px);
    font-weight: bold;
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 20px;
}

.letter {
    display: inline-block;
    color: #00ffff;
    text-shadow: 
        0 0 10px #00ffff,
        0 0 20px #00ffff,
        0 0 40px #00ffff;
    opacity: 0;
    animation: fade-in-up 0.8s ease forwards, glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
    0%, 100% {
        text-shadow: 
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 40px #00ffff;
    }
    50% {
        text-shadow: 
            0 0 15px #00ffff,
            0 0 30px #00ffff,
            0 0 60px #00ffff,
            0 0 80px #ff00ff;
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-subtitle {
    font-size: clamp(18px, 4vw, 30px);
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 10px;
    animation: fade-in 1s ease 0.5s forwards;
    opacity: 0;
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* .scroll-hint {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    animation: fade-in 1s ease 1s forwards;
    opacity: 0;
}

.scroll-hint span {
    font-size: 12px;
    letter-spacing: 5px;
    color: rgba(255, 255, 255, 0.5);
}

.scroll-line {
    width: 2px;
    height: 50px;
    background: linear-gradient(to bottom, #00ffff, transparent);
    animation: scroll-line 2s ease-in-out infinite;
} */

@keyframes scroll-line {
    0%, 100% {
        transform: translateY(-10px);
        opacity: 0.5;
    }
    50% {
        transform: translateY(10px);
        opacity: 1;
    }
}

.section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-bottom: 60px;
}

.section-title h2 {
    font-size: 32px;
    letter-spacing: 8px;
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.title-line {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ffff, transparent);
}

.project-detail-section {
    padding: 60px 50px;
    position: relative;
    z-index: 1;
    min-height: 100vh;
}

.project-detail-header {
    text-align: center;
    margin-bottom: 60px;
}

.project-detail-tags {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap;
}

.project-detail-tags .project-tag {
    padding: 8px 20px;
    border: 1px solid rgba(0, 255, 255, 0.5);
    border-radius: 20px;
    font-size: 12px;
    color: #00ffff;
    background: rgba(0, 255, 255, 0.1);
}

.project-detail-content {
    max-width: 1400px;
    margin: 0 auto;
}

.project-detail-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.project-detail-image {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: 10px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.project-detail-image.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.project-detail-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.project-detail-image:hover img {
    transform: scale(1.1);
}

.image-click-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.project-detail-image:hover .image-click-overlay {
    opacity: 1;
}

.click-icon {
    font-size: 48px;
    color: #00ffff;
    font-weight: bold;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.view-all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 400px;
    margin: 30px auto;
    padding: 15px 30px;
    background: rgba(0, 255, 255, 0.1);
    border: 2px solid #00ffff;
    border-radius: 30px;
    color: #00ffff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
}

.view-all-btn.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.view-all-btn:hover {
    background: rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
}

.view-all-arrow {
    font-size: 18px;
    transition: transform 0.3s ease;
}

.view-all-btn:hover .view-all-arrow {
    transform: translateX(5px);
}

.image-preview-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fade-in 0.3s ease;
}

.preview-close {
    position: absolute;
    top: 20px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background: transparent;
    color: white;
    font-size: 32px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.preview-close:hover {
    border-color: #00ffff;
    color: #00ffff;
}

.preview-prev,
.preview-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 36px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.preview-prev {
    left: 30px;
}

.preview-next {
    right: 30px;
}

.preview-prev:hover:not(:disabled),
.preview-next:hover:not(:disabled) {
    border-color: #00ffff;
    color: #00ffff;
    background: rgba(0, 255, 255, 0.1);
}

.preview-prev:disabled,
.preview-next:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.preview-content {
    text-align: center;
    max-width: 90%;
    max-height: 90%;
}

.preview-image {
    max-width: 90vw;
    max-height: 75vh;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
}

.preview-info {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.preview-title {
    font-size: 18px;
    color: #00ffff;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.preview-counter {
    padding: 8px 20px;
    border: 1px solid rgba(0, 255, 255, 0.5);
    border-radius: 20px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.project-detail-description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
    background: rgba(20, 20, 40, 0.5);
    border-radius: 15px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.project-detail-description.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.project-detail-description p {
    font-size: 16px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
}

.about-section {
    padding: 100px 50px;
    background: rgba(10, 10, 30, 0.5);
    position: relative;
    z-index: 1;
    min-height: 100vh;
}

.about-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.about-image-container {
    position: relative;
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.8s ease;
}

.about-image-container.animate-in {
    opacity: 1;
    transform: translateX(0);
}

.about-text {
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.8s ease;
}

.about-text.animate-in {
    opacity: 1;
    transform: translateX(0);
}

.about-image-wrapper {
    position: relative;
    aspect-ratio: 4/5;
}

.about-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.image-border {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 15px;
    pointer-events: none;
}

.image-shadow {
    position: absolute;
    top: 10px;
    left: 10px;
    right: -10px;
    bottom: -10px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    z-index: -1;
}

.about-title {
    font-size: 36px;
    letter-spacing: 6px;
    color: #00ffff;
    margin-bottom: 30px;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.about-description {
    font-size: 18px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 40px;
}

.about-description a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: underline;
}

.about-description a:hover,
.about-description a:active,
.about-description a:focus {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: underline;
}

.about-stats {
    display: flex;
    gap: 40px;
}

.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 36px;
    font-weight: bold;
    color: #ff00ff;
    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.stat-label {
    font-size: 12px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.6);
}

.projects-section {
    padding: 100px 50px;
    position: relative;
    z-index: 1;
    min-height: 100vh;
}

.projects-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    max-width: 1400px;
    margin: 0 auto;
}

.project-card {
    position: relative;
    background: rgba(20, 20, 40, 0.5);
    border-radius: 15px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.6s ease;
    transition-delay: var(--delay);
    perspective: 1000px;
    cursor: pointer;
}

.project-card.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.project-card:hover {
    transform: translateY(-10px) rotateX(2deg);
    box-shadow: 
        0 20px 40px rgba(0, 255, 255, 0.1),
        0 0 60px rgba(255, 0, 255, 0.1);
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.project-card:hover .card-inner {
    transform: rotateY(5deg);
}

.project-image-wrapper {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
}

.project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.project-card:hover .project-image {
    transform: scale(1.05);
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
    display: flex;
    align-items: flex-end;
    padding: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
    opacity: 1;
}

.project-tags {
    display: flex;
    gap: 10px;
}

.project-tag {
    padding: 5px 12px;
    background: rgba(0, 255, 255, 0.2);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 20px;
    font-size: 12px;
    color: #00ffff;
}

.project-info {
    padding: 25px;
}

.project-title {
    font-size: 22px;
    margin-bottom: 10px;
    color: white;
}

.project-description {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
}

.contact-section {
    padding: 100px 50px;
    background: rgba(10, 10, 30, 0.8);
    position: relative;
    z-index: 1;
    text-align: center;
    min-height: 100vh;
}

.contact-title {
    font-size: 36px;
    letter-spacing: 6px;
    color: #00ffff;
    margin-bottom: 15px;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.contact-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 50px;
    letter-spacing: 2px;
}

.contact-content {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
}

.contact-content.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.form-group {
    position: relative;
    margin-bottom: 20px;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 14px;
    letter-spacing: 2px;
    transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
}

.form-textarea {
    height: 150px;
    resize: none;
}

.input-border {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 1px solid transparent;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: linear-gradient(45deg, #00ffff, #ff00ff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

.form-group:focus-within .input-border {
    opacity: 1;
}

.submit-btn {
    position: relative;
    padding: 18px 40px;
    background: transparent;
    border: 2px solid #00ffff;
    color: #00ffff;
    font-size: 14px;
    letter-spacing: 3px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    border-color: #ff00ff;
    color: #ff00ff;
    box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.3),
        0 0 60px rgba(255, 0, 255, 0.2),
        inset 0 0 30px rgba(0, 255, 255, 0.1);
    animation: btn-pulse 1.5s ease-in-out infinite;
}

@keyframes btn-pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
}

.btn-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3), transparent);
    transform: rotate(45deg);
    transition: left 0.5s ease;
}

.submit-btn:hover .btn-glow {
    left: 100%;
}

.btn-border-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 5px;
    background: linear-gradient(45deg, #00ffff, #ff00ff);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.submit-btn:hover .btn-border-glow {
    opacity: 1;
    animation: border-rotate 3s linear infinite;
}

@keyframes border-rotate {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}

.footer {
    padding: 40px;
    background: rgba(5, 5, 15, 0.9);
    text-align: center;
}

.footer-content p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 2px;
}

.lightbox-image {
    max-width: 90%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.2);
}

.lightbox-info {
    margin-top: 20px;
    text-align: center;
}

.lightbox-info h3 {
    font-size: 24px;
    color: #00ffff;
    margin-bottom: 10px;
}

.lightbox-info p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
}

.project-gallery {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fade-in 0.3s ease;
}

.gallery-close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background: transparent;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.gallery-close:hover {
    border-color: #00ffff;
    color: #00ffff;
}

.gallery-prev,
.gallery-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 32px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-prev {
    left: 30px;
}

.gallery-next {
    right: 30px;
}

.gallery-prev:hover,
.gallery-next:hover {
    border-color: #00ffff;
    color: #00ffff;
    background: rgba(0, 255, 255, 0.1);
}

.gallery-content {
    text-align: center;
    max-width: 90%;
}

.gallery-title {
    font-size: 32px;
    color: #00ffff;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 4px;
}

.gallery-image {
    max-width: 90vw;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
}

.gallery-info {
    margin-top: 20px;
}

.gallery-counter {
    display: inline-block;
    padding: 8px 20px;
    border: 1px solid rgba(0, 255, 255, 0.5);
    border-radius: 20px;
    font-size: 14px;
    color: #00ffff;
    margin-bottom: 15px;
}

.gallery-description {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
}

.view-gallery-btn {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 30px;
    border: 2px solid #00ffff;
    background: rgba(0, 255, 255, 0.1);
    color: #00ffff;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
}

.project-card:hover .view-gallery-btn {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.view-gallery-btn:hover {
    background: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

@media (max-width: 768px) {
    .project-detail-section {
        padding: 60px 20px;
    }
    
    .project-detail-gallery {
        grid-template-columns: 1fr;
    }
    
    .project-detail-description {
        padding: 20px;
    }
    
    .project-detail-description p {
        font-size: 14px;
    }
    
    .about-content {
        grid-template-columns: 1fr;
    }
    
    .about-stats {
        justify-content: center;
    }
    
    .section-title h2 {
        font-size: 24px;
    }
    
    .hero-title {
        font-size: 48px;
    }
    
    .view-all-btn {
        padding: 12px 20px;
        font-size: 14px;
    }
}
</style>