<template>
    <div>
        <main id="content" role="main">
            <div class="container" style="margin-bottom: 50px">
                <div class="my-md-3">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/home">Нүүр хуудас</router-link></li>
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">Бонус</li>
                            </ol>
                        </nav>
                </div>
                <div class="row mt-10">
                    <div class="col-md-4 mb-4 mb-md-0">
                        <div class="card mb-3 border-0 text-center rounded-0">
                            <img class="img-fluid mb-3" :src="$appUrl+'/images/banner/bonus.png'" alt="ITLAB BONUS Бонус" style="width: 120px; height: auto; margin: auto;">
                            <div class="card-body">
                                <h5 class="font-size-18 font-weight-semi-bold mb-3">Бэлгийн бонус</h5>
                                <p class="text-gray-90 max-width-334 mx-auto">Бид онлайн дэлгүүртээ шинээр бүртгүүлж байгаа хэрэглэгч бүртээ <b>2,020</b> бонус бэлэглэж байна. Танд амжилт хүсье.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4 mb-md-0">
                        <div class="card mb-3 border-0 text-center rounded-0">
                        <img class="img-fluid mb-3" :src="$appUrl+'/images/banner/pigbonus.png'" alt="ITLAB BONUS Бонус" style="width: 120px; height: auto; margin: auto;">
                            <div class="card-body">
                                <h5 class="font-size-18 font-weight-semi-bold mb-3">Бонус оноо гэж юу вэ?</h5>
                                
                                <p class="text-gray-90 max-width-334 mx-auto">Таны худалдан авсан бүтээгдэхүүн тус бүрийн үнийн дүнгээс <b>3 - 100%</b> хүртэл бонус оноо бодогдож хуримтлагдах болно.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-3 border-0 text-center rounded-0">
                        <img class="img-fluid mb-3" :src="$appUrl+'/images/banner/howtouse.png'" alt="ITLAB BONUS Бонус" style="width: 120px; height: auto; margin: auto;">
                            <div class="card-body">
                                <h5 class="font-size-18 font-weight-semi-bold mb-3">Хэрхэн хэрэглэх вэ?</h5>
                                <p class="text-gray-90 max-width-334 mx-auto">Хуримтлагдсан бонус оноогоороо дараагийн худалдан авалтын <b>50%</b> хүртэлх үнийн дүнтэй тэнцэхүйц хөнгөлөлт эдлэх боломжтой.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Brands />
    </div>
</template>
<script>
import Brands from "@/components/brands";
export default {
    components: {
        Brands
    },
}
</script>