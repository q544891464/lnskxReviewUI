<template>
  <div>
    <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :visible.sync="dialogFormVisible"
    @close="onClose"
    title="设置奖项">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
        label-position="left">
        <el-form-item label="设置奖项" prop="setPrize">
          <el-select v-model="formData.setPrize" placeholder="请选择设置奖项" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in setPrizeOptions" :key="index" :label="item.label"
              :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
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

export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      id:"",
      dialogFormVisible:false,
      formData: {
        setPrize: "",
      },
      rules: {
        setPrize: [{
          required: true,
          message: '请选择设置奖项',
          trigger: 'change'
        }],
      },
      setPrizeOptions: [{
        "label": "一等奖",
        "value": 1
      }, {
        "label": "二等奖",
        "value": 2
      }, {
        "label": "三等奖",
        "value": 3
      }, {
        "label": "未获奖",
        "value": 0
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

    show(row){
      this.id = row.id;
      this.dialogFormVisible = true;
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false);
      this.$emit('refresh');
      this.dialogFormVisible = false;
    },
    handelConfirm() {
      // console.log("prize:"+this.formData.setPrize);
      this.$refs['elForm'].validate(async valid => {
        if (!valid) {
          // 向后端发送id和奖项


          return
        }
        console.log("prize:"+this.formData.setPrize+"id:"+this.id);
        const { msg } = await doSetDisciplineReviewPrize({
          applyId: this.id,
          prize: this.formData.setPrize,
        });
        this.$baseMessage(msg, "success");
        this.close(this.formData.setPrize);

      })
    },
  }
}

</script>
<style>
</style>
