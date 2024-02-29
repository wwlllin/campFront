<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      VCard.article-card(hover)
        VImg(:src="image[0]" height="200" cover)
        VCardTitle
          RouterLink.text-primary.text-decoration-none(:to="'/articles/' + _id") {{ title }}
        VCardSubtitle {{ category }}
        VCardSubtitle {{ createdAt }}
</template>

<script setup>

const props = defineProps(['_id', 'content', 'image', 'title', 'release', 'category', 'createdAt'])

</script>
