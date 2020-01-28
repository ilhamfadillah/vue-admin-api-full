<template>
  <div class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <Navbar />
      <Sidebar />

      <div class="content-wrapper">
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header bg-info text-light">Index Price</div>
                  <div class="card-body">
                    <div ref="chart" class="chart"></div>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/admin/Navbar'
  import Sidebar from '@/components/admin/Sidebar'
  import Footer from '@/components/admin/Footer'
  import ApexCharts from "apexcharts"

  export default {
    components: {
      Navbar,
      Sidebar,
      Footer,
    },
    data: function () {
      return {
        dataChart: []
      }
    },
    mounted: function () {
      this.showChart()
    },
    methods: {
      showChart: function () {
        // AXIOS
        this.$http.get('http://localhost:5000/currencies/index_price').then(response => {
          let data = response.data.data
          data.forEach(item => {
            this.dataChart.push({
              'x': new Date(item[0]),
              'y': item[1]
            })
          })

          // CHART 
          let options = {
            series: [{
              data: this.dataChart
            }],
            chart: {
              type: 'line',
              height: 350
            },
            colors: ['#546E7A'],
            stroke: {
              width: 3
            },
            title: {
              text: response.data.name,
              align: 'left'
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            }
          };
          if (this.$refs.chart) {
            // HTML element exists
            new ApexCharts(this.$refs.chart, options).render();
          }
        }).catch(function (error) {
          console.log(error)
        })  
      }
    }
  }

</script>
