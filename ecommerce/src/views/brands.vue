<style scoped>
.box {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  /* transition: 0.3s; */
  width: 100%;
  /* height: 120px; */
  border-radius: 10px;
}
.getBtn {
    /* visibility: hidden; */
    opacity: 0;
}
.box:hover .getBtn, .box:hover ~ .getBtn {
    /* visibility: visible; */
    opacity: 1;
}
.searchInput {
    width: 50%;
}
</style>
<template>
    <div>
        <main>
        <div class="container">
            <div class="my-md-3">
                <div class="row">
                    <div class="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/home">Нүүр хуудас</router-link></li>
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">Брэндүүд</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="col-md-6" align="right">
                        <el-input
                            placeholder="Брэнд хайх"
                            @input="editFilter"
                            prefix-icon="el-icon-search"
                            class="searchInput"
                            v-model="filter">
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="(items, index) in brands" :key="index" class="col-md-3 p-2">
                    <div class="p-4 box align-items-center" :style="{'position': 'relative'}">
                        <span :style="{'width': '40%'}">
                            <img class="" :src="$appUrl+'/images/brand/'+items.images" :alt="items.brandname" :style="{'width': '100px', 'height': 'auto'}">
                        </span>
                        <span :style="{'width': '59%', 'margin-left': '10px'}">
                            {{items.brandname}}
                        </span>
                        <a href="javascript:;" @click="toBrand(items.id)" class="btn btn-primary-dark-w getBtn"
                            data-scs-animation-in="fadeInUp"
                            :style="{'font-size': '10px', 'border-radius': '5px', 'position': 'absolute', 'right':'10px'}"
                            data-scs-animation-delay="400"><i class="fas fa-angle-right"></i></a>
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
    data() {
        return {
            filter: '',
            brands: [],
            allbrand: []
        }
    },
    mounted() {
        this.getBrands();
    },
    methods: {
        toBrand(id) {
            this.$router.push({name: 'brand', params: {id}});
        },
        getBrands() {
            var rts = this;
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/product/all-brand',
                headers: {},
            }).then(data => {
                // rts.brands = data.data.brands;
                rts.allbrand = data.data.brands;
                rts.editFilter();
            });
        },
        editFilter() {
            let arr = [];
            this.allbrand.forEach((el, index) => {
                if((el.brandname).toUpperCase().includes(this.filter.toUpperCase())) {
                    arr.push(el);
                }
            });
            this.brands = arr;
        }
    }
}
</script>