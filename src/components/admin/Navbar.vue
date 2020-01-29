<template>
  <div>
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item">
          <button 
            class="btn btn-primary"
            v-on:click='refreshToken'>
            Refresh Token
          </button>
        </li>
      </ul>

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" title="Sign Out" v-on:click="logout">
            <i class="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->
  </div>
</template>

<script>
  export default {
    methods: {
      logout: function() {
        this.$store.dispatch('logout')
      },
      refreshToken() {
        this.$store.dispatch('refreshToken')
      } 
    }
  }

</script>

<style>

</style>
