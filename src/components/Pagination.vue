<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPrev">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in total_pages"
        :key="page"
        :class="{'active': current_page === page}"
      >
        <a class="page-link" href="#" @click.prevent="getPage(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{'disabled': !has_next}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="getNext">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total_pages: { type: Number, default: 0 },
    current_page: { type: Number, default: undefined },
    has_pre: { type: Boolean, default: true },
    has_next: { type: Boolean, default: true }
  },
  methods: {
    getPrev() {
      this.$emit("getPrev");
    },
    getNext() {
      this.$emit("getNext");
    },
    getPage(page) {
      this.$emit("getPage", page);
    }
  }
};
</script>

<style>
</style>

