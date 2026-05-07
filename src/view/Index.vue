<template>
    <div id="app">
        <!-- 动态渐变背景 -->
        <div class="gradient-bg"></div>
        <!-- 扫描线效果 -->
        <div class="scanline-effect"></div>
        <!-- 网格背景 -->
        <div class="grid-bg"></div>
        <!-- 鼠标跟随效果 -->
        <div class="cursor-follower" ref="cursorFollower"></div>
        
        <section class="hero-section" id="hero">
            <!-- Three.js 首屏空间：用于渲染可跟随鼠标轻微旋转的开发者星环场景 -->
            <div class="three-orbit-scene" ref="threeContainer"></div>
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
            <!-- 项目页Three.js背景：为第2-6页分别渲染轻量数据流动效 -->
            <div class="project-three-scene" :ref="el => setProjectThreeContainer(el, pIndex)"></div>
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
                        NPM 贡献：<a href="https://www.npmjs.com/~lzy-ctrl" target="_blank">https://www.npmjs.com/~lzy-ctrl</a>
                    </p>
                    <p class="about-description">
                        GitHub：<a href="https://github.com/lzy-mode" target="_blank">https://github.com/lzy-mode</a>
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
import * as THREE from 'three';
export default {
    components: {
        StreamTyping
    },  
    setup() {
        const threeContainer = ref(null);
        const projectThreeContainers = ref([]);
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
                description: '无人机智能配送项目采用多端协同架构。中台系统管理智能机柜、无人机站点、调度中心及骑手提现审核等核心业务；商户后台支持商品上架、订单处理、发货管理等门店运营操作；骑手 H5 端可完成接单、取货、送达等流程操作，同时查询入账明细与自主提现；用户商城 H5 端支持微信支付下单、收货地址配置、订单及实时物流轨迹查询，依托无人机自动化配送，实现高效、短途即时配送全链路服务。',
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
        const pointerPosition = { x: 0, y: 0 };
        let threeCleanup = null;
        let projectThreeCleanups = [];

        // 将标题字符串转换为单个字母数组，用于动画显示
        const titleLetters = computed(() => 'DEVELOPER'.split(''));

        /**
         * 收集项目页Three.js容器
         * 功能：Vue v-for 会多次触发函数ref，这里按项目索引保存对应画布容器。
         */
        const setProjectThreeContainer = (el, index) => {
            if (el) {
                projectThreeContainers.value[index] = el;
            }
        };

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
            pointerPosition.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointerPosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
            if (follower) {
                // 使用requestAnimationFrame实现平滑跟随
                requestAnimationFrame(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                });
            }
        };

        /**
         * 初始化Three.js首屏动效
         * 功能：创建由代码粒子、环形轨道和中心多面体组成的空间场景，增强首页科技感。
         */
        const initThreeHeroScene = () => {
            const container = threeContainer.value;
            if (!container) return null;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
            camera.position.set(0, 0, 7);

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            // 中心多面体：作为首页的视觉焦点，使用线框避免遮挡标题内容。
            const coreGeometry = new THREE.IcosahedronGeometry(1.35, 2);
            const coreMaterial = new THREE.MeshStandardMaterial({
                color: 0x00f5ff,
                roughness: 0.28,
                metalness: 0.72,
                transparent: true,
                opacity: 0.82,
                wireframe: true
            });
            const core = new THREE.Mesh(coreGeometry, coreMaterial);
            scene.add(core);

            // 环形轨道：模拟数据流围绕开发者技能栈运转。
            const orbitGroup = new THREE.Group();
            const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xff4ecd, transparent: true, opacity: 0.42 });
            for (let i = 0; i < 4; i++) {
                const torus = new THREE.Mesh(
                    new THREE.TorusGeometry(2.2 + i * 0.42, 0.008, 8, 160),
                    orbitMaterial.clone()
                );
                torus.rotation.x = Math.PI / 2 + i * 0.32;
                torus.rotation.y = i * 0.45;
                torus.material.opacity = 0.28 + i * 0.08;
                orbitGroup.add(torus);
            }
            scene.add(orbitGroup);

            // 粒子星域：让首屏有纵深感，并与原有DOM粒子形成前后层次。
            const particleCount = 520;
            const positions = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount; i++) {
                const radius = 2.6 + Math.random() * 4.4;
                const angle = Math.random() * Math.PI * 2;
                const depth = (Math.random() - 0.5) * 4;
                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
                positions[i * 3 + 2] = Math.sin(angle) * radius + depth;
            }
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({
                color: 0xb8fff7,
                size: 0.028,
                transparent: true,
                opacity: 0.76,
                blending: THREE.AdditiveBlending
            });
            const starField = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(starField);

            const cyanLight = new THREE.PointLight(0x00f5ff, 2.4, 12);
            cyanLight.position.set(-3, 2.4, 4);
            scene.add(cyanLight);

            const warmLight = new THREE.PointLight(0xffd166, 1.25, 10);
            warmLight.position.set(4, -2, 3);
            scene.add(warmLight);
            scene.add(new THREE.AmbientLight(0xffffff, 0.45));

            let animationFrameId = 0;

            const handleResize = () => {
                if (!container.clientWidth || !container.clientHeight) return;
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            };

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                core.rotation.x += 0.004;
                core.rotation.y += 0.007;
                orbitGroup.rotation.y += 0.003;
                orbitGroup.rotation.x += 0.0015;
                starField.rotation.y -= 0.0009;

                // 鼠标视差：让Three.js场景轻微响应用户移动，避免喧宾夺主。
                scene.rotation.y += (pointerPosition.x * 0.12 - scene.rotation.y) * 0.035;
                scene.rotation.x += (pointerPosition.y * 0.08 - scene.rotation.x) * 0.035;
                renderer.render(scene, camera);
            };

            window.addEventListener('resize', handleResize);
            animate();

            // 返回清理函数，组件卸载时释放WebGL资源和事件监听。
            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', handleResize);
                particleGeometry.dispose();
                particleMaterial.dispose();
                coreGeometry.dispose();
                coreMaterial.dispose();
                orbitGroup.children.forEach(mesh => {
                    mesh.geometry.dispose();
                    mesh.material.dispose();
                });
                renderer.dispose();
                renderer.domElement.remove();
            };
        };

        /**
         * 初始化项目页Three.js背景
         * 功能：为每个项目区生成独立的悬浮面板、立体模块和数据空间，提升第2-6页项目展示层次。
         */
        const initProjectThreeScenes = () => {
            const projectColors = [
                { primary: 0x4dffbf, secondary: 0xffd166 },
                { primary: 0x00d8ff, secondary: 0xff4ecd },
                { primary: 0xb48cff, secondary: 0x4dffbf },
                { primary: 0xffd166, secondary: 0x00d8ff },
                { primary: 0xff6b8a, secondary: 0x4dffbf }
            ];

            return projectThreeContainers.value.map((container, index) => {
                if (!container) return null;

                const colorSet = projectColors[index % projectColors.length];
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
                camera.position.set(0, 0, 8);

                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
                renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(renderer.domElement);

                const group = new THREE.Group();
                scene.add(group);

                // 发光核心：每个项目页的视觉锚点，使用不同颜色区分项目气质。
                const coreGeometry = new THREE.OctahedronGeometry(0.82, 1);
                const coreMaterial = new THREE.MeshStandardMaterial({
                    color: colorSet.primary,
                    roughness: 0.32,
                    metalness: 0.62,
                    transparent: true,
                    opacity: 0.34
                });
                const core = new THREE.Mesh(coreGeometry, coreMaterial);
                core.position.set(index % 2 === 0 ? -4.2 : 4.2, -0.15, 0);
                group.add(core);

                // 核心描边：在实体核心外叠加线框，兼顾体积感和科技感。
                const coreWireGeometry = new THREE.OctahedronGeometry(0.9, 1);
                const coreWireMaterial = new THREE.MeshBasicMaterial({
                    color: colorSet.secondary,
                    transparent: true,
                    opacity: 0.5,
                    wireframe: true
                });
                const coreWire = new THREE.Mesh(coreWireGeometry, coreWireMaterial);
                coreWire.position.copy(core.position);
                group.add(coreWire);

                // 数据轨道：用多组环线模拟项目业务流和前端交互链路。
                const orbitMeshes = [];
                for (let i = 0; i < 5; i++) {
                    const orbitMaterial = new THREE.MeshBasicMaterial({
                        color: i % 2 === 0 ? colorSet.primary : colorSet.secondary,
                        transparent: true,
                        opacity: 0.16 + i * 0.028
                    });
                    const orbit = new THREE.Mesh(
                        new THREE.TorusGeometry(1.55 + i * 0.36, 0.006, 8, 150),
                        orbitMaterial
                    );
                    orbit.position.copy(core.position);
                    orbit.rotation.x = Math.PI / 2 + i * 0.22;
                    orbit.rotation.y = index * 0.28 + i * 0.18;
                    orbitMeshes.push(orbit);
                    group.add(orbit);
                }

                // 悬浮UI面板：用半透明实体面片模拟项目后台、移动端页面或数据看板。
                const panelMeshes = [];
                const panelMaterial = new THREE.MeshStandardMaterial({
                    color: colorSet.primary,
                    roughness: 0.18,
                    metalness: 0.32,
                    transparent: true,
                    opacity: 0.18,
                    side: THREE.DoubleSide
                });
                const panelAccentMaterial = new THREE.MeshBasicMaterial({
                    color: colorSet.secondary,
                    transparent: true,
                    opacity: 0.34,
                    side: THREE.DoubleSide
                });
                for (let i = 0; i < 3; i++) {
                    const panelGroup = new THREE.Group();
                    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.86, 0.035), panelMaterial.clone());
                    const header = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.055, 0.045), panelAccentMaterial.clone());
                    const rowOne = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.04, 0.047), panelAccentMaterial.clone());
                    const rowTwo = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.04, 0.047), panelAccentMaterial.clone());
                    header.position.set(0, 0.28, 0.035);
                    rowOne.position.set(-0.08, 0.02, 0.038);
                    rowTwo.position.set(-0.23, -0.18, 0.038);
                    panelGroup.add(panel, header, rowOne, rowTwo);
                    panelGroup.position.set(index % 2 === 0 ? 3.9 : -3.9, 1.9 - i * 1.55, -0.8 - i * 0.28);
                    panelGroup.rotation.set(-0.08 + i * 0.05, index % 2 === 0 ? -0.36 : 0.36, index % 2 === 0 ? -0.08 : 0.08);
                    panelMeshes.push(panelGroup);
                    group.add(panelGroup);
                }

                // 立体模块块：表现组件化、模块化系统，避免背景只剩线和点。
                const moduleMeshes = [];
                for (let i = 0; i < 6; i++) {
                    const moduleMaterial = new THREE.MeshStandardMaterial({
                        color: i % 2 === 0 ? colorSet.primary : colorSet.secondary,
                        roughness: 0.24,
                        metalness: 0.58,
                        transparent: true,
                        opacity: 0.22 + (i % 3) * 0.045
                    });
                    const module = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), moduleMaterial);
                    const side = index % 2 === 0 ? -1 : 1;
                    module.position.set(side * (2.2 + i * 0.34), -2.15 + (i % 3) * 0.62, -0.55 - i * 0.16);
                    module.rotation.set(i * 0.2, i * 0.32, i * 0.16);
                    moduleMeshes.push(module);
                    group.add(module);
                }

                // 数据柱体：模拟项目运营指标，使背景更像可视化产品空间。
                const barMeshes = [];
                const barBaseX = index % 2 === 0 ? 2.25 : -2.25;
                for (let i = 0; i < 7; i++) {
                    const height = 0.28 + (i % 4) * 0.18 + index * 0.025;
                    const barMaterial = new THREE.MeshStandardMaterial({
                        color: i % 2 === 0 ? colorSet.secondary : colorSet.primary,
                        roughness: 0.2,
                        metalness: 0.46,
                        transparent: true,
                        opacity: 0.3
                    });
                    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.15, height, 0.15), barMaterial);
                    bar.position.set(barBaseX + (i - 3) * 0.24, -2.42 + height / 2, 0.22 - i * 0.03);
                    barMeshes.push(bar);
                    group.add(bar);
                }

                // 漂浮节点：分布在项目区域两侧，营造数据节点持续运转的空间感。
                const nodeGeometry = new THREE.BufferGeometry();
                const nodeCount = 180;
                const nodePositions = new Float32Array(nodeCount * 3);
                for (let i = 0; i < nodeCount; i++) {
                    nodePositions[i * 3] = (Math.random() - 0.5) * 12;
                    nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
                    nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
                }
                nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
                const nodeMaterial = new THREE.PointsMaterial({
                    color: colorSet.primary,
                    size: 0.032,
                    transparent: true,
                    opacity: 0.52,
                    blending: THREE.AdditiveBlending
                });
                const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
                group.add(nodes);

                // 连接光带：横向穿过页面，强化项目图片矩阵背后的技术流线。
                const beamGeometry = new THREE.PlaneGeometry(9.6, 0.018);
                const beamMaterial = new THREE.MeshBasicMaterial({
                    color: colorSet.secondary,
                    transparent: true,
                    opacity: 0.2,
                    side: THREE.DoubleSide
                });
                const beams = [];
                for (let i = 0; i < 4; i++) {
                    const beam = new THREE.Mesh(beamGeometry, beamMaterial.clone());
                    beam.position.set(0, -2.3 + i * 1.48, -0.4 - i * 0.2);
                    beam.rotation.z = (index % 2 === 0 ? 1 : -1) * (0.04 + i * 0.014);
                    beams.push(beam);
                    group.add(beam);
                }

                const light = new THREE.PointLight(colorSet.primary, 1.5, 10);
                light.position.set(core.position.x, 2, 3);
                scene.add(light);
                scene.add(new THREE.AmbientLight(0xffffff, 0.32));

                let animationFrameId = 0;

                const handleResize = () => {
                    if (!container.clientWidth || !container.clientHeight) return;
                    camera.aspect = container.clientWidth / container.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.clientWidth, container.clientHeight);
                };

                const animate = () => {
                    animationFrameId = requestAnimationFrame(animate);
                    const speed = 0.002 + index * 0.00035;

                    core.rotation.x += 0.004 + index * 0.0004;
                    core.rotation.y += 0.006;
                    coreWire.rotation.x -= 0.003;
                    coreWire.rotation.y += 0.008;
                    nodes.rotation.y += speed;
                    nodes.rotation.x += 0.0008;
                    group.rotation.y += (pointerPosition.x * 0.06 - group.rotation.y) * 0.028;
                    group.rotation.x += (pointerPosition.y * 0.035 - group.rotation.x) * 0.028;

                    orbitMeshes.forEach((orbit, orbitIndex) => {
                        orbit.rotation.z += speed * (orbitIndex + 1);
                    });

                    panelMeshes.forEach((panelGroup, panelIndex) => {
                        panelGroup.position.y += Math.sin(Date.now() * 0.001 + panelIndex + index) * 0.0018;
                        panelGroup.rotation.z += Math.sin(Date.now() * 0.0007 + panelIndex) * 0.00035;
                    });

                    moduleMeshes.forEach((module, moduleIndex) => {
                        module.rotation.x += 0.004 + moduleIndex * 0.00045;
                        module.rotation.y += 0.005;
                        module.position.y += Math.sin(Date.now() * 0.0012 + moduleIndex) * 0.0012;
                    });

                    barMeshes.forEach((bar, barIndex) => {
                        const scale = 0.86 + Math.sin(Date.now() * 0.0014 + barIndex + index) * 0.16;
                        bar.scale.y = scale;
                    });

                    beams.forEach((beam, beamIndex) => {
                        beam.position.x = Math.sin(Date.now() * 0.00045 + beamIndex + index) * 0.42;
                        beam.material.opacity = 0.12 + Math.sin(Date.now() * 0.001 + beamIndex) * 0.055;
                    });

                    renderer.render(scene, camera);
                };

                window.addEventListener('resize', handleResize);
                animate();

                // 返回单个项目场景清理函数，确保切换或卸载时释放所有WebGL资源。
                return () => {
                    cancelAnimationFrame(animationFrameId);
                    window.removeEventListener('resize', handleResize);
                    coreGeometry.dispose();
                    coreMaterial.dispose();
                    coreWireGeometry.dispose();
                    coreWireMaterial.dispose();
                    nodeGeometry.dispose();
                    nodeMaterial.dispose();
                    beamGeometry.dispose();
                    beams.forEach(beam => {
                        beam.material.dispose();
                    });
                    orbitMeshes.forEach(orbit => {
                        orbit.geometry.dispose();
                        orbit.material.dispose();
                    });
                    panelMeshes.forEach(panelGroup => {
                        panelGroup.children.forEach(mesh => {
                            mesh.geometry.dispose();
                            mesh.material.dispose();
                        });
                    });
                    moduleMeshes.forEach(module => {
                        module.geometry.dispose();
                        module.material.dispose();
                    });
                    barMeshes.forEach(bar => {
                        bar.geometry.dispose();
                        bar.material.dispose();
                    });
                    renderer.dispose();
                    renderer.domElement.remove();
                };
            }).filter(Boolean);
        };

        /**
         * 组件挂载时执行的初始化操作
         */
        onMounted(() => {
            threeCleanup = initThreeHeroScene();
            projectThreeCleanups = initProjectThreeScenes();
            
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
            
            if (threeCleanup) {
                threeCleanup();
            }
            projectThreeCleanups.forEach(cleanup => cleanup());
        });

        return {
            projects,
            formData,
            PUBLIC_KEY,
            SERVICE_ID,
            TEMPLATE_ID,
            threeContainer,
            setProjectThreeContainer,
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
    font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
    background: #07111d;
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
    background: linear-gradient(135deg, #06111e 0%, #16213f 26%, #120b2f 52%, #06271f 76%, #07111d 100%);
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
    background-size: 68px 68px;
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
    isolation: isolate;
}

/* Three.js全屏画布层：放在首屏内容后方，负责承载动态空间场景 */
.three-orbit-scene {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.76;
    filter: saturate(1.15) contrast(1.08);
}

.three-orbit-scene canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(ellipse at center, rgba(0, 255, 255, 0.12) 0%, transparent 58%),
        linear-gradient(180deg, rgba(7, 17, 29, 0.12), rgba(7, 17, 29, 0.72));
    z-index: 2;
}

.hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
    padding: 0 24px;
    animation: hero-content-float 5s ease-in-out infinite;
}

/* 首屏文字轻浮动：让静态标题与Three.js场景呼吸节奏一致 */
@keyframes hero-content-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.hero-title {
    font-size: clamp(50px, 15vw, 120px);
    font-weight: bold;
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 20px;
    transform-style: preserve-3d;
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
    overflow: hidden;
}

/* 项目页Three.js画布层：作为2-6页的动态背景，不参与鼠标事件 */
.project-three-scene {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.58;
    filter: saturate(1.18) blur(0.1px);
}

.project-three-scene canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
}

/* 区块底纹：用细线和柔和色带提升页面层次，不新增实际内容 */
.project-detail-section::before,
.about-section::before,
.contact-section::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(120deg, transparent 0%, rgba(0, 255, 255, 0.055) 38%, transparent 62%),
        repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 26px);
    opacity: 0.42;
    mask-image: linear-gradient(180deg, transparent, #000 16%, #000 82%, transparent);
    z-index: 1;
}

.project-detail-header {
    position: relative;
    z-index: 2;
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
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
}

.project-detail-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 22px;
    margin-bottom: 40px;
    perspective: 1200px;
}

.project-detail-image {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: 8px;
    opacity: 0;
    transform: translateY(30px);
    border: 1px solid rgba(0, 255, 255, 0.16);
    background: rgba(10, 24, 38, 0.55);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
    transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.35s ease, box-shadow 0.35s ease;
    transition-delay: var(--delay);
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
    transform: scale(1.08) rotate(0.6deg);
}

/* 图片扫描高光：鼠标经过时制造高级产品展示感 */
.project-detail-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.18) 42%, transparent 58%);
    transform: translateX(-120%);
    transition: transform 0.75s ease;
    pointer-events: none;
}

.project-detail-image:hover {
    transform: translateY(-8px) rotateX(2deg);
    border-color: rgba(0, 255, 255, 0.55);
    box-shadow:
        0 26px 60px rgba(0, 0, 0, 0.38),
        0 0 34px rgba(0, 245, 255, 0.16);
}

.project-detail-image:hover::after {
    transform: translateX(120%);
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
    background: rgba(7, 20, 34, 0.62);
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    backdrop-filter: blur(18px);
    box-shadow: 0 22px 56px rgba(0, 0, 0, 0.28);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

/* 项目能力索引条：用标签自动生成技能节奏点，补足项目说明后的视觉停顿 */
.project-signal-strip {
    max-width: 980px;
    margin: 26px auto 0;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.project-signal-strip.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.signal-item {
    position: relative;
    overflow: hidden;
    padding: 10px 14px;
    border: 1px solid rgba(255, 209, 102, 0.25);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 12px;
    letter-spacing: 1px;
    background: rgba(255, 209, 102, 0.08);
    animation: signal-rise 0.7s ease both;
    animation-delay: var(--signal-delay);
}

.signal-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 209, 102, 0.22), transparent);
    transform: translateX(-100%);
    animation: signal-sweep 3.8s ease-in-out infinite;
    animation-delay: calc(var(--signal-delay) + 0.4s);
}

@keyframes signal-rise {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes signal-sweep {
    0%, 42% { transform: translateX(-100%); }
    70%, 100% { transform: translateX(100%); }
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
    background: rgba(6, 18, 30, 0.62);
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
    transform-style: preserve-3d;
    animation: portrait-drift 6s ease-in-out infinite;
}

/* 头像区域漂移动效：强化个人介绍区的空间感 */
@keyframes portrait-drift {
    0%, 100% { transform: translateY(0) rotateX(0deg); }
    50% { transform: translateY(-10px) rotateX(2deg); }
}

.about-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    filter: saturate(1.04) contrast(1.05);
}

.image-border {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 8px;
    pointer-events: none;
}

.image-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    border: 1px solid rgba(255, 209, 102, 0.22);
    transform: translate(14px, 14px);
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
    color: #8ff7ff;
    text-decoration: none;
    border-bottom: 1px solid rgba(143, 247, 255, 0.35);
    transition: color 0.3s ease, border-color 0.3s ease;
}

.about-description a:hover,
.about-description a:active,
.about-description a:focus {
    color: rgba(255, 255, 255, 0.8);
    border-color: rgba(255, 209, 102, 0.65);
}

.about-stats {
    display: flex;
    gap: 40px;
}

.stat-item {
    text-align: center;
    min-width: 128px;
    padding: 18px 20px;
    border: 1px solid rgba(0, 255, 255, 0.16);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.045);
    backdrop-filter: blur(12px);
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
    background: rgba(5, 14, 25, 0.84);
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
    padding: 34px;
    border: 1px solid rgba(0, 255, 255, 0.18);
    border-radius: 8px;
    background: rgba(8, 23, 36, 0.58);
    backdrop-filter: blur(18px);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
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
    background: rgba(0, 0, 0, 0.24);
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
    border-radius: 6px;
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
    .three-orbit-scene {
        opacity: 0.48;
        transform: scale(1.18);
    }

    .project-three-scene {
        opacity: 0.34;
        transform: scale(1.12);
    }

    .hero-content {
        animation: none;
    }

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
        gap: 42px;
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

    .contact-content {
        padding: 24px 18px;
    }
    
    .view-all-btn {
        padding: 12px 20px;
        font-size: 14px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-content,
    .about-image-wrapper,
    .particle,
    .signal-item::before {
        animation: none;
    }
}
</style>
