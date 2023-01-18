<template>
  <div class="contract_vi" style="background: #ffffff">
    <div class="contract" :style="pageStyle">
      <c-header :htNo="form.controlNo"></c-header>
      <div
        style="
          max-width: 100%;
          margin-left: 29pt;
          margin-right: 26pt;
          color: #231f20;
        "
      >
        <p
          style="
            margin-right: 2.65pt;
            text-align: center;
            white-space: pre-wrap;
            margin-top: 0;
          "
        >
          <span
            style="
              font-family: 'Microsoft YaHei';
              font-size: 21.5pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >莫的问题&middot;服务合同</span
          >
        </p>
        <p
          style="
            margin-right: 5.2pt;
            text-indent: 17.2pt;
            margin-top: 2.35pt;
            white-space: pre-wrap;
          "
        >
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >根据《中华人民共和国合同法》、《中华人民共和国公司法》、《中华人民共和国会计法》、《中华人民共和国税收征收管理法》之规定，甲乙双方经友好协商，就财税代理服务等有关业务事宜，达成如下协议：</span
          >
        </p>
        <table style="border-collapse: collapse" width="100%" border="1px">
          <tr>
            <td style="width: 300pt">
              <p
                style="
                  text-indent: 9.05pt;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                  white-space: pre-wrap;
                  display: inline-flex;
                "
              >
                <span
                  style="
                    font-size: 9pt;
                    font-weight: bold;
                    color: #231f20;
                    white-space: nowrap;
                  "
                  >甲方：{{ marketCompanyEssentialResult.companyName }}
                </span>
                <!--                <c-input style="font-size: 9pt;font-weight: bold;color: #231f20;" v-model="marketCompanyEssentialResult.companyName" ></c-input>-->
              </p>
            </td>
            <td>
              <p
                style="
                  text-indent: 9.05pt;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                  white-space: pre-wrap;
                  display: inline-flex;
                "
              >
                <span
                  style="
                    font-size: 9pt;
                    font-weight: bold;
                    color: #231f20;
                    white-space: nowrap;
                  "
                  >乙方：</span
                ><span
                  style="color: #231f20; white-space: pre-wrap; font-size: 11pt"
                  >安徽泓铭财务管理有限公司</span
                >
              </p>
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top">
              <p
                style="
                  text-indent: 9pt;
                  white-space: pre-wrap;
                  margin-top: 5pt;
                  display: inline-flex;
                "
              >
                <span style="font-size: 9pt; white-space: nowrap">地址：</span>
                <c-input
                  v-model="form.companyAdds"
                  cols="36"
                  rows="5"
                  style="
                    font-size: 9pt;
                    white-space: pre-wrap;
                    width: 260pt;
                    height: 80pt;
                  "
                  type="textarea"
                ></c-input>
              </p>
            </td>
            <td style="width: 301.2pt">
              <p
                style="
                  text-indent: 9pt;
                  white-space: pre-wrap;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                "
              >
                <span style="font-size: 9pt; white-space: pre-wrap"
                  >合肥总部地址：合肥市庐阳区四里河路与潜山路交口万科中心写字楼6楼</span
                >
              </p>
              <p
                style="
                  text-indent: 9pt;
                  white-space: pre-wrap;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                "
              >
                <span style="font-size: 9pt; white-space: pre-wrap"
                  >六安分公司地址：六安市裕安区高速财富广场24楼</span
                >
              </p>
              <p
                style="
                  text-indent: 9pt;
                  white-space: pre-wrap;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                "
              >
                <span style="font-size: 9pt; white-space: pre-wrap"
                  >安庆分公司地址：安庆市迎江区紫峰大厦B座14楼</span
                >
              </p>
              <p
                style="
                  text-indent: 9pt;
                  white-space: pre-wrap;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                "
              >
                <span style="font-size: 9pt; white-space: pre-wrap"
                  >宣城分公司地址：宣城市宣州区张果路科创中心3楼</span
                >
              </p>
              <p
                style="
                  text-indent: 9pt;
                  white-space: pre-wrap;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                "
              >
                <span style="font-size: 9pt; white-space: pre-wrap"
                  >池州分公司地址：池州市贵池区红森林国际大厦A座21楼</span
                >
              </p>
              <p
                style="
                  text-indent: 9pt;
                  white-space: pre-wrap;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                "
              >
                <span style="font-size: 9pt; white-space: pre-wrap"
                  >宿州分公司地址：宿州市埇桥区汴河路和淮海路交口中央广场C栋17楼</span
                >
              </p>
            </td>
          </tr>
          <tr>
            <td style="width: 223.8pt">
              <p
                style="
                  margin-left: 5.35pt;
                  white-space: pre-wrap;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: nowrap"
                  >联系方式：</span
                >
                <c-input
                  v-model="form.companyPhone"
                  style="width: 260pt"
                  :max="11"
                ></c-input>
              </p>
            </td>
            <td style="width: 301.2pt">
              <p
                style="
                  text-indent: 9pt;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                  white-space: pre-wrap;
                "
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: nowrap"
                  >联系方式：{{ salesman.mobilePhone }}</span
                >
                <!--                <c-input v-model="salesman.mobilePhone" :max="11"></c-input>-->
              </p>
            </td>
          </tr>
          <tr>
            <td style="width: 223.8pt">
              <p
                style="
                  margin-left: 5.35pt;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                  white-space: pre-wrap;
                "
              >
                <span
                  style="
                    font-size: 9pt;
                    color: #231f20;
                    white-space: pre-wrap;
                    margin-top: 3.5pt;
                    margin-bottom: 2pt;
                  "
                  >法定代表人：</span
                >
                <c-input
                  v-model="form.companyUserName"
                  style="width: 260pt"
                ></c-input>
              </p>
            </td>
            <td style="width: 301.2pt">
              <p
                style="
                  text-indent: 9pt;
                  margin-top: 3.5pt;
                  margin-bottom: 2pt;
                  white-space: pre-wrap;
                "
              >
                <span
                  style="
                    font-size: 9pt;
                    color: #231f20;
                    white-space: pre-wrap;
                    margin-top: 3.5pt;
                    margin-bottom: 2pt;
                  "
                  >联系人：{{ salesman.name }}</span
                >
                <!--                <c-input v-model="salesman.name"></c-input>-->
              </p>
            </td>
          </tr>
        </table>
        <p style="margin: 5pt 0; display: inline-flex">
          <span
            style="
              font-size: 9pt;
              font-weight: bold;
              color: #231f20;
              white-space: pre-wrap;
            "
            >一、甲方基本情况及服务内容</span
          >
        </p>
        <p style="margin: 0; white-space: pre-wrap">
          <span
            style="
              margin-left: 20pt;
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >受甲方委托，乙方为甲方提供以下财税代理等服务：（请在服务项目及甲方基本情况方框内打勾）</span
          >
        </p>
        <p style="margin: 5pt 0">
          <span style="font-size: 9pt; font-weight: bold; color: #231f20"
            >二、服务期限及服务费用</span
          >
        </p>
        <p
          style="
            margin-top: 0;
            margin-bottom: 7pt;
            text-indent: 20pt;
            position: relative;
          "
        >
          <c-checkbox
            v-model="form.check"
            style="position: absolute; left: 20pt; top: 2pt"
            readonly
          ></c-checkbox>
          <span
            style="
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 12pt;
            "
            >财税代理服务期限：</span
          >
          <c-input
            style="min-width: 35pt; border-bottom: 1px solid; height: 12pt"
            v-model="form.months"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >个月，首个报税月为</span
          >
          <c-input
            style="min-width: 35pt; border-bottom: 1px solid; height: 12pt"
            v-model="startTime.year"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >年</span
          >
          <c-input
            style="min-width: 35pt; border-bottom: 1px solid; height: 12pt"
            v-model="startTime.month"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >月，截止报税月为</span
          >
          <c-input
            style="min-width: 35pt; border-bottom: 1px solid; height: 12pt"
            v-model="endTime.year"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >年</span
          >
          <c-input
            style="min-width: 35pt; border-bottom: 1px solid; height: 12pt"
            v-model="endTime.month"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >月（以实际报税开始计算）</span
          >
        </p>
        <div
          class="table-vi"
          style="display: flex; width: 100%; flex-flow: wrap"
        >
          <div
            style="
              width: 100%;
              display: flex;
              border-left: 1px #000000 solid;
              border-top: 1px #000000 solid;
            "
          >
            <div style="flex: 1" v-for="(label, idx) in labels" :key="idx">
              <div
                class="tr"
                style="
                  width: 100%;
                  border: 1px #000000 solid;
                  border-left: 0;
                  border-top: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-sizing: border-box;
                "
                :style="table.td"
              >
                <c-checkbox
                  v-model="label.selectedType"
                  :readonly="label.readonly"
                  @change="(check) => labelChange(check, label)"
                >
                  <span
                    style="
                      font-size: 9pt;
                      color: #231f20;
                      white-space: pre-wrap;
                    "
                    >{{ label.name }}</span
                  ></c-checkbox
                >
              </div>
              <div style="width: 100%; display: flex; flex-flow: wrap">
                <div
                  v-for="(item, index) in label.child"
                  :key="index"
                  style="
                    width: 50%;
                    display: flex;
                    justify-content: center;
                    border: 1px #000000 solid;
                    border-top: 0;
                    border-left: 0;
                  "
                  :style="table.td"
                >
                  <c-checkbox
                    v-model="item.selectedType"
                    :readonly="item.readonly"
                    @change="(check) => labelChange(check, label, item)"
                  >
                    <span
                      style="
                        font-size: 9pt;
                        color: #231f20;
                        white-space: pre-wrap;
                      "
                      >{{ item.name }}</span
                    >
                  </c-checkbox>
                </div>
              </div>
            </div>
          </div>

          <!--            <div style="width:56%;">-->
          <!--              <div class="tr" style="width:100%;border: 1px #000000 solid;display: flex;align-items: center;justify-content: center;border-left: 0; " :style="table.td">-->
          <!--                <c-checkbox  type="checkbox" v-model="labels[1].selectedType" >-->
          <!--                  <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap">一般纳税人</span>-->
          <!--                </c-checkbox>-->
          <!--              </div>-->
          <!--              <div style="width:100%;display: flex;flex-flow: wrap;">-->
          <!--                <div v-for="(item,index) in labels[1].child" style="width: 50%;display: flex;justify-content: center;border: 1px #000000 solid;border-top: 0;border-left: 0;" :style="table.td">-->
          <!--                  <c-checkbox  v-model="item.selectedType" >-->
          <!--                    <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap" >{{item.name}}</span>-->
          <!--                  </c-checkbox>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->

          <div
            style="
              width: 60%;
              display: flex;
              flex-flow: wrap;
              justify-content: center;
              box-sizing: border-box;
              max-width: 60%;
            "
          >
            <div
              style="
                width: 100%;
                display: flex;
                flex-flow: wrap;
                justify-content: center;
                border: 1px #000000 solid;
                border-top: 0;
              "
              :style="table.td"
            >
              <span
                style="
                  font-size: 9pt;
                  font-weight: bold;
                  color: #231f20;
                  white-space: pre-wrap;
                "
                >财税代理服务</span
              >
            </div>
            <div style="flex: 1">
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <c-checkbox @change="changeCheck" v-model="form.check">
                  <span
                    style="
                      font-size: 9pt;
                      font-weight: bold;
                      color: #231f20;
                      white-space: pre-wrap;
                    "
                    slot="suffix"
                    >记账</span
                  >
                </c-checkbox>
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >建立账册</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >取得客户票据</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >核查客户票据</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >编制记账凭证</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >和客户确认税源</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >编制财务报表</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                ></span>
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                ></span>
              </div>
            </div>
            <div style="flex: 1">
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <c-checkbox v-model="form.check">
                  <span
                    slot="suffix"
                    style="font-size: 9pt; font-weight: bold; color: #231f20"
                    >报税</span
                  >
                </c-checkbox>
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >增值税申报</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >附加税申报</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >房产税申报</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >土地使用税申报</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >个人所得税申报</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >企业所得税申报</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >印花税申报</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >工会经费申报</span
                >
              </div>
            </div>
            <div style="flex: 1">
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <c-checkbox
                  style="
                    font-size: 9pt;
                    font-weight: bold;
                    color: #231f20;
                    white-space: pre-wrap;
                  "
                  v-model="form.check"
                >
                  <span
                    slot="suffix"
                    style="
                      font-size: 9pt;
                      font-weight: bold;
                      color: #231f20;
                      white-space: pre-wrap;
                    "
                    >凭证相关服务</span
                  >
                </c-checkbox>
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >打印凭证</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >整理凭证</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >粘贴凭证</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >装订凭证</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >打印纳税申报表</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >打印全年明细账</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >打印全年总账</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                ></span>
              </div>
            </div>
          </div>
          <div style="width: 40%; display: flex">
            <div style="width: 100%; display: flex; flex-direction: column">
              <div
                style="
                  width: 100%;
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td2"
              >
                <span
                  style="
                    font-size: 9pt;
                    font-weight: bold;
                    color: #231f20;
                    white-space: pre-wrap;
                  "
                  >其他服务（一年仅限一次）</span
                >
              </div>
              <div
                style="
                  width: 100%;
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <c-checkbox v-model="form.check">
                  <span
                    slot="suffix"
                    style="
                      font-size: 9pt;
                      color: #231f20;
                      white-space: pre-wrap;
                    "
                    >企业所得税汇算清缴</span
                  >
                </c-checkbox>
              </div>
              <div
                style="
                  width: 100%;
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <c-checkbox v-model="form.check">
                  <span
                    slot="suffix"
                    style="
                      font-size: 9pt;
                      color: #231f20;
                      white-space: pre-wrap;
                    "
                    >工商年报</span
                  >
                </c-checkbox>
              </div>
              <div
                style="
                  width: 100%;
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <c-checkbox v-model="form.check">
                  <span
                    slot="suffix"
                    style="
                      font-size: 9pt;
                      color: #231f20;
                      white-space: pre-wrap;
                    "
                    >残保金申报</span
                  >
                </c-checkbox>
              </div>
              <div
                v-for="(item, index) in 5"
                :key="index"
                style="
                  width: 100%;
                  display: flex;
                  flex-flow: wrap;
                  justify-content: center;
                  border: 1px #000000 solid;
                  border-top: 0;
                  border-left: 0;
                "
                :style="table.td"
              >
                <span
                  style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
                  >{{
                    (otherPro[index] && otherPro[index].serpriceName) || ""
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <p style="white-space: pre-wrap; margin: 0; margin-top: 4pt">
          <span
            style="
              margin-left: 14pt;
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >财税代理服务费为</span
          >
          <c-input
            style="
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
              min-width: 40pt;
              border-bottom: 1px solid;
              height: 12pt;
            "
            v-model="product.moneyReceived"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >元（大写：</span
          >
          <c-input
            style="
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
              min-width: 40pt;
              border-bottom: 1px solid;
              height: 12pt;
            "
            v-model="product.moneyReceivedStr"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >）；其他服务费为：</span
          >
          <c-input
            style="
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
              min-width: 40pt;
              border-bottom: 1px solid;
              height: 12pt;
            "
            v-model="form.otherMoneyHt"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >元(大写：</span
          >
          <c-input
            style="
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
              min-width: 40pt;
              border-bottom: 1px #231f20 solid;
              height: 12pt;
            "
            v-model="form.otherMoneyHtStr"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >），以上服务费共计：</span
          >
          <c-input
            style="
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
              min-width: 40pt;
              border-bottom: 1px #231f20 solid;
              height: 12pt;
            "
            :value="form.totalMoneyHt"
            readonly
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >元（大写：</span
          ><c-input
            style="
              font-size: 9pt;
              color: #231f20;
              white-space: pre-wrap;
              min-width: 40pt;
              border-bottom: 1px solid;
              height: 12pt;
            "
            readonly
            v-model="form.totalMoneyHtStr"
          ></c-input>
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >）；</span
          >
        </p>
        <p
          style="
            text-indent: 9pt;
            margin-top: 5pt;
            margin-bottom: 3.5pt;
            white-space: pre-wrap;
          "
        >
          <span style="font-size: 9pt; color: #231f20; white-space: pre-wrap"
            >在签订合同时甲方应直接支付现金或将服务费打入乙方指定账户。</span
          >
        </p>
      </div>
      <div
        style="
          max-width: 100%;
          margin-left: 29pt;
          margin-right: 26pt;
          font-family: SimSun;
          color: #231f20;
          height: 100pt;
        "
      >
        <div style="display: flex; font-family: SimSun">
          <div style="width: 70%">
            <p style="margin: 2pt 0; white-space: pre-wrap">
              <span
                style="
                  font-size: 10pt;
                  font-weight: bold;
                  white-space: pre-wrap;
                "
                >《乙方账户信息》</span
              >
            </p>
            <p style="white-space: pre-wrap; font-size: 10pt; margin: 8pt 20pt">
              <span id="_GoBack" /><span style="white-space: pre-wrap"
                >账户名称：安徽泓铭财务管理有限公司</span
              >
            </p>
            <p style="white-space: pre-wrap; margin: 8pt 20pt; font-size: 10pt">
              <span class="a X1" style="color: #231f20; white-space: pre-wrap"
                >银行账号：34050144370800000657</span
              >
            </p>
            <p style="margin: 5pt 20pt; white-space: pre-wrap">
              <span
                style="font-size: 10pt; color: #231f20; white-space: pre-wrap"
                >开户行：中国建设银行股份有限公司合肥长江东路支行</span
              >
            </p>
            <p style="margin-top: 0; margin-bottom: 0; white-space: pre-wrap">
              <span
                style="
                  font-size: 9pt;
                  font-weight: bold;
                  color: #231f20;
                  white-space: pre-wrap;
                "
                >三、合同具体条款详见后页（合同签订日开始至未产生服务之前，7天无理由退款）
              </span>
            </p>
          </div>
          <div
            style="
              width: 30%;
              font-size: 9pt;
              font-weight: bold;
              color: #231f20;
              white-space: pre-wrap;
              display: flex;
            "
          >
            <div style="display: flex; white-space: nowrap; margin-top: 2pt">
              乙方对公支付宝
            </div>
            <img
              :src="require('@/assets/image/contract/hmcwCode.png')"
              style="
                width: 217pt;
                position: relative;
                bottom: 60pt;
                object-fit: cover;
                transform: scale(0.5);
              "
            />
          </div>
        </div>
      </div>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          font-family: SimSun;
        "
      >
        <div class="footer" style="display: flex; width: 85%; font-size: 10pt">
          <div class="jia" style="width: 50%">
            <div
              class="item"
              style="margin-bottom: 10pt; margin-top: 5pt; position: relative"
            >
              甲方（授权委托人）签字：
              <div style="position: absolute; top: -10pt; left: 100pt">
                <slot name="jia"></slot>
              </div>
            </div>
            <div class="item" style="margin-bottom: 10pt">甲方盖章：</div>
            <div class="item" style="margin-bottom: 10pt">签署日期：</div>
            <!-- <div class="item" style="margin-bottom: 10pt">签署日期：{{parseTime(form.signingDate, '{y}年{m}月{d}日') }}</div> -->
          </div>
          <div class="yi" style="width: 50%; position: relative">
            <div class="item" style="margin-bottom: 10pt; margin-top: 5pt">
              乙方（授权委托人）签字：
            </div>
            <div class="item" style="margin-bottom: 10pt">乙方盖章：</div>
            <div class="item" style="margin-bottom: 10pt">
              签署日期：{{ parseTime(form.signingDate, "{y}年{m}月{d}日") }}
            </div>
            <div style="position: absolute; top: -30pt; left: 18pt">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="182px"
                height="173px"
                viewBox="0 0 182 173"
                enable-background="new 0 0 182 173"
                xml:space="preserve"
              >
                <image
                  id="image0"
                  width="182"
                  height="173"
                  x="0"
                  y="0"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAACtCAMAAAAqP3VuAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACslBMVEX//////f3+9/f+9PT8
              4uL72tr5wcH3rKz2nJz0iYnyc3PyeXnydHT3q6v5wMD72dn+/Pz71tb6ysr1lpb1lJT5xcX70dH+
              8/P++/v++vr97Oz2n5/xbGz1lZX6x8f96+v++fn+9vbxZ2f3qKj6z8/+9fX83Nz3qqrycHD0ior0
              h4f1mJj3rq73ra31mZn3pqb72Nj++Pj97u74tbXxaWnzf3/6zc3839///v783d30hYX5vLz96urz
              fX3zgoL85OT96en84eH3qanzenrydnb6xsb6yMjxbW360NDyb2/5w8P83t72np74t7f6y8v73+H1
              n6X1kpL4tLTuYGnygIf4v8P84ODycXH6zMz709Pyd3fydXX719f3p6f729v0hob6zs74s7P4srL8
              4+P0jIz97+/98PD0jY34urr5u7v98fH1k5PzgID71dXzhIT71NTzfn71j4/4sLD85ub5vb385eX5
              vr75wsL0i4v97e3ycnLxbm770tL0iIj96Ojze3vxZmb1l5f4uLj2nZ395+f5xMT3paX0jo7xa2vx
              aGj4trbzg4P2pKT2o6PzgYH+8vL5v7/xamr2oaH2mpr4ubn2oqL3r6/2m5v6ycnvV1ftOjrqHx/q
              Hh7qHBzqGhrqFxfpFRXqGRntQUHqGxvsMzPpFhbsLS3vU1PqGBjqICDrIiLsMjLvUVHrJSXrLCzw
              Xl7xZWXrJibwY2PtPDztPz/uSUnrIyPsNjbwYGDrJyfwW1vwWlrvVlbvVFTqHR3sNTXvT0/oIC3l
              ARDqISHuSEjsMDDrQEvsLi7uRETsNzfuQ0PrKiruSkruS0vvTk7uR0fsLy/rKyvtPT3uTEztQEDu
              TU3wXV3rKSnwXFzsNDTwYmLvWFjwWVntPj7rJCTuRUXwX1/tODjtQkLxZGTrKCj///8DJaVGAAAA
              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
              x3NGZ7eSOKFzeDkO+M+OxRNRO/6mdDtoRZ6HWo5zXO3zZzuHdPevM9SP46fP1pUHtX3ar35BeY9r
              DtIc3IqsN28o3+Hh+X4dvJ7oQqXbQCs38fLY9ifLeuR5Fa+VaxrRXcnBURN5hea35db8BlGI+K++
              SjeAVqbtFeXSc0rvK0C5p7iaf3z7jNL7ClDtdZhW1Tsm5rqBJfmqzaJ69clyqbqgmunivIcP13bT
              L+A0zBM/uzK1T/l+Byv74AJ+1v7Wm8svIDZVN4oq1mN3lVCt5aOlQ/iR8vq3z5b3FQZo3V//lz/m
              i4cbSud4duljAvSBc4s7ITcFrZW7wb+4YppSIugBR0RX/ynXuytE9bfKLZ0dP/P+Rk9Kyt14t3hv
              +jfje+g3ne78i9B9fcvLQ5YX489Xj554SGwAaPtu/M977ie0Nq54T/7QV8fUKUvTSXm+T+MCuSO0
              7aNJa1LdWzrwWz+zf+3rlQXjF9UkY1m+pmHKze/L+7Z+cn8Pg0aqfOiRAxL5tvZ36v40LVeY69nc
              osaHT3XIPdptHVOn99CPTwWpZtGEQ532lonm0y/Oq5vS0JCrzgY4n1dyV165+OGZH5x2fluwac/c
              0bneAc2pYtXETzw/dNjc3v7Ra3ffPWTShNXzzwea/0D/EfeMnfregfZOz0VHH67q9V8PzA+96dyD
              +wO/0bitpXkLp+bATx42Hz5035KNvfTze0GqmPZ03d7tnYXPoGjpfOX7lQ/17YUf3itE9TNuGTPr
              Dx8c2NncssP3Y5M7tjU3tZ+cOmvM8hm5/ydsDlC++qJ16/5226a6qwYu+/7U11+f+s2gmb97Yu76
              OQ9WJrSQP9APVDb6PybsIouVB0fcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTI0VDE4OjI1
              OjA0KzA4OjAwbYEfqgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0yNFQxODoyNTowNCswODow
              MBzcpxYAAAAgdEVYdHNvZnR3YXJlAGh0dHBzOi8vaW1hZ2VtYWdpY2sub3JnvM8dnQAAABh0RVh0
              VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQA
              MTczqdlsTQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxODLKtxBJAAAAGXRFWHRUaHVtYjo6
              TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE2MjE4NTE5MDRy7uZE
              AAAAE3RFWHRUaHVtYjo6U2l6ZQAxNTc4MUJCM4JrkAAAAEZ0RVh0VGh1bWI6OlVSSQBmaWxlOi8v
              L2FwcC90bXAvaW1hZ2VsYy9pbWd2aWV3Ml85XzE2MDk5MDM1MTM2MTk4Mjc0XzU0X1swXY/mtDMA
              AAAASUVORK5CYII="
                ></image>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <c-footer></c-footer>
    </div>
    <div style="page-break-after: always"></div>
    <div class="contract" :style="pageStyle">
      <c-header :htNo="htNumber"></c-header>
      <div
        style="
          max-width: 100%;
          margin-left: 25pt;
          margin-right: 26pt;
          margin-top: 20pt;
          margin-bottom: 20pt;

          font-size: 8pt;
          color: #231f20;
        "
      >
        <p style="white-space: pre-wrap; margin: 15pt 0 0 3.5pt">
          <span id="页_2" /><span style="font-weight: bold; color: #231f20"
            >一、甲方的权利与义务</span
          >
        </p>
        <p style="margin: 0">
          <span
            style="font-family: 'FangSong'; color: #231f20; margin: 0 0 0 20pt"
            >1、此合同视为甲方向乙方出具的授权书，本合同签署后乙方有权以甲方名义从事本合同约定的代办服务。</span
          >
        </p>
        <p style="margin: 0">
          <span
            style="font-family: 'FangSong'; color: #231f20; margin: 0 0 0 20pt"
            >2、在乙方的受托代办过程中，甲方应积极协助乙方工作；甲方认可乙方具有代办本合同约定服务的专业资质和能力，无正当理由不得干涉乙方的代办服务。</span
          >
        </p>
        <p style="margin: 0">
          <span style="font-family: '仿宋'; color: #231f20; margin: 0 0 0 20pt"
            >3、甲方应根据《中华人民共和国会计法》、《企业会计准则》、《小企业会计准则》和相关税法，建立企业的财务管理制度。</span
          >
        </p>
        <p style="margin: 0">
          <span style="font-family: '仿宋'; color: #231f20; margin: 0 0 0 20pt"
            >4、甲方应安排专人负责出纳工作，及时登记现金、银行存款日记账，收集、保管、整理需要入账的原始单据，按双方约定的时间移交给乙方，甲方未在规定时间或超过乙方通知时间提供资料的，甲方自行解决资料交接事宜，因此引起的延误风险、损失及责任，由甲方承担。</span
          >
        </p>
        <p style="margin: 0">
          <span
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin: 0 0 0 20pt;
            "
            >5、甲方应定期与乙方提供的账面数额进行核对并确保乙方不受限制地接触本合同项下代理服务事项必要的资料和信息，并有效答复乙方工作人员对有关事项的询问。</span
          >
        </p>
        <p style="margin: 0 0 3.5pt 0">
          <span
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin: 0 0 0 20pt;
            "
            >6、为保证乙方记账、报税工作的顺利开展，甲方需在合理期间内向乙方提供以下资料和信息：</span
          >
        </p>
        <p style="margin: 0">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >1)营业执照复印件；2)验资报告复印件；3)开户许可证复印件；4)银行基本存款账户及纳税专户账号；5)企业报税的计算机代码；6)公司地址及电话；7)分管税务局（税务专管员）联系电话；8)公司负责人的联系方式，</span
          >
        </p>
        <p class="a a6" style="margin: 0; white-space: pre-wrap">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >其中验资报告复印件及企业报税的计算机代码，可根据行业情况自行选择是否提供，除此两项外其他资质均需提供。</span
          >
        </p>
        <p class="a a6" style="margin: 0; white-space: pre-wrap">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >7</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、为保证乙方记账、报税工作的顺利完成，甲方应于每月</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
          >
            30 </span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >日前将当月会计做账所需完整、有效的原始票据及资料移交乙方：</span
          >
        </p>
        <p class="a a7" style="white-space: pre-wrap; margin: 0">
          <span class="a a7" style="white-space: pre-wrap; margin-left: 20pt"
            >1) </span
          ><span
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >银行业务：现金支票根、转账支票根、银行进账单、银行汇款单、银行无承付通知单、银行利息单等；</span
          >
        </p>
        <p class="a a7" style="white-space: pre-wrap; margin: 0">
          <span class="a a7" style="white-space: pre-wrap; margin-left: 20pt"
            >2) </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >现金业务：有负责人或经手人签字的企业报销的支出凭单、使用现金购买物品的各类发票、工资表、</span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >现金收支票据等；</span
          >
        </p>
        <p class="a a7" style="white-space: pre-wrap; margin: 0">
          <span class="a a7" style="white-space: pre-wrap; margin-left: 20pt"
            >3) </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >一般纳税人：购入商品（或产品）的发票及入库单、销售商品（或产品）的出库单、增值税发票的认证清单、销售发票的抄税清单等；</span
          >
        </p>
        <p class="a a7" style="white-space: pre-wrap; margin: 0">
          <span class="a a7" style="white-space: pre-wrap; margin-left: 20pt"
            >4) </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >发票：企业开具的收入发票、发票使用明细表、发票使用汇总表等；</span
          >
        </p>
        <p class="a a7" style="white-space: pre-wrap; margin: 0">
          <span class="a a7" style="white-space: pre-wrap; margin-left: 20pt"
            >5) </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >库存商品（或产品）盘存表；</span
          >
        </p>
        <p class="a a7" style="white-space: pre-wrap; margin: 0">
          <span class="a a7" style="white-space: pre-wrap; margin-left: 20pt"
            >6) </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >报税所需证件及其他会计资料等。</span
          >
        </p>
        <p class="a a6" style="white-space: pre-wrap; margin: 0">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >8</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、在甲方已与银行签署三方协议的情况下，应确保银行账户中有足额资金用于缴纳税款</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >；如甲方未签署三方协议，则应在乙方完成纳税申报后自行、及时完成税金的缴纳。由于甲方银行账户余额不足，忽视、不配合、或乙方经努力无法与甲方取得联系而引起的漏纳税、迟纳税及相关部</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >门的处罚等责任由甲方承担，因此给</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >乙方造成损失的，甲方应负责赔偿。</span
          >
        </p>
        <p class="a a6" style="margin: 0">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >9</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、甲方应保证移交给乙方的所有资料和文件的合法性、真实性、完整性，如因甲方提供的资料和文件不合法、不真实、不完整、不及时或者因存在法定代表人</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >和股东被纳入工商局和税务局黑名单等异常情况而引起多纳税、少纳税、漏纳税、迟纳税进而受到相关部门处罚的，甲方应负全部责任。</span
          >
        </p>
        <p class="a a6" style="margin: 0">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >10</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、甲方对于乙方退回的不符合法律规定或者会计制度的证明文件、原始票据等，应当及时予以更正、补充，因未及时更正补充而造成的损失由甲方负责。</span
          >
        </p>
        <p class="a a6" style="margin: 0; white-space: pre-wrap">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >11</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、甲方应配备或指定专人做好相关资料传递工</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >作，并进行登记。甲方传递会计资料过程中非因乙方原因发生的各种问题，由甲方自行负责解决并承担责任。</span
          >
        </p>
        <p class="a a6" style="margin: 0">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >12</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、甲方的住所、经营地址、开户银行、法人代表、联系人、联系电话等关键信息发生变更的，应及时将变更后的详细情况书面通知乙方，否则因此延误了公司</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >正常报税等相关工作的，甲方应负全部责任。甲方企业公司名称的变更需提前告知乙方，如无特殊声明，本合同将继续生效于变更后的公司。</span
          >
        </p>
        <p class="a a6" style="margin: 0">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >13</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、在报税期，甲方需向乙方提供公章、财务章、人名章等相关资料，如因甲方原因未提供或延迟提供相关资料，影响相关业务办理的，由甲方承担责任。</span
          >
        </p>
        <p class="a a6" style="margin: 0">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >14</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >甲方应及时、足额向乙方支付相应服务费。</span
          >
        </p>
        <p class="a a6" style="margin: 0">
          <span
            class="a a6"
            style="
              font-family: '仿宋';
              color: #231f20;
              white-space: pre-wrap;
              margin-left: 20pt;
            "
            >15</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、甲方承诺并保证在服务期内以及服务期限届满后一年内，不从事劝说乙方员工脱离乙方单位的行为，不得聘用乙方员工为甲方或甲方的关联企业服务。</span
          >
        </p>
        <p class="a X3" style="white-space: pre-wrap; margin: 3.5pt 0 3.5pt 0">
          <span
            class="a X3"
            style="font-weight: bold; color: #231f20; white-space: pre-wrap"
            >二、乙方的权利与义务</span
          >
        </p>
        <p
          class="a a6"
          style="text-indent: 20pt; white-space: pre-wrap; margin: 0"
        >
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >1</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方根据《中华人民共和国公司法》、《中华人民共和国行政许可法》、《中华人民共和国公司登记管理条例》、《中华人民共和国企业法人登记管理条例》、《中</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >华人民共和国会计法》、《企业会计准则》、《企业会计通则》、《小企业会计准则》及其他相关的法律和政策的要求，开展企业财务票据处理服务。</span
          >
        </p>
        <p class="a a6" style="text-indent: 20pt; margin: 0">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >2</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方应根据甲方所提合法合</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >理的要求及甲方移交的会计资料，按照相关法律规定及时准确地完成委托代理业务。乙方不得擅自更改其中条款，如有与政策相</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >抵触时，应及时通知甲方。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >3</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方应尽合理的努力，及时提醒甲方按时将当月记账、纳税等委托服务所需的真实、合法、完整、准确、有效的原始票据及资料移交乙方。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >4</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方根据甲方移交的会计资料应按时或按我国法律法规、政策等规定的时间完成受托业务，并保证其正确性、合法性。在甲方要求乙方做出不当的会计处理，</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >提供不实的会计资料，以及其他不符合法律、法规和国家会计准则的行为的，乙方有权拒绝。乙方有义务针对甲方违反</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >相关法律法规的事项向甲方提示风险，并给出</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >必要的规范</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >/</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >调整建议。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >5</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方有义务参加甲方的税务稽查或相关部门需要的账务解释工作。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >6</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方承担由乙方记账方法错误造成甲方逾期报税所导致的罚款及滞纳金。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >7</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方为履行本合同而制作的全部材料的所有权归甲方所有。在合同履行期内或合同履行结束后，乙方因履行本合同而知悉的甲方任何信息均为甲方商业秘密，</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >包含但不限于：财务资料、经营信息、客户信息、员工信息、技术信息等，乙方未经甲方书面允许不得披露、使用或允许他人使用。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >8</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方应妥善保管好甲方移交的资料、物品的原件、原物及</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >复印件，包括但不限于：全部会计资料、证照、公章、人名章等，由于乙方原因造成甲方前述资料、</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >物品遗失，乙方应积极采取补救措施，并承担相关补救费用，同时赔偿甲方因此受到的经济损失。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >9</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方经营地址、联系电话变更、需及时将详细情况通知甲方，因乙方未及时通知甲方而延误记账、报税工作，责任由乙方承担。乙方企业公司名称的变更需</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >告知甲方，如无特殊声明，本合同将继续生效于变更后的公司。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >10</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方仅对本合同服务期限内的代办服务负责。对于本合同签署前以及服务期限届满后的与本合同代办服务有关的工作，乙方可向甲方提供合理协助，但</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >并不</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >承担相应的法律及经济责任。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >11</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方不参与甲方具体的生产经营，不对甲方的任何经营风险及相应的法律、经济责任负责。乙方只对甲方提供的会计资料按会计制度规定和税法规定进行记</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
          >
          </span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >账和纳税申报，对于甲方没有按本合同约定提供真实、合法、完整、准确、有效的资料、信息而产生的行政、刑事及民事责任，甲方应全部承担并积极出面予以妥善</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >解决。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >12</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、基于财务核算、纳税计算处理方式的固有限制，以及甲方内部控制的固有局限，乙方经过尽责审核后仍然可能存在未被发现的风险；乙方就委托服务事项出</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >具的各类报表不能因此减轻上述风险可能产生的</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >甲方应当承担的法律责任。</span
          >
        </p>
        <p class="a X3" style="white-space: pre-wrap; margin: 3.5pt 0 0 3.5pt">
          <span
            class="a X3"
            style="font-weight: bold; color: #231f20; white-space: pre-wrap"
            >三、违约责任</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >1</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、任何一方违反合同的约定，给对方造成损失的，应承担违约责任。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >2</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙方无正当理由，因逾期、错误、违法代办服务致使甲方名誉受损或受到经济损失的，乙方应协助甲方处理相关部门或单位的问询、调查、稽查等活动，并</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >承担甲方因此受到的损失的责任。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >3</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、甲方无正当理由未依本合同约定的金额及期限向乙方支付代理服务费的，乙方有权暂停为甲方提供相应的代办服务，由服务中断而产生的包括但不限于业务</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >停办、税务机关等相关部门的处罚由甲方负全部责任。</span
          >
        </p>
        <p class="a X3" style="white-space: pre-wrap; margin: 3.5pt 0 0 3.5pt">
          <span
            class="a X3"
            style="font-weight: bold; color: #231f20; white-space: pre-wrap"
            >四、合同终止与解除</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >1</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、除非本合同另有约定，甲</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、乙任何一方提出终止合作，应提前以书面形式通知对方</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >，双方在乙方所在地进行财务交接。如甲方在合同未到期之前提出终止本合同，已经支付的服务费不予退还，乙方应将甲方电子账目和其他材料退还甲方；如乙方无本合同约定的理由而在合同未到期之前提出终止本合同，则乙方负责完成</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
          >
          </span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >当月的报税工作，并退还剩余服务费。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >2</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、甲方有下列情形之一的，乙方有权解除合同而不承担任何违约责任：</span
          >
        </p>
        <p class="a a7" style="margin: 0; text-indent: 20pt">
          <span class="a a7" style="white-space: pre-wrap">1） </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >甲方未及时支付服务费；</span
          >
        </p>
        <p class="a a7" style="margin: 0; text-indent: 20pt">
          <span class="a a7" style="white-space: pre-wrap">2） </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >甲方存在违法违规行为的；</span
          >
        </p>
        <p class="a a7" style="margin: 0; text-indent: 20pt">
          <span class="a a7" style="white-space: pre-wrap">3） </span
          ><span
            class="a a7"
            style="
              font-family: '仿宋';
              font-size: 7pt;
              color: #231f20;
              white-space: pre-wrap;
            "
            >甲方存在违反本合同甲方义务的行为，以至影响乙方继续向其提供本合同所述服务的。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >3</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、合同到期终止或提前</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >解除后，双方应完成原有委托服务的交接工作，乙方将其在服务期间留存的甲方资料交还至甲方并签署交接单，双方配合完成相关银行、</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >税务、工商等部门与乙方有关的相关联系人信息的变更。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >4</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、无论本合同因何种原因终止或解除，若甲方曾使用乙方会计人员的证件，甲方需先到税务所将有关办税人员、购票人员、一般纳税人主管会计人员等进行证</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
          >
          </span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >件变更，变更完毕后将变更复印件交乙方备案。</span
          >
        </p>
        <p class="a X3" style="margin: 3.5pt 0 0 3.5pt">
          <span
            class="a X3"
            style="font-weight: bold; color: #231f20; white-space: pre-wrap"
            >五、不可抗力</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >1</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、本合同所称不可抗力包括但不限于火灾、爆炸、台风、洪水、地震、潮汐、雷电、战争、供电、电信及通信设备中断、罢工、政府管制等不能</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >避免的事件。</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
          >
          </span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >任何一方因不可抗力的发生而不能履行或不能完全履行本合同项下的有关义务时，该方不承担违约责任；在不可抗力影响消除后的合理时间内，该方应当继续履行本</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >合同。遇有上述不可抗力事故的一方，应立即将事故情况通知对方，并应在十五天内提供事故详情及合同不能履行、或者部分不能履行、或者需要延期履行的理由的</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >有效证明文件，按照事故对履行合同影响的程度，由双方协商决定是否解除合同，或者部分免除合同履行义务，或者延期履行合同。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >2</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、因法律法规变更、废止及政府政策调整等情形，导致不能继续履行合同或者不能实现合同目</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >的，乙方免责，由甲方承担合同签订及履行已经实际发生的费用、</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >损失以及乙方已经完成工作或实际付出的劳动应当获得的合理报酬。</span
          >
        </p>
        <p class="a X3" style="white-space: pre-wrap; margin: 3.5pt 0 0 3.5pt">
          <span
            class="a X3"
            style="font-weight: bold; color: #231f20; white-space: pre-wrap"
            >六、其他约定</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >1</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、凡因执行本协议所发生的，或与本协议有关的一切争议，双方应通过友好协商解决；如果协商不能解决，应向乙方住所地人民法院提起诉讼，在争议解决过</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
          >
          </span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >程中，除双方有争议正在进行诉讼的部分外，本协议应继续履行。本协议适用中国法律。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >2</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、本协议自双方法定代表人或授权代表签字盖章</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >及甲方付款</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >之日起生效。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >3</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、本协议一式两份，甲乙双方各执一份，具有同等法律效力。</span
          >
        </p>
        <p class="a a6" style="margin: 0; text-indent: 20pt">
          <span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >4</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >、本合同期满后，</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >如双方均无异议</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >（如有异议，须提前一个月以书面通知提出</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >）</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >，合同自动顺延，可根据实际情况重新调整服务期限。</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >服务费用以乙方当期最新</span
          ><span
            class="a a6"
            style="font-family: '仿宋'; color: #231f20; white-space: pre-wrap"
            >服务报价方案标准重新进行核算计费，若收费产生较大变动的，可对服务费用另行约定。</span
          >
        </p>
      </div>
      <c-footer></c-footer>
    </div>
  </div>
</template>

<script>
import cHeader from "./header001";
import cFooter from "./footer001";
import {
  getContractInfo,
  uploadHt,
  getXufeiContractInfo,
  findUpdateBlankContract,
} from "@/api/crm/contract";
import cCheckbox from "./c-checkbox";
import cInput from "./c-input";
import { toChinesNum } from "@/utils/hmt";
export default {
  name: "contract001",
  components: { cHeader, cFooter, cCheckbox, cInput },
  data() {
    return {
      table: {
        tr: {},
        td: {
          "min-height": "14pt",
          display: "flex",
          "align-items": "center",
          "box-sizing": "border-box",
        },
        td2: {
          "min-height": "calc(28pt + 0px)",
          display: "flex",
          "align-items": "center",
          "box-sizing": "border-box",
        },
      },
      a4h: 297,
      a4w: 210,
      pageStyle: {
        width: "696pt",
        height: "calc(696pt * 841.89 / 592.28)",
      },
      form: {
        months: "",
        check: false,
      },
      marketCompanyEssentialResult: {},
      salesman: {},
      htNumber: "",
      labels: [],
      inputShow: 0,
      startTime: {
        year: "",
        month: "",
      },
      endTime: {
        year: "",
        month: "",
      },
      product: {},
      otherPro: [],
      renewForm: {},
      isOpen: false,
    };
  },
  computed: {
    sumPrice() {
      return (
        parseFloat(this.form.otherPrice || 0) +
        parseFloat(this.product.moneyReceived || 0)
      );
    },
  },
  created() {},
  methods: {
    //续费合同的查询数据
    getInfoXuFei(id, renewForm) {
      getXufeiContractInfo({ id: id })
        .then((res) => {
          this.htNumber = res.data.htNumber;
          let data = res.data || {};
          this.marketCompanyEssentialResult = data.company || {};
          this.salesman = data.salesman || {};
          let labelId = [],
            labelZiId = [];
          this.labels = (res.data.label || []).map((item) => {
            if (item.selectedType == 10 || item.selectedType == "10") {
              item.selectedType = true;
              labelId.push(item.id);
            } else {
              item.selectedType = false;
            }
            item.readonly = true;
            item.child.map((ite) => {
              ite.readonly = !item.selectedType;
              if (ite.selectedType == 10 || ite.selectedType == "10") {
                ite.selectedType = true;
                labelZiId.push(ite.id);
              } else {
                ite.selectedType = false;
              }
              return ite;
            });
            return item;
          });
          var labelsData = this.labels;
          let productArr = data.product || [],
            otherPrice = 0;
          let product = { startTime: "", endTime: "" };
          this.product = product;
          this.product.moneyReceived = renewForm.money;
          if (this.product.moneyReceived) {
            this.product.moneyReceivedStr = toChinesNum(renewForm.money) + "元";
          } else {
            this.product.moneyReceivedStr = "";
          }
          let startTimeArr = renewForm.servicePeriodStart.split("-");
          let endTimeArr = renewForm.projectParam.endTime.split("-");
          this.startTime = {
            year:
              startTimeArr && startTimeArr.length > 2 ? startTimeArr[0] : "",
            month:
              startTimeArr && startTimeArr.length > 2 ? startTimeArr[1] : "",
          };
          this.endTime = {
            year: endTimeArr && endTimeArr.length > 2 ? endTimeArr[0] : "",
            month: endTimeArr && endTimeArr.length > 2 ? endTimeArr[1] : "",
          };
          var year1 = parseInt(this.startTime.year),
            month1 = parseInt(this.startTime.month),
            year2 = parseInt(this.endTime.year),
            month2 = parseInt(this.endTime.month);
          //通过年,月差计算月份差
          let months = (year2 - year1) * 12 + (month2 - month1) + 1;
          let companyAdds = this.marketCompanyEssentialResult.address || "";
          let province = this.marketCompanyEssentialResult.province || "";
          let city = this.marketCompanyEssentialResult.city || "";
          let county = this.marketCompanyEssentialResult.county || "";

          if (companyAdds.indexOf(county) == -1) {
            companyAdds = county + companyAdds;
          }
          if (companyAdds.indexOf(city) == -1) {
            companyAdds = city + companyAdds;
          }
          if (companyAdds.indexOf(province) == -1) {
            companyAdds = province + companyAdds;
          }
          renewForm.address = companyAdds;
          renewForm.legalPerson = {
            name: "",
            mobile: "",
          };
          renewForm.labelParams = [];
          renewForm.selectAllType = "10";
          this.renewForm = renewForm;
          data = data.company;
          if (this.marketCompanyEssentialResult.linkmanPhone) {
            this.renewForm.legalPerson.mobile =
              this.marketCompanyEssentialResult.linkmanPhone;
          }
          if (this.marketCompanyEssentialResult.legalName) {
            this.renewForm.legalPerson.name =
              this.marketCompanyEssentialResult.legalName;
          }
          data.totalMoneyHt =
            this.product.moneyReceived + Number(data.otherMoneyHt || 0);
          data.totalMoneyHtStr = toChinesNum(data.totalMoneyHt) + "元";
          this.form = Object.assign({
            name: "莫的问题服务合同",
            controlNo: res.data.htNumber,
            busirSerpriceIds: "",
            chargePeriod: product.cycleType || "",
            companyId: this.salesman.companyId,
            compayBusirId: data.id,
            marketBusirSerpriceParams: data.marketBusirSerprices,
            orderType: data.type,
            companyPhone: this.marketCompanyEssentialResult.linkmanPhone || "",
            companyUserName: this.marketCompanyEssentialResult.legalName || "",
            companyAdds: companyAdds,
            months: months || "",
            servicePeriodStart: data.startTime,
            servicePeriodEnd: data.endTime,
            check: true,
            otherPrice: otherPrice,
            firmId: data.firmId || "",
            firmName: data.firmName || "",
            lableId: "",
            lableZiId: "",
            signBill: "",
            signingDate: data.createDate || "",
            validity: "",
            formlableId: labelId.join(",") || "",
            formlableZiId: labelZiId.join(",") || "",
            totalMoneyHtStr: data.totalMoneyHtStr || "零元",
            totalMoneyHt: data.totalMoneyHt || "0",
            otherMoneyHt: data.otherMoneyHt || "0",
            otherMoneyHtStr: data.otherMoneyHtStr || "零元",
            money: data.totalMoneyHt || "0",
            serviceItems: res.data.serviceItems,
          });
          if (!this.form.companyPhone && this.renewForm.legalPerson.mobile) {
            this.form.companyPhone = this.renewForm.legalPerson.mobile;
          }
          var list = JSON.parse(sessionStorage.getItem("needData") || "{}");
          console.log(list);
          var labels = JSON.parse(sessionStorage.getItem("labels") || "[]");
          console.log(labels);
          console.log(labelsData);
          this.form.companyPhone = list.companyPhone || this.form.companyPhone;
          this.form.companyUserName =
            list.companyUserName || this.form.companyUserName;
          this.form.companyAdds = list.companyAdds || this.form.companyAdds;
          this.form.check = list.check || this.form.check;
          this.labels = labels == "" ? labelsData : labels;
        })
        .catch((req) => {
          this.$emit("close", 10);
        });
    },
    //续费合同的查询数据
    updateXuFei(id, renewForm) {
      this.isOpen = true;
      sessionStorage.setItem("isOpen", JSON.stringify(this.isOpen));
      findUpdateBlankContract({ id: id })
        .then((res) => {
          this.htNumber = res.data.htNumber;
          let data = res.data || {};
          this.marketCompanyEssentialResult = data.company || {};
          this.salesman = data.salesman || {};
          let labelId = [],
            labelZiId = [];
          this.labels = (res.data.label || []).map((item) => {
            if (item.selectedType == 10 || item.selectedType == "10") {
              item.selectedType = true;
              labelId.push(item.id);
            } else {
              item.selectedType = false;
            }
            item.readonly = true;
            item.child.map((ite) => {
              ite.readonly = !item.selectedType;
              if (ite.selectedType == 10 || ite.selectedType == "10") {
                ite.selectedType = true;
                labelZiId.push(ite.id);
              } else {
                ite.selectedType = false;
              }
              return ite;
            });
            return item;
          });
          console.log(this.labels);
          var labelsData = this.labels;
          let productArr = data.product || [],
            otherPrice = 0;
          let product = { startTime: "", endTime: "" };
          this.product = product;
          this.product.moneyReceived = renewForm.money;
          if (this.product.moneyReceived) {
            this.product.moneyReceivedStr = toChinesNum(renewForm.money) + "元";
          } else {
            this.product.moneyReceivedStr = "";
          }
          let startTimeArr = renewForm.servicePeriodStart.split("-");
          let endTimeArr = renewForm.projectParam.endTime.split("-");
          this.startTime = {
            year:
              startTimeArr && startTimeArr.length > 2 ? startTimeArr[0] : "",
            month:
              startTimeArr && startTimeArr.length > 2 ? startTimeArr[1] : "",
          };
          this.endTime = {
            year: endTimeArr && endTimeArr.length > 2 ? endTimeArr[0] : "",
            month: endTimeArr && endTimeArr.length > 2 ? endTimeArr[1] : "",
          };
          var year1 = parseInt(this.startTime.year),
            month1 = parseInt(this.startTime.month),
            year2 = parseInt(this.endTime.year),
            month2 = parseInt(this.endTime.month);
          //通过年,月差计算月份差
          let months = (year2 - year1) * 12 + (month2 - month1) + 1;
          let companyAdds = this.marketCompanyEssentialResult.address || "";
          let province = this.marketCompanyEssentialResult.province || "";
          let city = this.marketCompanyEssentialResult.city || "";
          let county = this.marketCompanyEssentialResult.county || "";

          if (companyAdds.indexOf(county) == -1) {
            companyAdds = county + companyAdds;
          }
          if (companyAdds.indexOf(city) == -1) {
            companyAdds = city + companyAdds;
          }
          if (companyAdds.indexOf(province) == -1) {
            companyAdds = province + companyAdds;
          }
          renewForm.address = companyAdds;
          renewForm.legalPerson = {
            name: "",
            mobile: "",
          };
          renewForm.labelParams = [];
          renewForm.selectAllType = "10";
          this.renewForm = renewForm;
          data = data.company;
          if (this.marketCompanyEssentialResult.linkmanPhone) {
            this.renewForm.legalPerson.mobile =
              this.marketCompanyEssentialResult.linkmanPhone;
          }
          if (this.marketCompanyEssentialResult.legalName) {
            this.renewForm.legalPerson.name =
              this.marketCompanyEssentialResult.legalName;
          }
          data.totalMoneyHt =
            this.product.moneyReceived + Number(data.otherMoneyHt || 0);
          data.totalMoneyHtStr = toChinesNum(data.totalMoneyHt) + "元";
          this.form = Object.assign({
            name: "莫的问题服务合同",
            controlNo: res.data.htNumber,
            busirSerpriceIds: "",
            chargePeriod: product.cycleType || "",
            companyId: this.salesman.companyId,
            compayBusirId: data.id,
            marketBusirSerpriceParams: data.marketBusirSerprices,
            orderType: data.type,
            companyPhone: this.marketCompanyEssentialResult.linkmanPhone || "",
            companyUserName: this.marketCompanyEssentialResult.legalName || "",
            companyAdds: companyAdds,
            legalId:this.marketCompanyEssentialResult.legalId || "",
            months: months || "",
            servicePeriodStart: data.startTime,
            servicePeriodEnd: data.endTime,
            check: true,
            otherPrice: otherPrice,
            firmId: data.firmId || "",
            firmName: data.firmName || "",
            lableId: "",
            lableZiId: "",
            signBill: "",
            signingDate: data.createDate || "",
            validity: "",
            formlableId: labelId.join(",") || "",
            formlableZiId: labelZiId.join(",") || "",
            totalMoneyHtStr: data.totalMoneyHtStr || "零元",
            totalMoneyHt: data.totalMoneyHt || "0",
            otherMoneyHt: data.otherMoneyHt || "0",
            otherMoneyHtStr: data.otherMoneyHtStr || "零元",
            money: data.totalMoneyHt || "0",
            serviceItems: res.data.serviceItems,
          });
          console.log(this.form);
          if (!this.form.companyPhone && this.renewForm.legalPerson.mobile) {
            this.form.companyPhone = this.renewForm.legalPerson.mobile;
          }
          var list = JSON.parse(sessionStorage.getItem("needData") || "{}");
          console.log(list);
          var labels = JSON.parse(sessionStorage.getItem("labels") || "[]");
          this.form.companyPhone = list.companyPhone || this.form.companyPhone;
          this.form.companyUserName =
            list.companyUserName || this.form.companyUserName;
          this.form.companyAdds = list.companyAdds || this.form.companyAdds;
          this.form.check = list.check || this.form.check;
          this.labels = labels == "" ? labelsData : labels;
          this.renewForm.labelParams = [];
          var cardNumObj = {};
          //定义一个空的对象
          cardNumObj = { companyLabel: "" };
          this.labels.forEach((items) => {
            items.child.forEach((item, index) => {
              if (item.selectedType == true) {
                // this.renewForm.labelParams[index].companyLabel = item.id || '';
                cardNumObj.companyLabel = item.id;
                this.renewForm.labelParams.push(cardNumObj);
              }
            });
          });
          console.log(this.labels);
        })
        .catch((req) => {
          this.$emit("close", 10);
        });
    },

    getInfo(id) {
      getContractInfo({ orderId: id })
        .then((res) => {
          this.htNumber = res.data.htNumber;
          let data = res.data.busir;
          this.marketCompanyEssentialResult =
            data.marketCompanyEssentialResult || {};
          this.salesman = data.salesman || {};
          let labelId = [],
            labelZiId = [];
          this.labels = (res.data.label || []).map((item) => {
            if (item.selectedType == 10 || item.selectedType == "10") {
              item.selectedType = true;
              labelId.push(item.id);
            } else {
              item.selectedType = false;
            }
            item.readonly = true;
            item.child.map((ite) => {
              ite.readonly = !item.selectedType;
              if (ite.selectedType == 10 || ite.selectedType == "10") {
                ite.selectedType = true;
                labelZiId.push(ite.id);
              } else {
                ite.selectedType = false;
              }
              return ite;
            });
            return item;
          });
          let productArr = data.product || [],
            otherPrice = 0;
          let product = { startTime: "", endTime: "" };
          if (productArr && productArr.length > 0) {
            let temp = productArr.filter((item) => {
              return item.accountType == 20;
            });
            this.otherPro = productArr.filter((item) => {
              return item.accountType != 20;
            });
            this.otherPro.forEach((item) => {
              otherPrice += item.moneyReceived || 0;
            });
            product =
              temp.length > 0 ? temp[0] : { startTime: "", endTime: "" };
          }
          this.product = product;
          let startTimeArr = product.startTime.split("-");
          let endTimeArr = product.endTime.split("-");
          this.startTime = {
            year:
              startTimeArr && startTimeArr.length > 2 ? startTimeArr[0] : "",
            month:
              startTimeArr && startTimeArr.length > 2 ? startTimeArr[1] : "",
          };
          this.endTime = {
            year: endTimeArr && endTimeArr.length > 2 ? endTimeArr[0] : "",
            month: endTimeArr && endTimeArr.length > 2 ? endTimeArr[1] : "",
          };
          var year1 = parseInt(this.startTime.year),
            month1 = parseInt(this.startTime.month),
            year2 = parseInt(this.endTime.year),
            month2 = parseInt(this.endTime.month);
          //通过年,月差计算月份差
          let months = (year2 - year1) * 12 + (month2 - month1) + 1;
          // let months = (year2 - year1) * 12 + (month2 - month1);
          let companyAdds = this.marketCompanyEssentialResult.address || "";
          let province = this.marketCompanyEssentialResult.province || "";
          let city = this.marketCompanyEssentialResult.city || "";
          let county = this.marketCompanyEssentialResult.county || "";

          if (companyAdds.indexOf(county) == -1) {
            companyAdds = county + companyAdds;
          }
          if (companyAdds.indexOf(city) == -1) {
            companyAdds = city + companyAdds;
          }
          if (companyAdds.indexOf(province) == -1) {
            companyAdds = province + companyAdds;
          }

          this.form = Object.assign({
            name: "莫的问题服务合同",
            controlNo: res.data.htNumber,
            busirSerpriceIds: "",
            chargePeriod: product.cycleType || "",
            companyId: data.companyId,
            compayBusirId: data.id,
            marketBusirSerpriceParams: data.marketBusirSerprices,
            orderType: data.type,
            companyPhone: this.marketCompanyEssentialResult.linkmanPhone || "",
            companyUserName: this.marketCompanyEssentialResult.legalName || "",
            companyAdds: companyAdds,
            months: months || "",
            servicePeriodStart: data.startTime,
            servicePeriodEnd: data.endTime,
            check: product && product.id ? true : false,
            otherPrice: otherPrice,
            firmId: data.firmId || "",
            firmName: data.firmName || "",
            lableId: "",
            lableZiId: "",
            signBill: "",
            signingDate: data.createDate || "",
            validity: "",
            formlableId: labelId.join(",") || "",
            formlableZiId: labelZiId.join(",") || "",
            totalMoneyHtStr: data.totalMoneyHtStr || "零元",
            totalMoneyHt: data.totalMoneyHt || "0",
            otherMoneyHt: data.otherMoneyHt || "0",
            otherMoneyHtStr: data.otherMoneyHtStr || "零元",
            // servicePeriodStart:product.startTime||'',
            // servicePeriodEnd:product.endTime||'',
            money: data.totalMoneyHt || "0",
            serviceItems: res.data.serviceItems,
          });
        })
        .catch((req) => {
          this.$emit("close", 10);
        });
    },
    submintInfo(id) {
      id = id || this.form.id;
      return new Promise((resolve, reject) => {
        try {
          let data = this.form,
            lableId = [],
            lableZiId = [];
          this.labels.forEach((item) => {
            if (item.selectedType) {
              lableId.push(item.id);
            }
            (item.child || []).forEach((ite) => {
              if (ite.selectedType) {
                lableZiId.push(ite.id);
              }
            });
          });
          data.lableId = lableId.join(",") || "";
          data.lableZiId = lableZiId.join(",") || "";
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    },
    changeCheck(e) {
      console.log(e);
    },
    upload(data) {
      return uploadHt(data);
    },
    labelChange(check, label, lab) {
      this.labels = this.labels.map((items) => {
        if (check && items.id == label.id) {
          items.selectedType = true;
          items.child.map((item) => {
            if (check && lab && item.id == lab.id) {
              item.selectedType = true;
            } else {
              item.selectedType = false;
            }
            return item;
          });
        } else {
          items.selectedType = false;
          items.child.map((item) => {
            item.selectedType = false;
            return item;
          });
        }
        return items;
      });
      this.renewForm.labelParams = [];
      var cardNumObj = {};
      //定义一个空的对象
      cardNumObj = { companyLabel: "" };
      this.labels.forEach((items) => {
        items.child.forEach((item, index) => {
          if (item.selectedType == true) {
            // this.renewForm.labelParams[index].companyLabel = item.id || '';
            cardNumObj.companyLabel = item.id;
            this.renewForm.labelParams.push(cardNumObj);
          }
        });
      });
      sessionStorage.setItem("labels", JSON.stringify(this.labels));
    },
  },
};
</script>

<style lang="scss">
.contract_vi {
  .contract {
    border: 1px #eee solid;
    position: relative;
  }
  .inpuTap {
    display: inline-block;
    width: 260pt;
    height: 14px;
    line-height: 14px;
    text-indent: 0;
    cursor: pointer;
  }
  .icon {
    width: 14pt;
    height: 14pt;
  }
  .info-container {
    font-family: SimSun;

    .left {
      width: 70%;
    }

    .right-image {
      position: relative;
      bottom: 20pt;
      width: 30%;
      font-size: 9pt;
      font-weight: bold;
      color: #231f20;
      white-space: pre-wrap;
      display: flex;

      .title {
        height: 70%;
        display: flex;
        align-items: center;
      }
    }
  }

  .footer-container {
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: SimSun;
    position: absolute;
    bottom: 20pt;
    .footer {
      display: flex;
      width: 85%;
      font-size: 10pt;

      .item {
        margin-bottom: 10pt;
      }

      .jia {
        width: 50%;
      }

      .yi {
        width: 50%;
      }
    }
  }

  .footer-title {
    width: 94%;
    margin-left: 3%;
    display: flex;
    justify-content: space-between;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 10pt;
    color: #808080;
  }

  // .el-input {
  //   .el-input__inner {
  //     border: 0;
  //     border-bottom: 1px #000000 solid;
  //     height: 12pt;
  //   }
  // }
  .el-checkbox {
    margin: 0 5pt;
  }
}
</style>
