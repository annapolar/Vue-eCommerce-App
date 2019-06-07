<template>
  <div>
    <NavBar/>
    <AlertMessage/>
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
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import AlertMessage from "./AlertMessage";

export default {
  components: {
    SideBar,
    NavBar,
    AlertMessage
  }
};
</script>

<style>
</style>
