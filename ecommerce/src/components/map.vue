<template>
  <div id="map"></div>
</template>
<script>
export default {
    data() {
        return {
            map: null, 
            lat: 47.919143,
            long: 106.917597
        }
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = new google.maps.Map(document.getElementById("map"), {
                zoom: 18,
                center: {lat: this.lat, lng: this.long},
                minZoom: 13, 
                maxZoom: 20
            });  
            console.log(this.map);  
        }
    }
}
</script>