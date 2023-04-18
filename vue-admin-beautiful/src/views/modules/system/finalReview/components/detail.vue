<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogFormVisible"
      @close="onClose"
      title="专家评分情况"
    >
      <!-- <h3>
        {{ this.prize1 }}分以上为一等奖； {{ this.prize2 }}分-{{
          this.prize1 -1
        }}分为二等奖； {{ this.prize3 }}分-{{ this.prize2 -1 }}分为三等奖；
      </h3> -->
      <el-table :data="tableData" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="序号" width="80"></el-table-column> -->
        <el-table-column
          prop="expertName"
          label="专家姓名"
          width="360"
          v-model="tableData.expertName"
        ></el-table-column>

        <el-table-column
          prop="prePrizeNum"
          label="专家已评项目数量"
          v-model="tableData.prePrizeNum"
        ></el-table-column>

      </el-table>

      <!-- 计算总分 在右侧显示-->



      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { doSetDisciplineReviewPrize } from "@/api/system/apply/SysApplyManagementApi";
import { getStandardList } from "@/api/system/gradingStandard/SkxGradingStandardManagementApi";
import { isNotNull } from "@/utils/valiargs";
import { isNull } from "@/utils/validate";
import {
  getExpertVotePre,
  getExpertVote,
} from "@/api/system/zhongping/SkxGetScoreFinalManagementApi";
import {
  doInsertScore,
  getTotalScore,
  doUpdateScore,
} from "@/api/system/score/SkxGetScoreManagementApi";

export default {

  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      type: "",
      tableData: [
      ],
      remarks: [],
      form: {
        comment: "",
        remarks: "",
        totalScore: 0,
      },
      firstInsert: false,
      id: "",
      year: "2022",
      prize1: 0,
      prize2: 0,
      prize3: 0,
      dialogFormVisible: false,
      formData: {
        setPrize: "",
      },
      rules: {
        comment: [
          {
            required: false,
            message: "请填写评审意见",
            trigger: "blur",
          },
        ],
      },
      setPrizeOptions: [
        {
          label: "一等奖",
          value: 1,
        },
        {
          label: "二等奖",
          value: 2,
        },
        {
          label: "三等奖",
          value: 3,
        },
        {
          label: "未获奖",
          value: 4,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    show(type) {
      this.type = type;
      this.dialogFormVisible = true;
      this.fetchData();
    },
    created() {},
    onOpen() {
      this.fetchData();
    },
    onClose() {},
    close() {
      this.$emit("update:visible", false);

      this.dialogFormVisible = false;
    },


    handelConfirm() {
      // 验证一等奖是否填写了意见

        this.close();
        
    },





    async fetchData() {

      // console.log("data:" + data);
      if(this.type == "pre"){
        var {data} = await getExpertVotePre();
      }else{
        var {data}= await getExpertVote();
      }


      this.tableData = data;
      

    },



  },
};
</script>
<style>
</style>
  