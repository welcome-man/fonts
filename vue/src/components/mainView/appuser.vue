
<template>
<div v-cloak>
  <!-- <button class="btn btn-primary" @click="open">Open sesame!</button> -->
  <div v-show="showList">
    <!-- table -->
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <el-button type="primary" @click="add"><i class="fa fa-plus"></i>&nbsp;新增</el-button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">
                  </div>
                </div>
              </div>
                <el-table :data="tableList" border style="width: 100%">
                                  <el-table-column prop="username" label="用户账号" width="100"></el-table-column>
                                  <el-table-column prop="roleName" label="用户类型" width="120"></el-table-column>
                                  <el-table-column prop="account" label="用户名称" width="100"></el-table-column>
                                  <el-table-column prop="phone" label="手机号" ></el-table-column>
                                  <el-table-column prop="telephone" label="联系电话" ></el-table-column>
                                  <el-table-column prop="email" label="邮箱" ></el-table-column>
                                  <el-table-column prop="sex" label="性别"width="80" ></el-table-column>
                                  <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                                  <el-table-column  label="操作"width="220">
                  <template scope="scope">
                    <el-button @click.native="update(scope)" size="small">
                     	编辑
                    </el-button>
                    <el-button @click.native.prevent="del(scope.$index, scope.row.userId)" type="danger" size="small">
                    	  删除
                    </el-button>
                    <el-button @click.native.prevent="role(scope.$index, scope.row.userId)" type="success" size="small">
                      角色选择
                    </el-button>
                  </template>
                </el-table-column>
                </el-table>
                <el-col class="toolbar" style="padding:10px;">
                <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                :page-sizes="pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalSize" style="float:right">
                </el-pagination> </el-col>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /角色选择 -->
  <div class="title-role">
  <el-dialog title="角色选择" :visible.sync="dialogRoleVisible" class="rolejs">
    <el-form ref="roleUser" :model="roleUser" :rules="Rolerules" label-width="80px">
      <el-form-item label="用户类型">
        <el-select v-model="roleUser.roleId" placeholder="请选择角色类型" class="setWidth" >
          <el-option v-for="item in rolelist" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
        </el-select>

      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitRole('roleUser')">确定</el-button>
        <el-button @click="dialogRoleVisible=false">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>

  <!-- /新增用户 -->
  <div class="title-user">
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
    <el-form ref="appUser" :model="appUser" :rules="rules" label-width="80px">
      <el-form-item label="用户账号">
        <el-input type="text" v-model="appUser.username" placeholder="用户账号" class="setWidth" ></el-input>
      </el-form-item>

      <el-form-item label="用户密码">
        <el-input type="password" v-model="appUser.password" placeholder="用户密码" class="setWidth"></el-input>
      </el-form-item>

      <el-form-item label="用户名称">
        <el-input type="text" v-model="appUser.account" placeholder="用户名称" class="setWidth"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input type="text" v-model="appUser.phone" placeholder="手机号" class="setWidth"></el-input>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input type="text" v-model="appUser.telephone" placeholder="联系电话" class="setWidth"></el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input type="text" v-model="appUser.email" placeholder="邮箱" class="setWidth"></el-input>
      </el-form-item>

      <el-form-item label="用户状态" prop="status">
        <el-switch v-model="userState" on-color="#13ce66" off-color="#ff4949" @change="stateChanged">
        </el-switch>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio class="radio" v-model="appUser.sex" label="1" style="margin-top: -10px">男</el-radio>
        <el-radio class="radio" v-model="appUser.sex" label="2">女</el-radio>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="text" v-model="appUser.remark" placeholder="备注" class="setWidth"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"  @click="saveUser()">确定</el-button>
        <el-button @click="dialogFormVisible=false">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>

    <!-- /修改用户 -->
    <div class="title-update">
      <el-dialog title="修改用户" :visible.sync="dialogUpdateVisible">
        <el-form ref="appUserUpdate" :model="appUserUpdate" :rules="Updaterules" label-width="80px">
          <el-form-item label="用户账号">
            <el-input type="text" v-model="appUserUpdate.username" placeholder="用户账号" class="setWidth" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="用户名称">
            <el-input type="text" v-model="appUserUpdate.account" placeholder="用户名称" class="setWidth" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="用户密码">
            <el-input type="password" v-model="appUserUpdate.password" placeholder="用户密码" class="setWidth"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input type="text" v-model="appUserUpdate.phone" placeholder="手机号" class="setWidth"></el-input>
          </el-form-item>

          <el-form-item label="联系电话">
            <el-input type="text" v-model="appUserUpdate.telephone" placeholder="联系电话" class="setWidth"></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input type="text" v-model="appUserUpdate.email" placeholder="邮箱" class="setWidth"></el-input>
          </el-form-item>

          <el-form-item label="用户状态" prop="status">
            <el-switch v-model="userState" on-color="#13ce66" off-color="#ff4949" @change="updateChanged">
            </el-switch>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio class="radio" v-model="appUserUpdate.sex" label="1" style="margin-top: -10px">男</el-radio>
            <el-radio class="radio" v-model="appUserUpdate.sex" label="2">女</el-radio>
          </el-form-item>

          <el-form-item label="备注">
            <el-input type="text" v-model="appUserUpdate.remark" placeholder="备注" class="setWidth"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"  @click="updateUser()">确定</el-button>
            <el-button @click="updateVisible()">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
</div>
</div>
</template>
<script>
import 'element-ui/lib/theme-default/index.css'
import api from '../../api'
import config from '../../config'

export default {
  name: 'appUser',
  data () {
    return {
      showList: true,
      title: null,
      appUser: {},
      tableList: [{}],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 30, 50, 100],
      totalSize: 1,
      dialogFormVisible: false,
      sex: '1',
      userState: false,
      roleUser: {
        roleId: '',
        userId: ''
      },
      appUserUpdate: {
        username: '',
        password: '',
        account: '',
        phone: '',
        telephone: '',
        email: '',
        status: '',
        remark: ''
      },
      dialogRoleVisible: false,
      disabled: false,
      dialogUpdateVisible: false
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    getTableList () {
      var _this = this
      // this.listLoading = true
      var data = {'currentPage': _this.currentPage, 'pageSize': _this.pageSize}
      api.request('POST', '/api/sys/user/list', data).then(function (rsp) {
        if (rsp.data.code === 0) {
          _this.tableList = rsp.data.page.list[0]
          _this.rolelist = rsp.data.page.list[1]
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
    stateChanged (userState) {
      console.log(userState)
      this.appUser.status = (userState === true) ? 1 : 0
    },
    updateChanged (userState) {
      console.log(userState)
      this.appUserUpdate.status = (userState === true) ? 1 : 0
    },
    updateVisible () {
      var _this = this
      _this.dialogUpdateVisible = false
      _this.getTableList()
    },
    add () {
      var _this = this
      _this.dialogFormVisible = true
      _this.appUser = {}
    },
    role (index, user) {
      var _this = this
      _this.roleUser.userId = user
      _this.dialogRoleVisible = true
    },
    update (scope) {
      var _this = this
      _this.dialogUpdateVisible = true
      _this.appUserUpdate = scope.row
    },
    saveUser (event) {
      var _this = this
      api.request('POST', '/api/sys/user/save', _this.appUser).then(function (rsp) {
        _this.appUser = {}
        if (rsp.data.code === 0) {
          console.log(rsp)
          _this.getTableList()
          _this.dialogFormVisible = false
        } else {
          _this.$message.error(rsp.data.message)
        }
      }).catch(error => {
        console.log('error:' + error)
      })
    },
    updateUser () {
      var _this = this
      api.request('POST', '/api/sys/user/update', _this.appUserUpdate).then(function (rsp) {
        if (rsp.data.code === 0) {
          console.log(rsp)
          _this.getTableList()
          _this.dialogUpdateVisible = false
          _this.$message('更新成功')
        } else {
          console.log(rsp.data.message)
        }
      }).catch(error => {
        console.log('error:' + error)
      })
    },
    del (index, event) {
      var id = event
      if (id == null) {
        return
      }
      var _this = this
      var delId = [id]
      window.confirm('确定要删除选中的记录？', function () {
        api.request('POST', '/api/sys/user/delete', delId).then(function (rsp) {
          if (rsp.data.code === 0) {
            console.log(rsp)
            _this.getTableList()
            _this.reload()
            _this.$message('删除成功')
          } else {
            window.alert('用户类型没有选择，删除失败')
          }
        }).catch(error => {
          console.log('error:' + error)
        })
      })
    },
    reload: function (event) {
      this.showList = true
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
    submitRole () {
      var _this = this
      api.request('POST', '/api/sys/user/saverole', _this.roleUser).then(function (rsp) {
        if (rsp.data.code === 0) {
          _this.dialogRoleVisible = false
          _this.getTableList()
        } else {
          _this.dialogRoleVisible = false
          _this.$message.error(rsp.data.message)
          _this.disabled = true
        }
      }).catch(error => {
        console.log('error:' + error)
      })
    },
    //  验证表单规则
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOrUpdate()
        } else {
          return false
        }
      })
    },
    isPermission (state) {
      return api.hasPermission(state)
    }
  }
}
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

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
