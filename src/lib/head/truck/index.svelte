<script lang="ts">
  import { onMount } from 'svelte'

  import initTruck from './renderTruck'
  let sceneDiv: HTMLDivElement
  onMount(() => {
    initTruck(sceneDiv)
  })
</script>

<div
  id="scene"
  bind:this={sceneDiv}
  class="w-full lg:w-2/3 max-h-[500px] md:max-h-[750px] xl:max-h-screen h-full tall:bg-[bottom_-2rem_left_-20rem] bg-[bottom_-8rem_left_-20rem] bg-red-500 pointer-events-none lg:pointer-events-auto"
/>
