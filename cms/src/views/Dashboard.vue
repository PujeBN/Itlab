<style scoped>

.down-info-button {
  width: 100%;
  text-align: left;
  height: 70px;
}
</style>
<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Бараа материал"
                                type="gradient-red"
                                :sub-title="String(Number(count.product).toLocaleString())"
                                icon="ni ni-tag"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span> -->
                            <span class="text-nowrap">Бүх барааны тоо</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Борлуулалтын дүн"
                                type="gradient-orange"
                                :sub-title="String(Number(totalThisMonth).toLocaleString())+'₮'"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="totalThisMonth >= totalLastMonth" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{calcRevenue()}}%</span>
                            <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> -{{calcRevenue()}}%</span>
                            <span class="text-nowrap">Өнгөрсөн сарынхаас</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Идэвхитэй захиалга"
                                type="gradient-green"
                                :sub-title="String(Number(count.order).toLocaleString())"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span> -->
                            <span class="text-nowrap">Төлбөр төлөгдсөн захиалга</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Хэрэглэгчид"
                                type="gradient-info"
                                :sub-title="String(count.users).toLocaleString()"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span> -->
                            <span class="text-nowrap">Системийн нийт хэрэглэгч</span>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <!-- <h6 class="text-light text-uppercase ls-1 mb-1">Энэ сарын</h6> -->
                                <h5 class="h3 text-white mb-0">Борлуулалтын харьцуулалт</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 0}"
                                           @click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">Сар</span>
                                            <span class="d-md-none">Сар</span>
                                        </a>
                                    </li>
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 1}"
                                           @click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">7 хоног</span>
                                            <span class="d-md-none">7 хоног</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>
                <div class="col-xl-4 mb-5 mb-xl-0">
                   <base-button type="primary" @click="updateProductInfo" class="down-info-button">
                   <div class="row">
                     <span class="col-xl-1"></span>
                      <span class="col-xl-11">Бараа материалын мэдээлэл шинэчлэх<br>
                      (үлдэгдэл, үндсэн болон дэд категори)</span>
                   </div>
                   </base-button>
                   <base-button type="danger" class="down-info-button mt-2" @click="downloadNewProduct">
                   <div class="row">
                     <span class="col-xl-1"></span>
                      <span class="col-xl-11">Шинэ барааны мэдээлэл татах<br>
                      (Шинээр бүртгэгдсэн бараа татагдана)</span>
                   </div>
                   </base-button>
                   <base-button type="success" class="down-info-button mt-2" @click="updateMainCategory">
                   <div class="row">
                     <span class="col-xl-1"></span>
                      <span class="col-xl-11">Үндсэн категори шинэчлэх</span>
                   </div>
                   </base-button>
                   <base-button type="warning" class="down-info-button mt-2" @click="updateSubCategory">
                   <div class="row">
                     <span class="col-xl-1"></span>
                      <span class="col-xl-11">Дэд категори шинэчлэх</span>
                   </div>
                   </base-button>
                   <base-button type="default" class="down-info-button mt-2" @click="downloadNewBrand">
                   <div class="row">
                     <span class="col-xl-1"></span>
                      <span class="col-xl-11">Брэнд шинэчлэх</span>
                   </div>
                   </base-button>
                </div>
            </div>
            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">
                <div class="col-xl-6 mb-5 mb-xl-0">
                    <!-- <page-visits-table></page-visits-table> -->
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0">
                              Ангилал
                            </h3>
                          </div>
                          <div class="col text-right">
                            <base-button type="primary" size="sm">See all</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="categories">
                          <template slot="columns">
                            <th :style="{'background': '#F6F9FC'}">Нэр & зураг</th>
                            <th :style="{'background': '#F6F9FC'}"></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <a href="#" class="mr-3">
                                  <img alt="Icon" :style="{'width': '30px', 'height': '30px'}" :src="$appUrl+'/images/menu/'+row.icon">
                                </a>
                                <a href="#" class="mr-3">
                                  <img alt="Image" :style="{'width': '50px', 'height': '50px'}" :src="$appUrl+'/images/category/'+row.image">
                                </a>
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{row.category_name}}</span>
                                </div>
                              </div>
                            </th>

                            <td class="text-right">
                              <base-dropdown class="dropdown"
                                            position="right">
                                <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fas fa-ellipsis-v"></i>
                                </a>

                                <template>
                                  <a class="dropdown-item" @click="changeCategoryImage(row.id)" href="javascript:;">Зураг солих</a>
                                  <a class="dropdown-item" @click="changeCategoryIcon(row.id)" href="javascript:;">Icon солих</a>
                                </template>
                              </base-dropdown>
                            </td>
                          </template>
                        </base-table>
                      </div>
                    </div>
                </div>
                <div class="col-xl-6 mb-5 mb-xl-0">
                    <!-- <page-visits-table></page-visits-table> -->
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0">
                              Брэндүүд
                            </h3>
                          </div>
                          <div class="col text-right">
                            <base-button type="primary" size="sm">See all</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="brands">
                          <template slot="columns">
                            <th :style="{'background': '#F6F9FC'}">Нэр & зураг</th>
                            <th :style="{'background': '#F6F9FC'}"></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <a href="#" class="mr-3">
                                  <img alt="Image" :style="{'width': '50px', 'height': 'auto'}" :src="$appUrl+'/images/brand/'+row.images">
                                </a>
                                <a href="#" class="mr-3">
                                  <img alt="Image" :style="{'width': '100px', 'height': 'auto'}" :src="$appUrl+'/images/brand/'+row.bg">
                                </a>
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{row.brandname}}</span>
                                </div>
                              </div>
                            </th>
                            <td class="text-right">
                              <base-dropdown class="dropdown"
                                            position="right">
                                <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fas fa-ellipsis-v"></i>
                                </a>

                                <template>
                                  <a class="dropdown-item" @click="changeBrandImage(row.id)" href="javascript:;">Зураг солих</a>
                                  <a class="dropdown-item" @click="changeBackgroundImage(row.id)" href="javascript:;">Арын зураг солих</a>
                                  <a class="dropdown-item" @click="deleteBrand(row.id)" href="javascript:;">Устгах</a>
                                </template>
                              </base-dropdown>
                            </td>
                          </template>
                        </base-table>
                      </div>
                    </div>
                </div>
                <div class="col-xl-6 mb-5 mb-xl-0 mt-3">
                    <!-- <page-visits-table></page-visits-table> -->
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0">
                              Онцгой бүтээгдэхүүн
                            </h3>
                          </div>
                          <div class="col text-right">
                            <base-button type="primary" size="sm">See all</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="specials">
                          <template slot="columns">
                            <th :style="{'background': '#F6F9FC'}">Нэр & зураг</th>
                            <th :style="{'background': '#F6F9FC'}"></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <a href="#" class="mr-3">
                                  <img alt="Image" :style="{'width': '50px', 'height': 'auto'}" :src="$appUrl+'/images/product/'+row.image">
                                </a>
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{row.name}}</span>
                                </div>
                              </div>
                            </th>
                            <td class="text-right">
                              <base-button type="danger" @click="modals.newSpecial = true" size="sm">Бүтээгдэхүүн солих</base-button>
                            </td>
                          </template>
                        </base-table>
                      </div>
                    </div>
                </div>
                <div class="col-xl-6 mb-5 mb-xl-0 mt-3">
                    <!-- <page-visits-table></page-visits-table> -->
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0">
                              Нүүр баннер
                            </h3>
                          </div>
                          <div class="col text-right">
                            <base-button type="primary" size="sm" @click="modals.homeBanner = true">Шинэ</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="banner">
                          <template slot="columns">
                            <th :style="{'background': '#F6F9FC'}">Нэр & зураг</th>
                            <th :style="{'background': '#F6F9FC'}"></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <a href="#" class="mr-3">
                                  <img alt="Image" :style="{'width': '50px', 'height': 'auto'}" :src="$appUrl+'/images/banner/'+row.image">
                                </a>
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{row.title_2}}</span>
                                </div>
                              </div>
                            </th>
                            <td class="text-right">
                              <base-button type="danger" @click="deleteBanner(row.id)" size="sm">Устгах</base-button>
                            </td>
                          </template>
                        </base-table>
                      </div>
                    </div>
                </div>
                <div class="col-xl-6 mb-5 mb-xl-0 mt-3">
                    <!-- <page-visits-table></page-visits-table> -->
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0">
                              Үзүүлэлтүүд
                            </h3>
                          </div>
                          <div class="col text-right">
                            <base-button type="secondary" size="sm" @click="modals.newspec = true">Шинэ</base-button>
                            <base-button type="primary" size="sm" @click="showModalSpec">Нэмэх</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="specials">
                          <template slot="columns">
                            <th :style="{'background': '#F6F9FC'}">Категори & бүртгэлтэй үзүүлэлт</th>
                          </template>
                          <template>
                                <td>
                                  <el-select v-model="selectedsubcategories" filterable placeholder="Select" :style="{'width': '100%'}">
                                    <el-option
                                      v-for="item in subcategories"
                                      :key="item.id"
                                      :label="item.sub_category_name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                                </td>
                          </template>
                        </base-table>
                      </div>
                      <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="checkSpecs()">
                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{row.replaceAll('_', ' ')}}</span>
                                </div>
                              </div>
                            </th>
                          </template>
                        </base-table>
                      </div>
                    </div>
                </div>
                <div class="col-xl-6 mb-5 mb-xl-0 mt-3">
                    <!-- <page-visits-table></page-visits-table> -->
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0">
                              Зурган баннерууд
                            </h3>
                          </div>
                          <div class="col text-right">
                            <base-button type="primary" size="sm" @click="modals.addNewBanner = true">Нэмэх</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="banners">
                          <template slot="columns">
                            <th :style="{'background': '#F6F9FC'}">Нэр & зураг</th>
                            <th :style="{'background': '#F6F9FC'}"></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <a href="#" class="mr-3">
                                  <img alt="Image" :style="{'width': '50px', 'height': 'auto'}" :src="$appUrl+'/images/banner/'+row.image">
                                </a>
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{row.title_2}}</span>
                                </div>
                              </div>
                            </th>
                            <td class="text-right">
                              <base-button type="danger" @click="deleteBanner2(row.id)" size="sm">Устгах</base-button>
                            </td>
                          </template>
                        </base-table>
                      </div>
                    </div>
                </div>
                <div class="col-xl-12 mb-5 mb-xl-0 mt-3">
                    <!-- <page-visits-table></page-visits-table> -->
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <el-select v-model="events.selectedEvent" size="small" class="mr-2" placeholder="Эвэнтээ сонгоно уу" :style="{'width': '100%'}">
                              <el-option
                                v-for="item in events.list"
                                :key="item.id"
                                :label="item.event_name"
                                :value="item.id">
                                <span style="float: left">{{ item.event_name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 5px">
                                  <base-button type="primary" @click="modals.editEvent = true" size="sm"><span class="ni ni-settings"></span></base-button>
                                  <!-- <span class="ni ni-fat-remove"></span> -->
                                </span>
                              </el-option>
                            </el-select>
                          </div>
                          <div class="col text-right">
                            <base-button v-if="events.selectedEvent != ''" type="secondary" size="sm" @click="modals.addProductEvent = true">Бүтээгдэхүүн нэмэх</base-button>
                            <base-button type="primary" size="sm" @click="modals.newEvent = true">Эвэнт бүртгэх</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="selectedEventProduct()">
                          <template slot="columns">
                            <th :style="{'background': '#F6F9FC'}">Бүртгэлтэй бүтээгдэхүүнүүд</th>
                            <th :style="{'background': '#F6F9FC'}"></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <a href="#" class="mr-3">
                                  <img alt="Image" :style="{'width': '50px', 'height': 'auto'}" :src="$appUrl+'/images/product/'+row.image">
                                </a>
                                <div class="media-body">
                                  <span class="name mb-0 text-sm"><strong>{{row.model}}</strong> {{row.name}} <br>
                                  {{row.color_name}}
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td class="text-right">
                              <base-button type="danger" size="sm">Устгах</base-button>
                            </td>
                          </template>
                        </base-table>
                      </div>
                    </div>
                </div>
            </div>
            <!--End tables-->
        </div>
        <input type="file" accept="image/*" ref="categoryImageInput" id="categoryImageInput" hidden @change="onCategoryImageSelected" />
        <input type="file" accept="image/*" ref="categoryIconInput" id="categoryIconInput" hidden @change="onCategoryIconSelected" />
        <input type="file" accept="image/*" ref="brandImageInput" id="brandImageInput" hidden @change="onBrandImageSelected" />
        <input type="file" accept="image/*" ref="brandBackgroundInput" id="brandBackgroundInput" hidden @change="onBrandBackgroundSelected" />
        
        <modal :show.sync="modals.newSpecial">
            <h6 slot="header" class="modal-title" id="modal-title-default">Шинэ урамшуулалтай бүтээгдэхүүн хадгалах</h6>
              <div class="row">
                <div class="col-md-6">
                    <base-input placeholder="Бүтээгдэхүүний нэр" v-model="newSpecial.name" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="Бүтээгдэхүүний модель" v-model="newSpecial.model" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="Зарах үнэ" type="number" v-model="newSpecial.price" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="Хямдруулах хувь" type="number" v-model="newSpecial.sale" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="Бонус" type="number" v-model="newSpecial.bonus" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="Тоо ширхэг" v-model="newSpecial.qty" type="number" required></base-input>
                </div>
                <div class="col-md-6">
                    <el-select v-model="newSpecial.brand" filterable placeholder="Брэнд" style="width: 100%;">
                      <el-option
                        v-for="item in brands"
                        :key="item.id"
                        :label="item.brandname"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </div>
                <div class="col-md-6">
                    <el-select v-model="newSpecial.category" filterable placeholder="Категори" style="width: 100%;">
                      <el-option
                        v-for="item in categories"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </div>
                <div class="col-md-6 mt-4">
                    <el-select v-model="newSpecial.subCategory" filterable placeholder="Дэд категори" style="width: 100%;">
                      <el-option
                        v-for="item in selectSub()"
                        :key="item.id"
                        :label="item.sub_category_name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </div>
                <div class="col-md-6 mt-4">
                  <base-input addon-left-icon="ni ni-calendar-grid-58">
                      <flat-picker slot-scope="{focus, blur}"
                                  @on-open="focus"
                                  @on-close="blur"
                                  :config="{allowInput: true}"
                                  class="form-control datepicker"
                                  v-model="newSpecial.end_at">
                      </flat-picker>
                  </base-input>
                </div>
              </div>
              <div class="col-md-12">
                    <base-input placeholder="Зураг" type="file" @change="addSpecialImage" required></base-input>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="saveSpecial">Хадгалах</base-button>
              <base-button type="link" class="ml-auto" @click="modals.newSpecial = false">Гарах
            </base-button>
          </template>
        </modal>

        <modal :show.sync="modals.homeBanner">
            <h6 slot="header" class="modal-title" id="modal-title-default">Шинэ нүүр баннер бүртгэх</h6>
              <div class="row">
                <div class="col-md-6">
                    <base-input placeholder="Бүтээгдэхүүний модель" v-model="newbanner.model" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="title 1" v-model="newbanner.title1" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="title 2" v-model="newbanner.title2" required></base-input>
                </div>
                <div class="col-md-6">
                    <base-input placeholder="title 3" v-model="newbanner.title3" required></base-input>
                </div>
              </div>
              <div class="col-md-12">
                    <base-input placeholder="Зураг" type="file" @change="addBannerImage" required></base-input>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="saveBanner">Хадгалах</base-button>
              <base-button type="link" class="ml-auto" @click="modals.homeBanner = false">Гарах
            </base-button>
          </template>
        </modal>

        <modal :show.sync="modals.newspec">
            <h6 slot="header" class="modal-title" id="modal-title-default">Шинэ үзүүлэлт бүртгэх</h6>
              <div class="row">
                <div class="col-md-12">
                    <base-input placeholder="Үзүүлэлтийн нэрээ оруулна уу" v-model="newSpecText" required></base-input>
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="saveNewSpec">Хадгалах</base-button>
              <base-button type="link" class="ml-auto" @click="modals.newspec = false">Гарах
            </base-button>
          </template>
        </modal>

        <modal :show.sync="modals.editEvent">
              <div class="row">
                <div class="col-md-12">
                    <base-button size="lg" :style="{'width': '100%'}" type="primary">Үндсэн эвэнт болгох</base-button>
                    <base-button size="lg" @click="deleteEvent" class="mt-2" type="danger" :style="{'width': '100%'}">Устгах</base-button>
                </div>
              </div>
        </modal>

        <modal :show.sync="modals.newEvent">
            <h6 slot="header" class="modal-title" id="modal-title-default">Шинэ эвэнт бүртгэх</h6>
              <div class="row">
                <div class="col-md-12">
                    <base-input placeholder="Эвэнтийн нэрээ оруулна уу" v-model="newEvent.name" required></base-input>
                </div>
                <div class="col-md-12">
                    <input type="file" accept="image/*" ref="changedNewEventImage" id="changedNewEventImage" @change="onChangedNewEventImage" />
                </div>
              </div>
              <!-- шинээр эвэнт хадгалах мөчид ажиллах модель  -->
              <template slot="footer">
                <base-button type="primary" @click="SavenNewEvent">Хадгалах</base-button>
              <base-button type="link" class="ml-auto" @click="modals.newEvent = false">Гарах
            </base-button>
          </template>
        </modal>

        <modal :show.sync="modals.addProductEvent">
            <h6 slot="header" class="modal-title" id="modal-title-default">Эвэнтийн бараа нэмэх</h6>
              <div class="row">
                <div class="col-md-12">
                    <base-input placeholder="Барааны модель дугаараа оруулна уу" v-model="addProductModelEvent" required></base-input>
                </div>
              </div>
              <!-- шинээр эвэнт хадгалах мөчид ажиллах модель  -->
              <template slot="footer">
                <base-button type="primary" @click="SaveProductEvent">Нэмэх</base-button>
              <base-button type="link" class="ml-auto" @click="modals.addProductEvent = false">Гарах
            </base-button>
          </template>
        </modal>

        <modal :show.sync="modals.addNewBanner">
            <h6 slot="header" class="modal-title" id="modal-title-default">Баннер бүртгэх</h6>
              <div class="row">
                <div class="col-md-12">
                    <base-input placeholder="Баннер нэр оруулна уу" v-model="newBanner2.title" required></base-input>
                </div>
                <div class="col-md-12">
                    <base-input placeholder="Тайлбар" maxlength="150" v-model="newBanner2.description" required></base-input>
                </div>
                <div class="col-md-12">
                    <input type="file" accept="image/*" ref="newBanner2Image" id="newBanner2Image" @change="onChangedBannerImage" />
                </div>
                <div class="col-md-12 mt-3">
                  <el-select v-model="newBanner2.category" filterable placeholder="Категорио сонгоно уу" :style="{'width': '100%'}">
                    <el-option
                      v-for="item in subcategories"
                      :key="item.id"
                      :label="item.sub_category_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="saveNewBanner2">Хадгалах</base-button>
              <base-button type="link" class="ml-auto" @click="modals.addNewBanner = false">Гарах
            </base-button>
          </template>
        </modal>

        <modal :show.sync="modals.specs">
            <h6 slot="header" class="modal-title" id="modal-title-default">Үзүүлэлтийн багана нэмэх</h6>
              <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive" :style="{'max-height': '300px'}">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="specList">
                          <template slot-scope="{row}">
                            <th scope="row">
                              <div class="media align-items-center">
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{row.Field.replaceAll('_', ' ')}}</span>
                                </div>
                              </div>
                            </th>
                            <td align="right">
                              <input type="checkbox" name="spec_check" id="spec_check" :checked="checkSpecChecked(row.Field)" @click="addSpec(row.Field)">
                            </td>
                          </template>
                        </base-table>
                      </div>
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="updateSpec">Хадгалах</base-button>
              <base-button type="link" class="ml-auto" @click="modals.specs = false">Гарах
            </base-button>
          </template>
        </modal>
        
    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  export default {
    components: {
      LineChart,
      flatPicker
    },
    data() {
      return {
        fullscreenLoading: false,
        totalThisMonth: 0,
        totalLastMonth: 0,
        newbanner: {
          model: '',
          title1: '',
          title2: '',
          title3: '',
          image: ''
        },
        events: {
          list: [],
          product: [],
          selectedEvent: ''
        },
        newSpecial: {
          name: '',
          model: '',
          price: 0,
          sale: 0,
          bonus: 0,
          qty: 0,
          image: '',
          end_at: new Date(),
          brand: '',
          category: '',
          subCategory: ''
        },
        newBanner2: {
          title: '',
          desctiption: '',
          selectedFile: '',
          category: ''
        },
        newEvent: {
          name: '',
          selectedFile: ''
        },
        modals: {
          newSpecial: false,
          homeBanner: false,
          specs: false,
          newspec: false,
          addNewBanner: false,
          newEvent: false,
          editEvent: false,
          addProductEvent: false
        },
        specList: [],
        categories: [],
        subcategories: [],
        selectedsubcategories: '',
        newSpecText: '',
        selectedSpecs: [],
        banner: [],
        banners: [],
        brands: [],
        specials: [],
        changeCategory: {
          id: 0,
          selectedFile: '',
          selectedIcon: ''
        },
        changeBrand: {
          id: 0,
          selectedFile: ''
        },
        bigLineChart: {
          allData: [
            [],
            []
          ],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        count:[],
        addProductModelEvent: ''
      };
    },
    methods: {
      SaveProductEvent() {
        var rts = this;
        const token = localStorage.getItem('token');
        rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/add-product-to-event',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                model: this.addProductModelEvent,
                eventId: this.events.selectedEvent
              }
          }).then(data => {
            if(data.data.result == 'success') {
              rts.events.product = data.data.product;
            } else {
              rts.$notify({
                title: 'Амжилтгүй',
                message: `Бүтээгдэхүүн олдсонгүй`,
                type: 'danger'
              });
            }
          });
      },
      selectedEventProduct() {
        var p = [];
        if(this.events.selectedEvent == '') {
          return p;
        } else {
          this.events.product.forEach(el => {
            if(el.eventId == this.events.selectedEvent) {
              p.push(el);
            }
          });
          return p;
        }
      },
      deleteEvent() {
        var rts = this;
        const token = localStorage.getItem('token');
        this.$confirm('Устгахдаа итгэлтэй байна уу?', 'Санамж', {
          confirmButtonText: 'Тийм',
          cancelButtonText: 'Болих',
          type: 'warning'
        }).then(() => {
          rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/delete-event',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                id: this.events.selectedEvent
              }
          }).then(data => {
            if(data.data.result == 'success') {
              rts.events.list.forEach((el, index) => {
                if(el.id == rts.events.selectedEvent) {
                  rts.events.list.splice(index, 1);
                }
              });
              rts.$notify({
                title: 'Амжилттай',
                message: `Эвэнт устгагдлаа`,
                type: 'success'
              });
              rts.events.selectedEvent = '';
              rts.modals.editEvent = false;
            } else {
              rts.$notify({
                title: 'Амжилтгүй',
                message: `Эвэнт олдсонгүй`,
                type: 'danger'
              });
            }
          });
        });
      },
      deleteBrand(id) {
        var rts = this;
        const token = localStorage.getItem('token');
        this.$confirm('Энэхүү брэнд дээр бүртгэлтэй бараа хамт устахыг анхаарна уу !', 'Санамж', {
          confirmButtonText: 'Зөвшөөрч байна',
          cancelButtonText: 'Болих',
          type: 'warning'
        }).then(() => {
          rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/delete-brand',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                id
              }
          }).then(data => {
            if(data.data.result == 'success') {
              rts.brands.forEach((el, index) => {
                if(el.id == id) {
                  rts.brands.splice(index, 1);
                }
              });
              rts.$notify({
                title: 'Амжилттай',
                message: `Брэнд устгагдлаа`,
                type: 'success'
              });
            }
          });
        });
      },
      SavenNewEvent() {
        if(this.newEvent.name == '' || this.newEvent.selectedFile == '') {
          this.$notify({
                title: 'Амжилтгүй',
                message: `Талбараа бүрэн бөглөнө үү`,
                type: 'warning'
          });
        } else {
          var rts = this;
          const token = localStorage.getItem('token');
          const fd = new FormData();
          fd.append('photo', this.newEvent.selectedFile, this.newEvent.selectedFile.name);
          fd.append('name', this.newEvent.name);
          this.$axios.post(this.$appUrl+'/api/admin/add-new-event', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then(function(data) {
            rts.events.list = data.data.events;
            rts.$notify({
                title: 'Амжилттай',
                message: `Эвэнт бүртгэгдлээ`,
                type: 'success'
            });
            rts.modals.newEvent = false;
          }).catch(error => {
              console.log(error);
          });
        }
      },
      saveNewBanner2() {
        if(this.newBanner2.title == '' && this.newBanner2.desctiption == '' || this.newBanner2.selectedFile == '' || this.newBanner2.category == '') {
          this.$notify({
                title: 'Амжилтгүй',
                message: 'Талбараа бүрэн бөглөнө үү',
                type: 'warning'
              });
        } else {
          var rts = this;
          const token = localStorage.getItem('token');
          const fd = new FormData();
          fd.append('photo', this.newBanner2.selectedFile, this.newBanner2.selectedFile.name);
          fd.append('title', this.newBanner2.title);
          fd.append('description', this.newBanner2.description);
          fd.append('subId', this.newBanner2.category);
          this.$axios.post(this.$appUrl+'/api/admin/add-new-banner-2', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then(function(data) {  
            rts.$notify({
              title: 'Амжилттай',
              message: `Зураг шинэчлэгдлээ`,
              type: 'success'
            });
            rts.banners = data.data.banners;
          }).catch(error => {
              console.log(error);
          });
        }
      },
      calcRevenue() {
        var percent = 0;
        percent = (this.totalThisMonth * 100) / this.totalLastMonth;

        if(percent >= 100) {
          percent = percent - 100;
        } else {
          percent = 100 - percent;
        }
        return percent.toFixed(2);
      },
      selectSub() {
        var sub = [];
        this.subcategories.forEach(el => {
          if(el.categoryID == this.newSpecial.category) {
            sub.push(el);
          }
        });
        return sub;
      },
      saveNewSpec() {
        var rts = this;
        var token = localStorage.getItem('token');
        rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/add-new-spec',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                name: this.newSpecText
              }
          }).then(data => {
            if(data.data.result == 'failed') {
              rts.$notify({
                title: 'Амжилтгүй',
                message: data.data.msg,
                type: 'warning'
              });
            } else {
              rts.specList = data.data.specs.slice(2,data.data.specs.length);
              rts.$notify({
                title: 'Амжилттай',
                message: `Үзүүлэлт бүртгэгдлээ`,
                type: 'success'
              });
            }
          });
      },
      updateSpec () {
        var s = '';
        var rts = this;
        var token = localStorage.getItem('token');
        this.selectedSpecs.forEach(el => {
          if(s == '') {
            s += el;
          } else {
            s += `#${el}`;
          }
        });
        if(s == '') {
          rts.$notify({
              title: 'Амжилтгүй',
              message: `Үзүүлэлт сонгоогүй байна`,
              type: 'warning'
            });
        } else {
          rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/update-specs',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                id: this.selectedsubcategories,
                spec: s
              }
          }).then(data => {
            rts.subcategories = data.data.subcategory;
            rts.selectedsubcategories = data.data.subcategory[0].id;
            rts.$notify({
              title: 'Амжилттай',
              message: `Үзүүлэлтийн багана шинэчлэгдлээ`,
              type: 'success'
            });
          });
        }
      },
      showModalSpec () {
        this.selectedSpecs = [];
        this.subcategories.forEach(el => {
          if(el.id == this.selectedsubcategories) {
            if(el.specs != null && el.specs != '') {
              var rows = el.specs.split('#');
              rows.forEach(element => {
                this.selectedSpecs.push(element);
              });
            }
          }
        });
        this.modals.specs = true;
      },
      checkSpecChecked(val) {
        let ex = this.selectedSpecs.some(function(field) {
              return field == val
          });
        return ex;
      },
      addSpec (spec) {
        let ex = this.selectedSpecs.some(function(field) {
              return field == spec
        });
        if(ex) {
          this.selectedSpecs.forEach((el, index) => {
            if(el == spec) {
              this.selectedSpecs.splice(index, 1);
            }
          });
        } else {
          this.selectedSpecs.push(spec);
        }
      },
      checkSpecs () {
        var rows = [];
        this.subcategories.forEach(el => {
          if(el.id == this.selectedsubcategories) {
            if(el.specs != null && el.specs != '') {
              rows = el.specs.split('#');
            }
          }
        });
        return rows;
      },
      deleteBanner2(id) {
         var rts = this;
          const token = localStorage.getItem('token');
        this.$confirm('Устгахдаа итгэлтэй байна уу?', 'Санамж', {
          confirmButtonText: 'Тийм',
          cancelButtonText: 'Болих',
          type: 'warning'
        }).then(() => {
          rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/delete-banner-2',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                id
              }
          }).then(data => {
            if(data.data.result == 'success') {
              rts.banners.forEach((el, index) => {
                if(el.id == id) {
                  rts.banners.splice(index, 1);
                }
              });
              rts.$notify({
                title: 'Амжилттай',
                message: `Баннер устгагдлаа`,
                type: 'success'
              });
            }
          });
        });
      },
      deleteBanner(id) {
          var rts = this;
          const token = localStorage.getItem('token');
        this.$confirm('Устгахдаа итгэлтэй байна уу?', 'Санамж', {
          confirmButtonText: 'Тийм',
          cancelButtonText: 'Болих',
          type: 'warning'
        }).then(() => {
          rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/delete-home-banner',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                id
              }
          }).then(data => {
            if(data.data.result == 'success') {
              rts.banner.forEach((el, index) => {
                if(el.id == id) {
                  rts.banner.splice(index, 1);
                }
              });
              rts.$notify({
                title: 'Амжилттай',
                message: `Нүүр баннер устгагдлаа`,
                type: 'success'
              });
            }
          });
        });
      },
      updateMainCategory() {
        this.fullscreenLoading = true;
        var rts = this;
        const token = localStorage.getItem('token');
        rts.$axios({
            method: 'POST',
            url: rts.$appUrl + '/api/admin/download-new-category',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(data => {
          rts.fullscreenLoading = false;
          if(data.data.result == 'success') {
            rts.$notify({
              title: 'Амжилттай',
              message: `Үндсэн категори шинэчлэгдлээ`,
              type: 'success'
            });
          }
        });
      },
      updateSubCategory() {
        this.fullscreenLoading = true;
        var rts = this;
        const token = localStorage.getItem('token');
        rts.$axios({
            method: 'POST',
            url: rts.$appUrl + '/api/admin/download-new-sub-category',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(data => {
          rts.fullscreenLoading = false;
          if(data.data.result == 'success') {
            rts.$notify({
              title: 'Амжилттай',
              message: `Дэд категори шинэчлэгдлээ`,
              type: 'success'
            });
          }
        });
      },
      downloadNewBrand() {
        this.fullscreenLoading = true;
        var rts = this;
        const token = localStorage.getItem('token');
        rts.$axios({
            method: 'POST',
            url: rts.$appUrl + '/api/admin/download-new-brands',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(data => {
          rts.fullscreenLoading = false;
          if(data.data.result == 'success') {
            rts.$notify({
              title: 'Амжилттай',
              message: `Шинэ брэнд татагдлаа`,
              type: 'success'
            });
          } else {
            rts.$notify({
              title: 'Амжилтгүй',
              message: `Шинэ брэнд олдсонгүй`,
              type: 'warning'
            });
          }
        });
      },
      updateProductInfo() {
        this.fullscreenLoading = true;
        var rts = this;
        const token = localStorage.getItem('token');
        rts.$axios({
            method: 'POST',
            url: rts.$appUrl + '/api/admin/update-product-info',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(data => {
          rts.fullscreenLoading = false;
          if(data.data.result == 'success') {
            rts.$notify({
              title: 'Амжилттай',
              message: `Бүтээгдэхүүний мэдээлэл шинэчлэгдлээ`,
              type: 'success'
            });
          }
        });
      },
      downloadNewProduct(){
        this.fullscreenLoading = true;
        var rts = this;
        const token = localStorage.getItem('token');
        rts.$axios({
            method: 'POST',
            url: rts.$appUrl + '/api/admin/download-new-product',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(data => {
          rts.fullscreenLoading = false;
          if(data.data.result == 'success') {
            rts.$notify({
              title: 'Амжилттай',
              message: `Шинэ бүтээгдэхүүн амжилттай нэмэгдлээ`,
              type: 'success'
            });
          } else {
            rts.$notify({
              title: 'Амжилтгүй',
              message: `Шинэ бүтээгдэхүүн одсонгүй`,
              type: 'warning'
            });
          }
        });
      },
      addBannerImage(e) {
        const file = e.target.files[0];
        this.newbanner.image = file;
      },
      addSpecialImage(e) {
        const file = e.target.files[0];
        this.newSpecial.image = file;
      },
      saveBanner() {
        var rts = this;
        const token = localStorage.getItem('token');
        var h = this.newbanner;
        if(h.model != '' && h.title1 != '' && h.title2 != '' && h.title3 != '' && h.image != '') {
          const fd = new FormData();
          fd.append('photo', this.newbanner.image, this.newbanner.image.name);
          fd.append('info', JSON.stringify(this.newbanner));
          this.$axios.post(this.$appUrl+'/api/admin/add-home-banner', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          ).then(data => {
            if(data.data.result == 'failed') {
              rts.$notify({
                title: 'Амжилтгүй',
                message: `Модель дугаар буруу`,
                type: 'danger'
              });
            } else {
              rts.banner = data.data.banner;
              rts.$notify({
                title: 'Амжилттай',
                message: `Нүүр баннер бүртгэгдлээ`,
                type: 'success'
              });
            }
          });
        } else {
          rts.$notify({
              title: 'Амжилтгүй',
              message: `Мэдээллээ бүрэн бөглөнө үү`,
              type: 'danger'
            });
        }
      },
      saveSpecial() {
        var rts = this;
        const token = localStorage.getItem('token');
        var s = this.newSpecial;
        if(s.name != '' && s.model != '' && s.price != 0 && s.sale != 0 && s.bonus != 0 && s.qty != 0 && s.image != '' && s.brand != '' && s.category != '' && s.subCategory != '') {
          const fd = new FormData();
          fd.append('photo', this.newSpecial.image, this.newSpecial.image.name);
          fd.append('info', JSON.stringify(this.newSpecial));
          this.$axios.post(this.$appUrl+'/api/admin/update-special', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          ).then(data => {
            rts.specials[0].name = s.name;
            rts.specials[0].image = data.data.image;
            rts.$notify({
              title: 'Амжилттай',
              message: `Онцгой бүтээгдэхүүн шинэчлэгдлээ`,
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          });
        } else {
          rts.$notify({
              title: 'Амжилтгүй',
              message: `Мэдээллээ бүрэн бөглөнө үү`,
              type: 'danger'
            });
        }
      },
      updateCategory() {
        var rts = this;
        const token = localStorage.getItem('token');
        if(this.changeCategory.selectedFile) {
          const fd = new FormData();
          fd.append('photo', this.changeCategory.selectedFile, this.changeCategory.selectedFile.name);
          fd.append('id', this.changeCategory.id);
          this.$axios.post(this.$appUrl+'/api/admin/update-category-image', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then(function(data) {            
            var id = data.data.image;
            rts.$notify({
              title: 'Амжилттай',
              message: `Зураг шинэчлэгдлээ`,
              type: 'success'
            });
            rts.categories.forEach((el, index) => {
              if(el.id == rts.changeCategory.id) {
                rts.categories[index].image = id;
              }
            });
          }).catch(error => {
              console.log(error);
          });
        }
      },
      updateCategoryIcon() {
        var rts = this;
        const token = localStorage.getItem('token');
        if(this.changeCategory.selectedIcon) {
          const fd = new FormData();
          fd.append('photo', this.changeCategory.selectedIcon, this.changeCategory.selectedIcon.name);
          fd.append('id', this.changeCategory.id);
          this.$axios.post(this.$appUrl+'/api/admin/update-category-icon', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then(function(data) {            
            var id = data.data.image;
            rts.$notify({
              title: 'Амжилттай',
              message: `Зураг шинэчлэгдлээ`,
              type: 'success'
            });
            rts.categories.forEach((el, index) => {
              if(el.id == rts.changeCategory.id) {
                rts.categories[index].icon = id;
              }
            });
          }).catch(error => {
              console.log(error);
          });
        }
      },
      updateBrandBackground() {
        var rts = this;
        const token = localStorage.getItem('token');
        console.log(this.changeBrand.selectedFile);
        if(this.changeBrand.selectedFile) {
          const fd = new FormData();
          fd.append('photo', this.changeBrand.selectedFile, this.changeBrand.selectedFile.name);
          fd.append('id', this.changeBrand.id);
          this.$axios.post(this.$appUrl+'/api/admin/change-brand-background', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then(function(data) {            
            var id = data.data.image;
            rts.$notify({
              title: 'Амжилттай',
              message: `Зураг шинэчлэгдлээ`,
              type: 'success'
            });
            rts.brands.forEach((el, index) => {
              if(el.id == rts.changeBrand.id) {
                rts.brands[index].bg = id;
              }
            });
          }).catch(error => {
              console.log(error);
          });
        }
      },
      updateBrand() {
        var rts = this;
        const token = localStorage.getItem('token');
        if(this.changeBrand.selectedFile) {
          const fd = new FormData();
          fd.append('photo', this.changeBrand.selectedFile, this.changeBrand.selectedFile.name);
          fd.append('id', this.changeBrand.id);
          this.$axios.post(this.$appUrl+'/api/admin/update-brand-image', 
          fd,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then(function(data) {            
            var id = data.data.image;
            rts.$notify({
              title: 'Амжилттай',
              message: `Зураг шинэчлэгдлээ`,
              type: 'success'
            });
            rts.brands.forEach((el, index) => {
              if(el.id == rts.changeBrand.id) {
                rts.brands[index].images = id;
              }
            });
          }).catch(error => {
              console.log(error);
          });
        }
      },
      onBrandImageSelected(e) {
        const file = e.target.files[0];
        this.changeBrand.selectedFile = file;
        this.updateBrand();
      },
      onBrandBackgroundSelected(e) {
        const file = e.target.files[0];
        this.changeBrand.selectedFile = file;
        this.updateBrandBackground();
      },
      onChangedBannerImage(e) {
        const file = e.target.files[0];
        this.newBanner2.selectedFile = file;
      },
      onChangedNewEventImage(e) {
        const file = e.target.files[0];
        this.newEvent.selectedFile = file;
      },
      onCategoryImageSelected(e) {
        const file = e.target.files[0];
        this.changeCategory.selectedFile = file;
        this.updateCategory();
      },
      onCategoryIconSelected(e) {
        const file = e.target.files[0];
        this.changeCategory.selectedIcon = file;
        this.updateCategoryIcon();
      },
      changeCategoryImage(id) {
        this.changeCategory.id = id;
        this.$refs.categoryImageInput.click();
      },
      changeCategoryIcon(id) {
        this.changeCategory.id = id;
        this.$refs.categoryIconInput.click();
      },
      changeBrandImage(id) {
        this.changeBrand.id = id;
        this.$refs.brandImageInput.click();
      },
      changeBackgroundImage(id) {
        this.changeBrand.id = id;
        this.$refs.brandBackgroundInput.click();
      },
      initBigChart(index) {
        if(index == 0) {
          let chartData = {
            datasets: [
              {
                label: 'Борлуулалт',
                data: this.bigLineChart.allData[index]
              }
            ],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
          };
          this.bigLineChart.chartData = chartData;
          this.bigLineChart.activeIndex = index;
        } else if (index == 1) {
          let chartData = {
            datasets: [
              {
                label: 'Борлуулалт',
                data: this.bigLineChart.allData[index],
                fontFamily: 'Exo 2'
              }
            ],
            labels: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'],
          };
          this.bigLineChart.chartData = chartData;
          this.bigLineChart.activeIndex = index;
        }
      },
      getInfo() {
        const token = localStorage.getItem('token');
            var rts = this;
            // console.log(rts.bigLineChart.allData[0][0]);
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/dashboard',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => {
              console.log(data.data);
              rts.count = data.data.count;
              let order = data.data.total_order;
              for (let i = 1; i <= 31; i++) {
                let ex = order.some(function(field) {
                    return field.day == i
                });
                if(ex) {
                  order.forEach(el => {
                    if(el.day == i) {
                      rts.bigLineChart.allData[0][i] = el.amount;
                    }
                  });
                } else {
                  rts.bigLineChart.allData[0][i] = 0;
                }
              }
              var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
              let week = data.data.week;
              days.forEach(el => {
                  let ex = week.some(function(field) {
                      return field.dayname == el
                  });
                  if(ex) {
                    week.forEach(els => {
                      if(els.dayname == el) {
                        rts.bigLineChart.allData[1].push(els.amount);
                      }
                    });
                  } else {
                    rts.bigLineChart.allData[1].push(0);
                  }
              });

              rts.initBigChart(0);
              rts.categories = data.data.category;
              rts.brands = data.data.brand;
              rts.specials = data.data.special;
              rts.banner = data.data.banner;
              rts.banners = data.data.banners;
              rts.subcategories = data.data.subcategory;
              rts.selectedsubcategories = data.data.subcategory[0].id;
              rts.specList = data.data.specs.slice(2,data.data.specs.length);
              rts.totalLastMonth = data.data.lastMonth;
              rts.totalThisMonth = data.data.thisMonth;
              rts.events.list = data.data.events;
              rts.events.product = data.data.event_product;
              rts.calcRevenue();
            }).catch(err => {
              console.log(err);
                // rts.$router.push('/error-page');
            });
      }
    },
    mounted() {
      this.initBigChart(0);
      this.getInfo();
    }
  };
</script>
<style></style>
