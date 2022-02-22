<script>
  // These props get filled in from the page's front matter
  export let title
  export let date
  export let image
  export let video

  date = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  {#if image}
    <meta property="og:image" content={image.fileName} />
  {/if}
</svelte:head>

<article class="relative w-full md:w-[740px] text-white my-16 px-4">
  <h1 class="text-4xl text-blue-400 my-3 font-bold">
    {title}
  </h1>
  <small class="text-gray-400 font-semibold">
    {date}
  </small>
  {#if image}
    <div class="flex flex-col my-8">
      <img
        src={'../images/' + image.fileName}
        alt={image.alt}
        class="w-full h-80 object-contain"
      />
    </div>
  {/if}
  <div
    class="md text-xl my-8 leading-8 shadow-inner overflow-hidden transition-all duration-200 ease-linear"
  >
    <slot />
  </div>
  {#if video}
    <iframe
      {title}
      src={video}
      class="w-full h-80"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
  {/if}
  <div class="w-3/4 h-0.5 rounded-full bg-white opacity-10 mt-16 m-auto" />
</article>
