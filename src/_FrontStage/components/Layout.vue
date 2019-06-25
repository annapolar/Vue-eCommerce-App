<template>
  <div>
    <LayoutHeader/>
    <main>
      <router-view/>
    </main>
    <LayoutFooter/>
  </div>
</template>

<script>
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";

export default {
  components: {
    LayoutHeader,
    LayoutFooter
  }
};
</script>

<style>
</style>
