<template>
    <div>
        <main>
            <div class="container mt-10">
                <div class="mb-5 text-center pb-3 border-bottom border-color-1">
                    <h1 class="font-size-sl-72 font-weight-light mb-3">404!</h1>
                    <p class="text-gray-90 font-size-20 mb-0 font-weight-light">Уучлаарай таны хайсан хуудас олдсонгүй.</p>
                </div>
                <div class="mb-10">
                    <!-- Search Jobs Form -->
                    <div align="center">
                            <button @click="goHome" type="submit" class="btn btn-block btn-primary-dark-w px-5" :style="{'width': '300px'}">Буцах</button>
                        </div>
                    <!-- End Search Jobs Form -->
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
    mounted() {
        this.$emit('getJquery');
    },
    methods: {
        goHome() {
            this.$router.push('/home');
        }
    }
}
</script>