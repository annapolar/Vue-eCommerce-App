<template>
  <div>
    <NavBar/>
    <div class="container-fluid">
      <div class="row">
        <SideBar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

export default {
  components: {
    SideBar,
    NavBar
  }
};
</script>

<style>
</style>
