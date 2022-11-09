<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogFormVisible"
      @close="onClose"
      title="上传申报表"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="申报表材料" prop="uploadFileCompleted">
          <el-upload
            ref="fileimport3"
            accept=".pdf"
            :action="uploadFileCompleted"
            :multiple="false"
            :auto-upload="true"
            :show-file-list="true"
            :before-upload="beforeUploadCompleted"
            :file-list="fileListCompleted"
            :http-request="handleImportCompleted"
            :on-success="onSuccess"
            :on-error="onError"
          >
            <el-button
              slot="trigger"
              type="danger"
              icon="el-icon-upload2"
            >
              选取文件
            </el-button>
            <el-button
              type="danger"
              @click="viewFileCompleted"
              icon="el-icon-view"
            >
              预览
            </el-button>
            <div slot="tip" class="el-upload__tip">
              导出并下载申报表后，再回到这里将已经签字盖章的申报表上传，支持PDF格式。
            </div>
            <div slot="tip" class="el-upload__tip">
              提示上传成功后再选择确定即可
            </div>
            <div slot="tip" class="el-upload__tip" style="color: red">
              申报表盖章上传完成后不能再进行申报内容的修改操作，请确保申报内容无误再进行上传。
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm"  v-bind:disabled = disabled>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  doUpload,
  doSetCompletedFile,
} from "@/api/system/apply/SysApplyManagementApi";
import { isNull } from "@/utils/validate";

export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      disabled: true,
      id: "",
      dialogFormVisible: false,
      uploadFileCompleted: "",
      form: {
        completedFilePath: "",
      },
      fileListCompleted: [],
      addFormCompleted: {
        file: null,
        fileName: "",
        fileData: null,
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
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    show(row) {
      this.id = row.id;
      this.dialogFormVisible = true;
      this.fileListCompleted = [];
    },
    onOpen() {},
    // 上传成功
    onSuccess(response, file, fileList) {
      this.successProcess(file.uid);
      
      this.$emit("fetchData");
    },
    onClose() {
      this.$refs["elForm"].resetFields();
    },
    close() {
      this.$emit("update:visible", false);
      this.dialogFormVisible = false;
    },
    async handelConfirm() {
      const { msg } = await doSetCompletedFile({
        applyId: this.id,
        completedFilePath: this.form.completedFilePath,
      });
      this.$baseMessage(msg, "success");
      this.$emit("fetchData");
      this.close();
      // console.log("prize:"+this.formData.setPrize);
    },

    // 导入文件限制验证
    beforeUploadCompleted(file) {
      let testMsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testMsg === "pdf";
      // const extension2 = testMsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension) {
        this.$baseMessage("上传文件只能是 pdf 格式!", "warning");
      }
      if (!isLt2M) {
        this.$baseMessage("上传文件大小不能超过 10MB!", "warning");
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function () {
        that.addFormCompleted.fileData = reader.result;
      };

      return extension && isLt2M;
    },

    //    预览文件
    viewFileCompleted() {
      if (
        this.addFormCompleted.fileData == null &&
        this.form.completedFilePath == null
      ) {
        this.$message.warning("请先上传PDF文件");
        return false;
      }
      if (this.form.completedFilePath != null) {
        window.open(this.form.completedFilePath, "_blank");

        return false;
      }
      if (this.addFormCompleted.fileData != null) {
        var win = window.open();
        win.document.write(
          '<body style="margin:0px;"><object data="' +
            this.addFormCompleted.fileData +
            '" type="application/pdf" width="100%" height="100%"><iframe src="' +
            this.addFormCompleted.fileData +
            '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></object></body>'
        );

        return false;
      }
    },

    // 自定义导入
    handleImportCompleted(params) {
      if (!isNull(params)) {
        let blobObject = new Blob([params.file]);
        let formData = new window.FormData();
        formData.append("file", blobObject);
        const ret = doUpload(formData);
        ret
          .then((v) => {
            const { success, msg, data } = v;
            if (success) {
              this.$baseMessage(msg, "success");
              this.form.completedFilePath = data;
              this.disabled = false;
              // 列表里只允许显示一个文件
              if (this.fileListCompleted.length <= 0) {
                this.fileListCompleted.push({
                  name: params.file.name,
                  url: this.form.completedFilePath,
                });
              } else {
                this.fileListCompleted = undefined;
                this.fileListCompleted = new Array();
                this.fileListCompleted.push({
                  name: params.file.name,
                  url: this.form.completedFilePath,
                });
                console.log(this.fileListCompleted);
              }

              console.log(this.form.completedFilePath);
              // 成功
              params.onSuccess();
            } else {
              // 文件进度 100%
              this.errorProcess(params.file.uid);
              // 失败
              params.onError();
            }
          })
          .catch((e) => {
            // 失败
            params.onError();
          });
      } else {
        params.onError();
      }
    },
  },
};
</script>
<style>
</style>
