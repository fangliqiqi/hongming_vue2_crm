<template>
  <div class="drawer-container">
    <el-drawer
      v-bind="$attrs"
      custom-class="edit-vi"
      :visible.sync="open"
      :modal-append-to-body="false"
      :modal="false"
      :with-header="false"
    >
      <div class="title-vi">
        <div>
          <div>
            <i class="el-icon-s-opportunity"></i>
          </div>
          <span>{{ title }}</span>
        </div>
        <div class="control" >
          <el-dropdown @command="command" trigger="hover" v-show="settings && settings.length > 0">
            <span class="el-dropdown-link">
              <i class="el-icon-setting"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown">
              <el-dropdown-item
                v-for="(item, index) in settings"
                :icon="item.icon"
                :key="item.value || index"
                :command="item.value || index"
                >{{ item.lable }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <div @click="close">
            <i class="el-icon-close"></i>
          </div>
        </div>
      </div>
      <div class="content-vi">
        <slot></slot>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Drawer",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    beforeClose: {
      type: Function,
      default() {
        return null;
      },
    },
    command: {
      type: Function,
      default() {
        return function () {
          return false;
        };
      },
    },
    settings: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    open: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.drawer-container {
  max-height: 100%;
  overflow: hidden;
  .v-modal {
    background: transparent;
    opacity: 1;
  }
}
.el-drawer.rtl.edit-vi {
  top: 64px;
  height: calc(100% - 64px);
  min-width: 704px;
  overflow: auto;
  background: #f5f6f7;
  .title-vi {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 56px;
    border-bottom: 1px #e6e7eb solid;
    box-sizing: border-box;
    justify-content: space-between;
    & > div:first-child {
      margin-left: 24px;
      display: flex;
      align-items: center;
      & > div {
        margin-right: 8px;
        background: #3978e7;
        height: 28px;
        width: 28px;
        border-radius: 3px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span {
        color: #303133;
        font-family: Microsoft YaHei;
        font-size: 16px;
      }
    }
    .control {
      display: flex;
      align-items: center;
      & > * {
        height: 56px;
        max-height: 100%;
        width: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px #e6e7eb solid;
        cursor: pointer;
        user-select: none;
        &:hover {
          background: #ffffff;
        }
        .el-dropdown-link {
          user-select: none;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
        }
      }
    }
  }
  .content-vi {
    max-height: calc(100vh - 120px);
    overflow: auto;
    padding: 24px;
    box-sizing: border-box;
    .el-tabs {
      .el-tabs__header {
        background-color: #ffffff;
        margin-bottom: 0px;
      }
      .el-tabs__item.is-top {
        font-size: 14px;
        padding-left: 19px;
        padding-right: 19px;
        height: 56px;
        line-height: 56px;
        color: #303133;
        font-family: Microsoft YaHei;
        &:nth-child(2) {
          padding-left: 32px;
        }
        &:last-child {
          padding-right: 32px;
        }
      }
      .el-tabs__nav {
        max-width: 100%;
      }
      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }
      .el-tabs__content {
        margin-top: 20px;
        .el-tab-pane {
        }
      }
    }
    .el-tabs__content {
      /*background-color: #FFFFFF;*/
      .el-tab-pane {
        height: calc(100vh - 244px);
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        & > div {
          &::-webkit-scrollbar {
            display: none;
          }
          max-height: 100%;
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
  .footprint_list {
    max-height: 100%;
    overflow: auto;
    background-color: #ffffff;
    height: 100%;
    ul {
      margin-block-start: 0;
      margin: 0 32px;
      padding: 0;
    }
    .list-item {
      display: flex;
      align-items: center;
      height: 56px;
      box-sizing: border-box;
      border-bottom: 1px dashed #e6e7eb;
      .time {
        color: #87898c;
        font-size: 14px;
        font-family: Arial;
        margin-right: 32px;
      }
      .name {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #3978e7;
        margin-right: 32px;
      }
      .text {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #87898c;
      }
    }
  }
  .businiss_info {
    padding: 0 32px;
    max-height: 100%;
    overflow: auto;
    height: 100%;
    background-color: #ffffff;
    .relation_company {
      display: flex;
      align-items: center;
      border-bottom: 1px #e6e7eb dashed;
      img {
        height: 104px;
        width: 104px;
        min-width: 104px;
        margin: 42px 20px 42px 0px;
        border-radius: 50%;
      }
      div {
        display: flex;
        flex-direction: column;

        & > span {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #3a3b3d;
        }
        .el-button {
          margin-top: 12px;
          width: auto;
          align-self: flex-start;
          font-size: 14px;
        }
      }
    }
  }
  .el-form {
    margin: 24px 0;
    &.el-form--label-top {
      .el-form-item {
        .el-form-item__label {
          padding-bottom: 2px !important;
          color: #565759;
          font-family: Microsoft YaHei;
          font-size: 14px;
          font-weight: 400;
        }
        .el-textarea__inner {
          min-height: 117px !important;
          max-height: 117px !important;
        }
      }
    }
    .mw222 {
      max-width: 100%;
      width: 222px;
    }
    .el-form-item {
      .el-form-item__label {
        padding-bottom: 2px !important;
        color: #565759;
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: 400;
      }
      .el-textarea__inner {
        height: 117px !important;
        border-radius: 2px;
      }
    }
  }
  .follow_list {
    padding: 32px 0;
    overflow: auto;
    max-height: 100%;
    background-color: #ffffff;
    height: 100%;
    .add-button {
      width: calc(100% - 64px);
      margin-left: 32px;
      border: 1px #e6e7eb dashed;
      margin-bottom: 10px;
    }
    .el-form {
      width: calc(100% - 64px);
      margin-left: 32px;
      margin-bottom: 12px;
      .el-form-item__content {
        width: 100%;
        max-width: calc(100% - 108px);
        .el-textarea {
          width: 100%;
          .el-textarea__inner {
            height: 98px !important;
            width: 100%;
          }
        }
      }
      .el-form-item {
        margin-right: 0px;
        width: 100%;
      }
    }
    .follow_item {
      width: 100%;
      display: flex;
      border-top: 1px #e6e7eb solid;
      padding: 36px 32px;
      & > img {
        width: 48px;
        height: 48px;
        min-width: 48px;
        margin-right: 12px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px #e6e7eb solid;
      }
      & > div {
        display: flex;
        flex-direction: column;
        width: 100%;
        .info_vi {
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #a1a2a6;
            line-height: 24px;
            margin-right: 10px;
            &:first-child {
              color: #3978e7;
            }
          }
        }
        & > span {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565759;
          line-height: 24px;
          max-width: 100%;
        }
        .img_vi {
          display: flex;
          flex-wrap: wrap;
          border-bottom: 1px #e6e7eb solid;
          padding-bottom: 16px;
          .img {
            width: 96px;
            height: 40px;
            min-width: 96px;
            min-height: 40px;
            margin-right: 8px;
            margin-top: 8px;
          }
        }
        .next_vi {
          display: flex;
          width: 100%;
          padding-top: 12px;
          & > div {
            display: flex;
            flex-direction: column;
            flex: 2;
            &:last-child {
              flex: 3;
            }
            & > span {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              line-height: 24px;
              max-width: 100%;
              &:first-child {
                color: #a1a2a6;
              }
            }
          }
        }
      }
    }
  }
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
      .title {
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e7eb solid;
        justify-content: space-between;
        padding: 0 32px;
        height: 60px;
        min-height: 60px;
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
      .el-form {
        max-width: calc(100% - 64px);
        width: 100%;
        margin-left: 32px;
        .el-form-item {
          width: 100%;
          margin-right: 0;
          .el-form-item__content {
            width: calc(100% - 40px);
            .el-input {
              width: 100%;
              .el-input__inner {
                width: 100%;
              }
            }
            .el-select {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .company_vi {
    display: flex;
    flex-direction: column;
    .el-form {
      max-width: calc(100% - 64px);
      margin-left: 32px;
      margin-bottom: 12px;
      .el-form-item__label {
        height: 34px;
      }
      .el-input {
        width: 100%;
        .el-input__inner {
          width: 100%;
        }
      }
      .el-select {
        width: 100%;
      }
    }
    .add-button {
      width: 100%;
      border: 1px #e6e7eb dashed;
      margin-bottom: 10px;
    }
  }
  .contract_vi {
    background-color: #ffffff;
    height: auto;
    padding-bottom: 0px;
    .add-button {
      max-width: 100%;
      width: calc(100% - 64px);
      border: 1px #e6e7eb dashed;
      margin: 32px 32px 10px 32px;
    }
    .contract_list {
      margin-top: 12px;
      // border-top: 1px solid #e6e7eb;
      padding-left: 32px;
      padding-right: 32px;
      :nth-child(1).child {
        border: 0px;
      }
      .child {
        padding-top: 37px;
        padding-bottom: 23px;
        border-top: 1px dashed #e6e7eb;
        .title {
          display: flex;
          align-items: center;
          .link {
            width: 3px;
            height: 17px;
            margin-right: 10px;
            background: #3978e7;
          }
          .font {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #3a3b3d;
            margin-right: 16px;
          }
        }
        .kind {
          margin-top: 16px;
          .name {
            display: flex;
            flex-direction: column;
            span {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #6e7073;
              line-height: 32px;
              .span {
                margin-left: 15px;
              }
              .color {
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #3978e7;
                line-height: 34px;
              }
            }
            // .el-image {
            //   & > img {
            //     height: 39px;
            //     width: 96px;
            //     // background: pink;  //合同图片线上尺寸太小先隐掉测试
            //   }
            // }
          }
        }
      }
    }
  }
  .tag-vi {
    min-height: 117px;
    max-width: 100%;
    width: 592px;
    box-sizing: border-box;
    border: 1px #e6e7eb solid;
    border-radius: 2px;
    overflow: auto;
    display: flex;
    flex-flow: wrap;
    padding: 0 10px 10px 10px;
    max-height: 117px;
    align-content: flex-start;
    .el-tag {
      margin: 10px 2px 0 2px;
    }
    .button-new-tag {
      height: 32px;
      width: 92px;
      border: 1px #e6e7eb dashed;
      border-radius: 2px;
      background: #ffffff;
      box-sizing: border-box;
      margin: 10px 2px 0 2px;
    }
    .input-new-tag {
      height: 32px;
      width: 92px;
      box-sizing: border-box;
      margin: 10px 2px 0 2px;
    }
  }
}
.dropdown {
  margin-top: 0px !important;
  border-radius: 0 !important;
  min-width: 160px;
  transform: translateX(1px);
  .popper__arrow {
    visibility: hidden;
  }
}
</style>
