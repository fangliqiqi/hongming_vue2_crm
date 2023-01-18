<template>
  <div class="edit_contact">
    <div class="contacts_vi">
      <el-row :gutter="20">
        <el-col :span="12" v-for="item in contactsList">
          <div class="contacts_item">
            <div class="title">
              <div>
                <img src="" />
                <el-input
                  class="name"
                  v-model="item.name"
                  placeholder="请填写姓名"
                  @change="updateContactFun({ name: $event }, item)"
                ></el-input>
              </div>
              <el-button type="danger" plain @click="delContactFun(item)"
                >删除
              </el-button>
            </div>
            <el-form label-width="40px" label-position="left" :inline="true">
              <el-form-item label="职位">
                <!-- <el-input
                  v-model="item.positionId"
                  placeholder="请填写职位"
                  @change="updateContactFun({ positionId: $event }, item)"
                ></el-input> -->
                <el-select
                  v-model="item.positionId"
                  @change="updateContactFun({ positionId: $event }, item)"
                  placeholder="请选择职位"
                >
                  <el-option
                    v-for="item in positionList"
                    :label="item.dictLabel"
                    :key="item.dictCode"
                    :value="item.dictCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机">
                <el-input
                  v-model="item.mobile"
                  placeholder="请填写手机"
                  @change="updateContactFun({ mobile: $event }, item)"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="item.officePhone"
                  placeholder="请填写电话"
                  @change="updateContactFun({ officePhone: $event }, item)"
                ></el-input>
              </el-form-item>
              <el-form-item label="微信">
                <el-input
                  v-model="item.wechatId"
                  placeholder="请填写微信"
                  @change="updateContactFun({ wechatId: $event }, item)"
                ></el-input>
              </el-form-item>
              <el-form-item label="QQ">
                <el-input
                  v-model="item.qqNumber"
                  placeholder="请填写QQ"
                  @change="updateContactFun({ qqNumber: $event }, item)"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="item.mailbox"
                  placeholder="请填写邮箱"
                  @change="updateContactFun({ mailbox: $event }, item)"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="contacts_add" @click="addContactFun">
            <div>
              <span></span>
              <span></span>
            </div>
            <span>新增联系人</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  delPersonnelList,
  addPersonnelList,
  updatePersonnelList
} from "../../../api/crm/customerService/agentAccount";
export default {
  props: {
    pId: {
      default: null
    },
    contactsList: {
      type: Array,
      default() {
        return [];
      }
    },
    //联系人数据
    paramsList: {
      type: Array,
      default() {
        return [{ name: "test", key: "test", tip: "test" }];
      }
    },
    //联系人
    getContacts: {
      type: Function,
      default: null
    }
  },
  name: "EditContact",
  data() {
    return {
      positionList: []
    };
  },
  created() {
    //职位
    this.getDicts("positionId").then(res => {
      this.positionList = res.data;
      // console.log(this.positionList);
    });
  },
  methods: {
    addContactFun() {
      let item = {
        email: "",
        id: null,
        name: "",
        companyId: this.pId,
        phone: "",
        positionName: "",
        qq: "",
        remark: "",
        tel: "",
        vx: ""
      };
      this.contactsList.push(item);
    },
    //新增联系人
    updateContactFun(data, row) {
      // console.log(row);
      data.companyId = this.pId;
      if (!row.name) {
        this.msgError("联系人姓名不能为空");
      } else if (!row.id) {
        addPersonnelList(data).then(res => {
          this.msgSuccess("新增联系人成功");
          this.getContacts(this.pId);
          // console.log(this.$parent)
        });
      } else {
        data.id = row.id;
        updatePersonnelList(data).then(res => {
          this.getContacts(this.pId);
        });
      }
    },

    //删除联系人
    delContactFun(row) {
      if (row.id) {
        this.$confirm("是否确认删除该联系人?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(function() {
            return delPersonnelList({ id: row.id });
          })
          .then(() => {
            this.getContacts(this.pId);
            this.msgSuccess("删除成功");
          })
          .catch(function() {});
      } else {
        this.contactsList.splice(this.contactsList.indexOf(row), 1);
      }

      // delPersonnelList({
      //   id: row.id,
      //   companyId: row.companyId
      // }).then(response => {});
    },
    //职位
    positionListFormat(row) {
      return this.selectDictLabel(this.positionId, row.positionId);
    }
  }
};
</script>

<style lang="scss"  >
.edit_contact {
  .contacts_vi {
    max-width: 100%;

    .contacts_add {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      align-items: center;
      justify-content: center;
      min-height: 420px;
      max-width: 100%;

      div {
        border-radius: 50%;
        width: 68px;
        height: 68px;
        border: 1px #e6e7eb dashed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        span {
          position: absolute;
          display: block;
          width: 30px;
          height: 1px;
          min-height: 1px;
          background-color: #e6e7eb;

          &:first-child {
            transform: rotate(90deg);
          }
        }
      }

      & > span {
        margin-top: 24px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #a1a2a6;
      }
    }

    .contacts_item {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      margin-bottom: 20px;
      max-width: 100%;
      border: 1px solid red;
      .title {
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e7eb solid;
        justify-content: space-between;
        padding: 0 32px;
        height: 60px;
        min-height: 60px;
        margin-bottom: 20px;

        & > div:first-child {
          display: flex;
          align-items: center;

          img {
            width: 28px;
            height: 28px;
            min-width: 28px;
            border-radius: 50%;
            overflow: hidden;
          }

          .name {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #303133;

            .el-input__inner {
              border-color: transparent !important;
            }
          }
        }
      }

      .el-form{
          max-width: calc(100% - 64px);
          width: 100%;
          margin-left: 32px;
          margin-bottom: 22px;
          .el-form-item{
            width: 100%;
            margin-right: 0;
            .el-form-item__content{
              width: calc(100% - 40px) !important ;
              .el-input{
                width: 100%;
                .el-input__inner{
                  width: 100%;
                }
              }
              .el-select{
                width: 100%;
              }
            }
          }
        }
    }
  }
}
</style>
