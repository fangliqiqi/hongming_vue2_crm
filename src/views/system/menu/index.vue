<template>
  <div class="app-container">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            placement="top-start"
            popper-class="search-popover-vi"
            width="400"
            trigger="manual"
            v-model="showSearch"
          >
            <div class="search-popover">
              <el-form :model="queryParams" ref="queryForm" :inline="true" label-position="left" label-width="120px">
                <el-form-item label="应用名称" prop="appId">
                  <el-select v-model="queryParams.appId" placeholder="请选择应用名称" class="mw222">
                    <el-option
                      v-for="item in $store.getters.myApps"
                      :key="item.appId"
                      :label="item.appName"
                      :value="item.appId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="菜单名称" prop="menuName">
                  <el-input
                    v-model="queryParams.menuName"
                    placeholder="请输入菜单名称"
                    clearable
                    size="small"
                    class="mw222"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item>

                <!-- <el-form-item label="权限字符" prop="roleCode">
                  <el-input
                    v-model="queryParams.roleCode"
                    placeholder="请输入权限字符"
                    clearable
                    size="small"
                    class="mw222"
                    @keyup.enter.native="handleQuery"
                  />
                </el-form-item> -->
                <el-form-item label="状态" prop="status">
                  <el-select
                    v-model="queryParams.status"
                    placeholder="菜单状态"
                    clearable
                    size="small"
                    class="mw222"
                  >
                    <el-option
                      v-for="dict in statusOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="创建时间">
                  <el-date-picker
                    v-model="dateRange"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item> -->
              </el-form>
              <div class="popover-footer">
                <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
                <el-button type="cyan" icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
                <el-button size="small" @click="showSearch = false">取 消</el-button>
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search" @click="showSearch = !showSearch">筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.menuName"
            placeholder="请输入菜单名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
          />
          <el-button
            class="ml8"
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="handleAdd"
            v-hasPermi="['crm:log:add']"
          >新增
          </el-button>
        </el-col>
      </el-row>
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>
    <div class="tabbar-vi">
      <el-tabs v-model="queryParams.appId" @tab-click="handleQuery">
        <el-tab-pane v-for="item in $store.getters.myApps"
                     :key="item.appId"
                     :label="item.appName"
                     :value="item.appId" :name="item.appId"></el-tab-pane>
      </el-tabs>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery"/>
        </el-tooltip>
      </div>
    </div>
    <div class="table-data">
      <el-table
        :height="tableHeight"
        v-loading="loading"
        :data="menuList"
        row-key="menuId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :default-sort = "{prop: 'orderNo', order: 'ascending'}"
      >
        <el-table-column
          prop="name"
          label="菜单名称"
          :show-overflow-tooltip="true"
          width="160"
        ></el-table-column>
        <el-table-column prop="icon" label="图标" align="center" width="100">
          <template slot-scope="scope">
            <e-icon :icon-name="scope.row.icon"/>
            <svg-icon :icon-class="scope.row.icon"/>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="排序" width="80" ></el-table-column>
        <el-table-column
          prop="resCode"
          label="权限标识"
          :show-overflow-tooltip="true"
          min-width="520"
        ></el-table-column>
        <el-table-column
          prop="url"
          label="组件路径"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="80"
        ></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          fixed="right"
          min-width="240"
        >
          <template slot="header" slot-scope="scope">
            <el-dropdown :hide-on-click="false">
              <span class="el-dropdown-link">
                列表编辑
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-checkbox label="复选框 A"></el-checkbox>
                </el-dropdown-item>
                <el-dropdown-item
                >
                  <el-checkbox label="复选框 B"></el-checkbox
                  >
                </el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="[
              '/guns-cloud-store/integralStoreMenu/integralStoreManager'
            ]"
            >修改
            </el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
              v-hasPermi="[
              '/guns-cloud-store/integralStoreMenu/integralStoreManager'
            ]"
            >新增
            </el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleButton(scope.row)"
              v-if="scope.row.pid != -1"
              v-hasPermi="[
              '/guns-cloud-store/integralStoreMenu/integralStoreManager'
            ]"
            >按钮维护
            </el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="[
              '/guns-cloud-store/integralStoreMenu/integralStoreManager'
            ]"
            >删除
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="G">导航</el-radio>
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected"/>
                <el-input
                  slot="reference"
                  v-model="form.icon"
                  placeholder="点击选择图标"
                  readonly
                >
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i
                    v-else
                    slot="prefix"
                    class="el-icon-search el-input__icon"
                  />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="是否外链">
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType != 'F'"
              label="路由地址"
              prop="path"
            >
              <el-input v-model="form.path" placeholder="请输入路由地址"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" placeholder="请输入组件路径"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'M'" label="权限标识">
              <el-input
                v-model="form.perms"
                placeholder="请权限标识"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="显示状态">
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in visibleOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}
                </el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}
                </el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType == 'C'" label="是否缓存">
              <el-radio-group v-model="form.isCache">
                <el-radio label="0">缓存</el-radio>
                <el-radio label="1">不缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--    菜单新增编辑-->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="800px">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="22">
            <el-form-item label="父菜单" prop="pid">
              <!--              <el-select-->
              <!--                v-model="form.pid"-->
              <!--                placeholder="请选择父菜单"-->
              <!--                @change="pMenuChange"-->
              <!--                :disabled="!form.appId"-->
              <!--                v-if="form.level == '1'"-->
              <!--              >-->
              <!--                <el-option-->
              <!--                  v-for="item in selectMenuTreeList"-->
              <!--                  :key="item.id"-->
              <!--                  :label="item.name"-->
              <!--                  :value="item.id"-->
              <!--                  v-if="item.pId == '' || item.pId == '-1'"-->
              <!--                >-->
              <!--                </el-option>-->
              <!--           </el-select>-->
              <el-cascader
                style="width: 100%"
                v-model="form.pid"
                :props="{value:'id',label:'name',emitPath:false,checkStrictly: true}"
                :options="getMenuTreeList"
                @change="pMenuChange"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="G">导航</el-radio>
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="菜单编码" prop="code">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="应用名称" prop="appId">
              <el-select
                v-model="form.appId"
                placeholder="请选择应用名称"
                @change="appSelectChange"
              >
                <el-option
                  v-for="item in $store.getters.myApps"
                  :key="item.appId"
                  :label="item.appName"
                  :value="item.appId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="资源" prop="resCode">
              <el-select
                v-model="form.resCode"
                placeholder="请选择资源"
                :disabled="!form.appId"
                filterable
              >
                <el-option
                  v-for="item in resourceSelectList"
                  :key="item.resCode"
                  :label="item.name"
                  :value="item.resCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="图标" prop="icon">
<!--              <e-icon-picker-->
<!--                v-model="form.icon"-->
<!--                :options="{-->
<!--                  FontAwesome: false,-->
<!--                  ElementUI: true,-->
<!--                  eIcon: true,-->
<!--                  eIconSymbol: true-->
<!--                }"-->
<!--              ></e-icon-picker>-->
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected"/>
                <el-input
                  slot="reference"
                  v-model="form.icon"
                  placeholder="点击选择图标"
                  readonly
                >
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i
                    v-else
                    slot="prefix"
                    class="el-icon-search el-input__icon"
                  />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="排序" prop="orderNo">
              <el-input-number
                v-model="form.orderNo"
                :min="1"
                :max="1000"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="菜单显示" prop="hiddenFlag">
              <el-radio-group v-model="form.hiddenFlag">
                <el-radio label="N">显示</el-radio>
                <el-radio label="Y">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="22">
            <el-form-item label="路径" prop="url">
              <el-input
                v-model="form.url"

              ></el-input>
              <!--                :disabled="form.menuType == 'G' || form.menuType == 'M'"-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="22">
            <el-form-item label="提示" prop="menuTips">
              <el-input v-model="form.menuTips"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--    菜单按钮列表-->
    <el-dialog
      :title="'按钮维护' + (menuObj.name ? '  [' + menuObj.name + ']' : '')"
      :visible.sync="buttonDialogVisible"
      width="1200px"
    >
      <el-row :gutter="24">
        <el-col :span="3">
          <el-button type="primary" @click="openDialog">新增</el-button>
        </el-col>
        <el-col :span="8">
          <el-form :model="buttonQuery" label-width="80px">
            <el-form-item label="按钮名称" inline-message>
              <el-input v-model="buttonQuery.buttonName" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="search"
          ></el-button>
        </el-col>
      </el-row>
      <el-table :data="buttonList" style="width: 100%">
        <el-table-column prop="buttonName" label="按钮名称" min-width="80">
        </el-table-column>
        <el-table-column prop="buttonCode" label="按钮编码" min-width="100">
        </el-table-column>
        <el-table-column min-width="160" label="控制器名称">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.controllerName"
              placement="top"
            >
              <span class="wsn">{{ scope.row.controllerName }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="resourceName"
          min-width="120"
          label="关联资源名称"
        >
        </el-table-column>
        <el-table-column prop="resourceId" min-width="300" label="关联资源">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.resourceId"
              placement="top"
            >
              <span class="wsn">{{ scope.row.resourceId }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" min-width="120" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
            <el-tag v-if="scope.row.status === 2" type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="resourceId"
          min-width="200"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editDetail(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delDetail(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="disEnable(scope.row)"
              v-if="scope.row.status === 1"
            >禁用
            </el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="disEnable(scope.row)"
              v-if="scope.row.status === 2"
            >启用
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="buttonQuery.pageNo"
        :limit.sync="buttonQuery.pageSize"
        @pagination="getButtonList"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="buttonDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!--    菜单按钮新增编辑-->
    <el-dialog
      width="800px"
      :title="title"
      :visible.sync="innerVisible"
      :modal-append-to-body="false"
    >
      <el-form
        :rules="buttonRules"
        :model="button"
        ref="buttonForm"
        label-width="120px"
      >
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="按钮名称" prop="buttonName">
              <el-input v-model="button.buttonName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="按钮编码" prop="buttonCode">
              <el-input v-model="button.buttonCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="关联资源" prop="resCode">
              <el-select
                style="width: 100%;"
                v-model="button.resCode"
                filterable
              >
                <el-option
                  v-for="item in resList"
                  :key="item.resCode"
                  :label="item.resName"
                  :value="item.resCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="22">
            <el-form-item label="备注" prop="description">
              <el-input v-model="button.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listMenu,
    getMenu,
    delMenu,
    addMenu,
    updateMenu
  } from '@/api/system/menu'
  import {
    getSelectMenuTreeList,
    getResourceSelectList,
    getResourceList,
  } from '@/api/menu'
  import {
    getButtonList,
    changeStatus,
    delButton,
    getButtonArr,
    addButton,
    updateButton,
    getButtonDetail
  } from '@/api/system/button'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import IconSelect from '@/components/IconSelect'
  import { cssStyle } from '@/utils/generator/html'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Menu',
    components: { Treeselect, IconSelect },
    data() {
      return {
        // 遮罩层
        loading: true,
        // 显示搜索条件
        showSearch: false,
        // 菜单表格树数据
        menuList: [],
        // 菜单树选项
        menuOptions: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        dialogVisible: false,
        buttonDialogVisible: false,
        // 显示状态数据字典
        visibleOptions: [],
        // 菜单状态数据字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          menuName: undefined,
          visible: undefined,
          appId: this.$store.getters.appId
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
          code: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
          pid: [{ required: true, message: '请选择父菜单', trigger: 'blur' }],
          resCode: [{ required: true, message: '请选择资源', trigger: 'blur' }],
          icon: [{ required: true, message: '请选择图标', trigger: 'blur' }],
          status: [
            { required: true, message: '请选择是否禁用', trigger: 'blur' }
          ],
          hiddenFlag: [
            { required: true, message: '请选择是否桌面显示', trigger: 'blur' }
          ],
        },
        selectMenuTreeList: [],
        getMenuTreeList:[],
        resourceSelectList: [],
        menuObj: {},
        buttonList: [],
        total: 0,
        button: {},
        buttonQuery: {
          pageNo: 1,
          pageSize: 20,
          buttonName: '',
          buttonCode: '',
          menuId: ''
        },
        innerVisible: false,
        buttonRules: {
          buttonName: [
            { required: true, message: '请填写按钮名称', tirgger: 'blur' }
          ],
          buttonCode: [
            { required: true, message: '请填写按钮编码', tirgger: 'blur' }
          ],
          resCode: [
            { required: true, message: '请选择关联资源', tirgger: 'change' }
          ]
        },
        resList: []
      }
    },
    created() {
      this.getList()
      this.getBaseData()
      this.getDicts('sys_show_hide').then(response => {
        this.visibleOptions = response.data
      })
      this.getDicts('sys_normal_disable').then(response => {
        this.statusOptions = response.data
      })
    },
    computed: {
      ...mapGetters(['tableHeight'])
    },
    methods: {
      getBaseData: function(value) {
        let appId = value || this.queryParams.appId
        if (appId) {
          getSelectMenuTreeList({ appId: appId }).then(res => {
            if (res.code == 200) {
              this.selectMenuTreeList = res.data
              this.getMenuTreeList = this.handleTree(
                res.data,
                'id',
                'pId',
                'children',
                '-1'
              )
            }
          })
          getResourceSelectList({ appId: appId }).then(res => {
            if (res.code == 200) {
              this.resourceSelectList = res.data
            }
          })
        }
      },
      // 选择图标
      selected(name) {
        this.form.icon = name
      },
      /** 查询菜单列表 */
      getList() {
        this.loading = true
        listMenu(this.queryParams).then(response => {
          this.menuList = this.handleTree(
            response.data,
            'menuId',
            'pid',
            'children',
            -1
          )
          this.loading = false
        })
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children
        }
        return {
          id: node.menuId,
          label: node.name,
          children: node.children
        }
      },
      /** 查询菜单下拉树结构 */
      getTreeselect() {
        listMenu({}).then(response => {
          this.menuOptions = []
          const menu = { menuId: '-1', name: '主类目', children: [] }
          menu.children = this.handleTree(
            response.data,
            'menuId',
            'pid',
            'children',
            -1
          )
          this.menuOptions.push(menu)
        })
      },
      // 显示状态字典翻译
      visibleFormat(row, column) {
        if (row.menuType == 'F') {
          return ''
        }
        return this.selectDictLabel(this.visibleOptions, row.visible)
      },
      // 菜单状态字典翻译
      statusFormat(row, column) {
        if (row.menuType == 'F') {
          return ''
        }
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      // 取消按钮
      cancel() {
        this.dialogVisible = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          appId: this.queryParams.appId,
          code: '',
          hiddenFlag: 'N',
          menuType:'C',
          icon: '',
          menuId: null,
          menuTips: '导航：ParentView，目录：Layout',
          name: '',
          orderNo: 0,
          pid: null,
          resCode: '',
          status: 1,
          url: '',
          remark: '',
          pCode: '',
          level:'1'//菜单等级
        }
        this.resetForm('form')
      },
      resetButton() {
        this.button = {
          buttonCode: '',
          buttonId: 0,
          buttonName: '',
          description: '',
          menuId: 0,
          orderNo: 0,
          resCode: '',
          resCodeStr: '',
          status: 0
        }
        this.resetForm('buttonForm')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      /** 新增按钮操作 */
      handleAdd(row) {
        this.reset()
        this.getBaseData(this.form.appId)
        if (row != null && row.menuId) {
          this.form.pid = row.menuId
          if(row.menuId==-1||row.pid==-1){
            this.form.level = '1'
          }else{
            this.form.level = '2'
          }
        } else {
          this.form.pid = '-1'
          this.form.url = 'Layout'
          this.form.level = '1'
        }
        this.dialogVisible = true
        this.title = '添加菜单'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        this.getBaseData()
        getMenu({ menuId: row.menuId }).then(response => {
          this.form = response.data
          this.dialogVisible = true
          this.title = '修改菜单'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.menuId != undefined && this.form.menuId != null) {
              updateMenu(this.form).then(response => {
                this.msgSuccess('修改成功')
                this.dialogVisible = false
                this.getList()
              })
            } else {
              addMenu(this.form).then(response => {
                this.msgSuccess('新增成功')
                this.dialogVisible = false
                this.getList()
              })
            }
          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        this.$confirm(
          '是否确认删除名称为"' + row.name + '"的数据项?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(function() {
            return delMenu({ menuId: row.menuId })
          })
          .then(() => {
            this.getList()
            this.msgSuccess('删除成功')
          })
      },
      appSelectChange(value) {
        if (value) {
          this.form.pid = null
          this.form.resCode = ''
          this.getBaseData(value)
        }
      },
      pMenuChange(id) {
        let url = this.form.url
        if (id == -1) {
          this.form.url = 'Layout'
        } else if (url == 'Layout') {
          this.form.url = ''
        }
      },
      getButtonList() {
        let data = this.queryParams
        data.menuId = this.menuObj.menuId
        if (data.menuId) {
          getButtonList(data).then(res => {
            if (res.code === 200 && res.data) {
              this.buttonList = res.data.rows
              this.total = res.data.totalRows
            }
          })
        } else {
          this.$message.error('菜单ID不能为空')
        }
      },
      //打开按钮维护列表
      handleButton(menu) {
        this.buttonDialogVisible = true
        this.menuObj = menu
        this.getButtonList()
      },
      //查询按钮列表
      search: function() {
        this.getButtonList()
      },
      //打开新增按钮
      openDialog() {
        this.resetButton()
        this.getButtonArr()
        this.innerVisible = true
      },
      //获取按钮资源
      getButtonArr: function() {
        getButtonArr({ resCode: this.menuObj.resCode }).then(res => {
          this.resList = res.data
        })
      },
      //按钮禁用
      disEnable: function(row) {
        const loading = this.$loading({
          lock: true,
          text: '请耐心等待.....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        changeStatus({ buttonId: row.buttonId, status: row.status == 1 ? 2 : 1 })
          .then(res => {
            if (res.code === 200) {
              this.$message.success(`操作成功!`)
            } else {
              this.$message.success(`操作失败!`)
            }
            this.getButtonList()
            loading.close()
          })
          .catch(err => {
            loading.close()
          })
      },
      //按钮删除
      delDetail: function(row) {
        // console.info(row)
        this.$confirm('此操作将删除该按钮, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return delButton({ buttonId: row.buttonId })
          })
          .then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.getButtonList()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      editDetail: function(row) {
        this.getButtonArr()
        // console.info(row)
        getButtonDetail({ buttonId: row.buttonId }).then(res => {
          // console.info(res)
          if (res.code == 200) {
            this.button = res.data
            this.innerVisible = true
          }
        })
      },
      //按钮新增更新
      confirm: function() {
        let form = this.button
        form.menuId = this.menuObj.menuId
        this.$refs.buttonForm.validate(valid => {
          if (valid) {
            if (!form.buttonId) {
              addButton(form).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.innerVisible = false
                  this.getButtonList()
                }
              })
            } else {
              updateButton(form).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.innerVisible = false
                  this.getButtonList()
                }
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .search-popover {
    .el-form {
      .el-form-item {
        &:nth-child(4) {
          .el-form-item__content {
            .el-radio-group {
              .el-radio {
                line-height: 17px;
              }
            }
          }
        }
      }
    }
  }
</style>
