<template>
  <div class="detail">
      <articals :tohide="tohide" :artical="articaldata"> </articals>
  </div>
</template>

<script>
import articals from "./artical.vue";

export default({
  name:"detail",
  data(){
    return{
      tohide:false,
      articaldata:[],
      comment_data:""
    }

  },
  created(){
    var id = this.$route.params.id; //获取文章的id
     this.getdata(id);
  },
  methods:{
    getdata(id){
      var _this = this;
      _this.$reqs.post("/artical/getById",{id:id}).then(function(result){
        _this.articaldata = [result.data.data.artical];
        _this.comment_data = result.data.data.comments;
      })
    }
  },
  components:{
    articals
  },
  computed:{

  }

})

</script>
