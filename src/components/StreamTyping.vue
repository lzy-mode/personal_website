<template>
  <div class="stream-typing">
    <span>{{ displayText }}</span>
    <span v-if="cursor" class="cursor">|</span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  text: { type: String, default: "" },          // 完整文本（打字机模式）
  stream: { type: String, default: "" },        // 流式追加内容
  speed: { type: Number, default: 30 },         // 打字速度(ms/字)
  mode: { type: String, default: "type" },      // type | stream
  cursor: { type: Boolean, default: true }
});

const displayText = ref("");
let queue = [];
let typing = false;

/**
 * 打字机逐字输出
 */
const typeWriter = async () => {
  if (typing) return;
  typing = true;

  while (queue.length > 0) {
    const char = queue.shift();
    displayText.value += char;
    await new Promise(r => setTimeout(r, props.speed));
  }

  typing = false;
};

/**
 * 监听完整文本（type模式）
 */
watch(
  () => props.text,
  (val) => {
    if (props.mode !== "type") return;
    queue = val.split("");
    displayText.value = "";
    typeWriter();
  },
  { immediate: true }
);

/**
 * 监听流式输入（stream模式）
 */
let lastIndex = 0;

watch(
  () => props.stream,
  (val, oldVal) => {
    if (props.mode !== "stream") return;
    const newPart = val.slice(lastIndex);
    lastIndex = val.length;
    if (!newPart) return;
    queue.push(...newPart.split(""));
    typeWriter();
  },
  { immediate: true }
);

onMounted(() => {
  if (props.mode === "type" && props.text) {
    queue = props.text.split("");
    typeWriter();
  }
});
</script>

<style scoped>
.stream-typing {
  font-family: monospace;
  white-space: pre-wrap;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
</style>