<template>
 <div id="main" style="width: 600px; height: 400px;"></div>
</template>

<script>
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legendScroll')
  import moment from 'moment'
  import api from 'src/api'
  export default {
    data () {
      return {
        generateRandomNumbers (numbers, max, min) {
          var a = []
          for (var i = 0; i < numbers; i++) {
            a.push(Math.floor(Math.random() * (max - min + 1)) + max)
          }
          return a
        },
        equipActive: {},
        equipActives: {},
        equiponline: {},
        equiponlines: {},
        useronline: {},
        useronlines: {},
        index1: 3,
        index2: 3,
        index3: 3,
        mapNum: {},
        equipmentactiveChart: null,
        equipmentonlineChart: null,
        useronlineChart: null
      }
    },
    methods: {
      // 设备激活数init
      equipmentactiveinit () {
        this.equipmentactiveChart = echarts.init(document.getElementById('main'))
        this.equipmentactiveChart.setOption({
          title: {
            text: 'echarts测试'
          },
          legend: {
            data: ['设备激活量', '用户注册量'],
            right: 20
            // orient: 'vertical'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgrondColor: '#6a7985'
              }
            }
          },
          xAxis: {
            type: 'category',
            data: [ '衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子' ]
          },
          yAxis: {
            name: '数量'
          },
          series: [
            {
              name: '设备激活量',
              type: 'bar',
              data: [ 12, 7.8, 14.2, 6.2 ]
            }, {
              name: '用户注册量',
              type: 'bar',
              data: [45, 7.8, 14.2, 34],
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            }
          ],
          color: ['#2f70d0', '#dd4a38']
        })
      },
      // 设备在线init
      equipmentonlineinit () {
        this.equipmentonlineChart = echarts.init(document.getElementById('equipmentonline'))
        this.equipmentonlineChart.setOption({
          title: {
            text: '设备在线统计图'
          },
          legend: {
            data: ['设备离线', '设备在线'],
            right: 20
            // orient: 'vertical'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                backgrondColor: '#6a7985'
              }
            }
          },
          xAxis: {
            name: '日期',
            type: 'category',
            data: [ 12, 7.8, 14.2, 6.2 ],
            axisLabel: {
              rotate: 20
            }
          },
          yAxis: {
            name: '设备量'
          },
          series: [
            {
              name: '设备离线',
              type: 'line',
              data: [ 12, 7.8, 14.2, 6.2 ],
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            }, {
              name: '设备在线',
              type: 'line',
              data: [ 12, 7.8, 14.2, 6.2 ],
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            }
          ],
          color: ['#2f70d0', '#f39d12']
        })
      },
      // 用户在线init
      useronlineinit () {
        this.useronlineChart = echarts.init(document.getElementById('useronline'))
        this.useronlineChart.setOption({
          title: {
            text: '用户在线统计图',
            textStyle: {
              align: 'center'
            }
          },
          legend: {
            data: ['用户离线', '用户在线'],
            right: 20
            // orient: 'vertical'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgrondColor: '#6a7985'
              }
            }
          },
          xAxis: {
            name: '日期',
            type: 'category',
            data: [],
            axisLabel: {
              rotate: 20
            }
          },
          yAxis: {
            name: '用户量'
          },
          series: [
            {
              name: '用户离线',
              type: 'line',
              areaStyle: {normal: {}},
              data: [],
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            }, {
              name: '用户在线',
              type: 'line',
              areaStyle: {normal: {}},
              data: [],
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            }
          ],
          color: ['#18A05A', '#65B9E2']
        })
      },
      // 数据格式化
      splitData (rawData, first, secone) {
        var categoryData = []
        var firstpara = []
        var secondpara = []
        var data = {}
        if (rawData.length <= 0) {
          return {
            time: [],
            first: [],
            secone: []
          }
        }
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].time.substring(0, 10))
          firstpara.push(rawData[i][first])
          secondpara.push(rawData[i][secone])
        }
        this.$set(data, 'time', categoryData)
        this.$set(data, first, firstpara)
        this.$set(data, secone, secondpara)
        console.log(data)
        return data
      },
      // 获取四个数据
      getStateMent () {
        let self = this
        api.request('POST', '/api/v1/DeviceManagement/Device/getDashBoard').then(function (rsp) {
          if (rsp.data.code === 0) {
            self.mapNum = rsp.data.mapNum
          }
        })
      },
      // 设备激活
      equipmentactiveList () {
        this.equipmentactiveChart.showLoading()
        let self = this
        let todaydate = moment().subtract(60, 'days').format('YYYY-MM-DD')
        api.request('POST', '/api/v1/DeviceManagement/Device/getDeviceactivateNum', {'startTime': todaydate, 'type': 2}).then(function (rsp) {
          if (rsp.data.code === 0) {
            self.equipActive = self.splitData(rsp.data.activateAndUserList, 'deviceactivateNum', 'userNum')
            self.setSlist(self.equipActives, self.equipActive)
            self.equipmentactiveChart.hideLoading()
          }
          setTimeout(function () {
            self.recently('equipActive', 60, 1, 3)()
          }, 0)
        })
      },
      // 设备在线
      equipmentonlineList () {
        let self = this
        self.equipmentonlineChart.showLoading()
        let todaydate = moment().subtract(60, 'days').format('YYYY-MM-DD')
        api.request('POST', '/api/v1/DeviceManagement/Device/getDeviceOnlineNum', {'startTime': todaydate, 'type': 2}).then(function (rsp) {
          if (rsp.data.code === 0) {
            self.equiponline = self.splitData(rsp.data.deviceOnlineNumList, 'deviceOfflineNum', 'deviceOnlineNum')
            self.setSlist(self.equiponlines, self.equiponline)
            self.equipmentonlineChart.hideLoading()
          }
          setTimeout(function () {
            self.recently('equiponline', 60, 2, 3)()
          }, 0)
        })
      },
      // 用户在线
      useronlineList () {
        let self = this
        self.useronlineChart.showLoading()
        let todaydate = moment().subtract(60, 'days').format('YYYY-MM-DD')
        api.request('POST', '/api/v1/DeviceManagement/Device/getUserOnlineNum', {'startTime': todaydate, 'type': 2}).then(function (rsp) {
          if (rsp.data.code === 0) {
            self.useronline = self.splitData(rsp.data.deviceOnlineNumList, 'deviceOfflineNum', 'deviceOnlineNum')
            self.setSlist(self.useronlines, self.useronline)
            self.useronlineChart.hideLoading()
          }
          setTimeout(function () {
            console.log(self.useronlines)
            self.recently('useronline', 60, 3, 3)()
          }, 0)
        })
      },
      recently (hit, days, index, indexvalue) {
        this[`${hit}s`] = JSON.parse(JSON.stringify(this[hit]))
        this[`${hit}s`].time = this[`${hit}s`].time.splice(-days, days)
        if (hit === 'equipActive') {
          this[`${hit}s`].deviceactivateNum = this[`${hit}s`].deviceactivateNum.splice(-days, days)
          this[`${hit}s`].userNum = this[`${hit}s`].userNum.splice(-days, days)
        } else if (hit === 'equiponline') {
          this[`${hit}s`].deviceOfflineNum = this[`${hit}s`].deviceOfflineNum.splice(-days, days)
          this[`${hit}s`].deviceOnlineNum = this[`${hit}s`].deviceOnlineNum.splice(-days, days)
        } else if (hit === 'useronline') {
          this[`${hit}s`].deviceOfflineNum = this[`${hit}s`].deviceOfflineNum.splice(-days, days)
          this[`${hit}s`].deviceOnlineNum = this[`${hit}s`].deviceOnlineNum.splice(-days, days)
        }
        this[`index${index}`] = indexvalue
        console.log(this.useronlines)
      },
      setSlist (arr, arr1) {
        this[arr] = JSON.parse(JSON.stringify(arr1))
      }
    },
    computed: {
      coPilotNumbers () {
        return this.generateRandomNumbers(12, 1000000, 10000)
      },
      personalNumbers () {
        return this.generateRandomNumbers(12, 1000000, 10000)
      },
      isMobile () {
        return (window.innerWidth <= 800 && window.innerHeight <= 600)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getStateMent()
        this.equipmentactiveinit()
        this.equipmentonlineinit()
        this.useronlineinit()
        this.equipmentactiveList()
        this.equipmentonlineList()
        this.useronlineList()
      })
    },
    watch: {
      equipActives () {
        this.equipmentactiveChart.setOption({
          xAxis: {
            data: this.equipActives.time
          },
          series: [
            {
              name: '设备激活量',
              data: this.equipActives.deviceactivateNum
            }, {
              name: '用户注册量',
              data: this.equipActives.userNum
            }
          ]
        })
      },
      equiponlines () {
        this.equipmentonlineChart.setOption({
          xAxis: {
            data: this.equiponlines.time
          },
          series: [
            {
              name: '设备离线',
              data: this.equiponlines.deviceOfflineNum
            }, {
              name: '设备在线',
              data: this.equiponlines.deviceOnlineNum
            }
          ]
        })
      },
      useronlines () {
        this.useronlineChart.setOption({
          xAxis: {
            data: this.useronlines.time
          },
          series: [
            {
              name: '用户离线',
              data: this.useronlines.deviceOfflineNum
            }, {
              name: '用户在线',
              data: this.useronlines.deviceOnlineNum
            }
          ]
        })
      }
    }
  }
</script>
<style >
  .info-box {
    cursor: pointer;
  }
  .info-box-content {
    text-align: center;
    vertical-align: middle;
    display: inherit;
  }
  .fullCanvas {
    width: 100%;
  }
  #equipmentactive, #equipmentonline, #useronline {
    height: 300px;
  }
  .itempadding{
    padding: 0 10px;
  }
  .activefont{
    font-weight:bold;
  }
  .info-box-content  {
    height: 90px;
    line-height: 38px;
  }
  .dashbg-1{
    background-image:url('/static/img/home_img_thetotalnumberofdevices.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position:center;
  }
  .dashbg-2{
    background-image:url('/static/img/home_img_deviceactivationtotal.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position:center;
  }
  .dashbg-3{
    background-image:url('/static/img/home_img_totalnumberofusers.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position:center;
  }
  .dashbg-4{
    background-image:url('/static/img/home_img_todaysnew.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position:center;
  }
</style>
