<template>
  <div class="vab-ad">
    <el-carousel
      v-if="adList"
      height="30px"
      direction="vertical"
      :autoplay="true"
      :interval="3000"
      indicator-position="none"
    >
      <el-carousel-item v-for="(item, index) in adList" :key="index">
        <el-tag type="warning">Ad</el-tag>
        <a target="_blank" :href="item.url">{{ item.title }}</a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  import { getList } from "@/api/ad";
  export default {
    data() {
      return {
        nodeEnv: process.env.NODE_ENV,
        adList: [
          {
            title: " 哈喽哈喽 听得见吗 聞こえていますか？",
            url: "https://space.bilibili.com/672328094",
          },
          {
            title: " 那铁轨总得创死一个，要不把你给创死吧",
            url: "https://space.bilibili.com/434334701",
          },
        ],
      };
    },
    created() {
      // this.fetchData();
    },
    methods: {
      async fetchData() {
        const { data } = await getList();
        this.adList = data;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .vab-ad {
    height: 30px;
    padding-right: $base-padding;
    padding-left: $base-padding;
    line-height: 30px;
    cursor: pointer;
    background: #eef1f6;
    box-shadow: 0 -1px 2px rgba(0, 21, 41, 0.08) inset;

    a {
      color: #999;
    }
  }
</style>
