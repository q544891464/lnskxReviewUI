<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogFormVisible"
      @close="onClose"
      title="评分"
    >
      <!-- <h3>
        {{ this.prize1 }}分以上为一等奖； {{ this.prize2 }}分-{{
          this.prize1 -1
        }}分为二等奖； {{ this.prize3 }}分-{{ this.prize2 -1 }}分为三等奖；
      </h3> -->
      <el-table :data="tableData" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="序号" width="80"></el-table-column> -->
        <el-table-column
          prop="standardContent"
          label="评分标准"
          width="360"
          v-model="tableData.standardContent"
        ></el-table-column>
        <el-table-column
          prop="standardScore"
          label="满分"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          v-model="tableData.standardRemarks"
          v-if="firstInsert"
        ></el-table-column>
        <el-table-column
          prop="standardRemarks"
          label="备注"
          v-model="tableData.standardRemarks"
          v-if="!firstInsert"
        ></el-table-column>

        <el-table-column prop="standardScore" label="评分">
          <template slot-scope="scope">
            <el-input
              type="number"
              v-model="scope.row.getScore"
              @change="
                scoreChange(
                  scope.$index,
                  scope.row.getScore,
                  scope.row.standardScore
                )
              "
            >
              0
            </el-input>
          </template>
        </el-table-column>
      </el-table>

      <!-- 计算总分 在右侧显示-->

      <div style="margin-top: 20px; margin-left: auto; margin-right: 20px">
        <span>总分：</span>
        <span>{{ form.totalScore }}</span>
      </div>

      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item
          label="评审意见(评分若为85分以上则必须填写)"
          prop="comment"
        >
          <el-input v-model="form.comment" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea"></el-input>
        </el-form-item>
      </el-form>

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
  doInsert,
  doUpdate,
  getScoreList,
} from "@/api/system/scoreDetail/SkxGetScoreDetailManagementApi";
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
      tableData: [
        {
          getScore: 0,
          standardRemarks: "",
        },
      ],
      remarks: [],
      form: {
        comment: "",
        remarks: "",
        totalScore: 0,
      },
      firstInsert: false,
      id: "",
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
    show(row) {
      this.id = row.id;
      this.prize1 = row.prize1;
      this.prize2 = row.prize2;
      this.prize3 = row.prize3;
      this.firstInsert = false;
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
    checkIsEmpty(){
      for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].getScore == null){
          return false;
        }
      }
      return true;
    },

    handelConfirm() {
      // 验证一等奖是否填写了意见
      if (this.form.totalScore >= this.prize1 && isNull(this.form.comment)) {
        this.$baseMessage("未填写意见", "error");
      } else if(!this.checkIsEmpty()){
        this.$baseMessage("有项目未填", "error");
      }
      else
        {
        console.log("prize:" + this.tableData[0].getScore);
        this.updateDetail();
        this.updateTotal();
        this.$emit("fetchData");
        this.close();
        
      }
    },

    scoreChange(index, getScore, standardScore) {
      if (parseInt(getScore) > parseInt(standardScore)) {
        this.$baseMessage("评分不能大于满分", "error");
        this.tableData[index].getScore = standardScore;
      }
      if (getScore < 0) {
        this.$baseMessage("评分不能小于0", "error");
        this.tableData[index].getScore = 0;
      }
      this.form.totalScore = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        if (isNotNull(this.tableData[i].getScore)) {
          this.form.totalScore += parseInt(this.tableData[i].getScore);
        }
      }
      if (this.form.totalScore > this.prize1) {
        this.rules.comment = { required: true, message: "请填写评审意见" };
      } else {
        this.rules.comment = { required: false, message: "请填写评审意见" };
      }
    },

    async fetchTotalScore() {
      var { data } = await getTotalScore({
        applyId: this.id,
      });
      if (isNotNull(data)) {
        this.form = data;
      }
      if (this.form.totalScore >= this.prize1) {
        this.rules.comment = { required: true, message: "请填写评审意见" };
      } else {
        this.rules.comment = { required: false, message: "请填写评审意见" };
      }
      console.log("form:" + this.form);
    },

    async fetchData() {
      var { data } = await getScoreList({
        applyId: this.id,
      });
      // console.log("data:" + data);

      if (data.length == 0) {
        this.firstInsert = true;

        var { data } = await getStandardList({
          //TODO:这里参数写死了 需要调整
          year: 2022,
        });
        for(let i=0;i<data.length;i++){
          this.remarks.push(data[i].remarks);
        }

      }

      console.log("firstInsert:" + this.firstInsert);

      this.tableData = data;
      

      console.log("data:" + this.remarks);
      this.fetchTotalScore();
    },

    // 更新总分
    async updateTotal() {
      // form获取的是总分表单的所有表项 如果id为空则表示未添加过总分 是新增
      if (this.form.id == null) {
        var { code, msg } = await doInsertScore({
          applyId: this.id,
          totalScore: this.form.totalScore,
          comment: this.form.comment,
          remarks: this.form.remarks,
        });
        if (code == 200) {
          this.$baseMessage("评分成功", "success");
        }
      } else {
        var { code, msg } = await doUpdateScore({
          id: this.form.id,
          applyId: this.id,
          totalScore: this.form.totalScore,
          comment: this.form.comment,
          remarks: this.form.remarks,
        });
        if (code == 200) {
          this.$baseMessage("评分成功", "success");
        }
      }
    },
    // 更新小分
    async updateDetail() {
      for (let i = 0; i < this.tableData.length; i++) {
        console.log("applyid:" + this.id);
        console.log("standardid:" + this.tableData[i].id);
        console.log("score:" + this.tableData[i].getScore);
        // this.totalScore += parseInt(this.tableData[i].score);
        // 如果是第一次插入
        if (this.firstInsert) {
          await doInsert({
            applyId: this.id,
            standardId: this.tableData[i].id,
            standardContent: this.tableData[i].standardContent,
            standardScore: this.tableData[i].standardScore,
            standardRemarks: this.remarks[i],
            getScore: this.tableData[i].getScore,
            // TODO:这里年份先写死 后续需要通过改参数调整
            year: 2022,
          });
        } else {
          await doUpdate({
            id: this.tableData[i].id,
            applyId: this.id,
            standardId: this.tableData[i].id,
            standardContent: this.tableData[i].standardContent,
            standardScore: this.tableData[i].standardScore,
            standardRemarks: this.tableData[i].standardRemarks,
            getScore: this.tableData[i].getScore,
            // TODO:这里年份先写死 后续需要通过改参数调整
            year: 2022,
          });
        }
      }
      this.firstInsert = false;
      console.log("total score:" + this.form.totalScore);
    },
  },
};
</script>
<style>
</style>
  