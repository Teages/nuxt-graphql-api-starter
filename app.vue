<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full">
    <!-- Layout -->
    <div class="min-h-screen flex flex-col items-center mx-auto overflow-auto">
      <div class="w-full z-10">
        <!-- NavBar -->
        <NavBar />
      </div>
      <div class="flex-1 w-full max-w-screen-2xl flex justify-center items-center">
        <div class="my-4 mx-4 lg:mx-12">
          <!-- Main Content -->
          <NuxtPage />
        </div>
      </div>
      <div class="w-full">
        <!-- Footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>
