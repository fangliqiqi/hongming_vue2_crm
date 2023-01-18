<template>
  <div>
    <!-- 新增订单 -->
    <el-dialog
      title="新增订单--选择服务产品"
      :visible.sync="open"
      width="704px"
      class="newOrders"
    >
      <div class="el-icon-office-building mt10">
        {{ form.companyName || company.companyName }}
      </div>
      <el-divider></el-divider>
      <el-form
        ref="orderform"
        v-model="form"
        :rules="rules"
        label-position="top"
        label-width="80px"
        maxHeight="612px"
      >
        <div class="product-vi">
          <el-row :gutter="24">
            <el-col>
              <el-input
                v-model="proTypeName"
                placeholder="请输入服务产品"
                clearable
                size="small"
                style="width: 240px"
                suffix-icon="el-icon-search"
              />
            </el-col>
          </el-row>
          <input type="text" class="form-control" style="display: none" />
          <el-row>
            <el-col>
              <el-form-item label="请选择一个服务产品:" style="margin-top: 8px">
                <div class="product-list" style="margin-top: 8px">
                  <el-row :gutter="20" style="margin-top: -20px">
                    <el-col v-for="item in proTypeOption" :span="8">
                      <div class="type_item" @click="toOrderFun(item)">
                        <span>
                          {{ item.name }}
                        </span>
                        <el-button type="primary" size="mini">
                          选择并创建合同订单
                        </el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="创建新的服务产品:" style="margin-top: 8px">
                <div style="margin-top: 8px" @click="addServices">
                  <el-row :gutter="20" style="margin-top: -20px">
                    <el-col :span="8">
                      <div class="type_item">
                        <span
                          style="
                            text-align: center;
                            font-size: 32px;
                            color: #e6e7eb;
                          "
                        >
                          <i class="el-icon-plus"></i>
                        </span>
                        <el-button type="primary" size="mini">
                          新增服务产品
                        </el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!--          <el-row :gutter="24">-->
          <!--            <el-col>-->
          <!--              <el-form-item label="创建新的服务产品:">-->
          <!--                <el-input v-model="form.district" placeholder="请选择行业分类" />-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消 </el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增服务产品" :visible.sync="showDialog" width="516px">
      <el-form
        ref="serviceForm"
        v-model="serviceForm"
        label-position="left"
        label-width="100px"
        maxHeight="612px"
        style="margin-top: 30px"
      >
        <el-form-item label="项目名称">
          <el-input v-model="serviceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属服务项">
          <el-select
            v-model="serviceForm.parentId"
            filterable
            placeholder="请选择所属服务项"
            @change="serviceChange(serviceForm.parentId)"
          >
            <el-option
              v-for="item in serviceList"
              :key="item.id"
              :label="item.businessType"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目价格">
          <el-input v-model="serviceForm.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消 </el-button>
        <el-button type="primary" @click="ConfirmService">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getIntermSerpriceList } from "@/api/crm/intermSerprice";
import { addOrder, ServiceItem, AddConfirmService } from "@/api/crm/order";
export default {
  name: "NewOrder",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    companyId: {
      type: [Number, String],
      default: null,
    },
    company: {
      type: [Object],
      default() {
        return {};
      },
    },
  },
  computed: {
    open: {
      get() {
        if (this.visible) {
          this.getData();
        }
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  data() {
    return {
      showDialog: false, //新增服务项弹窗
      serviceList: [], //所属服务项
      serviceForm: {}, //新增服务项表单
      form: {},
      proTypeName: "",
      proTypeOption: [],
      proTypeList: [],
      orderId: "",
      hiddenTab: false,
      rules: {
        clienteleName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur",
          },
        ],
        companyName: [
          {
            required: true,
            message: "客户名称不能为空",
            trigger: "blur",
          },
        ],
        clientType: [
          {
            required: true,
            message: "客户类型不能为空",
            trigger: "blur",
          },
        ],
        //     roomType: [
        //   {
        //     required: true,
        //     message: "增值税不能为空",
        //     trigger: "blur"
        //   }
        // ],
        city: [
          {
            required: true,
            message: "所在地不能为空",
            trigger: "blur",
          },
        ],
        bankAddress: [
          {
            required: true,
            message: "开卡行地址不能为空",
            trigger: "blur",
          },
        ],
        bankName: [
          {
            required: true,
            message: "开户行不能为空",
            trigger: "blur",
          },
        ],
        companyId: [
          {
            required: true,
            message: "公司Id不能为空",
            trigger: "blur",
          },
        ],
        clientSource: [
          {
            required: true,
            message: "商机来源不能为空",
            trigger: "blur",
          },
        ],

        industryName: [
          {
            required: true,
            message: "行业分类不能为空",
            trigger: "blur",
          },
        ],
      },
      followRules: {
        nextContent: [
          {
            required: true,
            message: "下次跟进内容不能为空",
            trigger: "blur",
          },
        ],
        nextFollowTime: [
          {
            required: true,
            message: "下次跟进日期不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    proTypeName(val) {
      this.proTypeOption = this.proTypeList.filter((item) => {
        return item.name.indexOf(val) != -1;
      });
    },
  },
  methods: {
    getData() {
      this.getProductTypeList();
    },
    //获取产品类别列表
    getProductTypeList() {
      getIntermSerpriceList({}).then((res) => {
        this.proTypeList = res.data;
        this.proTypeOption = res.data;
      });
    },
    //选择产品
    toOrderFun(row) {
      //订单类型：10 代账 20 非代账
      let data = {
        type: row.type,
        companyId: this.companyId,
        serpriceId: row.id,
      };
      addOrder(data).then((res) => {
        // console.info(res);
        this.open = false;
        this.$emit("editOrder", {
          orderVisible: true,
          id: res.data.id,
          hiddenTab: true,
        });
      });
    },
    //新增服务项
    addServices() {
      this.showDialog = true;
      ServiceItem().then((response) => {
        this.serviceList = response.data;
      });
    },
    //所属服务项
    serviceChange(row) {
      this.serviceList.forEach((item) => {
        if (item.id.indexOf(row) != -1) {
          this.serviceForm.businessType = item.businessType;
        }
      });
    },
    //提交新增服务项
    ConfirmService() {
      AddConfirmService(this.serviceForm).then((response) => {
        this.showDialog = false;
        this.getProductTypeList();
      });
    },
    // 表单重置
    reset() {
      this.form = {
        appId: this.queryParams.appId || this.$store.getters.appId || "",
        id: null,
        companyName: null,
        client: null, //编号
        companyType: null,
        enterpriseNumber: null, //企业税号
        companyId: null,
        bankName: null,
        bankAccountNumber: null,
        bankAddress: null,
        createBy: null,
        createDate: null,
        updateBy: null,
        updateDate: null,
        remarks: null,
        delSwitch: null,
        taxType: "10",
        district: null,
        clienteleName: null,
        clientSource: null,
        industryName: null,
        companies: "是",
        userlabelIds: [],
      };
      this.resetForm("form");
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.renewals = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-vi {
  .product-list {
    min-height: 320px;
    max-height: 320px;
    height: 50vh;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
