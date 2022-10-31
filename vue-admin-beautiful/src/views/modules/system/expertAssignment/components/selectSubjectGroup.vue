<template>
  <div>
    <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :visible.sync="dialogFormVisible"
    @close="onClose"
    title="设置学科组">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
        label-position="left">
        <el-form-item label="设置学科组" prop="setSubjectGroup">
          <el-select v-model="formData.setSubjectGroup" placeholder="请选择学科组"  @change="$forceUpdate()" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in setSubjectGroupOptions" :key="index" :label="item.subjectGroupName"
              :value="item.subjectGroupNo" :disabled="item.disabled"></el-option>
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
  import { doSetSubjectGroup } from "@/api/system/expertManagement/SkxExpertManagementApi";
  import { getList } from "@/api/system/subjectGroup/SkxSubjectGroupManagementApi";
export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      id:"",
      ids:"",
      dialogFormVisible:false,
      insertOrUpdate:"",
      formData: {
        subjectGroup: "",
      },
      rules: {
        setSubjectGroup: [{
          required: true,
          message: '请选择设置奖项',
          trigger: 'change'
        }],
      },
      setSubjectGroupOptions: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

    show(row){
      if(row.id){
        this.id = row.id;
        this.expertId = row.userId;
        this.getOptions();
        if(row.subjectGroupNo){
          this.formData.setSubjectGroup = row.subjectGroupNo;
          this.insertOrUpdate = "update";
        }else{
          this.insertOrUpdate = "insert";
        }
      }else{
        this.ids = row;
        console.log("多条数据对话框");

      }
      this.dialogFormVisible = true;
    },

    async getOptions(){
      let res = await getList();
      if(res.code == 200){
        console.log(res.data);
        this.setSubjectGroupOptions = res.data.rows;
      }
    },
    

    onOpen() {

    },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
      this.$emit('fetchData', false)
      this.dialogFormVisible = false;
      this.insertOrUpdate = "";
      this.formData.setSubjectGroup = "";
    },
    handelConfirm() {
      this.$refs['elForm'].validate(async valid => {
        if (valid) {
          
          let res = await doSetSubjectGroup({
            expertId: this.expertId,
            subjectGroup: this.formData.setSubjectGroup,
            insertOrUpdate: this.insertOrUpdate,
          });
          if(res.code == 200){
            this.$message.success("设置成功");
            this.close();
          }else{
            this.$message.error(res.msg);
          }
        }
      })

      // this.$refs['elForm'].validate(async valid => {
      //   if (!valid) {
      //     // 向后端发送id和奖项


      //     return
      //   }
      //   console.log("prize:"+this.formData.setSubjectGroup+"id:"+this.id);
      //   if(this.ids){//多条数据
      //     console.log("处理多条数据");
      //     const { msg } = await doSetSubjectGroupAll({
      //       applyIds: this.ids,
      //       subjectGroup: this.formData.setSubjectGroup,
      //     });
      //     this.$baseMessage(msg, "success");
      //   }else{
      //     const { msg } = await doSetSubjectGroup({
      //       applyId: this.id,
      //       subjectGroup: this.formData.setSubjectGroup,
      //     });
      //     this.$baseMessage(msg, "success");
      //   }

      //   this.close(this.formData.setSubjectGroup);
      //   // this.$emit('fetchData');
      //   // location.reload();
      // })
    },
  }
}

</script>
<style>
</style>
