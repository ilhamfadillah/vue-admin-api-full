<template>
  <div class="hold-transition sidebar-mini layout-fixed">
      <div class="wrapper">
        <Navbar />
        <Sidebar />
        <Content />
        <Footer />
      </div>
  </div>
</template>

<script>


import Navbar from '@components/admin/Navbar'
import Sidebar from '@components/admin/Sidebar'
import Content from '@components/admin/Content'
import Footer from '@components/adminFooter'

export default {
    components:{
        Navbar,
        Sidebar,
        Content,
        Footer
    }
}
</script>

<style>

</style>
