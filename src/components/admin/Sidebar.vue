<template>
  <div>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="index3.html" class="brand-link">
        <img src="../../assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
          style="opacity: .8">
        <span class="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src="../../assets/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <a href="#" class="d-block">Alexander Pierce</a>
          </div>
        </div>

        <!-- 
          Sidebar Menu 
        -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
              <li class="nav-item" v-for="navLink in navLinks" :key="navLink.path">
                <router-link :to="navLink.path" :class="[currentPage.includes(navLink.path) ? activeClass : '', 'nav-link']">
                  <p>{{ navLink.title }}</p>
                </router-link>
              </li>

          </ul>
        </nav>
        <!-- 
          /sidebar-menu 
        -->

      </div>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>

<script>
  export default {
    data : function() {
      return{
        navLinks: [
          {path: "/admin/coindesk", title: "Coindesk"},
          {path: "/admin/cryptocurrency", title: "Cryptocurrency"},
          {path: "/admin/index_price", title: "IndexPrice"},
          {path: "/admin/yahoo_finance", title: "YahooFinance"}
        ],
        activeClass: 'active'
      }
    },
    computed: {
      currentPage: function() {
        return this.$route.path
      }
    }
  }

</script>

<style>
</style>
