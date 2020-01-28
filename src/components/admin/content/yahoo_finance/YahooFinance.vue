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
                  <div class="card-header bg-info text-light">Yahoo Finance</div>
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
    data: function() {
      return {
        dataChart: []
      }
    },
    mounted: function() {
      this.showChart()
    },
    methods: {
      showChart: function() {
        this.$http.get('http://localhost:5000/currencies/yahoo_finance').then(response => {
          let timestamp = response.data.chart.result[0].timestamp
          let responseDataChart = response.data.chart.result[0].indicators.quote[0]
          timestamp.forEach((item, i) => {
            this.dataChart.push({
              'x': new Date(item),
              'y': [responseDataChart.open[i], responseDataChart.high[i], responseDataChart.low[i], responseDataChart.close[i]]
            })
          })

          // CHART 
          let options = {
            series: [{
              data: this.dataChart
            }],
            chart: {
              type: 'candlestick',
              height: 350
            },
            title: {
              text: 'BBCA',
              align: 'left'
            },
            xaxis: {
              type: 'datetime',
              axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                height: 6,
                offsetX: 0,
                offsetY: 0
              },
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
