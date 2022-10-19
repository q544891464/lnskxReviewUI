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
          <el-select v-model="formData.setSubjectGroup" placeholder="请选择学科组" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in setSubjectGroupOptions" :key="index" :label="item.label"
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
  import { doSetSubjectGroup,doSetSubjectGroupAll } from "@/api/system/apply/SysApplyManagementApi";

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
      setSubjectGroupOptions: [{
        "label": "学科一组（测绘学; 海洋科学; 地质学; 地球科学; 天文学; 化学; 物理学; 力学; 数学;）",
        "value": 1
      }, {
        "label": "学科二组（食品科学技术; 水产学; 畜牧、兽医科学; 林学; 农业工程; 作物学; 植物保护学; 园艺学; 农学;）",
        "value": 2
      }, {
        "label": "学科三组（药学; 中药学; 中医学; 军事医学与特种医学; 预防医学与卫生学; 临床医学其他学科; 外科学; 内科学;）",
        "value": 3
      }, {
        "label": "学科四组（基础医学; 生物学其他学科; 心理学; 生物工程（生物技术）; 细胞生物学;）",
        "value": 4
      }, {
        "label": "学科五组（矿山工程技术; 冶金工程技术; 材料学其他学科; 材料加工; 无机非金属材料和复合材料; 金属材料; 机械工程其他学科; 机械设计及制造;）",
        "value": 5
      }, {
        "label": "学科六组（信息科学与系统科学; 计算机科学技术; 自动控制与自动化技术; 仪器仪表; 电子、通信技术; 动力与电气工程、电工技术;）",
        "value": 6
      }, {
        "label": "学科七组（安全科学技术; 环境科学技术; 化学工程; 核科学技术; 能源科学技术;）",
        "value": 7
      }, {
        "label": "学科八组（交通运输工程; 水利工程; 土木建筑工程;）",
        "value": 8
      }],
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
