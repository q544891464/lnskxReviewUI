<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogFormVisible"
      @close="onClose"
      title="设置奖项"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="设置奖项" prop="setPrize">
          <el-select
            v-model="formData.setPrize"
            placeholder="请选择设置奖项"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in setPrizeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="评审意见" prop="prizeMark">
          <el-input
            v-model="formData.disciplineReviewMark"
            type="textarea"
          ></el-input>
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
import {
  doSetPrize,
  doSetPrePrize,
} from "@/api/system/apply/SysApplyManagementApi";

export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      id: "",
      type: "",
      dialogFormVisible: false,
      formData: {
        setPrize: "",
      },
      rules: {
        setPrize: [
          {
            required: true,
            message: "请选择设置奖项",
            trigger: "change",
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
        // {
        //   label: "三等奖",
        //   value: 3,
        // },
        // {
        //   label: "未获奖",
        //   value: 4,
        // },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    show(row, type) {
      this.id = row.id;
      this.type = type;
      console.log("type:" + this.type);

      this.formData.setPrize = parseInt(row.prize);

      this.dialogFormVisible = true;
    },
    onOpen() {},
    onClose() {
      this.$refs["elForm"].resetFields();
    },
    close() {
      this.$emit("update:visible", false);
      this.$emit("refresh");
      this.formData.setPrize = "";
      this.dialogFormVisible = false;
    },
    handelConfirm() {
      // console.log("prize:"+this.formData.setPrize);
      this.$refs["elForm"].validate(async (valid) => {
        if (!valid) {
          // 向后端发送id和奖项

          return;
        }
        console.log("prize:" + this.formData.setPrize + "id:" + this.id);


        if (this.type == "final") {
          const { msg } = await doSetPrize({
            applyId: this.id,
            prize: this.formData.setPrize,
          });
          this.$baseMessage(msg, "success");
          this.close(this.formData.setPrize);
        } else if(this.type == "pre") {
          const { msg } = await doSetPrePrize({
            applyId: this.id,
            prize: this.formData.setPrize,
          });
          this.$baseMessage(msg, "success");
          this.close(this.formData.setPrize);
        }


      });
    },
  },
};
</script>
<style>
</style>
