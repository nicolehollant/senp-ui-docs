<template>
  <header
    class="sticky w-full top-0 text-2xl bg-black/70 bg-gradient-to-r from-black/50 to-neutral-900/50 backdrop-blur z-40"
  >
    <div
      class="flex items-center justify-between p-4 px-4 sm:px-6 lg:px-8 font-medium gap-3 max-w-7xl m-auto border-b border-neutral-700"
    >
      <div class="flex items-center gap-3">
        <p class="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-teal-700 text-4xl">🎨</p>
        <p>SenpUI</p>
      </div>
      <button @click="() => (state.navOpen = true)" class="flex items-center lg:hidden">
        <Icon name="mdi:menu"></Icon>
      </button>
    </div>
  </header>
  <div class="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="p-4 hidden w-64 shrink-0 lg:block lg:pr-8">
      <aside class="sticky top-[120px]">
        <nav>
          <li v-for="page in data" :key="page._id">
            <NuxtLink :to="page._path" active-class="text-sky-400">{{ page.title }}</NuxtLink>
          </li>
        </nav>
      </aside>
    </div>
    <main class="pt-10 w-full">
      <article
        class="prose max-w-4xl prose-sm sm:prose-base prose-invert p-4 prose-pre:bg-slate-800/60 prose-a:prose-headings:no-underline"
      >
        <ContentDoc />
      </article>
    </main>
  </div>
  <SenpDrawer
    :classes="{
      maxSize: { base: 'w-full max-h-full max-w-[min(95vw,448px)] md:max-w-md h-full' },
    }"
    side="left"
    v-model:open="state.navOpen"
    class="lg:hidden"
    title="SenpUI Docs"
    ><aside class="sticky top-[120px]">
      <nav class="space-y-2">
        <li v-for="page in data" :key="page._id" class="list-none">
          <NuxtLink :to="page._path" active-class="text-sky-400 text-lg">{{ page.title }}</NuxtLink>
        </li>
      </nav>
    </aside>
  </SenpDrawer>
</template>

<script setup lang="ts">
const populateNav = async () => {
  const results = await queryContent('/docs').find()
  return results
}

const state = reactive({
  navOpen: false,
})

const { data } = await useAsyncData('docs', () => populateNav())
</script>
