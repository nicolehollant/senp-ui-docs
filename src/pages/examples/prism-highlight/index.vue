<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'bg-black/20 backdrop-blur shadow border-b !px-6 border-neutral-800',
      },
      content: {
        base: 'relative z-10 flex flex-col gap-8 h-full px-6 pt-6 overflow-auto',
      },
      wrapper: {
        extend: '!overflow-hidden',
      },
      footer: {
        base: 'hidden',
      },
    }"
  >
    <template #header>
      <h1 class="text-2xl">Prism Highlight Demo</h1>
      <NuxtLink to="/"><Icon name="mdi:home"></Icon></NuxtLink>
    </template>
    <template #content>
      <div class="flex gap-2">
        <SenpButton @click="() => (mode = 'ts')">TS</SenpButton>
        <SenpButton @click="() => (mode = 'js')">JSON</SenpButton>
      </div>
      <SenpHljsHighlight
        v-if="mode === 'ts'"
        title="SampleTS.ts"
        theme="atom-dark"
        class="bg-black/20 h-max"
        language="javascript"
        :value="tsValue"
      ></SenpHljsHighlight>
      <SenpHljsHighlight
        v-else-if="mode === 'js'"
        title="SampleTS.ts"
        theme="atom-dark"
        class="bg-black/20 h-max"
        language="javascript"
        :value="jsValue"
      ></SenpHljsHighlight>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
const mode = ref('ts')
const tsValue = `const tsValue = [
  {
    status: 'In Progress',
    created: '2023-01-11T22:39:16.743Z',
    assigned: 'Bessie Hayes',
    description:
      'Dignissimos atque distinctio blanditiis. Nesciunt sit molestias atque quis exercitationem. Et excepturi assumenda nisi voluptates occaecati veritatis eligendi in cum.',
  }
]`
const jsValue = `const jsonValue = [
  {
    status: 'In Progress',
    created: '2023-01-11T22:39:16.743Z',
    assigned: 'Bessie Hayes',
    description:
      'Dignissimos atque distinctio blanditiis. Nesciunt sit molestias atque quis exercitationem. Et excepturi assumenda nisi voluptates occaecati veritatis eligendi in cum.',
  }
]`
</script>
