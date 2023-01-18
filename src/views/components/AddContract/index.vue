<template>
  <!-- 新增合同 -->
  <el-dialog
    :title="title"
    :visible.sync="open"
    width="704px"
    append-to-body
    class="businiss"
  >
    <el-form
      ref="contractForm"
      :model="contractForm"
      :rules="rules"
      :label-position="labelPosition"
      class="chengjiao hetong"
    >
      <el-row type="flex" justify="space-between" :gutter="24">
        <el-col :span="12">
          <el-form-item label="合同编号">
            <el-input
              v-model="contractForm.controlNo"
              placeholder="请输入合同编号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签约时间">
            <el-date-picker
              v-model="contractForm.signingDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
            <!-- <el-time-picker
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
            placeholder="请选择时间"
          >
          </el-time-picker> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="24">
        <el-col :span="12">
          <el-form-item label="合同生效期">
            <el-date-picker
              type="date"
              v-model="contractForm.validity"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同金额">
            <el-input
              v-model="contractForm.money"
              placeholder="请输入合同金额"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <el-form-item label="服务周期">
            <div class="flex-row mw100">
              <el-date-picker
                type="date"
                v-model="contractForm.servicePeriodStart"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                style="max-width: 284px"
              >
              </el-date-picker>
              <span class="spacing ml10 mr10">-</span>
              <el-date-picker
                type="date"
                v-model="contractForm.servicePeriodEnd"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                style="max-width: 284px"
              >
              </el-date-picker>
            </div>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="24">
        <el-col :span="12">
          <el-form-item label="收费周期" prop="chargePeriod">
            <el-select
              v-model="contractForm.chargePeriod"
              placeholder="请选择收费周期"
            >
              <el-option
                v-for="item in chargePeriodList"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="凭证交接">
            <el-select
              v-model="contractForm.evidenceAssociate"
              placeholder="请选择凭证交接"
            >
              <el-option
                label="请选择凭证交接"
                v-for="item in getDicts('handover_mode').then(res=>{return res.data})"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :headers="headers"
          :data="{ type: 10 }"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="uploadSuccess"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        ><span>添加合同附件</span>
          <el-button class="ml16" icon="el-icon-upload2">上传附件</el-button>
        </el-upload>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="contractSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return{
        contractForm:{},
      chargePeriodList: [],
      }
    },
    methods:{
      // 新增合同提交按钮
      contractSubmit() {
        // console.log(this.contractForm);
        this.$refs["contractForm"].validate(valid => {
          // console.log(this.contractForm);
          if (valid) {
            this.contractForm.companyId = this.form.id; //添加合同记录id
            // console.log(this.contractForm.id);
            // console.log(this.contractForm);
            // console.log(this.contractForm);
            addContract(this.contractForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增合同成功");
                this.getContractList(this.contractForm.companyId);
                this.open = false;
              }
            });
          }
          // console.log(this.contractList);
        });
      },
    }
  }
</script>

<style scoped>

</style>
