<template>
    <div>
        <main id="content" role="main">
            <div class="container">
                <div class="my-md-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/home">Нүүр хуудас</router-link></li>
                            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">Дэлгүүрийн байршил & Холбоо барих</li>
                        </ol>
                    </nav>
                </div>
                <div class="mb-8">
                    <iframe src="https://www.google.com/maps/d/embed?mid=1BXl-jsf4gRLGcFzYIwGYgiY0apY3SU8s"  width="100%" height="514" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                </div>
                <div class="row mb-10">
                    <div class="col-md-8 col-xl-9">
                        <div class="mr-xl-6">
                            <div class="border-bottom border-color-1 mb-5">
                                <h3 class="section-title mb-0 pb-2 font-size-25">Санал гомдол</h3>
                            </div>
                            <form class="js-validate" novalidate="novalidate" @submit.prevent="sendMessage">
                               <div class="row">
                                   <div class="col-md-12">
                                        <!-- Input -->
                                        <div class="js-form-message mb-4">
                                            <label class="form-label">
                                                Гарчиг
                                            </label>
                                            <el-input placeholder="..." required maxlength="50" v-model="title"></el-input>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <!-- Input -->
                                        <div class="js-form-message mb-4">
                                            <label class="form-label">
                                                Сэтгэгдэл
                                            </label>
                                            <el-input placeholder="..." maxlength="200" required v-model="message" type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <el-button type="submit" @click="sendMessage" icon="el-icon-message" plain> Илгээх</el-button>
                                    </div>
                               </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-4 col-xl-3">
                        <div class="border-bottom border-color-1 mb-5">
                            <h3 class="section-title mb-0 pb-2 font-size-25">Хаяг</h3>
                        </div>
                        <div class="mr-xl-6">
                            <address class="mb-6">
                                Монгол улс, Улаанбаатар хот, ЧД 1-р хороо, 1-р 40 50 мянгат, Ноён хутагт Данзанравжаа гудамж 17/1 барилга 3-302 тоот
                                <!-- Монгол улс, Улаанбаатар хот, ЧД 4-р хороо,  <br>
                                Жуулчны гудамж 4/4, Макс Цамхаг, <br>
                                3 давхар 306 тоот -->
                            </address>
                            <h5 class="font-size-14 font-weight-bold mb-3">Ажиллах цаг</h5>
                            <ul class="list-unstyled mb-6">
                                <li class="flex-center-between mb-1"><span class="">Даваа</span><span class="">09:00 - 18:00</span></li>
                                <li class="flex-center-between mb-1"><span class="">Мягмар</span><span class="">09:00 - 18:00</span></li>
                                <li class="flex-center-between mb-1"><span class="">Лхагва</span><span class="">09:00 - 18:00</span></li>
                                <li class="flex-center-between mb-1"><span class="">Пүрэв</span><span class="">09:00 - 18:00</span></li>
                                <li class="flex-center-between mb-1"><span class="">Баасан</span><span class="">09:00 - 18:00</span></li>
                                <li class="flex-center-between mb-1"><span class="">Бямба</span><span class="">Амарна</span></li>
                                <li class="flex-center-between"><span class="">Ням</span><span class="">Амарна</span></li>
                            </ul>
                            <h5 class="font-size-14 font-weight-bold mb-3">Ажлын байр</h5>
                            <p class="text-gray-90">Хэрвээ та <strong>ITLAB</strong> дээр ажил эрхлэх сонирхолтой байгаа бол бидэнд имэйл илгээнэ үү: <a class="text-blue text-decoration-on" href="mailto:info@icbc.mn">info@icbc.mn</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            message: ''
        }
    },
    methods: {
        sendMessage() {
            const token = localStorage.getItem('token');
            if(!token) {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Нэвтэрсэн байх шаардлагатай`,
                    type: 'error'
                });
                this.$router.push('/login');
            } else {
                if(this.title != '' && this.message != '') {
                    this.$notify({
                        title: 'Амжилттай',
                        message: `Сэтгэгдэл илгээгдлээ`,
                        type: 'success'
                    });
                    this.title = '';
                    this.message = '';
                } else {
                    this.$notify({
                    title: 'Амжилтгүй',
                    message: `Талбараа бүрэн бөглөнө үү`,
                    type: 'error'
                });
                }
            }
        }
    }
}
</script>