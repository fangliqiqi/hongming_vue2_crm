<template>
  <div class="dashboard-editor-container" v-if="isRouterAlive">
    <div class="dashboard-container">
      <el-row :gutter="16">
        <el-col :span="4">
          <el-row :gutter="16">
            <el-col :span="24">
              <div class="bgfff quick">
                <div class="title-vi">
                  <span class="title">快捷入口</span>
                  <div>
                    <i class="el-icon-edit-outline"></i>
                  </div>
                </div>
                <a
                  class="quick-item"
                  v-for="(item, index) in menus"
                  :class="{ active: item.id == active }"
                  :key="index"
                  @click="rou(item)"
                >
                  <i class="el-icon-s-opportunity"></i>
                  <span>{{ item.val }}</span>
                </a>
              </div>
            </el-col>
            <!--业务员主管 -->
            <el-col
              :span="24"
              v-if="
                roles == 'accountExecutiveSupervisor' ||
                  roles == 'salesManager' ||
                  roles == 'customerServiceSupervisor' ||
                  roles == 'customerServiceClerk' ||
                  roles == 'marketCompanyBusirInternalAccount' ||
                  roles == 'crmAdmin'
              "
            >
              <div class="bgfff app-code" style="height:318px">
                <span>莫的问题微信公众号</span>
                <span>www.modewenti.com</span>
                <div class="erweima">
                  <img src="@/assets/image/erweima.jpg" />
                </div>
                <div class="maBottom">
                  <el-divider>客服电话</el-divider>
                  <div class="maChild">400-1314-007</div>
                </div>
              </div>
            </el-col>
            <el-col
              :span="24"
              v-if="
                roles != 'accountExecutiveSupervisor' &&
                  roles != 'salesManager' &&
                  roles != 'customerServiceSupervisor' &&
                  roles != 'customerServiceClerk' &&
                  roles != 'marketCompanyBusirInternalAccount' &&
                  roles != 'crmAdmin'
              "
            >
              <div class="bgfff app-code">
                <span>莫的问题微信公众号</span>
                <span>www.modewenti.com</span>
                <div class="erweima">
                  <img src="@/assets/image/erweima.jpg" />
                </div>
                <div class="maBottom">
                  <el-divider>客服电话</el-divider>
                  <div class="maChild">400-1314-007</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="20" style="margin-bottom: 10px;">
          <el-select
            v-if="roleList.length > 1"
            v-model="roles"
            placeholder="请选择角色"
            @change="roleChange"
          >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="20">
          <!-- 业务员首行展示 -->
          <el-row :gutter="16" v-if="roles == 'accountExecutive'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ businessCount }}</h1>
                  <span>我的商机 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ monthTurnover }}</h1>
                  <span>本月成交额（元）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ numberDeals }}</h1>
                  <span>本月成交单数（单）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/clock.png" />
                <div>
                  <h1>{{ taskProgress }}</h1>
                  <span>本月任务进度（%）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 业务员中间行展示 -->
          <el-row :gutter="16">
            <el-col :span="14" v-if="roles == 'accountExecutive'">
              <div class="bgfff message">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">信息展示</span>
                  <div>
                    <el-date-picker
                      v-model="valueTime"
                      type="month"
                      placeholder="选择月"
                      @change="dateChange"
                      :clearable="false"
                    >
                    </el-date-picker>
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
                <div class="championsModel">
                  <div
                    class="champions"
                    v-for="(item, index) in ChampionListG"
                    :key="index"
                  >
                    <div>
                      <div class="champions-logo">
                        <img class="image" src="@/assets/image/blueStar.png" />
                      </div>
                      <div>
                        <div class="name">{{ item.salesmanName }}</div>
                        <div class="office">{{ item.deptName }}</div>
                        <div class="number">{{ item.clientCount }}</div>
                        <div class="customer">
                          <div class="customersNumbers">客户数</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="10" v-if="roles == 'accountExecutive'">
              <div class="bgfff message">
                <div class="title-vi">
                  <span class="title">动态</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in highSeasList"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueStar.png" />
                    <div>
                      <span>
                        {{ item }}
                      </span>
                      <!-- <span>2020-12-04 20:00</span> -->
                    </div>
                  </div>
                </div>
                <!-- <div class="business">
                  <div>
                    <img src="@/assets/image/blueStar.png" />
                    <div>
                      <span>
                        安徽火锅山科技有限公司 被释放至
                        <el-link
                          type="primary"
                          :underline="false"
                          style="vertical-align: 0px"
                          >公海</el-link
                        >
                        抢单
                      </span>
                      <span>2020-12-04 20:00</span>
                    </div>
                  </div>
                </div> -->
              </div>
            </el-col>
          </el-row>
          <!-- 业务员尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'accountExecutive'">
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">异常订单提醒</span>
                    <span class="count">{{
                      finalPaymentNum
                    }}</span>
                  </div>
                  <span class="all" @click="show('yichang')">全部</span>
                </div>
                <div
                  class="business"
                  v-if="index<2"
                  v-for="(item, index) in finalPaymentReminders"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span
                          >{{ item.map.companyName }}{{ item.map.orderNumber }}订单尾款{{
                            item.map.amountOwed
                          }}未交</span
                        >
                        <span slot="content"
                          >{{ item.map.companyName }}{{ item.map.orderNumber }}订单尾款{{
                            item.map.amountOwed
                          }}未交</span
                        >
                      </el-tooltip>
                      <span>{{ item.map.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">客户跟进提醒</span>
                    <span class="count">{{followRemindersNum}}</span>
                  </div>
                  <span class="all" @click="show('genjin')">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in followReminders"
                  v-if="index<2"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{item.map.companyName}}要求:{{item.map.text}}</span>
                        <span slot="content">{{item.map.companyName}}要求:{{item.map.text}}</span>
                      </el-tooltip>
                      <span>{{ item.map.time}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">续签客户提醒</span>
                    <span class="count">{{renewalRemindersNum}}</span>
                  </div>
                  <span class="all" @click="show('xuqian')">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in renewalReminders"
                  v-if="index<2"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/yellowLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span
                          >{{ item.map.companyName }}{{ item.map.time}}到期</span
                        >
                        <span slot="content"
                          >{{ item.map.companyName }}{{ item.map.time}}到期</span
                        >
                      </el-tooltip>
                      <span>{{item.sendDate}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">审核失败提醒</span>
                    <span class="count">{{ auditFailedsNum}}</span>
                  </div>
                  <span class="all" @click="show('shshibai')">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in auditFaileds"
                  v-if="index<2"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/redLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.msg }}</span>
                        <span slot="content"
                          >{{ item.msg }}</span
                        >
                      </el-tooltip>

                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 业务员主管首行展示 -->
          <el-row :gutter="16" v-if="roles == 'accountExecutiveSupervisor'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ businessCount }}</h1>
                  <span>本月新增商机 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ monthTurnover }}</h1>
                  <span>本月成交额（元）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ numberDeals }}</h1>
                  <span>本月成交单数（单）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/clock.png" />
                <div>
                  <h1>{{ taskProgress }}</h1>
                  <span>本月任务进度（%）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 业务员主管中间行展示 -->
          <el-row :gutter="16" v-if="roles == 'accountExecutiveSupervisor'">
            <el-col :span="12">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">小组数据展示</span>
                  <div class="championsModel">
                    <property-supervisor-1></property-supervisor-1>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bgfff message" style="height: 442px !important;">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">信息展示</span>
                  <div>
                    <el-date-picker
                      v-model="valueTime"
                      type="month"
                      placeholder="选择月"
                      @change="dateChange"
                    >
                    </el-date-picker>
                  </div>
                  <!-- <property-supervisor-1></property-supervisor-1> -->
                </div>
                <div class="championsModel">
                  <div
                    class="champion"
                    v-for="(item, index) in ChampionListG"
                    :key="index"
                  >
                    <div>
                      <img class="image" src="@/assets/image/blueStar.png" />
                      <div>
                        <div class="name">{{ item.salesmanName }}</div>
                        <div class="office">{{ item.deptName }}</div>
                        <div class="number">{{ item.clientCount }}</div>
                        <div class="customer">
                          <div class="customersNumbers">客户数</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 业务员主管尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'accountExecutiveSupervisor'">
            <!-- <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">最新商机</span>
                    <span class="count">(3)</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div>
                  <ul>
                    <li>安徽泓铭科技有限公司</li>
                    <li>六安火山石科技有限责任公司</li>
                    <li>可以是客户名称客户岷城</li>
                    <li>可以是客户名称客户岷城</li>
                  </ul>
                </div>
              </div>
            </el-col> -->
            <el-col :span="8">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待审核订单</span>
                    <span class="count">{{pendingReviewCount }}</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in specialApproval"
                  v-if="index<2"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{item.orderNo}}订单待审核</span>
                        <!-- <span slot="content">{{ item.orderNo }}订单待审核</span> -->
                      </el-tooltip>
                      <span>{{ item.specialTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">加急审核订单</span>
                    <span class="count">{{expeditedCount}}</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in expeditedOrder"
                  :key="index"
                  v-if="index<2"
                >
                  <div>
                    <img src="@/assets/image/yellowLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span
                          >{{ item.expeditedName }}要求加急审核{{
                            item.orderNo
                          }}订单</span
                        >
                        <span slot="content"
                          >{{ item.expeditedName }}要求加急审核{{
                            item.orderNo
                          }}订单</span
                        >
                      </el-tooltip>
                      <span>{{ item.expeditedTypeDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">今日新创建订单</span>
                    <span class="count">{{ createdTodayCount }}</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in createdOrder"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/redLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单创建</span>
                        <span slot="content">{{ item.orderNo }}订单创建</span>
                      </el-tooltip>
                      <span>{{ item.orderCreationDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 客服主管首行展示 -->
          <el-row :gutter="16" v-if="roles == 'customerServiceSupervisor'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ waitTollCount }}</h1>
                  <span>本月待收费客户数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ arrearsCount }}</h1>
                  <span>欠费客户数（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ maturityContract }}</h1>
                  <span>本月到期合同（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/clock.png" />
                <div>
                  <h1>{{ receivePayment }}</h1>
                  <span>本月新增收款（元）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 客服主管中间行展示 -->
          <el-row :gutter="16" v-if="roles == 'customerServiceSupervisor'">
            <!-- <el-col :span="12">
              <div class="bgfff echars">
                <div class="title-vi">
                  <span class="title">小组数据展示</span>
                  <div class="championsModel">
                   <customer-serviceSupervisor-1></customer-serviceSupervisor-1>
                  </div>
                </div>
              </div>
            </el-col>
         -->
            <el-col :span="24">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">小组数据展示</span>
                  <div class="championsModel">
                    <customer-serviceSupervisor-1></customer-serviceSupervisor-1>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!--客服主管尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'customerServiceSupervisor'">
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待收费订单</span>
                    <span class="count">({{ waitToll.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in waitToll"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单待收费</span>
                        <span slot="content">{{ item.orderNo }}订单待收费</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">续费客户提醒</span>
                    <span class="count">({{ renewalReminder.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in renewalReminder"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/yellowLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span
                          >{{ item.companyName }}{{ item.orderNo }}订单{{
                            parseTime(item.orderDate, "{y}-{m}-{d}")
                          }}服务到期</span
                        >
                        <span slot="content"
                          >{{ item.companyName }}{{ item.orderNo }}订单{{
                            parseTime(item.orderDate, "{y}-{m}-{d}")
                          }}服务到期</span
                        >
                      </el-tooltip>
                      <!-- <span>{{parseTime(item.endTime,"{y}-{m}-{d}")}}</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">审核失败提醒</span>
                    <span class="count">({{ auditFailure.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in auditFailure"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/redLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单审核不通过</span>
                        <span slot="content"
                          >{{ item.orderNo }}订单审核不通过</span
                        >
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">跟进提醒</span>
                    <span class="count">({{ followUpRemind.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in followUpRemind"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.nextContent }}</span>
                        <span slot="content">{{ item.nextContent }}</span>
                      </el-tooltip>
                      <span>{{ item.nextDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 客服首行 -->
          <el-row :gutter="16" v-if="roles == 'customerServiceClerk'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ waitTollCount }}</h1>
                  <span>本月待收费客户数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ arrearsCount }}</h1>
                  <span>欠费客户数（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ maturityContract }}</h1>
                  <span>本月到期合同（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/clock.png" />
                <div>
                  <h1>{{ receivePayment }}</h1>
                  <span>本月新增收款（元）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 客服中间行展示 -->
          <el-row :gutter="16" v-if="roles == 'customerServiceClerk'">
            <el-col :span="24">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">小组数据展示</span>
                  <div class="championsModel">
                    <customer-service-1></customer-service-1>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!--客服尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'customerServiceClerk'">
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待收费订单</span>
                    <span class="count">({{ waitToll.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in waitToll"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单待收费</span>
                        <span slot="content">{{ item.orderNo }}订单待收费</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">续费客户提醒</span>
                    <span class="count">({{ renewalReminder.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in renewalReminder"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/yellowLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span
                          >{{ item.companyName }}{{ item.orderNo }}订单{{
                            parseTime(item.orderDate, "{y}-{m}-{d}")
                          }}服务到期</span
                        >
                        <span slot="content"
                          >{{ item.companyName }}{{ item.orderNo }}订单{{
                            parseTime(item.orderDate, "{y}-{m}-{d}")
                          }}服务到期</span
                        >
                      </el-tooltip>
                      <!-- <span>{{parseTime(item.endTime,"{y}-{m}-{d}")}}</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">审核失败提醒</span>
                    <span class="count">({{ auditFailure.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in auditFailure"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/redLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单审核不通过</span>
                        <span slot="content"
                          >{{ item.orderNo }}订单审核不通过</span
                        >
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">跟进提醒</span>
                    <span class="count">({{ followUpRemind.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in followUpRemind"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.nextContent }}</span>
                        <span slot="content">{{ item.nextContent }}</span>
                      </el-tooltip>
                      <span>{{ item.nextDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 外账主管首行 -->
          <el-row :gutter="16" v-if="roles == 'marketBusirSerprice'">
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ companyCount }}</h1>
                  <span>总客户数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ companyMonthCount }}</h1>
                  <span>本月新增客户数（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ billCount }}</h1>
                  <span>票据更新客户数（个）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 外账主管中间行展示 -->
          <!-- <el-row
            :gutter="16"
            v-if="roles.indexOf('marketBusirSerprice') != -1"
          >
            <el-col :span="24">
              <div class="bgfff echars">
                <div class="title-vi">
                  <span class="title">小组数据展示</span>
                  <div class="championsModel"> -->
          <!-- <foreign-sccount-supervisor1></foreign-sccount-supervisor1> -->
          <!-- </div>
                </div>
              </div>
            </el-col>
          </el-row> -->

          <!-- 外账首行 -->
          <el-row :gutter="16" v-if="roles == 'externalAccountsClerk'">
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ companyCount }}</h1>
                  <span>总客户数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ companyMonthCount }}</h1>
                  <span>本月新增客户数（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ billCount }}</h1>
                  <span>票据更新客户数（个）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 外账中间行展示 -->
          <!-- <el-row
            :gutter="16"
            v-if="roles.indexOf('externalAccountsClerk') != -1"
          >
            <el-col :span="24">
              <div class="bgfff echars">
                <div class="title-vi">
                  <span class="title">小组数据展示</span>
                  <div class="championsModel"> -->
          <!-- <foreign-sccount-supervisor1></foreign-sccount-supervisor1> -->
          <!-- </div>
                </div>
              </div>
            </el-col>
          </el-row> -->

          <!-- 内账主管首行 -->
          <el-row
            :gutter="16"
            v-if="roles == 'marketCompanyBusirInternalAccount'"
          >
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ totalRevenue }}</h1>
                  <span>本月财税客户总收入 (元)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ companyMonthCount }}</h1>
                  <span>本月房产客户总收入 (元)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ billCount }}</h1>
                  <span>本月招聘客户总收入 (元)</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 内账主管中间行展示 -->
          <el-row
            :gutter="16"
            v-if="roles == 'marketCompanyBusirInternalAccount'"
          >
            <el-col :span="24">
              <div class="bgfff echars">
                <div class="title-vi">
                  <span class="title">小组数据展示</span>
                  <div class="championsModel">
                    <internal-accounting-supervisor1></internal-accounting-supervisor1>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 内账主管尾行展示 -->
          <el-row
            :gutter="16"
            v-if="roles == 'marketCompanyBusirInternalAccount'"
          >
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待收费订单</span>
                    <span class="count">({{ pendingReview.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in pendingReview"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}待审核订单</span>
                        <span slot="content">{{ item.orderNo }}订单待收费</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待支出审核订单</span>
                    <span class="count"
                      >({{ pendingReviewExpenditure.length }})</span
                    >
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in pendingReviewExpenditure"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单待分配</span>
                        <span slot="content">{{ item.orderNo }}订单待分配</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 内账首行 -->
          <el-row
            :gutter="16"
            v-if="roles == 'marketCompanyBusirInternalAccountClerk'"
          >
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ totalRevenue }}</h1>
                  <span>本月财税客户总收入 (元)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ companyMonthCount }}</h1>
                  <span>本月房产客户总收入 (元)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ billCount }}</h1>
                  <span>本月招聘客户总收入 (元)</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 内账中间行展示 -->
          <el-row
            :gutter="16"
            v-if="roles == 'marketCompanyBusirInternalAccountClerk'"
          >
            <el-col :span="24">
              <div class="bgfff echars">
                <div class="title-vi">
                  <span class="title">小组数据展示</span>
                  <div class="championsModel">
                    <internal-accounting-supervisor1></internal-accounting-supervisor1>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 内账尾行展示 -->
          <el-row
            :gutter="16"
            v-if="roles == 'marketCompanyBusirInternalAccountClerk'"
          >
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待收费订单</span>
                    <span class="count">({{ pendingReview.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in pendingReview"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}待审核订单</span>
                        <span slot="content">{{ item.orderNo }}订单待收费</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待支出审核订单</span>
                    <span class="count"
                      >({{ pendingReviewExpenditure.length }})</span
                    >
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in pendingReviewExpenditure"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单待分配</span>
                        <span slot="content">{{ item.orderNo }}订单待分配</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 外勤主管首行 -->
          <el-row :gutter="16" v-if="roles == 'fieldSupervisor'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ taskCount }}</h1>
                  <span>任务总数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ accomplishCount }}</h1>
                  <span>已完成任务数（单）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ monthTaskCount }}</h1>
                  <span>本月新增任务（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ warningTaskCount }}</h1>
                  <span>预警任务数 (单)</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 外勤主管尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'fieldSupervisor'">
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待完成任务</span>
                    <span class="count">({{ unfinished.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in unfinished"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span :class="item.maturity != '' ? 'bgcolor' : ''"
                          >{{ item.orderNo }}订单注册任务待完成</span
                        >
                        <span slot="content"
                          >{{ item.orderNo }}订单注册任务待完成</span
                        >
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待支出审核订单</span>
                    <span class="count">({{ unassigned.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in unassigned"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单待分配</span>
                        <span slot="content">{{ item.orderNo }}订单待分配</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 外勤首行 -->
          <el-row :gutter="16" v-if="roles == 'fieldClerk'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ taskCount }}</h1>
                  <span>任务总数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ accomplishCount }}</h1>
                  <span>已完成任务数（单）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ monthTaskCount }}</h1>
                  <span>本月新增任务（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ warningTaskCount }}</h1>
                  <span>预警任务数 (单)</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 外勤尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'fieldClerk'">
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待完成任务</span>
                    <span class="count">({{ fieldUnfinished.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in fieldUnfinished"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span :class="item.maturity != '' ? 'bgcolor' : ''"
                          >{{ item.orderNo }}订单注册任务待完成</span
                        >
                        <span slot="content"
                          >{{ item.orderNo }}订单注册任务待完成</span
                        >
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">新增任务</span>
                    <span class="count">({{ newTask.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in newTask"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>新增{{ item.orderNo }}订单注册任务</span>
                        <span slot="content"
                          >新增{{ item.orderNo }}订单注册任务</span
                        >
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">审核失败任务</span>
                    <span class="count">({{ auditFailure.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in auditFailure"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单待分配</span>
                        <span slot="content">{{ item.orderNo }}订单待分配</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产提单员首行 -->
          <el-row :gutter="16" v-if="roles == 'submitReceiptsStaff'">
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ submitQuantity }}</h1>
                  <span>{{ month }}月总提单申请 (单)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ unsubmittedQuantity }}</h1>
                  <span>{{ month }}月未提单申请（单）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ submittedQuantity }}</h1>
                  <span>{{ month }}月已提单订单（单）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产提单员中间行 -->
          <el-row :gutter="16">
            <el-col :span="24" v-if="roles == 'submitReceiptsStaff'">
              <div class="bgfff message">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">信息展示</span>
                  <div>
                    <el-date-picker
                      v-model="valueTime"
                      type="month"
                      placeholder="选择月"
                      @change="dateChange"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="championsModel">
                  <div
                    class="champions"
                    v-for="(item, index) in houseChampionshipList"
                    :key="index"
                  >
                    <div>
                      <img class="image" src="@/assets/image/blueStar.png" />
                      <div>
                        <div class="name">{{ item.name }}</div>
                        <div class="office">{{ item.deptName }}</div>
                        <div class="number">{{ item.clientCount }}</div>
                        <div class="customer">
                          <div class="salesVolume">销售额</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产提单员尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'submitReceiptsStaff'">
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">待提单提醒</span>
                    <span class="count">({{ BillOfLadingList.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in BillOfLadingList"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span :class="item.maturity != '' ? 'bgcolor' : ''"
                          >{{ item.orderNo }}订单待提单</span
                        >
                        <span slot="content">{{ item.orderNo }}订单待提单</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产业务员首行 -->
          <el-row :gutter="16" v-if="roles == 'salesmanEstate'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ clientCount }}</h1>
                  <span>我的客户 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ addClientCount }}</h1>
                  <span>{{ month }}月新增客户（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ addOrderCount }}</h1>
                  <span>{{ month }}月新增订单（单）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/clock.png" />
                <div>
                  <h1>{{ currentMonthSales }}</h1>
                  <span>{{ month }}月累计销售额（元）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产业务员中间行 -->
          <el-row :gutter="16">
            <el-col :span="24" v-if="roles == 'salesmanEstate'">
              <div class="bgfff message">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">冠军榜</span>
                  <div>
                    <el-date-picker
                      v-model="valueTime"
                      type="month"
                      placeholder="选择月"
                      @change="dateChange"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="championsModel">
                  <div
                    class="champions"
                    v-for="(item, index) in houseChampionshipList"
                    :key="index"
                  >
                    <div>
                      <img class="image" src="@/assets/image/blueStar.png" />
                      <div>
                        <div class="name">{{ item.name }}</div>
                        <div class="office">{{ item.deptName }}</div>
                        <div class="number">{{ item.price }}</div>
                        <div class="customer">
                          <div class="salesVolume">销售额</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产业务员尾行展示 -->
          <el-row :gutter="16" v-if="roles == 'salesmanEstate'">
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">审核失败提醒</span>
                    <span class="count">({{ auditFailureList.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in auditFailureList"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span>{{ item.orderNo }}订单审核失败</span>
                        <span slot="content"
                          >{{ item.orderNo }}订单审核失败</span
                        >
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">异常订单提醒</span>
                    <span class="count">({{ abnormalOrder.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in abnormalOrder"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span
                          >{{ item.orderNo }}订单欠费{{ item.arrears }}元</span
                        >
                        <span slot="content"
                          >{{ item.orderNo }}订单欠费{{ item.arrears }}元</span
                        >
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff remind">
                <div class="title-vi">
                  <div>
                    <span class="title">即将到期用户</span>
                    <span class="count">({{ expiringUsersList.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in expiringUsersList"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span
                          >{{ item.clientName }}将于{{
                            parseTime(item.orderDate, "{y}-{m}-{d}")
                          }}到期</span
                        >
                        <span slot="content"
                          >{{ item.clientName }}将于{{
                            parseTime(item.orderDate, "{y}-{m}-{d}")
                          }}到期</span
                        >
                      </el-tooltip>
                      <!-- <span>{{ item.orderDate }}</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产经理首行 -->
          <el-row :gutter="16" v-if="roles == 'salesmanSupervisorEstate'">
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ houseClientCount }}</h1>
                  <span>房产客户总数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ houseAddClientCount }}</h1>
                  <span>{{ month }}月新增客户（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ salePackage }}</h1>
                  <span>{{ month }}月已售套餐数（套）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bgfff summary">
                <img src="@/assets/image/clock.png" />
                <div>
                  <h1>{{ houseCurrentMonthSales }}</h1>
                  <span>{{ month }}月累计销售额（元）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产经理中间行 -->
          <el-row :gutter="16" v-if="roles == 'salesmanSupervisorEstate'">
            <el-col :span="12">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">客户数据</span>
                  <div class="championsModel">
                    <house-manager-1></house-manager-1>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">订单数据</span>
                  <div class="championsModel">
                    <house-manager-2></house-manager-2>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 房产经理尾行 -->
          <el-row :gutter="16" v-if="roles == 'salesmanSupervisorEstate'">
            <el-col :span="8">
              <div class="bgfff remind" style="height: 382px !important;">
                <div class="title-vi">
                  <div>
                    <span class="title">审核提醒</span>
                    <span class="count">({{ AuditreminderList.length }})</span>
                  </div>
                  <span class="all">全部</span>
                </div>
                <div
                  class="business"
                  v-for="(item, index) in AuditreminderList"
                  :key="index"
                >
                  <div>
                    <img src="@/assets/image/blueLight.png" />
                    <div>
                      <el-tooltip placement="top">
                        <span :class="item.maturity != '' ? 'bgcolor' : ''"
                          >{{ item.orderNo }}订单待审核</span
                        >
                        <span slot="content">{{ item.orderNo }}订单待审核</span>
                      </el-tooltip>
                      <span>{{ item.orderDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col
              :span="16"
              v-if="roles.indexOf('salesmanSupervisorEstate') != -1"
            >
              <div class="bgfff message">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title">冠军榜</span>
                  <div>
                    <el-date-picker
                      v-model="valueTime"
                      type="month"
                      placeholder="选择月"
                      @change="dateChange"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="championsModel">
                  <div
                    class="champions"
                    v-for="(item, index) in houseChampionshipList"
                    :key="index"
                  >
                    <div>
                      <img class="image" src="@/assets/image/blueStar.png" />
                      <div>
                        <div class="name">{{ item.name }}</div>
                        <div class="office">{{ item.deptName }}</div>
                        <div class="number">{{ item.price }}</div>
                        <div class="customer">
                          <div class="salesVolume">销售额</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 老板首页首行 -->
          <el-row :gutter="16" v-if="roles == 'bossManager' || roles == 'boss'">
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/gathering.png" />
                <div>
                  <h1>{{ bossClientCount }}</h1>
                  <span>代账客户总数 (个)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/wallet.png" />
                <div>
                  <h1>{{ addBossClientCount }}</h1>
                  <span>{{ month }}月新增客户（个）</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bgfff summary">
                <img src="@/assets/image/grouping.png" />
                <div>
                  <h1>{{ churnCount }}</h1>
                  <span>{{ month }}月流失客户（个）</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 老板中间行 -->
          <el-row :gutter="16" v-if="roles == 'bossManager' || roles == 'boss'">
            <el-col :span="8">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title"></span>
                  <div>
                    <el-date-picker
                      v-model="valueYear"
                      type="year"
                      format="yyyy"
                      value-format="yyyy"
                      placeholder="选择年"
                      @change="dateYearChange"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div>
                  <el-row>
                    <el-col
                      :span="24"
                      style="height:84px;border-bottom:1px solid #ccc;border-right:1px solid #ccc;line-height:84px;border-left:1px solid #ccc;text-align:center;"
                    >
                      {{ valueYear }}年总收入为<span
                        style="color:#3978E7"
                      ></span
                      >元
                    </el-col>
                    <el-col
                      :span="12"
                      style="height:150px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;line-height:150px;text-align:center;"
                    >
                      代账收入<span style="color:#3978E7">{{
                        dzAmountReceived
                      }}</span
                      >元
                    </el-col>
                    <el-col
                      :span="12"
                      style="height:150px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc;line-height:150px;text-align:center;"
                    >
                      代账收入占比<span style="color:#3978E7">{{
                        dzIncomeRatio
                      }}</span
                      >%
                    </el-col>
                    <el-col
                      :span="12"
                      style="height:150px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;line-height:150px;text-align:center;"
                    >
                      其他收入<span style="color:#3978E7">{{
                        fdzAmountReceived
                      }}</span
                      >元
                    </el-col>
                    <el-col
                      :span="12"
                      style="height:150px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc;line-height:150px;text-align:center;"
                    >
                      其他收入占比<span style="color:#3978E7">{{
                        fdzIncomeRatio
                      }}</span
                      >%
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title"></span>
                  <div class="championsModel">
                    <boss-1></boss-1>
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="bgfff echars">
                <div class="title-vi">
                  <!-- <span class="title">信息展示</span> -->
                  <span class="title"></span>
                  <div class="championsModel">
                    <boss-3></boss-3>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 消息 -->
    <el-dialog
      :title="messagetitle"
      width="704px"
      append-to-body
      custom-class="msg-vi"
      :visible.sync="messageCondition"
      @close="close"
    >
      <div class="table-data message">
        <el-table
          :max-height="600"
          :data="messageList"
          @select="selectCall"
          @select-all="selectAll"
        >

          <el-table-column
            type="selection"
            width="55"
            align="center"
            prop="strId"
          />
          <el-table-column
            label="消息标题"
            align="center"
            width="110px"
            prop="title"
          >
            <template slot-scope="scope">
              <span
                style="display: inline-block;
                width: 7px;
                height: 7px;
                background: #EF5465; border-radius: 50%;margin-right:6px;"
                 v-if="scope.row.state == 10"
              ></span>

              <span
                :style="{
                  color: scope.row.state == 10 ? '#303133' : '#565759'
                }"
                style="white-space: pre-wrap  !important;"
                >{{ scope.row.title }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="消息内容" align="center" prop="msg">
            <template slot-scope="scope">
              <span
                :style="{
                  color: scope.row.state == 10 ? '#303133' : '#565759'
                }"
                style="white-space: pre-wrap  !important;"
                >{{scope.row.msg}}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="发送时间"
            align="center"
            width="140px"
            prop="sendDate"
          >
            <template slot-scope="scope">
              <span
                :style="{
                  color: scope.row.state == 10 ? '#303133' : '#565759'
                }"
                >{{ scope.row.sendDate }}</span
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="mt16 flex jcb aic">
        <el-button plain type="primary" @click="delerUp" :class="idList.length==0?'zhang':''">批量删除</el-button>
         <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNo"
            :limit.sync="queryParams.pageSize"
            @pagination="messagePopUp()"
            style="width:500px"
          />
          </div>
      </div>
    </el-dialog>

    <!-- 批量删除 -->
    <!-- <el-dialog
      title="提示"
      :visible.sync="deleteCondition"
      width="422px"
      append-to-body
      class="task"
      style="margin-top:14vh;"
    >
      <el-row>
        <el-col :span="24">
          <span
            style="display: inline-block;width:22px;height:22px;background:rgb(243, 162, 96);color:#fff;margin-right:12px;border-radius:50%;text-align: center;line-height:22px;"
            >!</span
          ><span
            style="
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #565759;"
            >是否确定删除？</span
          >
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer bottom">
        <el-button @click="deleteCondition = !deleteCondition">取 消</el-button>
        <el-button type="primary" @click="batchDeleteUP">确定</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
import {
  newBusiness,
  followRemind,
  salesmanSupervisorOne, //业务员主管首行
  salesmanSupervisorLast, // 业务员主管尾行
  ChampionList, //冠军榜
  highSeasCarousel, //业务员首页公海消息轮播
  salesmanFirst, //业务员首页首行
  salesmanLast, //业务员首页尾行
  CustomerServiceSupervisor, //客服主管数据
  CustomerService, //客服数据
  ForeignAccountAupervisor, //外账主管数据
  ExternalAccount, //外账专员
  InternalAccountingSupervisor, //内账主管
  InternalAccount, //内账办事员
  FieldSupervisor, //外勤主管
  FieldClerk, //外勤办事员
  houseSalesman, //房产业务员首行
  abnormalOrderReminder, //房产业务员异常订单提醒
  auditFailureReminder, //房产业务员审核失败提醒
  expiringUsers, //房产业务员即将到期客户
  houseChampionship, //房产业务员、提单员冠军榜
  houseBillOfLading, //房产提单员首行
  ToBeRemindedByBillOfLading, //房产提单员待提单提醒
  PropertyManager, //房产经理首行
  auditReminder, //房产经理尾行
  bossManager, //老板首行
  totalRrevenue ,//老板中间行总收入
  findAbnormalOrderMessage,//业务员异常订单提醒
  findAuditFailureMessage,//业务员审核失败提醒
  findFollowMessage,//业务员客户跟进提醒
  findRenewCustomerMessage//业务员续签客户提醒

} from "../api/crm/index";
import {
  deleteMongoDBByIds,
} from "@/api/crm/message/message";

import PropertySupervisor1 from "./components/Echars/PropertySupervisor1";
import CustomerServiceSupervisor1 from "./components/Echars/CustomerServiceSupervisor1";
import CustomerService1 from "./components/Echars/CustomerService1";
import houseManager2 from "./components/Echars/houseManager2";
import houseManager1 from "./components/Echars/houseManager1";
import boss1 from "./components/Echars/boss1";
import boss2 from "./components/Echars/boss2";
import boss3 from "./components/Echars/boss3";
// import ForeignAccountSupervisor1 from "./components/Echars/ForeignAccountSupervisor1";
import InternalAccountingSupervisor1 from "./components/Echars/InternalAccountingSupervisor1";

import { mapState } from "vuex";
import Item from "../layout/components/Sidebar/Item.vue";

import { debounce } from "@/utils/hmt";

export default {
  name: "Index",
  components: {
    PropertySupervisor1,
    CustomerServiceSupervisor1,
    CustomerService1,
    houseManager2,
    houseManager1,
    boss1,
    boss2,
    boss3,
    // ForeignAccountSupervisor1,
    InternalAccountingSupervisor1,
    Item
  },
  data() {
    return {
      isRouterAlive: true,
      menu: [
        { id: 1, val: "新建商机", path: "/agent/agentList?add=true" }, //
        {
          id: 1,
          val: "新建商机",
          path: "/agent/MyBusinessOpportunities?add=true"
        },
        {
          id: 2,
          val: "新建客户",
          path: "/financeCustomer/customerList?add=true"
        },
        { id: 3, val: "新建客户", path: "/financeCustomer/myClient?add=true" },
        { id: 4, val: "查看订单", path: "/financeCustomer/clientOrder" }
      ],
      roleList: [],
      roleName: "",
      //获取当前月份
      month: null,
      //业务
      //我的商机/本月新增
      businessCount: 0,
      // 本月成交额
      monthTurnover: 0,
      //本月成交单数
      numberDeals: 0,
      //本月任务进度
      taskProgress: 0,
      //业务员主管待审核订单数
      pendingReviewCount: 0,
      //业务员主管待审核订单
      specialApproval: [],
      //业务员主管加急审核订单数
      expeditedCount: 0,
      //业务员主管加急审核订单
      expeditedOrder: [],
      //业务员主管新创建订单数
      createdTodayCount: 0,
      //业务员主管今日新创建订单
      createdOrder: [],
      //冠军榜时间选择
      valueTime: "",
      //冠军榜
      ChampionListG: [],
      //业务员公海轮播消息
      highSeasList: [],
      //业务员异常信息提醒
      finalPaymentReminders: [],
      finalPaymentNum:0,
      //业务员跟进提醒
      followReminders: [],
      followRemindersNum:0,
      //业务员续签客户提醒
      renewalReminders: [],
      renewalRemindersNum:0,
      //业务员审核失败提醒
      auditFaileds: [],
      auditFailedsNum:0,
      //客服
      //欠费客户数
      arrearsCount: 0,
      //本月到期合同
      maturityContract: 0,
      //本月新增收款
      receivePayment: 0,
      //本月待收费客户数
      waitTollCount: 0,
      //待收费订单
      waitToll: [],
      //续费客户
      renewalReminder: [],
      //审核失败提醒
      auditFailure: [],
      //跟进提醒
      followUpRemind: [],
      //外账
      //总客户数
      companyCount: 0,
      //新增客户数
      companyMonthCount: 0,
      //票据更新客户数
      billCount: 0,
      //内账
      //财税客户收入
      totalRevenue: 0,
      //待审核订单
      pendingReview: [],
      //待支出审核订单
      pendingReviewExpenditure: [],

      //外账
      //任务总数
      taskCount: 0,
      //已完成任务数
      accomplishCount: 0,
      //本月新增任务
      monthTaskCount: 0,
      //预警任务数
      warningTaskCount: 0,
      //外勤主管待完成任务
      unfinished: [],
      //外勤主管待分配订单
      unassigned: [],
      //外勤专员审核失败的任务
      auditFailures: [],
      //外勤专员新增的任务
      newTask: [],
      //外勤专员待完成任务
      fieldUnfinished: [],
      //房产
      //房产累计销售额
      currentMonthSales: 0,
      //新增订单
      addOrderCount: 0,
      //新增客户
      addClientCount: 0,
      //我的客户
      clientCount: 0,
      //房产业务员审核失败提醒
      auditFailureList: [],
      //房产业务员异常订单
      abnormalOrder: [],
      //房产业务员即将到期用户
      expiringUsersList: [],
      //房产业务员、提单员冠军榜
      houseChampionshipList: [],
      //本月的提交申请单数
      submitQuantity: 0,
      //本月的已提交申请单数
      submittedQuantity: 0,
      //本月的未提交申请单数
      unsubmittedQuantity: 0,
      //房产提单员待提单提醒
      BillOfLadingList: [],
      //房产经理首行客户总数
      houseAddClientCount: 0,
      //新增客户
      houseClientCount: 0,
      //本月累计销售额
      houseCurrentMonthSales: 0,
      //已收套餐数
      salePackage: 0,
      //房产经理审核提醒
      AuditreminderList: [],
      //老板首页
      //年份选择
      valueYear: "",
      //总客户
      bossClientCount: 0,
      //新增客户数
      addBossClientCount: 0,
      //流失客户数
      churnCount: 0,
      //项目收入
      list: 0,
      //代账收入
      dzAmountReceived: 0,
      //代账收入比例
      dzIncomeRatio: 0,
      //其他收入
      fdzAmountReceived: 0,
      //其他收入占比
      fdzIncomeRatio: 0,
      active: null,
      roles: "",
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize:10
      },
      messageList: [],
      total: 0,
      messagetitle:null,
      messageCondition: false, //消息弹窗
      idList: [],
      deleteCondition: false,
      showNo:null
    };
  },

  computed: {
    ...mapState({
      userInfo: function(state) {
        try {
          if (state.user) {
            this.initData(state.user);
          }
        } catch (e) {
          // console.info(e)
        }
        return state.user;
      }
    }),
    menus() {
      // 获取到当前用户的所有权限路径（把树型结构的数据通过遍历得到一个一级数据）
      let routes = this.$store.getters.permission_routes || [];
      let routeArr = this.getRoutePath(routes);
      console.info(routeArr);
      let arr = this.menu.filter(item => {
        return routeArr.some(ite => {
          console.info(item, ite);
          return item.path.indexOf(ite) != -1;
        });
      });
      let temp = [];
      return arr.filter(item => {
        let flag = temp.indexOf(item.val) == -1;
        temp.push(item.val);
        return flag;
      });
    }
  },
  created() {
    this.initData(this.userInfo);
  },
  watch: { $route: "handleAdd" },
  methods: {
    // 判断当前路径是不是一级
    getRoutePath(routes, ppath) {
      ppath = ppath ? ppath + "/" : "/";
      // 过滤当前用户的路由把不想显示的隐藏掉
      let rArr = routes.filter(item => {
        return item.hidden != true;
      });
      let tArr = [];
      // 再遍历新的路由，判断有没有子路由，有的话就return出去再调用getRoutePath函数，没有的话就直接父级拼接子级
      let sArr = rArr
        .map(item => {
          if (item.children && item.children.length > 0) {
            return this.getRoutePath(item.children, item.path);
          } else {
            return ppath + item.path;
          }
        })
        .filter(item => {
          return item != undefined && item != null;
        });
      tArr.concat(sArr).forEach(items => {
        if (typeof items == "string") {
          tArr.push(items);
        } else {
          items.forEach(item => {
            tArr.push(item);
          });
        }
      });
      return tArr;
    },
    initData: debounce(function(userInfo) {
      try {
        this.roleList = [];
        this.roleList = userInfo.roleCodes.map((data, i) => {
          let roleNames =
            userInfo.roleNames && userInfo.roleNames.length > 0
              ? userInfo.roleNames[i]
              : data;
          return {
            value: data,
            label: roleNames || ""
          };
        });
        this.roles = this.roleList[0].value;
        var date = new Date();
        this.valueYear = date.getFullYear();
        this.valueTime = date.toLocaleDateString();
        this.valueTime = this.valueTime.replace(/\//g, "-");
        this.getList();
      } catch (e) {
        // console.info(e)
        // console.info("userInfo is null")
      }
    }, 500),
    getList() {
      console.info("首页请求=======");
      //业务员主管首页
      if (this.roles == "accountExecutiveSupervisor") {
        //业务员主管首行
        salesmanSupervisorOne().then(response => {
          this.businessCount = response.data.businessCount || 0;
          this.monthTurnover = response.data.monthTurnover || 0;
          this.numberDeals = response.data.numberDeals || 0;
          this.taskProgress = response.data.taskProgress || 0;
        });

        //业务员主管尾行
        salesmanSupervisorLast().then(response => {
          // console.log(response);
          this.specialApproval = response.data.specialApproval;
          this.expeditedOrder = response.data.expeditedOrder;
          this.createdOrder = response.data.createdOrder;
          this.pendingReviewCount = response.data.pendingReviewCount;
          this.expeditedCount = response.data.expeditedCount;
          this.createdTodayCount = response.data.createdTodayCount;
        });
      } //业务员首页
      else if (this.roles == "accountExecutive") {
        //首行数据
        salesmanFirst().then(response => {
          this.businessCount = response.data.businessCount || 0;
          this.monthTurnover = response.data.monthTurnover || 0;
          this.numberDeals = response.data.numberDeals || 0;
          this.taskProgress = response.data.taskProgress || 0;
        });
        //公海信息
        highSeasCarousel().then(response => {
          this.highSeasList = response.data;
        });

        //业务员尾行数据
        // salesmanLast().then(response => {
        //   // console.log(response);
        //   this.finalPaymentReminders = response.data.finalPaymentReminders;
        //   this.followReminders = response.data.followReminders;
        //   this.renewalReminders = response.data.renewalReminders;
        //   this.auditFaileds = response.data.auditFaileds;
        // });

        // 业务员异常订单申请
        findAbnormalOrderMessage(this.queryParams).then(res=>{
          this.finalPaymentReminders = res.data.rest.rows
          this.finalPaymentNum = res.data.unreadSize
        })
        // 业务员客户跟进
        findFollowMessage(this.queryParams).then(res=>{
          this.followReminders = res.data.rest.rows
          this.followRemindersNum = res.data.unreadSize
        })
        // 业务员续签客户提醒
        findRenewCustomerMessage(this.queryParams).then(res=>{
          this.renewalReminders = res.data.rest.rows
          this.renewalRemindersNum = res.data.unreadSize
        })
        // 业务员审核失败提醒
        findAuditFailureMessage(this.queryParams).then(res=>{
          this.auditFaileds = res.data.rest.rows
          this.auditFailedsNum = res.data.unreadSize
        })


      } //客服主管首页
      else if (this.roles == "customerServiceSupervisor") {
        CustomerServiceSupervisor().then(response => {
          this.arrearsCount = response.data.arrearsCount;
          this.maturityContract = response.data.maturityContract;
          this.receivePayment = response.data.receivePayment;
          this.waitTollCount = response.data.waitTollCount;
          this.renewalReminder = response.data.renewalReminder;
          this.waitToll = response.data.waitToll;
          this.auditFailure = response.data.auditFailure;
          this.followUpRemind = response.data.followUpRemind;
        });
      } //客服首页
      else if (this.roles == "customerServiceClerk") {
        CustomerService().then(response => {
          this.arrearsCount = response.data.arrearsCount || 0;
          this.maturityContract = response.data.maturityContract || 0;
          this.receivePayment = response.data.receivePayment || 0;
          this.waitTollCount = response.data.waitTollCount || 0;
          this.renewalReminder = response.data.renewalReminder;
          this.waitToll = response.data.waitToll;
          this.auditFailure = response.data.auditFailure;
          this.followUpRemind = response.data.followUpRemind;
        });
      } //外账主管首页
      else if (this.roles == "marketBusirSerprice") {
        ForeignAccountAupervisor().then(response => {
          this.billCount = response.data.billCount;
          this.companyCount = response.data.companyCount;
          this.companyMonthCount = response.data.companyMonthCount;
        });
      } //外账首页
      else if (this.roles == "externalAccountsClerk") {
        ExternalAccount().then(response => {
          this.billCount = response.data.billCount;
          this.companyCount = response.data.companyCount;
          this.companyMonthCount = response.data.companyMonthCount;
        });
      } //内账主管首页
      else if (this.roles == "marketCompanyBusirInternalAccount") {
        InternalAccountingSupervisor().then(response => {
          this.totalRevenue = response.data.totalRevenue;
          this.pendingReview = response.data.pendingReview;
          this.pendingReviewExpenditure =
            response.data.pendingReviewExpenditure;
        });
      } //内账办事员首页
      else if (this.roles == "marketCompanyBusirInternalAccountClerk") {
        InternalAccount().then(response => {
          this.totalRevenue = response.data.totalRevenue;
          this.pendingReview = response.data.pendingReview;
          this.pendingReviewExpenditure =
            response.data.pendingReviewExpenditure;
        });
      } //外勤主管首页
      else if (this.roles == "fieldSupervisor") {
        FieldSupervisor().then(response => {
          this.taskCount = response.data.taskCount;
          this.accomplishCount = response.data.accomplishCount;
          this.monthTaskCount = response.data.monthTaskCount;
          this.warningTaskCount = response.data.warningTaskCount;
          this.unfinished = response.data.unfinished;
          this.unassigned = response.data.unassigned;
        });
      } //外勤办事员首页
      else if (this.roles == "fieldClerk") {
        FieldClerk().then(response => {
          this.taskCount = response.data.taskCount;
          this.accomplishCount = response.data.accomplishCount;
          this.monthTaskCount = response.data.monthTaskCount;
          this.warningTaskCount = response.data.warningTaskCount;
          this.auditFailures = response.data.auditFailure;
          this.newTask = response.data.newTask;
          this.fieldUnfinished = response.data.fieldUnfinished;
        });
      } //房产业务员首页
      else if (this.roles == "salesmanEstate") {
        //首行
        houseSalesman().then(response => {
          this.currentMonthSales = response.data.currentMonthSales;
          this.addOrderCount = response.data.addOrderCount;
          this.addClientCount = response.data.addClientCount;
          this.clientCount = response.data.clientCount;
        });
        //冠军榜
        houseChampionship({ date: this.valueTime }).then(response => {
          this.houseChampionshipList = response.data;
        });
        //审核失败提醒
        auditFailureReminder().then(response => {
          this.auditFailureList = response.data;
        });
        //异常订单提醒
        abnormalOrderReminder().then(response => {
          this.abnormalOrder = response.data;
        });
        //即将到期用户
        expiringUsers().then(response => {
          this.expiringUsersList = response.data;
        });
      } //房产提单员首页
      else if (this.roles == "submitReceiptsStaff") {
        //首行
        houseBillOfLading().then(response => {
          this.submitQuantity = response.data.submitQuantity;
          this.submittedQuantity = response.data.submittedQuantity;
          this.unsubmittedQuantity = response.data.unsubmittedQuantity;
        });
        //冠军榜
        houseChampionship({ date: this.valueTime }).then(response => {
          this.houseChampionshipList = response.data;
        });
        //待提单提醒
        ToBeRemindedByBillOfLading().then(response => {
          this.BillOfLadingList = response.data;
        });
      } //房产经理首行
      else if (this.roles == "salesmanSupervisorEstate") {
        PropertyManager().then(response => {
          this.houseAddClientCount = response.data.addClientCount;
          this.houseClientCount = response.data.clientCount;
          this.houseCurrentMonthSales = response.data.currentMonthSales;
          this.salePackage = response.data.salePackage;
        });
        //冠军榜
        houseChampionship({ date: this.valueTime }).then(response => {
          this.houseChampionshipList = response.data;
        });
        auditReminder().then(response => {
          this.AuditreminderList = response.data;
        });
      } //老板首页
      else if (this.roles == "boss" || this.roles == "bossManager") {
        bossManager().then(response => {
          this.bossClientCount = response.data.clientCount;
          this.addBossClientCount = response.data.addClientCount;
          this.churnCount = response.data.churnCount;
        });
        totalRrevenue({ year: "" }).then(response => {
          this.dzAmountReceived = response.data.dzAmountReceived;
          this.dzIncomeRatio = response.data.dzIncomeRatio;
          this.fdzAmountReceived = response.data.fdzAmountReceived;
          this.fdzIncomeRatio = response.data.fdzIncomeRatio;
        });
      }
      console.info("冠军榜==");
      console.info(this.roles);
      if (
        this.roles == "submitReceiptsStaff" ||
        this.roles == "salesmanEstate" ||
        this.roles == "salesmanSupervisorEstate" ||
        this.roles == "accountExecutive"
      ) {
        //冠军榜
        ChampionList({ championDate: this.valueTime }).then(response => {
          console.info("冠军榜");
          console.info(response);
          this.ChampionListG = response.data;
        });
      }
      //获得当月时间

      var now = new Date();
      var nowMonth = now.getMonth(); //当前月
      this.month = nowMonth + 1;
    },
    selectCall(row) {
      this.idList = [];
      for (let index of row) {
        this.idList.push(index.strId);
      }
    },
    selectAll(row) {
      this.idList = [];
      for (let index of row) {
        this.idList.push(index.strId);
      }

      // this.idList=row
    },

    //批量删除
    delerUp(row) {
      const ids = row.id || this.idList;

      this.$confirm(
        '是否确认删除消息提醒?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return deleteMongoDBByIds(ids);
        })
        .then(() => {
          this.msgSuccess("删除成功");
          let e  = this.showNo
          this.show(e)
          this.deleteCondition = false
        })
        .catch(function() {});
    },
    // 关闭弹窗
    close(){
      console.log('关闭'+this.showNo)

      if(this.showNo=='yichang'){
        // 业务员异常订单申请
        findAbnormalOrderMessage(this.queryParams).then(res=>{
          this.finalPaymentReminders = res.data.rest.rows
          this.finalPaymentNum = res.data.unreadSize
        })
      }else if(this.showNo=='genjin'){
        // 业务员客户跟进
        findFollowMessage(this.queryParams).then(res=>{
          this.followReminders = res.data.rest.rows
          this.followRemindersNum = res.data.unreadSize
        })
      }else if(this.showNo=='xuqian'){
        // 业务员续签客户提醒
        findRenewCustomerMessage(this.queryParams).then(res=>{
          this.renewalReminders = res.data.rest.rows
          this.renewalRemindersNum = res.data.unreadSize
        })
      }else if(this.showNo=='shshibai'){
        // 业务员审核失败提醒
        findAuditFailureMessage(this.queryParams).then(res=>{
          this.auditFaileds = res.data.rest.rows
          this.auditFailedsNum = res.data.unreadSize
        })
      }
    },
    // 点击全部
    show(e){
      console.log(e)
      if(e=='yichang'){
        // 业务员异常订单申请
        findAbnormalOrderMessage(this.queryParams).then(res=>{
          this.messageList = res.data.rest.rows
          res.data.rest.rows.map(items=>{
            if(!items.msg){
              items.msg = items.map.companyName + items.map.orderNumber + '订单尾款'+ items.map.amountOwed + '未交'
            }else{

            }
          })
          this.total = res.data.rest.totalRows
          this.messageCondition = true
          this.showNo = 'yichang'
          this.messagetitle = '异常订单提醒'
        })
      }else if(e=='genjin'){
        // // 业务员客户跟进
        findFollowMessage(this.queryParams).then(res=>{
           this.messageList = res.data.rest.rows
           res.data.rest.rows.map(items=>{
             if(!items.msg){
               items.msg = items.map.companyName  + '要求:'+ items.map.text
             }else{

             }
           })

           this.total = res.data.rest.totalRows
           this.messageCondition = true
           this.showNo = 'genjin'
           this.messagetitle = '客户跟进提醒'
        })
      }else if(e=='xuqian'){
        // // 业务员续签客户提醒
        findRenewCustomerMessage(this.queryParams).then(res=>{
           this.messageList = res.data.rest.rows
             res.data.rest.rows.map(items=>{
             if(!items.msg){
               items.msg = items.map.companyName  + items.map.time +'到期'
             }else{

             }
           })

           this.total = res.data.rest.totalRows
           this.messageCondition = true
           this.showNo = 'xuqian'
           this.messagetitle = '续签客户提醒'
        })
      }else if(e=='shshibai'){
        // 业务员审核失败提醒
        findAuditFailureMessage(this.queryParams).then(res=>{
          this.messageList = res.data.rest.rows
          this.total = res.data.rest.totalRows
          this.messageCondition = true
          this.showNo = 'shshibai'
          this.messagetitle = '审核失败提醒'
        })
      }
    },
    // 翻页
    messagePopUp(){
      this.idList = [];
      this.messageCondition = true;
      let e = this.showNo
      this.show(e)
    },

    roleChange() {
      this.getList();
      // console.info(this.roles)
    },
    //老板首页代账收入
    dateYearChange() {
      totalRrevenue({ year: this.valueYear }).then(response => {
        this.dzAmountReceived = response.data.dzAmountReceived;
        this.dzIncomeRatio = response.data.dzIncomeRatio;
        this.fdzAmountReceived = response.data.fdzAmountReceived;
        this.fdzIncomeRatio = response.data.fdzIncomeRatio;
      });
    },
    //冠军榜日期选择
    dateChange() {
      var datejson = new Date(this.valueTime).toJSON();
      this.valueTime = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      this.getList();
    },
    //路由跳转
    rou(row) {
      console.info(row);
      this.$router.push(row.path);
      this.active = row.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #f7f8fa;
  position: relative;
  min-height: calc(100vh - 64px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  overflow: auto;

  .dashboard-container {
    max-width: 1280px;
    width: 100%;
    font-family: Microsoft YaHei;

    .quick {
      height: 504px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;

      .quick-item {
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #3a3b3d;
        font-size: 16px;

        i {
          margin-left: 26px;
        }

        span {
          margin-left: 14px;
        }

        &.active {
          color: #3978e7;
          background: #f3f6ff;
        }

        &:hover {
          color: #3978e7;
          background: #f3f6ff;
        }
      }
    }

    .app-code {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 258px;

      & > span:nth-child(1) {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #d2d3d6;
        margin-top: 40px;
        margin-bottom: 4px;
      }

      & > span {
        font-size: 14px;
        font-family: Arial;
        font-weight: 400;
        color: #3a3b3d;
        margin-bottom: 13px;
      }

      .erweima {
        width: 86px;
        height: 86px;
        margin-bottom: 30px;
        display: flex;

        img {
          width: 86px;
          height: 86px;
        }
      }

      .maBottom {
        width: 140px;

        .el-divider--horizontal {
          margin: 0;
          margin-bottom: 16px;
        }

        .el-divider__text {
          padding: 0 5px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #d2d3d6;
        }

        div {
          font-size: 14px;
          font-family: Arial;
          font-weight: 400;
          color: #3a3b3d;
          text-align: center;
          margin-bottom: 23px;
        }
      }
    }

    .summary {
      height: 145px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        height: 64px;
        width: 64px;
        margin-left: 24px;
      }

      div {
        display: flex;
        flex-direction: column;
        margin-left: 24px;

        h1 {
          margin: 0;
          font-family: Arial;
          margin-bottom: 4px;
        }

        span {
          font-size: 14px;
          color: #87898c;
        }
      }
    }
    .echars {
      height: 442px;
      margin-bottom: 16px;
      .business {
        height: 81px;
        display: flex;

        border-bottom: 1px solid #e6e7eb;
        align-items: center;

        & > div {
          margin-left: 24px;
          display: flex;

          img {
            width: 32px;
            height: 32px;
          }

          div {
            margin-left: 16px;
            display: flex;
            flex-direction: column;

            span {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 24px;
            }

            span:nth-child(2) {
              font-family: Arial;
              color: #d2d3d6;
            }
          }
        }
      }
    }
    .message {
      height: 382px;
      margin-bottom: 16px;
      overflow: auto;

      .business {
        height: 81px;
        display: flex;

        border-bottom: 1px solid #e6e7eb;
        align-items: center;

        & > div {
          margin-left: 24px;
          display: flex;

          img {
            width: 32px;
            height: 32px;
          }

          div {
            margin-left: 16px;
            display: flex;
            flex-direction: column;

            span {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 24px;
            }

            span:nth-child(2) {
              font-family: Arial;
              color: #d2d3d6;
            }
          }
        }
      }
    }

    .remind {
      height: 220px;
      overflow: auto;

      ul {
        height: 161px;
        // padding: 24px 0 23px 24px;
        padding-left: 24px;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        li {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565759;
          list-style: none;
        }

        li:before {
          content: "\2022"; //圆点
          color: #3978e7; //颜色
          font-size: 16px; //大小
        }
      }

      .business {
        height: 81px;
        display: flex;
        padding-right: 15px;
        border-bottom: 1px solid #e6e7eb;
        align-items: center;
        & > div {
          margin-left: 24px;
          display: flex;
          img {
            width: 32px;
            height: 32px;
          }

          div {
            margin-left: 16px;
            display: flex;
            flex-direction: column;
            max-width: 150px;

            span {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565759;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 24px;
            }

            span:nth-child(2) {
              font-family: Arial;
              color: #d2d3d6;
            }
          }
        }
      }
    }
    .championsModel {
      margin: 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      .champions {
        width: 181px;
        height: 276px;
        background: #ffffff;
        box-shadow: 0px 0px 15px 0px rgba(225, 228, 235, 0.59);
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .champions-logo {
          border: 4px solid #fbdeb7;
          width: 76px;
          height: 76px;
          margin-top: 28px;
          // border-image: -webkit-linear-gradient(#fbdeb7, #fdf7eb) 20 20;

          // border-image: -moz-linear-gradient(#fbdeb7, #fdf7eb) 20 20;

          // border-image: -o-linear-gradient(#fbdeb7, #fdf7eb) 20 20;

          // border-image: linear-gradient(#fbdeb7, #fdf7eb) 20 20;
          border-radius: 50%;
          .image {
            // margin-top: 28px;
            width: 100%;
            height: 100%;
          }
        }

        .name {
          font-size: 16px;
          margin: 12px 0 6px 0;
        }
        .office {
          font-size: 14px;
          color: #a1a2a6;
          margin-bottom: 19px;
        }
        .number {
          font-size: 36px;
          margin-bottom: 4px;
        }
        .customer {
          display: flex;
          align-items: center;
          justify-content: center;
          .customersNumbers {
            width: 120px;
            height: 32px;
            background: #f7f8fa;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            color: #989fab;
          }
          .salesVolume {
            width: 120px;
            height: 32px;
            background: #265deb;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            color: #fff;
          }
        }
      }
      .champions:nth-child(2){
         .champions-logo {
          border: 4px solid #fed5c7;
         }
      }
      .champions:nth-child(3){
         .champions-logo {
          border: 4px solid #e8eaf1;
         }
      }
      .champion {
        width: 140px;
        height: 276px;
        background: #ffffff;
        box-shadow: 0px 0px 15px 0px rgba(225, 228, 235, 0.59);
        .image {
          margin-top: 28px;
        }
        .name {
          font-size: 16px;
          margin: 12px 0 8px 0;
        }
        .office {
          font-size: 14px;
          color: #a1a2a6;
          margin-bottom: 28px;
        }
        .number {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .customer {
          display: flex;
          align-items: center;
          justify-content: center;
          .customersNumbers {
            width: 100px;
            height: 32px;
            background: #f7f8fa;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            color: #989fab;
          }
          .salesVolume {
            width: 120px;
            height: 32px;
            background: #265deb;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }

    .title-vi {
      border-bottom: 1px #e6e7eb solid;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 58px;

      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 12px 12px 12px 0;
      }

      .title {
        color: #303133;
        font-size: 16px;
        margin-left: 24px;
      }

      .count {
        color: #303133;
        font-size: 14px;
        font-family: Arial;
        margin-left: 4px;
      }

      .all {
        font-size: 14px;
        color:#0659E3;
        margin-right: 16px;
        cursor: pointer;
      }
    }
  }
  .bgcolor {
    color: red !important;
  }
}
</style>
<style lang="scss">
.dashboard-editor-container {
  .message {
    .el-input {
      width: 90px;
    }
    .el-input__inner {
      border: 0px !important;
      padding-right: 0px !important;

    }
    i{
      font-size: 13px;
    }
  }
}
</style>
