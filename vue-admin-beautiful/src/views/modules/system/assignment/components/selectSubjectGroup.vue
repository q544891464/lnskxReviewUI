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
            <el-option v-for="(item, index) in setSubjectGroupOptions"  :key="index" :label="item.subjectGroupName"
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
  import { doSetSubjectGroup,doSetSubjectGroupAll } from "@/api/system/apply/SysApplyManagementApi";
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
      this.getOptions();
      if(row.id){
        this.id = row.id;
      }else{
        this.ids = row;
        console.log("多条数据对话框");

      }
      this.dialogFormVisible = true;
    },


    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
      this.$emit('fetchData', false)
      this.dialogFormVisible = false;
    },

    async getOptions(){
      let res = await getList();
      if(res.code == 200){
        console.log(res.data);
        this.setSubjectGroupOptions = res.data.rows;
      }
    },
    
    handelConfirm() {

      this.$refs['elForm'].validate(async valid => {
        if (!valid) {
          // 向后端发送id和奖项


          return
        }
        console.log("prize:"+this.formData.setSubjectGroup+"id:"+this.id);
        if(this.ids){//多条数据
          console.log("处理多条数据");
          const { msg } = await doSetSubjectGroupAll({
            applyIds: this.ids,
            subjectGroup: this.formData.setSubjectGroup,
          });
          this.$baseMessage(msg, "success");
        }else{
          const { msg } = await doSetSubjectGroup({
            applyId: this.id,
            subjectGroup: this.formData.setSubjectGroup,
          });
          this.$baseMessage(msg, "success");
        }

        this.close(this.formData.setSubjectGroup);
        // this.$emit('fetchData');
        // location.reload();
      })
    },
  }
}

</script>
<style>
</style>
