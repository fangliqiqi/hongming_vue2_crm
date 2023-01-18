<template>
  <div class="app-container flowSet ">
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            trigger="manual"
          >
            <el-button
              slot="reference"
              size="small"
              icon="el-icon-search"
              @click="showSearch = !showSearch"
              >筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            placeholder="请输入客户简称或表编号或税号"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
          />
          <el-dropdown
            size="small"
            split-button
            type="primary"
            trigger="click"
            class="ml8"
            @click="handleAddCustomer"
          >
            <span>
              <i class="el-icon-plus"></i>
              新建客户
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"
                ><span
                  ><i class="el-icon-upload2"></i>导入</span
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            class="ml8"
            icon="el-icon-upload2"
            size="small"
            @click="handleExport"
            v-hasPermi="['crm:log:export']"
            >导出
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
    <!-- 流程列表 -->
    <div class="tabbar-vi">
      <el-tabs @tab-click="handleQuery" v-model="optionValue">
        <el-tab-pane
          v-for="item in sourceTypeLvList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
          :name="item.dictCode"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-data" >
      <div  class="step" v-if="optionValue=='10'">
       <el-steps direction="vertical" :active="10" >
         <el-step>
           <template slot="title">
             <div class="title_wrap" >
               <span class="left">提交审核</span>
               <span class="right" ><span>提出流失申请</span>
               <div></div></span>
             </div>
           </template>
         </el-step>
         <el-step title="主管审核">
           <template slot="title">
             <div class="title_wrap">
               <span class="left">主管审核</span>
               <span class="right">
                 <span>可指定人员拥有审核权限</span>
                  <!-- <el-checkbox-group v-model='cusList' style="padding-top: 16px;width: 50%;">
                      <el-checkbox label="1" disabled>刘静</el-checkbox>
                   
                  </el-checkbox-group> -->
                  <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in cusList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  class="staff"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag addFrame"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加人员
                </el-button>
              </div>
               </span>
             </div>
           </template>
         </el-step>
         <el-step title="财务审核" >
           <template slot="title">
             <div class="title_wrap">
               <span class="left">财务审核</span>
               <span class="right"><span>可指定人员拥有财务审核权限</span>
                <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in cusList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  class="staff"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag addFrame"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加人员
                </el-button>
              </div></span>
               
             </div>
           </template>
         </el-step>
          <el-step title="流失申请">
            <template slot="title">
              <div class="title_wrap">
                <span class="left">流失申请</span>
                <span class="right"><span>可指定人员拥有流失审核权限</span>
                <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in cusList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  class="staff"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag addFrame"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加人员
                </el-button>
              </div></span>
              </div>
            </template>
          </el-step>
       </el-steps>
      </div>
      <div  class="step" v-if="optionValue=='20'">
          <el-steps direction="vertical" :active="10" >
         <el-step>
           <template slot="title">
             <div class="title_wrap" >
               <span class="left">提交订单</span>
               <span class="right" ><span>单次业务需要创建订单</span>
               <div></div></span>
             </div>
           </template>
         </el-step>
         <el-step title="订单审核">
           <template slot="title">
             <div class="title_wrap">
               <span class="left">订单审核</span>
               <span class="right">
                 <span>可指定人员拥有订单审核权限，审核后的订单才可以进行下一步，审核后的订单不可编辑</span>
                  <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in cusList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  class="staff"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag addFrame"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加人员
                </el-button>
              </div>
               </span>
             </div>
           </template>
         </el-step>
         <el-step title="财务审核" >
           <template slot="title">
             <div class="title_wrap">
               <span class="left">财务审核</span>
               <span class="right"><span>可指定人员拥有财务审核权限，审核后的订单才可以进行下一步，审核后的订单不可以编辑</span>
                <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in cusList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  class="staff"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag addFrame"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加人员
                </el-button>
              </div></span>
               
             </div>
           </template>
         </el-step>
          <el-step title="派单执行">
            <template slot="title">
              <div class="title_wrap">
                <span class="left">派单执行</span>
                <span class="right"><span>可指定人员拥有派单执行权限</span>
                <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in cusList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  class="staff"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag addFrame"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加人员
                </el-button>
              </div></span>
              </div>
            </template>
          </el-step>
          <el-step title="订单完结">
            <template slot="title">
              <div class="title_wrap">
                <span class="left">订单完结</span>
                <span class="right"><span>服务办理完成后，可以标记订单完结</span>
                <div class="tag-vi">
               
              </div></span>
              </div>
            </template>
          </el-step>
       </el-steps>
      </div>
    </div>
    <!-- 新增客户 -->
    <el-dialog
      title="新增客户"
      open
      :visible.sync="openCustomer"
      width="704px"
      append-to-body
      class="addCustomer businiss"
    >
      <el-form
        :label-position="labelPosition"
        class="chengjiao"
      >
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="companyName">
              <el-input
                v-model="companyName"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人方式" prop="linkmanPhone">
              <el-input
                v-model="linkmanPhone"
                placeholder="请输入联系人方式"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户类型" prop="clientType">
              <el-select v-model="clientType" placeholder="请选择客户类型">
                <el-option
                  v-for="item in clientTypeList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="意向度" prop="opinion">
              <el-select v-model="opinion" placeholder="请选择意向度">
                <el-option
                  v-for="item in opinionList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="增值税" prop="taxType">
              <el-select v-model="taxType" placeholder="请选择增值税类型">
                <el-option
                  v-for="item in vatTypeList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地区" prop="city">
              <el-cascader
                placeholder="请选择信息所在地区"
                style="width: 100%"
                size="small"
                v-model="district"
                @change="handleRegionChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="24">
          <el-col :span="8">
            <el-form-item label="行业分类" prop="industryName">
              <el-select
                v-model="industryName"
                placeholder="请选择行业分类"
              >
                <el-option
                  v-for="item in industryNameList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />

                <!-- <el-option label="请选择商机类型" value="" /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8"> </el-col> -->
          <el-col :span="8">
            <el-form-item label="商机来源" prop="clientSource">
              <el-select
                v-model="clientSource"
                :disabled="!!clientSource"
                placeholder="请选择商机来源"
                ><el-option
                  v-for="item in clientSourceList"
                  :label="item.dictName"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
        <!-- 其他公司代账 -->
        <!-- <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="在其他公司代账:" prop="companies">
              <el-radio v-model="companies" label="是">是</el-radio>
              <el-radio v-model="companies" label="否">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row :gutter="20" class="Ys">
          
          <el-form-item label="在其他公司代账:" prop="companies">
            <el-radio v-model="form.isOtherFirmGeneration" label="1"
              >是</el-radio
            >
            <el-radio v-model="form.isOtherFirmGeneration" label="2"
              >否</el-radio
            >
          </el-form-item>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input
                v-model="address"
                style="width: 592px;"
                placeholder="请输入详细地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标签" prop="userlabelIds">
              <div class="tag-vi">
                <el-tag
                  :key="tag"
                  v-for="tag in userlabelIdsList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  icon="el-icon-plus"
                  >添加标签
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceTypeLvList: [
        { dictName: "流失申请流程" ,dictCode:'10',},
        { dictName: "订单流转流程",dictCode:'20', }
      ],
       cusList:['刘静'],
       inputVisible: false,
       labelPosition: "top",
       openCustomer: false,//新增客户
       optionValue:'10',//流程设置tab选项
       inputValue:'1',
       userlabelIdsList:['biaoqian1'],//客户标签
       companyName:'小王',//客户名称
       linkmanPhone:110,//联系人方式
       clientType:'代理人',//客户类型
       clientTypeList:[{ dictName: "代理人" ,dictCode:'1',}],
       opinionList:[{ dictName: "A" ,dictCode:'1',}],//意向度
       opinion:'B',//意向度
       address:'详细地址',//详细地址
       district:null,//所在地区
       companies:'是',
       //客户来源
       clientSourceList: [
        { dictName: "抖音" ,dictCode:'10',},
        { dictName: "百度",dictCode:'20', }
      ],
      clientSource:'',
      taxType:'增值税',//增值税
      //行业分类
      industryNameList: [
        { dictName: "财税行业" ,dictCode:'10',},
        { dictName: "销售行业",dictCode:'20', }
      ],
      industryName:'会计',
      //增值税
      vatTypeList: [
        { dictName: "增值税1" ,dictCode:'10',},
        { dictName: "增值税2",dictCode:'20', }
      ],
    };
  },
  methods: {
      // 表单重置
    reset() {},
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有公司银行开户信息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          window.location.href =
            process.env.VUE_APP_CRM_API +
            "/hmkj-crm/resoBusinessOpportunity/excelTemplate";
        })
        .catch(function() {});
    },
    //新增客户
    handleAddCustomer() {
      this.reset();
      this.openCustomer = true;
      this.title = "新增客户";
    },
    /** 搜索按钮操作 */
    handleQuery(e) {
      if (e.keyCode != 13) {
        this.showSearch = false;
      }
      //   this.queryParams.pageNo = 1;
      //   this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 查询商机信息列表 */
    getList() {
      // this.loading = true
      // let data = JSON.parse(JSON.stringify(this.queryParams))
      // data.sourceTypeLv = data.sourceTypeLv == '0' ? '' : data.sourceTypeLv
      // listOpportunity(data).then(response => {
      //   this.bankList = response.data.rows
      //   this.total = response.data.totalRows
      //   this.loading = false
      // })
    },
      showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
      handleInputCallback() {
      this.handleInputConfirm(res => {
        this.updateForm({ cusList: res });
      });
    },
    handleInputConfirm(cb) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.cusList.push(inputValue);
        if (typeof cb == "function") {
          cb(this.cusList);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleCloseCallback(tag) {
      // console.info(tag)
      this.handleClose(tag, res => {
        this.updateForm({ cusList: res });
      });
    },
    handleClose(tag, cb) {
      this.cusList.splice(this.cusList.indexOf(tag), 1);
      if (typeof cb == "function") {
        cb(this.cusList);
      }
    },
     // 客户提交按钮
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id = null;
          addClient(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增商机成功");
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
     // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.dialogVisible = false;
      this.openCustomer = false;//新增客户取消按钮
      this.renewals = false;
    },
    //所在地区
     handleRegionChange(value) {
      // this.form.district = value;
    //   this.form.district = CodeToText[value[0]];
    //   this.form.province = CodeToText[value[0]];
    //   this.form.city = CodeToText[value[1]];
    //   this.form.county = CodeToText[value[2]];
    },
  }
};
</script>

<style lang="scss">
.flowSet {
.step{
    margin-top: 30px;
  }
  .el-step__icon.is-text{
    width: 24px;
    height: 24px;
    border:none;
    background: #4977E0;
    border-radius: 50%;
  }
  .el-step__icon-inner{
    color:#FFFFFF;
    font-weight: 400;
  }
  .el-step__title.is-finish {
    color: #565759;
  }
  .el-step__line-inner{
    border:1px solid #E6E7EB;
  }

  .el-step.is-vertical {
    display: flex;
  }
  .el-step.is-vertical .el-step__title{
      padding-bottom: 10px;
  }
.step .title_wrap{
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
  }
  .title_wrap .left{
    flex:0 0 115px;
  }

  .title_wrap .right{
    font-size: 12px;
    flex:1;
    padding-bottom: 39px;
    border-bottom: 1px solid #E6E7EB;
    .tag-vi{
      padding-top: 20px;
        .el-tag{
            margin-top: 24px;
            margin-bottom: 0px;
        }
    }
  }
}

</style>
<style lang="scss" scoped>
.app-container .table-data{
    padding-right: 73px;
    padding-top: 12px;
    padding-bottom: 0px;
}
.tag-vi{
  display: flex;
  padding-top: 24px;
.addFrame{
  width: 92px;
height: 32px;
background: #FFFFFF;
border: 1px dashed #E6E7EB;
border-radius: 2px;
}
.staff{
  margin-right: 8px;
  margin-top: 0px !important;
  width: 69px !important;
  height: 32px !important;
  text-align: center;
  line-height: 32px !important;
}
}
</style>