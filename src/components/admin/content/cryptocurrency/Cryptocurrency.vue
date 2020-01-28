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
                  <div class="card-header bg-info text-light">cryptocurrency</div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label for="Type">Type</label>
                          <select class="form-control" v-model="base">
                            <option value="BTC" selected>Bitcoin</option>
                            <option value="ETH">Ethereum</option>
                            <option value="LTC">Litecoin</option>
                            <option value="USDT">Tether</option>
                            <option value="BCH">Bitcoin Cash</option>
                            <option value="LBR">Libra</option>
                            <option value="XMR">Monero</option>
                            <option value="EOS">EOS</option>
                            <option value="BSV">Bitcoin SV</option>
                            <option value="BNB">Binance Coin</option>
                          </select>
                          <button @click="showChart()" class="btn btn-primary float-right">Go</button>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div ref="chart" class="chart"></div>
                      </div>
                    </div>
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

  console.log(this.$VueApexCharts)

  export default {
    components: {
      Navbar,
      Sidebar,
      Footer,
    },
    data: function () {
      return {
        base: 'BTC',
        dataChart: [],
      }
    },
    mounted: function () {
      this.showChart()
    },
    methods: {
      showChart: function () {
        // AXIOS
        /**
        this.$http.get('http://localhost:5000/currencies/cryptocurrency?base='+this.base).then(response => {
          let data = response.data.Data.Data
          data.forEach(item => {
            this.dataChart.push({
              'x': new Date(item.time),
              'y': [item.open, item.high, item.low, item.close]
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
              text: this.base+' to USD Charts',
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

          var chart = new ApexCharts(this.$refs.chart, options)  
          chart.render()
        }).catch(function (error) {
          console.log(error)
        })
        */  
      }
    }
  }

</script>

<style>
  #chart {
    max-width: 650px;
    margin: 35px auto;
  }

</style>
