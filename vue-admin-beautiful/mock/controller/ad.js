const data = [
  {
    title: "哈喽哈喽 听得见吗 聞こえていますか？",
    url: "https://chu1204505056.gitee.io/vue-admin-beautiful-pro/#/index",
  },
];
module.exports = [
  {
    url: "/ad/getList",
    type: "get",
    response() {
      return {
        code: 200,
        msg: "success",
        data,
      };
    },
  },
];
