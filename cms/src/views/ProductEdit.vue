<style scoped>
.search {
    width: 30%;
}
@media only screen and (max-width: 600px) {
  .search {
    width: 100%;
  }
}
.imageList img {
    width: 100%;
    height: auto;
    cursor: pointer;
}
.box {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  /* height: 120px; */
  border-radius: 10px;
}

.box:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0 p-5">
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-2 imageList box">
                                <img @click="image" :src="$appUrl+'/images/product/'+product.info.image">
                            </div>
                            <div class="col-md-2 imageList box">
                                <img @click="image1" :src="$appUrl+'/images/product/'+product.info.image1">
                            </div>
                            <div class="col-md-2 imageList box">
                                <img  @click="image2" :src="$appUrl+'/images/product/'+product.info.image2">
                            </div>
                            <div class="col-md-2 imageList box">
                                <img @click="image3" :src="$appUrl+'/images/product/'+product.info.image3">
                            </div>
                            <div class="col-md-2 imageList box">
                                <img @click="image4" :src="$appUrl+'/images/product/'+product.info.image4">
                            </div>
                            <div class="col-md-1"></div>
                            <div class="col-md-12 mt-5">Барааны нэмэлт тайлбар</div>
                            <div class="col-md-4 mt-3">
                                <el-input placeholder="Гарчиг 1" v-model="product.info.title1" clearable> </el-input>
                                <el-input class="mt-1" type="textarea" :rows="3" placeholder="Тайлбар 1" v-model="product.info.desc1"> </el-input>
                            </div>
                            <div class="col-md-4 mt-3">
                                <el-input placeholder="Гарчиг 2" v-model="product.info.title2" clearable> </el-input>
                                <el-input class="mt-1" type="textarea" :rows="3" placeholder="Тайлбар 2" v-model="product.info.desc2"> </el-input>
                            </div>
                            <div class="col-md-4 mt-3">
                                <el-input placeholder="Гарчиг 3" v-model="product.info.title3" clearable> </el-input>
                                <el-input class="mt-1" type="textarea" :rows="3" placeholder="Тайлбар 3" v-model="product.info.desc3"> </el-input>
                            </div>
                            
                            <div class="col-md-4 mt-3">
                                <el-input placeholder="Гарчиг 4" v-model="product.info.title4" clearable> </el-input>
                                <el-input class="mt-1" type="textarea" :rows="3" placeholder="Тайлбар 4" v-model="product.info.desc4"> </el-input>
                            </div>
                            <div class="col-md-4 mt-3">
                                <el-input placeholder="Гарчиг 5" v-model="product.info.title5" clearable> </el-input>
                                <el-input class="mt-1" type="textarea" :rows="3" placeholder="Тайлбар 5" v-model="product.info.desc5"> </el-input>
                            </div>
                            <div class="col-md-4 mt-3">
                                <el-input placeholder="Гарчиг 6" v-model="product.info.title6" clearable> </el-input>
                                <el-input class="mt-1" type="textarea" :rows="3" placeholder="Тайлбар 6" v-model="product.info.desc6"> </el-input>
                            </div>
                            <div class="col-md-12 mt-5">Бонус бодогдох хувь</div>
                            <div class="col-md-12 mt-3">
                                <el-input placeholder="Бонус" type="number" v-model="product.info.bonus_percent" clearable> </el-input>
                            </div>
                            <div class="col-md-12 mt-5">Хайлтын хэсэгт ашиглагдах түлхүүр үгс</div>
                            <div class="col-md-12 mt-3">
                                <el-input class="mt-1" type="textarea" :rows="3" placeholder="Түлхүүр үгс" v-model="product.info.description"> </el-input>
                            </div>
                            <div class="col-md-12 mt-3" align="center">
                                <base-button type="danger" @click="backRoute">Буцах</base-button>
                                <base-button type="primary" @click="saveInfo">Хадгалах</base-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="file" accept="image/*" ref="image" id="image" hidden @change="onChangeBigImage" />
        <input type="file" accept="image/*" ref="image1" id="image1" hidden @change="onChangeBigImage1" />
        <input type="file" accept="image/*" ref="image2" id="image2" hidden @change="onChangeBigImage2" />
        <input type="file" accept="image/*" ref="image3" id="image3" hidden @change="onChangeBigImage3" />
        <input type="file" accept="image/*" ref="image4" id="image4" hidden @change="onChangeBigImage4" />
    </div>
</template>
<script>
import mergeImages from 'merge-images';
  export default {
    data() {
        return {
            product: {
                id: 0,
                info: {
                    description: '',
                    bonus_percent: 0,
                    image: '',
                    image1: '',
                    image2: '',
                    image3: '',
                    image4: '',
                    desc1: '',
                    desc2: '',
                    desc3: '',
                    desc4: '',
                    desc5: '',
                    desc6: '',
                    title1: '',
                    title2: '',
                    title3: '',
                    title4: '',
                    title5: '',
                    title6: ''
                
                }
            }
        }
    },
    mounted() {
        this.product.id = this.$route.params.id;
        this.getProduct();
    },
    methods: {
        backRoute() {
            this.$router.push('/products');
        },
        saveInfo() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/update-product-text',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: this.product.id,
                    info: this.product.info
                }
            }).then(data => {
                if(data.data.result == 'success') {
                    rts.$notify({
                        title: 'Амжилттай',
                        message: `Бүтээгдэхүүний мэдээлэл шинэчлэгдлээ`,
                        type: 'success'
                    });
                } else if(data.data.result == 'failed') {
                    rts.$notify({
                        title: 'Амжилтгүй',
                        message: `Эхлээд зураг хадгалах шаардалагатай`,
                        type: 'error'
                    });
                }
            });
        },
        image() {
            this.$refs.image.click();
        },
        image1() {
            this.$refs.image1.click();
        },
        image2() {
            this.$refs.image2.click();
        },
        image3() {
            this.$refs.image3.click();
        },
        image4() {
            this.$refs.image4.click();
        },
        onChangeBigImage(e) {
            var rts = this;
            const fd = new FormData();
            var token = localStorage.getItem('token');
            const file = e.target.files[0];
            fd.append('photo', file, file.name)
            fd.append('name', 'mainimage');
            fd.append('id', rts.product.id);        
            rts.$axios.post(rts.$appUrl+'/api/admin/edit-product', 
            fd,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then(r => {
                rts.product.info.image = r.data.image;
            });
        },
        onChangeBigImage1(e) {
            var reader = new FileReader();
            var rts = this;
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                mergeImages([
                    { src: reader.result },
                    { src: 'img/brand/itlab.png', opacity: 0.1, x: 57, y: 200,}])
                .then(data => {
                    const fd = new FormData();
                    var token = localStorage.getItem('token');
                    const dataURLtoFile = (dataurl, filename) => {
                        const arr = dataurl.split(',')
                        const mime = arr[0].match(/:(.*?);/)[1]
                        const bstr = atob(arr[1])
                        let n = bstr.length
                        const u8arr = new Uint8Array(n)
                        while (n) {
                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                            n -= 1 // to make eslint happy
                        }
                        return new File([u8arr], filename, { type: mime })
                    }

                    const f = dataURLtoFile(data)
                    fd.append('photo', f, f.name)
                    fd.append('name', 'big_image1');
                    fd.append('id', rts.product.id);
                    
                    rts.$axios.post(rts.$appUrl+'/api/admin/edit-product', 
                        fd,
                            {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                            }
                        ).then(r => {
                            rts.product.info.image1 = r.data.image;
                        });
                    });
            }
        },
        onChangeBigImage2(e) {
            var reader = new FileReader();
            var rts = this;
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                mergeImages([
                    { src: reader.result },
                    { src: 'img/brand/itlab.png', opacity: 0.1, x: 57, y: 200,}])
                .then(data => {
                    const fd = new FormData();
                    var token = localStorage.getItem('token');
                    const dataURLtoFile = (dataurl, filename) => {
                        const arr = dataurl.split(',')
                        const mime = arr[0].match(/:(.*?);/)[1]
                        const bstr = atob(arr[1])
                        let n = bstr.length
                        const u8arr = new Uint8Array(n)
                        while (n) {
                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                            n -= 1 // to make eslint happy
                        }
                        return new File([u8arr], filename, { type: mime })
                    }

                    const f = dataURLtoFile(data)
                    fd.append('photo', f, f.name)
                    fd.append('name', 'big_image2');
                    fd.append('id', rts.product.id);
                    
                    rts.$axios.post(rts.$appUrl+'/api/admin/edit-product', 
                        fd,
                            {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                            }
                        ).then(r => {
                            rts.product.info.image2 = r.data.image;
                        });
                    });
            }
        },
        onChangeBigImage3(e) {
            var reader = new FileReader();
            var rts = this;
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                mergeImages([
                    { src: reader.result },
                    { src: 'img/brand/itlab.png', opacity: 0.1, x: 57, y: 200,}])
                .then(data => {
                    const fd = new FormData();
                    var token = localStorage.getItem('token');
                    const dataURLtoFile = (dataurl, filename) => {
                        const arr = dataurl.split(',')
                        const mime = arr[0].match(/:(.*?);/)[1]
                        const bstr = atob(arr[1])
                        let n = bstr.length
                        const u8arr = new Uint8Array(n)
                        while (n) {
                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                            n -= 1 // to make eslint happy
                        }
                        return new File([u8arr], filename, { type: mime })
                    }

                    const f = dataURLtoFile(data)
                    fd.append('photo', f, f.name)
                    fd.append('name', 'big_image3');
                    fd.append('id', rts.product.id);
                    
                    rts.$axios.post(rts.$appUrl+'/api/admin/edit-product', 
                        fd,
                            {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                            }
                        ).then(r => {
                            rts.product.info.image3 = r.data.image;
                        });
                    });
            }
        },
        onChangeBigImage4(e) {
            var reader = new FileReader();
            var rts = this;
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                mergeImages([
                    { src: reader.result },
                    { src: 'img/brand/itlab.png', opacity: 0.1, x: 57, y: 200,}])
                .then(data => {
                    const fd = new FormData();
                    var token = localStorage.getItem('token');
                    const dataURLtoFile = (dataurl, filename) => {
                        const arr = dataurl.split(',')
                        const mime = arr[0].match(/:(.*?);/)[1]
                        const bstr = atob(arr[1])
                        let n = bstr.length
                        const u8arr = new Uint8Array(n)
                        while (n) {
                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                            n -= 1 // to make eslint happy
                        }
                        return new File([u8arr], filename, { type: mime })
                    }

                    const f = dataURLtoFile(data)
                    fd.append('photo', f, f.name)
                    fd.append('name', 'big_image4');
                    fd.append('id', rts.product.id);
                    
                    rts.$axios.post(rts.$appUrl+'/api/admin/edit-product', 
                        fd,
                            {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                            }
                        ).then(r => {
                            rts.product.info.image4 = r.data.image;
                        });
                    });
            }
        },
        getProduct() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/get-edit-product',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: this.product.id
                }
            }).then(data => {
                console.log(data);
                if(data.data.product.length > 0) {
                    rts.product.info.bonus_percent = data.data.product[0].bonus_percent;
                    rts.product.info.image = data.data.product[0].image;
                    rts.product.info.description = data.data.product[0].description;
                }
                if(data.data.info.length > 0) {
                    rts.product.info.image1 = data.data.info[0].big_image1;
                    rts.product.info.image2 = data.data.info[0].big_image2;
                    rts.product.info.image3 = data.data.info[0].big_image3;
                    rts.product.info.image4 = data.data.info[0].big_image4;
                    rts.product.info.desc1 = data.data.info[0].desc1;
                    rts.product.info.desc2 = data.data.info[0].desc2;
                    rts.product.info.desc3 = data.data.info[0].desc3;
                    rts.product.info.desc4 = data.data.info[0].desc4;
                    rts.product.info.desc5 = data.data.info[0].desc5;
                    rts.product.info.desc6 = data.data.info[0].desc6;
                    if(data.data.info[0].title1 == null || data.data.info[0].title1 == '' || data.data.info[0].title1 == 'null') {
                        rts.product.info.title1 = 'Бүтээгдэхүүний онцлог'
                    } else {
                        rts.product.info.title1 = data.data.info[0].title1;
                    }
                    if(data.data.info[0].title2 == null || data.data.info[0].title2 == '' || data.data.info[0].title2 == 'null') {
                        rts.product.info.title2 = 'Хэрэглээ'
                    } else {
                        rts.product.info.title2 = data.data.info[0].title2;
                    }

                    if(data.data.info[0].title3 == null || data.data.info[0].title3 == '' || data.data.info[0].title3 == 'null') {
                        rts.product.info.title3 = 'Ашиглах заавар'
                    } else {
                        rts.product.info.title3 = data.data.info[0].title3;
                    }

                    if(data.data.info[0].title4 == null || data.data.info[0].title4 == '' || data.data.info[0].title4 == 'null') {
                        rts.product.info.title4 = 'Зөвлөмж'
                    } else {
                        rts.product.info.title4 = data.data.info[0].title4;
                    }

                    if(data.data.info[0].title5 == null || data.data.info[0].title5 == '' || data.data.info[0].title5 == 'null') {
                        rts.product.info.title5 = 'Баталгаат хугацаа'
                    } else {
                        rts.product.info.title5 = data.data.info[0].title5;
                    }

                    if(data.data.info[0].title6 == null || data.data.info[0].title6 == '' || data.data.info[0].title6 == 'null') {
                        rts.product.info.title6 = 'Үйлдвэрлэсэн улс'
                    } else {
                        rts.product.info.title6 = data.data.info[0].title6;
                    }
                }
            });
        },
        async setImage(e) {
            var reader = new FileReader();
            var rts = this;
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                mergeImages([
                    { src: reader.result },
                    { src: 'img/brand/itlab.png', opacity: 0.2, x: 50, y: 200,}])
                .then(data => {
                    rts.$refs.sampleImage.src = data;
                    const fd = new FormData();
                    var token = localStorage.getItem('token');
                    const dataURLtoFile = (dataurl, filename) => {
                    const arr = dataurl.split(',')
                    const mime = arr[0].match(/:(.*?);/)[1]
                    const bstr = atob(arr[1])
                    let n = bstr.length
                    const u8arr = new Uint8Array(n)
                    while (n) {
                        u8arr[n - 1] = bstr.charCodeAt(n - 1)
                        n -= 1 // to make eslint happy
                    }
                    return new File([u8arr], filename, { type: mime })
                    }
                    const f = dataURLtoFile(data)
                    fd.append('photo', f, f.name)
                    rts.$axios.post(rts.$appUrl+'/api/admin/edit-product', 
                        fd,
                            {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                            }
                        ).then(r => {
                            console.log(r);
                        });
                    });
            }
            
        }
    }
  }
</script>
