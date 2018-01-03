<template>
  <div v-cloak>
       <div     style="margin-top: 37px; margin-right: 12px;">
	   <el-upload
          class="upload-demo"
          action="/user_book/api/v1/video/upload"
          ref="fileup">
          <el-button v-show="!disabledsure" size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
		   </div>
	<div>
	
		<video  style="height:300px" src="http://pcdownyd.titan.mgtv.com/c1/2016/11/10_0/E301B2F2CE4268A298724C7A190376DD_20161110_1_1_435.mp4?arange=0&pm=mU6kRYa3dkfu9UH8V~RTUXQl84LYG70LB7084FJZwUxsd_Dny_0~a1_48SBdPzK5rFfY_ikmU8WSWcKTSQD5Dw9ggR8qvW1Du0Mgs594MRXsuMPS~AnXcb_vhI~JDoc1Xa601hgqitSjVLxRvo2ZX7x7lnHc6Bd7PkBkkkdF7wANcax4pf8NO_cVtlVTPLf9EM~X8c~peptO6ebLsPv195cMwvGXse~E4FeG4OGhOxv1G9sxx45YeU5CBYeH9swJaVkSPanLF_fTMlceDBQjYwtkiqIIfI4OK9ngdoMzzhrO9NqLLFMyjKOvEPzaoXMfdwFELW0_Bw1EzPt~SVfwKFOITt4sI4OwpNLtDWHtdca5C7LwkmVAAZ3I8f2_wC9XXnRemly0ehbNvyliy5BnIQ--"  autoplay="" controls="controls"></video>

		<video  style="height:300px;;float: right; " src="http://pcdownyd.titan.mgtv.com/mp4/2016/dianying/yxbs2_23385/255408BED5927CE30F20EDEF33DC7828_20160729_1_1_718.mp4?arange=0&pm=nZL7~x_KABSIhBoUqppaVRw97NNNWrfqUGPTOcOpqp4sFAl5JIWIoAZDKdoT3XVvlHvs00Zu36fAE~ZwXpJhufOxa4ELyszAjEjiFKOn7DWEn5XluHVVl~lYLujjnFDy97~acbQd95QKmsovtU_WaZar2UaveKY_VObmAjz32AwKRXM7wSfK~C0pI16xxdZA_fulPr3nWUyI9yLBuY8qBS7ciVkN0gMZckBw7dY6VYw8sM3jBO4ul8jWi37vRJ~OX3xUDjhev3waD0Z6k5qNuTCyGV03V_uGtXQUxDLgoqm_N70r8ogQDmFBxDDKe8tOR~laMzOVSvg3DiqPtX1gZ3sS4kOHyLEdlt8w8rUpUR4P4_ET0b80mfZ79kv3t3XZeAbFjldTuvJRpmoARd5_eg--"     controls="controls"></video>
	</div>
	<div>
	<video  style="height:300px" src="http://pcdownyd.titan.mgtv.com/c1/2017/12/11_0/D12213C466B555496B77BF28BDF79B6C_20171211_1_1_841.mp4?arange=0&pm=P7kgg1d0HxT7LLK74PD7YkJlceFp06D~0WLBGKA9A7Zdm5CpFlsZ5gYnM5dqzNWYX1BqXRwblnsj3IFUdQhN7qzscrPSmDt8YUiNE1GQx2HmvRxguyE8s37y2_cOSYXS_6b~x67oCOgE06jd~~3OquE3k5vg0yNgoruHPRSPUDICvsmULV8~FS_zYfBgQ06MOmwJSB1OWV9gX~E8RyVxMzk0bAdZzToYfySRWnXKUXWj~sd5ux305ALrIgF3I_dj8zCGpQWSD0ZAvJTn9kCWEF3YHo9VpDc4B5cW7KVvqyWWpb4d50OQeHjhJSdbG58jy7cSHrtjX6MzB31aINIEMzOXqf8Jyv7nPNRu6k4I6GDzcUTMpTt4~Ain4Pta_an597s5ZB6FV0xpD19m1WfFZA--"   controls="controls"></video>
	<video style="height:300px; float: right;"  src="http://47.100.5.85:8080/user_book/video/1945323_VJshi_1ddbedd825be239ee5ff696eff3f3fec.mp4"  autoplay=""  controls="controls"></video>
     </div>

	  <!-- <el-button type="button" style="text-align: center;" onclick="launchFullScreen(document.getElementById('video'))">全屏</el-button>-->
  </div>
</template>
<script>
  import 'element-ui/lib/theme-default/index.css'
  import api from '../../api'
  import config from '../../config'

  export default {
    name: 'generator',
    data () {
      return {
        showList: true,
        generator: {},
        tableList: [{}],
        tableNames: [],
        tables: '',
        file: '',
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 30, 50, 100],
        totalSize: 1,
        searchCaseKeywords: ''
      }
    },
    created () {
      this.getTableList()
    },
    methods: {
      searchCase () {
        this.getTableList()
      },
      getTableList () {
        var _this = this
        // this.listLoading = true
        var data = {
          'currentPage': _this.currentPage,
          'pageSize': _this.pageSize,
          'tableName': _this.searchCaseKeywords
        }
        api.request('POST', '/sys/generator/list', data).then(function (rsp) {
          if (rsp.data.code === 0) {
            _this.tableList = rsp.data.page.list
            _this.totalSize = rsp.data.page.totalCount
          } else {
            // this.listLoading = false
          }
        }).catch(error => {
          console.log('error:' + error)
        })
      },
      handleSizeChange (pageSize) {
        this.pageSize = pageSize
        this.getTableList()
      },
      handleCurrentChange (currentPage) {
        this.currentPage = currentPage
        this.getTableList()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
        console.log(val)
      },
      saveCode (rows) {
        var tableList = []
        for (var i = 0; i < this.multipleSelection.length; i++) {
          tableList.push(this.multipleSelection[i].tableName)
          var tableNames = tableList
          if (tableNames == null) {
            return
          }
        }
        window.location.href = 'http://192.168.1.21:8070/user_book/sys/generator/code?tables=' + JSON.stringify(tableNames)
//        window.location.href = 'http://192.168.1.21:8070/user_book/sys/generator/code'
//        this.$message('代码生成成功')
      },
      getInfo (userId) {
        var _this = this
        _this.appUser = {}
        api.request('POST', '/api/sys/user/info' + userId, null, config.contentFromUrlEncode).then(function (rsp) {
          if (rsp.data.code === 0) {
            _this.showList = false
            _this.appUser = rsp.data.appUser
          } else {
            console.log(rsp.data.message)
          }
        }).catch(error => {
          console.log('error:' + error)
        })
      },
      isPermission (state) {
        return api.hasPermission(state)
      }
    }
  }
</script>

<style>
  table.dataTable thead .sorting:after,
  table.dataTable thead .sorting_asc:after,
  table.dataTable thead .sorting_desc:after {
    font-family: 'FontAwesome';
  }

  table.dataTable thead .sorting:after {
    content: "\f0dc";
  }

  table.dataTable thead .sorting_asc:after {
    content: "\f0dd";
  }

  table.dataTable thead .sorting_desc:after {
    content: "\f0de";
  }
  .form-horizontal{
    margin-top: 20px;
    width: 50%;
  }
  .rolejs{
    width: 1000px;
    margin:auto;
  }
</style>
