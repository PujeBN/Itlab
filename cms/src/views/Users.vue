<style scoped>
.search {
    width: 30%;
}
@media only screen and (max-width: 600px) {
  .search {
    width: 100%;
  }
}
</style>>
<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0 p-5">
                        <div align="right">Нийт бонус: <b>{{Number(totalbonus).toLocaleString()}}₮</b></div>
                        <tabs>
                        <tab-pane title="Хэрэглэгчид">
                        <div align="right">
                            <form @submit.prevent="getUsers">
                                <el-tooltip :content="'TOP 50 Худалдан авагч'" placement="top">
                                    <el-switch
                                        v-model="loyalty.switch"
                                        active-color="#13ce66"
                                        inactive-color="#363e4a"
                                        active-value="1"
                                        class="mr-5"
                                        inactive-value="0">
                                    </el-switch>
                                </el-tooltip>
                                <el-input placeholder="Хэрэглэгчийн нэрээ оруулна уу" v-model="users.search" clearable class="search"> </el-input>
                            </form>
                        </div>
                        <div v-if="loyalty.switch == 0" class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="users.list">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Нэр</th>
                                    <th :style="{'background': '#F6F9FC'}">Утас</th>
                                    <th :style="{'background': '#F6F9FC'}">Имэйл</th>
                                    <th :style="{'background': '#F6F9FC'}">Бонус</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <img :src="row.img" style="width: auto; height: 30px; border-radius: 50%;">
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm" style="color: #8898aa;">{{row.name}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.phone}}, {{row.phone2}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.email}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.bonus).toLocaleString()}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Эрх олгох" placement="top">
                                            <base-button type="danger" @click="userRole(row.id)" size="sm"><span class="ni ni-delivery-fast"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                        <div v-if="loyalty.switch == 1" class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="loyalty.users">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Нэр</th>
                                    <th :style="{'background': '#F6F9FC'}">Утас</th>
                                    <th :style="{'background': '#F6F9FC'}">Имэйл</th>
                                    <th :style="{'background': '#F6F9FC'}">Бонус</th>
                                    <th :style="{'background': '#F6F9FC'}">Худалдан авалтын тоо</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <img :src="row.img" style="width: auto; height: 30px; border-radius: 50%;">
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm" style="color: #8898aa;">{{row.name}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.phone}}, {{row.phone2}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.email}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.bonus).toLocaleString()}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.q}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Эрх олгох" placement="top">
                                            <base-button type="danger" @click="userRole(row.id)" size="sm"><span class="ni ni-delivery-fast"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                        <span v-if="loyalty.switch == 0" class="mt-3" @click="getUsers">
                            <base-pagination :page-count="users.pagination" class="mt-3" v-model="users.page"></base-pagination>
                        </span>
                        </tab-pane>
                        <tab-pane title="Админ болон Хүргэлтийн ажилтан">
                        <div align="right">
                            <form @submit.prevent="getEmp">
                                <el-input placeholder="Ажилтны нэрээ оруулна уу" v-model="emp.search" clearable class="search"> </el-input>
                            </form>
                        </div>
                        <div class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="emp.list">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Нэр</th>
                                    <th :style="{'background': '#F6F9FC'}">Утас</th>
                                    <th :style="{'background': '#F6F9FC'}">Имэйл</th>
                                    <th :style="{'background': '#F6F9FC'}">Эрх</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <img :src="row.img" style="width: auto; height: 30px; border-radius: 50%;">
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm" style="color: #8898aa;">{{row.name}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.phone}}, {{row.phone2}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.email}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span v-if="row.permission == 1" class="name mb-0 text-sm text-success">Админ</span>
                                                <span v-else-if="row.permission == 3" class="name mb-0 text-sm text-warning">Хүргэлтийн ажилтан</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Эрх хураах" placement="top">
                                            <base-button type="danger" @click="empRole(row.id)" size="sm"><span class="ni ni-button-power"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                        <span class="mt-3" @click="getEmp">
                            <base-pagination :page-count="emp.pagination" class="mt-3" v-model="emp.page"></base-pagination>
                        </span>
                        </tab-pane>
                        </tabs>
                    </div>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.userChangeRole">
            <h6 slot="header" class="modal-title" id="modal-title-default">Хэрэглэгчид эрх олгох</h6>
              <div class="row">
                <div class="col-md-12">
                    <el-select v-model="role.val" placeholder="Сонгоно уу" style="width: 100%">
                        <el-option
                        v-for="item in role.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>

                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="usertoemp">Хадгалах</base-button>
                <base-button type="link" class="ml-auto" @click="modals.userChangeRole = false">Гарах</base-button>
          </template>
        </modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modals: {
                userChangeRole: false
            },
            users: {
                list: [],
                page: 1,
                pagination: 1,
                search: ''
            },
            emp: {
                list: [],
                page: 1,
                pagination: 1,
                search: ''
            },
            role: {
                user: 0,
                val: 1,
                options: [{
                    value: 1,
                    label: 'Админ'
                    }, {
                    value: 3,
                    label: 'Хүргэлтийн ажилтан'
                }]
            },
            loyalty: {
                switch: 0,
                users: []
            },
            totalbonus: 0
        }
    },
    mounted() {
        this.getUsers();
        this.getEmp();
    },
    methods: {
        empRole(id) {
            var rts = this;
            var token = localStorage.getItem('token');
            this.$msgbox({
            title: 'Санамж',
            message: 'Итгэлтэй байна уу',
            showCancelButton: true,
            confirmButtonText: 'Тийм',
            cancelButtonText: 'Болих',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = 'Түр хүлээнэ үү...';
                    rts.$axios({
                        method: 'POST',
                        url: rts.$appUrl + '/api/admin/emp-to-user',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            id
                        }
                    }).then(data => {
                        if(data.data.result == 'success') {
                            rts.$notify({
                                title: 'Амжилттай',
                                message: `Хэрэглэгчийн эрх шинэчлэгдлээ`,
                                type: 'success'
                            });
                            rts.emp.list.forEach((el, index) => {
                                if(el.id == id) {
                                    rts.emp.list.splice(index, 1);
                                    rts.getUsers();
                                }
                            });
                        }
                        done();
                        instance.confirmButtonLoading = false;
                    });
                } else {
                    done();
                }
            }});
        },
        usertoemp() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/user-to-emp',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: this.role.user,
                    role: this.role.val
                }
            }).then(data => {
                if(data.data.result == 'success') {
                    rts.$notify({
                        title: 'Амжилттай',
                        message: `Хэрэглэгчийн эрх шинэчлэгдлээ`,
                        type: 'success'
                    });
                    rts.users.list.forEach((el, index) => {
                        if(el.id == rts.role.user) {
                            rts.users.list.splice(index, 1);
                            rts.getEmp();
                        }
                    });
                }
            });
        },
        userRole(id) {
            this.role.user = id;
            this.modals.userChangeRole = true;
        },
        getUsers() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/get-user',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    page: this.users.page,
                    search: this.users.search
                }
            }).then(data => {
                rts.users.list = data.data.user;
                rts.users.pagination = data.data.pagination;
                rts.loyalty.users = data.data.loyalty;
                rts.totalbonus = data.data.bonus[0].total;
            });
        },
        getEmp() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/get-employee',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    page: this.emp.page,
                    search: this.emp.search
                }
            }).then(data => {
                rts.emp.list = data.data.user;
                rts.emp.pagination = data.data.pagination;
            });
        }
    }
}
</script>