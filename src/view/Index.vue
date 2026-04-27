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
                    <p class="hero-subtitle">Creative Developer</p>
                    <!-- 打字机效果组件 -->
                    <!-- <StreamTyping
                        mode="type"
                        :text="'Hello Vue 打字机效果！Hello Vue 打字机效果！Hello Vue 打字机效果！Hello Vue 打字机效果！Hello Vue 打字机效果！'"
                        :speed="50"
                    /> -->
                    <StreamTyping mode="stream" :stream="streamText" />
                    <div class="scroll-hint">
                        <span>SCROLL</span>
                        <div class="scroll-line"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="gallery-section" id="gallery">
            <div class="section-title">
                <span class="title-line"></span>
                <h2>PORTFOLIO</h2>
                <span class="title-line"></span>
            </div>
            
            <div class="gallery-container">
                <div 
                    v-for="(image, index) in images" 
                    :key="index" 
                    class="gallery-item animate-on-scroll"
                    :class="{ active: activeIndex === index }"
                    @click="openLightbox(index)"
                >
                    <div class="image-wrapper">
                        <img :src="image.path" :alt="image.title" class="gallery-image" />
                        <div class="image-overlay">
                            <div class="overlay-content">
                                <h3>{{ image.title }}</h3>
                                <p>{{ image.description }}</p>
                            </div>
                        </div>
                        <div class="image-glow"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="about-section" id="about">
            <div class="about-content">
                <div class="about-image-container animate-on-scroll">
                    <div class="about-image-wrapper">
                        <img :src="images[0].path" alt="About Me" class="about-image" />
                        <div class="image-border"></div>
                        <div class="image-shadow"></div>
                    </div>
                </div>
                <div class="about-text animate-on-scroll" style="--delay: 0.2s;">
                    <h2 class="about-title">ABOUT ME</h2>
                    <p class="about-description">
                        I'm a passionate creative developer with a love for design and technology. 
                        Creating immersive digital experiences is my passion, blending art with code 
                        to build beautiful and functional applications.
                    </p>
                    <div class="about-stats">
                        <div class="stat-item">
                            <span class="stat-number">5+</span>
                            <span class="stat-label">Years Experience</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">100+</span>
                            <span class="stat-label">Projects</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Clients</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="projects-section" id="projects">
            <div class="section-title">
                <span class="title-line"></span>
                <h2>FEATURED WORK</h2>
                <span class="title-line"></span>
            </div>
            
            <div class="projects-container">
                <div 
                    v-for="(project, index) in projects" 
                    :key="index" 
                    class="project-card animate-on-scroll"
                    :style="{ '--delay': index * 0.2 + 's' }"
                >
                    <div class="project-image-wrapper">
                        <img :src="project.image" :alt="project.title" class="project-image" />
                        <div class="project-overlay">
                            <div class="project-tags">
                                <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">{{ project.title }}</h3>
                        <p class="project-description">{{ project.description }}</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="contact-section" id="contact">
            <div class="contact-content animate-on-scroll">
                <h2 class="contact-title">GET IN TOUCH</h2>
                <p class="contact-subtitle">Let's create something amazing together</p>
                <form class="contact-form" @submit.prevent="handleSubmit">
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
        
        <footer class="footer">
            <div class="footer-content">
                <p>&copy; 2024 Creative Portfolio. All rights reserved.</p>
            </div>
        </footer>
        
        <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
            <button class="lightbox-close" @click="closeLightbox">X</button>
            <img :src="images[lightboxIndex].path" :alt="images[lightboxIndex].title" class="lightbox-image" />
            <div class="lightbox-info">
                <h3>{{ images[lightboxIndex].title }}</h3>
                <p>{{ images[lightboxIndex].description }}</p>
            </div>
        </div>
        
        <nav class="floating-nav">
            <button class="nav-dot" :class="{ active: currentSection === 'hero' }" @click="scrollToSection(0)">
                <span class="nav-dot-inner"></span>
            </button>
            <button class="nav-dot" :class="{ active: currentSection === 'gallery' }" @click="scrollToSection(1)">
                <span class="nav-dot-inner"></span>
            </button>
            <button class="nav-dot" :class="{ active: currentSection === 'about' }" @click="scrollToSection(2)">
                <span class="nav-dot-inner"></span>
            </button>
            <button class="nav-dot" :class="{ active: currentSection === 'projects' }" @click="scrollToSection(3)">
                <span class="nav-dot-inner"></span>
            </button>
            <button class="nav-dot" :class="{ active: currentSection === 'contact' }" @click="scrollToSection(4)">
                <span class="nav-dot-inner"></span>
            </button>
        </nav>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import StreamTyping from '../components/StreamTyping.vue'
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
                console.log(streamText.value);
            }
        };
        mockStream();

        const images = ref([
            { path: new URL('../assets/1.png', import.meta.url).href, title: 'Project Alpha', description: 'A stunning visual project' },
            { path: new URL('../assets/2.png', import.meta.url).href, title: 'Project Beta', description: 'Creative design showcase' },
            { path: new URL('../assets/3.png', import.meta.url).href, title: 'Project Gamma', description: 'Innovative web experience' },
            { path: new URL('../assets/4.jpg', import.meta.url).href, title: 'Project Delta', description: 'Modern UI design' },
            { path: new URL('../assets/5.jpeg', import.meta.url).href, title: 'Project Epsilon', description: 'Interactive masterpiece' }
        ]);

        const projects = ref([
            {
                title: 'Digital Art Gallery',
                description: 'A virtual gallery showcasing digital art with immersive experiences',
                image: new URL('../assets/1.png', import.meta.url).href,
                tags: ['WebGL', 'Three.js', 'Vue.js']
            },
            {
                title: 'Interactive Dashboard',
                description: 'Real-time data visualization with beautiful animations',
                image: new URL('../assets/2.png', import.meta.url).href,
                tags: ['React', 'D3.js', 'Node.js']
            },
            {
                title: 'E-commerce Platform',
                description: 'Modern online shopping experience with advanced features',
                image: new URL('../assets/3.png', import.meta.url).href,
                tags: ['Vue.js', 'Express', 'MongoDB']
            }
        ]);

        const formData = ref({
            name: '',
            email: '',
            message: ''
        });

        const activeIndex = ref(0);
        const lightboxOpen = ref(false);
        const lightboxIndex = ref(0);
        const currentSection = ref('');

        // 将标题字符串转换为单个字母数组，用于动画显示
        const titleLetters = computed(() => 'CREATIVE'.split(''));

        /**
         * 打开图片灯箱
         * @param {number} index - 图片索引
         */
        const openLightbox = (index) => {
            // 设置当前显示的图片索引
            lightboxIndex.value = index;
            // 显示灯箱
            lightboxOpen.value = true;
            // 隐藏页面滚动条，防止灯箱打开时页面仍可滚动
            document.body.style.overflow = 'hidden';
        };

        /**
         * 关闭图片灯箱
         */
        const closeLightbox = () => {
            // 隐藏灯箱
            lightboxOpen.value = false;
            // 恢复页面滚动
            document.body.style.overflow = '';
        };

        /**
         * 处理表单提交
         */
        const handleSubmit = () => {
            // 显示提交成功提示
            alert('Message sent successfully!');
            // 重置表单数据
            formData.value = { name: '', email: '', message: '' };
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
        const sections = ['hero', 'gallery', 'about', 'projects', 'contact'];

        /**
         * 滚动到指定区块
         * @param {number} index - 目标区块索引
         */
        const scrollToSection = (index) => {
            // 如果正在滚动，直接返回
            if (isScrolling) return;
            // 边界检查：索引不能小于0或大于区块总数
            if (index < 0 || index >= sections.length) return;
            
            // 设置滚动状态为true
            isScrolling = true;
            // 更新当前页码
            currentPage = index;
            // 更新当前区块状态（用于导航点高亮）
            currentSection.value = sections[index];
            
            // 获取目标区块元素
            const element = document.getElementById(sections[index]);
            if (element) {
                // 平滑滚动到目标区块顶部
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // 滚动动画结束后，重置滚动状态（延迟2500ms确保动画完成）
            setTimeout(() => {
                isScrolling = false;
            }, 2500);
        };

        /**
         * 处理鼠标滚轮事件
         * @param {WheelEvent} e - 滚轮事件对象
         */
        const handleWheel = (e) => {
            // 阻止默认滚轮行为
            e.preventDefault();
            
            // 如果正在滚动，忽略新的滚轮事件
            if (isScrolling) return;
            
            // 根据滚轮方向判断上下滚动
            if (e.deltaY > 0) {
                // 向下滚动 - 下一页
                scrollToSection(currentPage + 1);
            } else {
                // 向上滚动 - 上一页
                scrollToSection(currentPage - 1);
            }
        };

        /**
         * 处理键盘事件
         * @param {KeyboardEvent} e - 键盘事件对象
         */
        const handleKeydown = (e) => {
            // 如果正在滚动，忽略键盘事件
            if (isScrolling) return;
            
            // 向下方向键或PageDown - 下一页
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                scrollToSection(currentPage + 1);
            } 
            // 向上方向键或PageUp - 上一页
            else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                scrollToSection(currentPage - 1);
            }
        };

        /**
         * 处理导航点点击事件
         * @param {number} index - 导航点对应的区块索引
         */
        const handleNavClick = (index) => {
            scrollToSection(index);
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
            // 创建粒子背景效果
            createParticles();
            
            // 延迟100ms后初始化滚动动画观察器
            // 确保DOM已完全渲染
            setTimeout(() => {
                initScrollAnimation();
            }, 100);
            
            // 设置初始当前区块为hero
            currentSection.value = 'hero';
            
            // 添加滚轮事件监听（passive: false表示需要阻止默认行为）
            window.addEventListener('wheel', handleWheel, { passive: false });
            // 添加键盘事件监听
            window.addEventListener('keydown', handleKeydown);
            // 添加鼠标移动事件监听（鼠标跟随效果）
            window.addEventListener('mousemove', handleMouseMove);
        });

        /**
         * 组件卸载时执行的清理操作
         */
        onUnmounted(() => {
            // 移除滚轮事件监听
            window.removeEventListener('wheel', handleWheel);
            // 移除键盘事件监听
            window.removeEventListener('keydown', handleKeydown);
            // 移除鼠标移动事件监听
            window.removeEventListener('mousemove', handleMouseMove);
            // 清理所有粒子元素
            particles.forEach(p => p.remove());
        });

        return {
            images,
            projects,
            formData,
            activeIndex,
            lightboxOpen,
            lightboxIndex,
            currentSection,
            titleLetters,
            streamText,
            openLightbox,
            closeLightbox,
            handleSubmit,
            scrollToSection
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

.scroll-hint {
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
}

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

.gallery-section {
    padding: 100px 50px;
    position: relative;
    z-index: 1;
    min-height: 100vh;
}

.gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1400px;
    margin: 0 auto;
}

.gallery-item {
    position: relative;
    cursor: pointer;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.6s ease;
}

.gallery-item.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.gallery-item:hover {
    transform: scale(1.02);
}

.image-wrapper {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: 10px;
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.gallery-item:hover .gallery-image {
    transform: scale(1.1);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    display: flex;
    align-items: flex-end;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
    opacity: 1;
}

.overlay-content h3 {
    font-size: 20px;
    margin-bottom: 5px;
    color: #00ffff;
}

.overlay-content p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
}

.image-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.gallery-item:hover .image-glow {
    opacity: 1;
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

.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fade-in 0.3s ease;
}

.lightbox-close {
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

.lightbox-close:hover {
    border-color: #00ffff;
    color: #00ffff;
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

.floating-nav {
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 25px;
    z-index: 100;
}

.nav-dot {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    padding: 0;
}

.nav-dot-inner {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
}

.nav-dot:hover {
    background: rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.5);
}

.nav-dot:hover .nav-dot-inner {
    background: #00ffff;
    transform: scale(1.2);
}

.nav-dot.active {
    background: rgba(0, 255, 255, 0.3);
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
}

.nav-dot.active .nav-dot-inner {
    background: #00ffff;
    transform: scale(1.5);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
}

@media (max-width: 768px) {
    .gallery-container,
    .projects-container {
        grid-template-columns: 1fr;
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
    
    .floating-nav {
        right: 15px;
    }
}
</style>