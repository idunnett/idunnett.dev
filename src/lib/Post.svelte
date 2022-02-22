<script lang="ts">
  import { onMount } from 'svelte'

  export let html: string
  export let path: string

  let div: HTMLDivElement
  let collapsed: boolean = true
  let mdHeight: number
  onMount(() => {
    mdHeight = div.querySelector('article').clientHeight

    const h1 = div.querySelector('h1')
    h1.classList.add('hover:text-blue-300')
    const a = document.createElement('a')
    a.href = path
    h1.parentNode.insertBefore(a, h1)
    a.appendChild(h1)
  })
</script>

<div class="relative overflow-hidden" bind:this={div} class:collapsed>
  {@html html}
  {#if collapsed && mdHeight && mdHeight >= 1000}
    <div
      class="absolute bottom-0 w-full left-0 flex justify-center items-center bg-gradient-to-b from-transparent h-64 to-gray-900"
    >
      <button
        on:click={() => (collapsed = false)}
        class="bg-blue-400 translate-y-20 py-1 px-2 rounded-md"
      >
        Show more
      </button>
    </div>
  {/if}
</div>

<style>
  .collapsed {
    max-height: 1000px;
  }
</style>
