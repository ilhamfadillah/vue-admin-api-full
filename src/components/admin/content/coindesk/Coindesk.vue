<template>
  <div class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <Navbar />
      <Sidebar />
      <!-- CONTENT -->
      <div class="content-wrapper">
        <section class="content">
          <div class="container-fluid">
            <!-- Small boxes (Stat box) -->
            <div class="row">
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>150</h3>

                    <p>New Orders</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-bag"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>53<sup style="font-size: 20px">%</sup></h3>

                    <p>Bounce Rate</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>44</h3>

                    <p>User Registrations</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-person-add"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>65</h3>

                    <p>Unique Visitors</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
            </div>
            <!-- /.row -->
            <!-- Main row -->
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header bg-info text-light">
                    <div class="float-left font-weight-bold">
                      TITLE
                    </div>
                    <div class="float-right">
                      Date : {{ currencyDate }}
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-6">
                        <label>Base</label> 
                        <input type="text" class="form-control uppercase" v-model="base" v-on:keyup.enter="getCurrencies">
                      </div>

                      <div class="col-sm-12 mt-3" v-if='currencyError === ""'>
                        <ul v-for="(value, name) in currencyRates" :key="name">
                          <li>Currency: {{ name }}</li>
                          <li>Rate: {{ value }}</li>
                        </ul>
                      </div>

                      <div class="col-sm-12 mt-3 text-center font-weight-bold" v-if='currencyError !== ""'>
                        {{ currencyError }}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.row (main row) -->
          </div><!-- /.container-fluid -->
        </section>
      </div>
      <!-- /CONTENT -->
      <Footer />
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/admin/Navbar'
  import Sidebar from '@/components/admin/Sidebar'
  import Footer from '@/components/admin/Footer'

  export default {
    components: {
      Navbar,
      Sidebar,
      Footer
    },
    data() {
      return {
        currencyRates: '',
        currencyBase: '',
        currencyDate: '',
        currencyError: '',
        base: 'USD'
      }
    },
    mounted: function() {
      this.getCurrencies()
    },
    methods: {
      getCurrencies: function() {
        const vm = this

        this.$http.get('http://localhost:5000/currencies/?base='+this.base.toUpperCase()).then(response => {
        this.currencyRates = response.data.rates
        this.currencyBase = response.data['base']
        this.currencyDate = response.data['date']
        if(response.data['error']){
          this.currencyError = response.data['error']
        }
        }).catch(function (error) {
          if(error.response.status == 401) {
            vm.$store.dispatch('refreshToken')
          }
        })
      }
    }
  }

</script>

<style>
.uppercase{
  text-transform: uppercase;
}
</style>
