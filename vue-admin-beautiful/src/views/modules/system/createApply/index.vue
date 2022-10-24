<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="medium"
      label-width="150px"
      label-position="right"
      class="applyForm"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="推荐单位选择" prop="orgId">
            <el-select
              v-model="form.orgId"
              :collapse-tags="false"
              @visible-change="clearDrop($event)"
              placeholder="请选择推荐单位"
            >
              <div class="search-input">
                <el-input
                  placeholder="请输入内容"
                  size="mini"
                  prefix-icon="el-icon-search"
                  v-model="dropDownValue"
                  @input="dropDownSearch"
                  clearable
                ></el-input>
                <!-- <input type="text" placeholder="请输入" class="el-input__inner" v-model="dropDownValue" @keyup="dropDownSearch" clearable> -->
              </div>
              <div slot="empty" class="search-input">
                <el-input
                  placeholder="请输入内容"
                  size="mini"
                  prefix-icon="el-icon-search"
                  v-model="dropDownValue"
                  @input="dropDownSearch"
                  clearableoption
                ></el-input>
                <p>无搜索内容</p>
              </div>
              <el-option
                v-for="(item, index) in optionsMetaShow"
                :key="index"
                :label="item.unitName"
                :value="item.orgId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--        <el-col :span="12">

          <el-form-item label="主要完成人" prop="mainAuthors">
            <el-input v-model="form.mainAuthors" placeholder="主要完成人" :maxlength="11" show-word-limit clearable
          :style="{width: '90%'}" v-bind:disabled="disabled"></el-input>
          </el-form-item>

        </el-col> -->
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="成果名称" prop="applyName">
            <el-input
              v-model="form.applyName"
              placeholder="成果名称"
              :maxlength="40"
              show-word-limit
              clearable
              :style="{ width: '90%' }"
              v-bind:disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>

        <!--        <el-col :span="12">

          <el-form-item label="主要完成人" prop="mainAuthors">
            <el-input v-model="form.mainAuthors" placeholder="主要完成人" :maxlength="11" show-word-limit clearable
          :style="{width: '90%'}" v-bind:disabled="disabled"></el-input>
          </el-form-item>

        </el-col> -->
      </el-row>

      <el-form-item
        label-width="150px"
        label="发表日期/出版日期"
        prop="publicationDate"
      >
        <el-date-picker
          v-model="form.publicationDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :style="{ width: '50%' }"
          placeholder="请选择发表日期/出版日期"
          clearable
          v-bind:disabled="disabled"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label-width="150px" label="学科专业分类" prop="discipline">
        <el-cascader
          v-model="form.discipline"
          :options="disciplineOptions"
          :props="disciplineProps"
          @change="disciplinOptionChange"
          :style="{ width: '50%' }"
          placeholder="请选择学科专业分类!"
          v-bind:disabled="disabled"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="成果类别" prop="applyType">
        <el-select
          v-model="form.applyType"
          placeholder="请选择成果类别"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        >
          <el-option
            v-for="(item, index) in applyTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <!--
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="form.keywords" :style="{width: '50%'}" v-bind:disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="具体计划、基金名称和编号" prop="fundName">
        <el-input v-model="form.fundName" :style="{width: '80%'}" v-bind:disabled="disabled"></el-input>
      </el-form-item> -->

      <el-form-item label="成果简介" prop="introduction">
        <el-input
          v-model="form.introduction"
          type="textarea"
          placeholder="500个汉字以内，英文成果需给出500字以内的中文简介"
          :maxlength="500"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item label="其他支撑材料的支撑关系" prop="application">
        <el-input
          v-model="form.application"
          type="textarea"
          v-bind:disabled="disabled"
          :autosize="{ minRows: 4, maxRows: 4 }"
          :maxlength="500"
          show-word-limit
          placeholder="其他支撑材料（论文、著作、专利、项目）与代表性作品的支撑关系"
        ></el-input>
      </el-form-item>

      <el-form-item label="成果相关其它价值" prop="innovation">
        <el-input
          v-model="form.innovation"
          type="textarea"
          v-bind:disabled="disabled"
          placeholder="500个汉字以内，与该代表性作品相关的其他学术价值、成果转化及经济效益、社会效益简介"
          :maxlength="500"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="第一作者" prop="firstAuthor">
        <el-input
          v-model="form.firstAuthor"
          placeholder="请输入第一作者姓名"
          show-word-limit
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="firstAuthorSex">
        <el-select
          v-model="form.firstAuthorSex"
          placeholder="请选择性别"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        >
          <el-option
            v-for="(item, index) in firstAuthorSexOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="firstAuthorId">
        <el-input
          v-model="form.firstAuthorId"
          placeholder="身份证号仅用于本系统查重"
          show-word-limit
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="地域" prop="firstAuthorRegion">
        <el-select
          v-model="form.firstAuthorRegion"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        >
          <el-option
            v-for="(item, index) in firstAuthorRegionOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作单位" prop="firstAuthorWorkplace">
        <el-input
          v-model="form.firstAuthorWorkplace"
          show-word-limit
          clearable
          placeholder="请输入申报人工作单位"
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
        <div style="font-size: small;color:red">（请填写单位的全称）</div>
      </el-form-item>
      <el-form-item label="邮箱" prop="firstAuthorMail">
        <el-input
          v-model="form.firstAuthorMail"
          show-word-limit
          placeholder="请输入申报人邮箱"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="firstAuthorTel">
        <el-input
          v-model="form.firstAuthorTel"
          show-word-limit
          placeholder="请输入申报人手机号"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="职务" prop="firstAuthorPost">
        <el-input
          v-model="form.firstAuthorPost"
          placeholder="没有填无"
          show-word-limit
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="firstAuthorTitle">
        <el-input
          v-model="form.firstAuthorTitle"
          placeholder="没有填无"
          show-word-limit
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="职称级别" prop="firstAuthorTitleLevel">
        <el-select
          v-model="form.firstAuthorTitleLevel"
          placeholder="请选择职称级别"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        >
          <el-option
            v-for="(item, index) in firstAuthorTitleLevelOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="行政级别" prop="firstAuthorAdminLevel">
        <el-select v-model="form.firstAuthorAdminLevel" placeholder="请选择行政级别" clearable
          :style="{width: '100%'}" v-bind:disabled="disabled">
          <el-option v-for="(item, index) in firstAuthorAdminLevelOptions" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="学历" prop="firstAuthorEdu">
        <el-select
          v-model="form.firstAuthorEdu"
          placeholder="请选择学历"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        >
          <el-option
            v-for="(item, index) in firstAuthorEduOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学位" prop="firstAuthorDegree">
        <el-select
          v-model="form.firstAuthorDegree"
          placeholder="请选择学位"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        >
          <el-option
            v-for="(item, index) in firstAuthorDegreeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="毕业院校" prop="firstAuthorSchool">
        <el-input
          v-model="form.firstAuthorSchool"
          show-word-limit
          placeholder="请填写申报人毕业院校"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item label="专业" prop="firstAuthorProfess">
        <el-input
          v-model="form.firstAuthorProfess"
          show-word-limit
          placeholder="请填写申报人专业"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="firstAuthorAddress">
        <el-input
          v-model="form.firstAuthorAddress"
          show-word-limit
          placeholder="请填写申报人地址"
          clearable
          :style="{ width: '100%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item label="邮编" prop="firstAuthorCode">
        <el-input
          v-model="form.firstAuthorCode"
          show-word-limit
          placeholder="请填写申报人邮编"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item
        label-width="150px"
        label="第一作者简介"
        prop="firstAuthorIntro"
      >
        <el-input
          v-model="form.firstAuthorIntro"
          type="textarea"
          placeholder="500个汉字以内，本人获得的科技奖励、学术成果及参与的技术研发、工程项目情况简介"
          :maxlength="500"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
          v-bind:disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-divider>其他作者信息</el-divider>

      <el-collapse v-model="activeNames">
        <el-collapse-item title=" " class="collapseTitle" name="1">
          <el-form-item label="第二作者" prop="author2">
            <el-input
              v-model="form.author2"
              placeholder="请输入第二作者姓名"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="第二作者性别" prop="author2Sex">
            <el-select
              v-model="form.author2Sex"
              placeholder="请选择第二作者性别"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in firstAuthorSexOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="第二作者身份证" prop="author2">
            <el-input
              v-model="form.author2Id"
              placeholder="请输入第二作者身份证"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="第二作者工作单位" prop="author2Workplace">
            <el-input
              v-model="form.author2Workplace"
              placeholder="请输入第二作者工作单位"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="第二作者职务" prop="author2Position">
            <el-input
              v-model="form.author2Position"
              placeholder="请输入第二作者职务"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="第二作者手机号" prop="author2Tel">
            <el-input
              v-model="form.author2Tel"
              placeholder="请输入第二作者手机号"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-divider></el-divider>

          <el-form-item label="第三作者" prop="author3">
            <el-input
              v-model="form.author3"
              placeholder="请输入第三作者姓名"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="第三作者身份证" prop="author2">
            <el-input
              v-model="form.author3Id"
              placeholder="请输入第三作者身份证"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="第三作者性别" prop="author3Sex">
            <el-select
              v-model="form.author3Sex"
              placeholder="请选择第三作者性别"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in firstAuthorSexOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="第三作者工作单位" prop="author3Workplace">
            <el-input
              v-model="form.author3Workplace"
              placeholder="请输入第三作者工作单位"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="第三作者职务" prop="author3Position">
            <el-input
              v-model="form.author3Position"
              placeholder="请输入第三作者职务"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="第三作者手机号" prop="author3Tel">
            <el-input
              v-model="form.author3Tel"
              placeholder="请输入第三作者手机号"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-divider></el-divider>

          <el-form-item label="第四作者" prop="author4">
            <el-input
              v-model="form.author4"
              placeholder="请输入第四作者姓名"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="第四作者性别" prop="author4Sex">
            <el-select
              v-model="form.author4Sex"
              placeholder="请选择第四作者性别"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in firstAuthorSexOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="第四作者身份证" prop="author2">
            <el-input
              v-model="form.author4Id"
              placeholder="请输入第四作者身份证"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="第四作者工作单位" prop="author4Workplace">
            <el-input
              v-model="form.author4Workplace"
              placeholder="请输入第四作者工作单位"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="第四作者职务" prop="author4Position">
            <el-input
              v-model="form.author4Position"
              placeholder="请输入第四作者职务"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="第四作者手机号" prop="author4Tel">
            <el-input
              v-model="form.author4Tel"
              placeholder="请输入第四作者手机号"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-divider></el-divider>

          <el-form-item label="第五作者" prop="author5">
            <el-input
              v-model="form.author5"
              placeholder="请输入第五作者姓名"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="第五作者身份证" prop="author2">
            <el-input
              v-model="form.author5Id"
              placeholder="请输入第五作者身份证"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="第五作者性别" prop="author5Sex">
            <el-select
              v-model="form.author5Sex"
              placeholder="请选择第五作者性别"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in firstAuthorSexOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="第五作者工作单位" prop="author5Workplace">
            <el-input
              v-model="form.author5Workplace"
              placeholder="请输入第五作者工作单位"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="第五作者职务" prop="author5Position">
            <el-input
              v-model="form.author5Position"
              placeholder="请输入第五作者职务"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="第五作者手机号" prop="author5Tel">
            <el-input
              v-model="form.author5Tel"
              placeholder="请输入第五作者手机号"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <!-- <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item
          title="论文一信息"
          class="collapseTitle"
          name="lunwen1"
        >

        </el-collapse-item>
      </el-collapse> -->

      <!-- 分割线 -->

      <el-divider>相关证明材料</el-divider>

      <el-divider>论文</el-divider>

      <el-form-item label="论文发表刊物名称" prop="publicationName">
        <el-input
          v-model="form.publicationName"
          placeholder="请输入论文发表刊物名称"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="刊物影响因子" prop="impactFactor">
        <el-input
          v-model="form.impactFactor"
          placeholder="请输入刊物影响因子"
          clearable
          :style="{ width: '30%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="检索收录情况" prop="retrieval">
        <el-select
          v-model="form.retrieval"
          placeholder="请选择检索收录情况"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in retrievalOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="被引用次数" prop="citations">
        <el-select
          v-model="form.citations"
          placeholder="请选择被引用次数"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in citationsOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <div>（排除本人及本机构引用次数）</div>
      </el-form-item>

      <el-form-item label="论文类型" prop="paperType">
        <el-select
          v-model="form.paperType"
          placeholder="请选择论文类型"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in paperTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-divider>专著</el-divider>
      <el-form-item label="出版社名称" prop="publicationPublisherName">
        <el-input
          v-model="form.publicationPublisherName"
          placeholder="请输入专著发表刊物名称"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="出版数量" prop="publicationNumber">
        <el-input
          v-model="form.publicationNumber"
          placeholder="请输入专著出版数量(册)"
          clearable
          :style="{ width: '50%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="著作类型" prop="publicationType">
        <el-select
          v-model="form.publicationType"
          placeholder="请选择著作类型"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in publicationTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="被引用次数" prop="publicationCitations">
        <el-select
          v-model="form.publicationCitations"
          placeholder="请选择被引用次数"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in citationsOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <div>（排除本人及本机构引用次数）</div>
      </el-form-item>

      <el-form-item
        label="图书馆收藏或学术机构使用"
        prop="publicationInstitutionalUse"
      >
        <el-select
          v-model="form.publicationInstitutionalUse"
          placeholder="请选择"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in publicationInstitutionalUseOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <div>（可用该机构网页证明）</div>
      </el-form-item>

      <el-form-item label="论文及证明材料上传" prop="uploadFile">
        <el-upload
          ref="fileimport"
          accept=".pdf"
          :action="uploadFile"
          :multiple="false"
          :auto-upload="true"
          :show-file-list="true"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :http-request="handleImport"
          :on-success="onSuccess"
          :on-error="onError"
        >
          <el-button
            slot="trigger"
            type="danger"
            icon="el-icon-upload2"
            v-bind:disabled="disabled"
          >
            选取文件
          </el-button>
          <el-button type="danger" @click="viewFile" icon="el-icon-view">
            预览
          </el-button>
          <div slot="tip" class="el-upload__tip">
            请将论文及证明材料合并为一份pdf上传
          </div>
          <div slot="tip" class="el-upload__tip">
            证明材料需盖相关部门或申报人所在单位科技部门公章方为有效
          </div>
          <div slot="tip" class="el-upload__tip">
            只能上传不超过 10MB 的文件
          </div>
        </el-upload>
      </el-form-item>

      <el-divider>其它相关证明材料</el-divider>

      <el-form-item label="相关系列成果" prop="relatedAchievements">
        <el-select
          v-model="form.relatedAchievements"
          placeholder="请选择相关系列成果"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in relatedAchievementsOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产生该成果的项目名称" prop="projectName">
        <el-input
          v-model="form.projectName"
          placeholder="请输入产生该成果的项目名称(没有填无)"
          clearable
          :style="{ width: '80%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目级别" prop="projectLevel">
        <el-select
          v-model="form.projectLevel"
          placeholder="请选择项目级别"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in projectLevelOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自主创新情况" prop="projectInnovation">
        <el-select
          v-model="form.projectInnovation"
          placeholder="请选择自主创新情况"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in projectInnovationOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="专利名称" prop="patentName">
        <el-input
          v-model="form.patentName"
          placeholder="请输入专利名称(没有填无)"
          clearable
          :style="{ width: '80%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="专利类型" prop="patentType">
        <el-select
          v-model="form.patentType"
          placeholder="请选择专利类型"
          clearable
          :style="{ width: '50%' }"
        >
          <el-option
            v-for="(item, index) in patentTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label-width="150px" label="专利获得时间" prop="patentDate">
        <el-date-picker
          v-model="form.patentDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :style="{ width: '50%' }"
          placeholder="请选择专利获得时间"
          clearable
          v-bind:disabled="disabled"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="专利应用证明" prop="patentApplication">
        <el-input
          v-model="form.patentApplication"
          placeholder="请输入专利应用证明"
          clearable
          :style="{ width: '80%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="产值或经济效益" prop="patentValue">
        <el-input
          v-model="form.patentValue"
          placeholder="请填写产值或经济效益"
          clearable
          :style="{ width: '80%' }"
        ></el-input>
      </el-form-item>

      <el-form-item label="其它支撑材料及证明材料上传" prop="uploadFileOther">
        <el-upload
          ref="fileimport2"
          accept=".pdf"
          :action="uploadFileOther"
          :multiple="false"
          :auto-upload="true"
          :show-file-list="true"
          :before-upload="beforeUploadOther"
          :file-list="fileListOther"
          :http-request="handleImportOther"
          :on-success="onSuccess"
          :on-error="onError"
        >
          <el-button
            slot="trigger"
            type="danger"
            icon="el-icon-upload2"
            v-bind:disabled="disabled"
          >
            选取文件
          </el-button>
          <el-button type="danger" @click="viewFileOther" icon="el-icon-view">
            预览
          </el-button>
          <div slot="tip" class="el-upload__tip">
            如检索收录情况、被引用次数、会议交流的证明材料、有关部门提供的鉴定意见和取得效益的证明等能证明成果价值的相关证明材料。
            且盖相关部门或申报人所在单位科技部门公章方为有效
          </div>
        </el-upload>
      </el-form-item>

      <!-- <el-form-item label="申报表材料" prop="uploadFileCompleted">
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
            v-bind:disabled="disabled"
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
            先提交本页，在「申报资料列表」中导出并下载申报表后，再回到这里将已经签字盖章的申报表上传，支持PDF格式。
          </div>
        </el-upload>
      </el-form-item> -->

      <el-form-item size="large">
        <el-button
          type="primary"
          @click="submitForm('form')"
          v-bind:disabled="disabled"
        >
          提交
        </el-button>
        <!-- <el-button @click="resetForm('form')" v-bind:disabled="disabled">
          重置
        </el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  doUpload,
  doInsert,
  doUpdate,
  getIsDeadLine,
} from "@/api/system/apply/SysApplyManagementApi";
import { getTreeAll } from "@/api/system/discipline/disciplineManagement";
import { getUnitNames } from "@/api/system/orgInfo/OrgInfoManagementApi";
import { isNull } from "@/utils/validate";
import { formateDate } from "@/utils/format";
import { validatorRule } from "@/utils/validateRlue";

export default {
  name: "Form",
  created() {
    this.getUnitNames();
    // this.getIsDeadLine();
    if(!this.getIsDeadLine()){
       this.disabled = true;
       
    }
    if (this.$route.query.form) {
      this.form = this.$route.query.form;
      // console.log(this.form.discipline,"this.form.discipline");
      // 处理学科专业级联菜单的Json与String转换
      if (this.form.discipline) {
        this.form.discipline = JSON.parse(this.form.discipline);
        console.log(this.form.discipline[1], "当前专业");
        this.form.disciplineName = this.form.discipline[1];
      }
      // 如果是查看 则令全部表单不可编辑
      this.disabled = this.$route.query.disabled;
    }

    // console.log(this.fieldOptions);
  },

  mounted() {
    // this.getIsDeadLine();

    // 调用方法获取所有学科专业数据
    this.getDisciplineList();
  },

  data() {
    return {
      dropDownValue: "",
      optionsMetaAll: [],
      optionsMetaShow: [],
      valueMeta: [],
      activeNames: "1",
      loadProgress: 0, // 动态显示进度条
      progressFlag: false, // 关闭进度条,
      progressMap: {},
      uploadFile: "",
      uploadFileOther: "",
      uploadFileCompleted: "",
      fileList: [],
      fileListOther: [],
      fileListCompleted: [],
      uuid: "",
      disabled: false,
      form: {
        dynamicItem: [
          {
            params: "",
          },
        ],

        applyName: "",
        mainAuthors: "",
        discipline: [],
        disciplineName: "",
        subjectGroup: "",
        applyType: "",
        publicationDate: null,
        keywords: "",
        fundName: "",
        introduction: "",
        innovation: "",
        application: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        firstAuthor: "",
        firstAuthorSex: "",
        firstAuthorId: "",
        firstAuthorBirth: "",
        firstAuthorRegion: "",
        firstAuthorWorkplace: "",
        firstAuthorMail: "",
        firstAuthorTel: "",
        firstAuthorPost: "",
        firstAuthorTitle: "",
        firstAuthorEdu: "",
        firstAuthorDegree: "",
        firstAuthorSchool: "",
        firstAuthorProfess: "",
        firstAuthorAddress: "",
        firstAuthorCode: "",
        firstAuthorAdminLevel: "",
        firstAuthorTitleLevel: "",
        firstAuthorIntro: "",
        author2: "",
        author2Sex: "",
        author2Workplace: "",
        author2Tel: "",
        author3: "",
        author3Sex: "",
        author3Workplace: "",
        author3Tel: "",
        author4: "",
        author4Sex: "",
        author4Workplace: "",
        author4Tel: "",
        filePath: "",
        wordPath: "",
        otherFilePath: "",
        completedFilePath: "",
        publicationName: "",
        impactFactor: "",
        retrieval: "",
        citations: "",
        paperType: "",
        relatedAchievements: "",
        projectName: "",
        projectLevel: "",
        projectInnovation: "",
      },
      addForm: {
        file: null,
        fileName: "",
        fileData: null,
      },
      addFormOther: {
        file: null,
        fileName: "",
        fileData: null,
      },
      addFormCompleted: {
        file: null,
        fileName: "",
        fileData: null,
      },

      rules: {
        discipline: [
          {
            required: true,
            // type: 'array',
            message: "请至少选择一个学科专业分类",
            trigger: "change",
          },
        ],

        applyType: [
          {
            required: true,
            message: "请选择成果类别",
            trigger: "change",
          },
        ],
        publicationDate: [
          {
            required: true,
            message: "请选择发表日期/出版日期",
            trigger: "change",
          },
        ],

        applyName: [
          { required: true, message: "请输入成果名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        introduction: [
          {
            required: true,
            message: "请输入成果简介",
            trigger: "blur",
          },
        ],

        innovation: [
          {
            required: true,
            message: "请输入成果相关其它价值",
            trigger: "blur",
          },
        ],
        firstAuthor: [
          {
            required: true,
            message: "请输入第一作者姓名",
            trigger: "blur",
          },
        ],
        firstAuthorSex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        firstAuthorId: [
          { required: true, message: "请填写身份证号", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            validator: validatorRule.IS_CITIZENID,
          },
        ],
        firstAuthorRegion: [
          {
            required: true,
            message: "请输入地域",
            trigger: "change",
          },
        ],
        firstAuthorWorkplace: [
          {
            required: true,
            message: "请输入工作单位",
            trigger: "blur",
          },
        ],
        firstAuthorMail: [
          { required: true, message: "请填写邮箱", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            validator: validatorRule.IS_EMAIL,
          },
        ],
        firstAuthorTel: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            validator: validatorRule.IS_MOBILE,
          },
        ],
        firstAuthorPost: [
          { required: true, message: "请填写职务", trigger: "blur" },
        ],
        firstAuthorTitle: [
          { required: true, message: "请填写职称", trigger: "blur" },
        ],
        firstAuthorAdminLevel: [
          {
            required: true,
            message: "请选择行政级别",
            trigger: "change",
          },
        ],
        firstAuthorEdu: [
          {
            required: true,
            message: "请选择学历",
            trigger: "change",
          },
        ],
        firstAuthorDegree: [
          {
            required: true,
            message: "请选择学位",
            trigger: "change",
          },
        ],
        firstAuthorSchool: [
          {
            required: true,
            message: "请输入毕业院校",
            trigger: "blur",
          },
        ],
        firstAuthorProfess: [
          {
            required: true,
            message: "请输入专业",
            trigger: "blur",
          },
        ],
        firstAuthorTitleLevel: [
          {
            required: true,
            message: "请选择职称级别",
            trigger: "change",
          },
        ],

        firstAuthorIntro: [
          {
            required: true,
            message: "请输入第一作者简介",
            trigger: "blur",
          },
        ],

        firstAuthorAddress: [
          {
            required: true,
            message: "请输入第一作者地址",
            trigger: "blur",
          },
        ],
        publicationName: [
          {
            required: true,
            message: "请输入论文发表刊物名称",
            trigger: "blur",
          },
        ],
        impactFactor: [
          {
            required: true,
            message: "请输入刊物影响因子",
            trigger: "blur",
          },
        ],
        retrieval: [
          {
            required: true,
            message: "请选择检索收录情况",
            trigger: "change",
          },
        ],
        citations: [
          {
            required: true,
            message: "请选择被引用次数",
            trigger: "change",
          },
        ],
        paperType: [
          {
            required: true,
            message: "请选择论文类型",
            trigger: "change",
          },
        ],
        relatedAchievements: [
          {
            required: true,
            message: "请选择相关系列成果",
            trigger: "change",
          },
        ],
        projectName: [
          {
            required: true,
            message: "请输入产生该成果的项目名称",
            trigger: "change",
          },
        ],
        projectLevel: [
          {
            required: true,
            message: "请选择项目级别",
            trigger: "change",
          },
        ],
        projectInnovation: [
          {
            required: true,
            message: "请选择自主创新情况",
            trigger: "change",
          },
        ],
      },

      firstAuthorSexOptions: [
        {
          label: "男",
          value: "男",
        },
        {
          label: "女",
          value: "女",
        },
      ],

      disciplineOptions: [],
      disciplineProps: {
        multiple: false,
        label: "disciplineName",
        value: "disciplineName",
        children: "children",
        checkStrictly: false,
      },

      applyTypeOptions: [
        {
          label: "学术论文",
          value: "学术论文",
        },
        {
          label: "著作",
          value: "著作",
        },
        {
          label: "技术创新论文（已发表）",
          value: "技术创新论文（已发表）",
        },
        {
          label: "技术创新论文（未发表）",
          value: "技术创新论文（未发表）",
        },
      ],
      firstAuthorRegionOptions: [
        {
          label: "沈阳市",
          value: "沈阳市",
        },
        {
          label: "大连市",
          value: "大连市",
        },
        {
          label: "鞍山市",
          value: "鞍山市",
        },
        {
          label: "抚顺市",
          value: "抚顺市",
        },
        {
          label: "本溪市",
          value: "本溪市",
        },
        {
          label: "丹东市",
          value: "丹东市",
        },
        {
          label: "锦州市",
          value: "锦州市",
        },
        {
          label: "营口市",
          value: "营口市",
        },
        {
          label: "阜新市",
          value: "阜新市",
        },
        {
          label: "辽阳市",
          value: "辽阳市",
        },
        {
          label: "铁岭市",
          value: "铁岭市",
        },
        {
          label: "朝阳市",
          value: "朝阳市",
        },
        {
          label: "盘锦市",
          value: "盘锦市",
        },
        {
          label: "葫芦岛市",
          value: "葫芦岛市",
        },
      ],
      firstAuthorAdminLevelOptions: [
        {
          label: "厅局级及以上",
          value: "厅局级及以上",
        },
        {
          label: "处级",
          value: "处级",
        },
        {
          label: "科级及以下",
          value: "科级及以下",
        },
        {
          label: "无",
          value: "无",
        },
      ],
      firstAuthorTitleLevelOptions: [
        {
          label: "正高级",
          value: "正高级",
        },
        {
          label: "副高级",
          value: "副高级",
        },
        {
          label: "中级",
          value: "中级",
        },
        {
          label: "初级",
          value: "初级",
        },
        {
          label: "无",
          value: "无",
        },
      ],
      firstAuthorEduOptions: [
        {
          label: "专科及以下",
          value: "专科及以下",
        },
        {
          label: "本科",
          value: "本科",
        },
        {
          label: "硕士",
          value: "硕士",
        },
        {
          label: "博士及以上",
          value: "博士及以上",
        },
      ],
      firstAuthorDegreeOptions: [
        {
          label: "学士",
          value: "学士",
        },
        {
          label: "硕士",
          value: "硕士",
        },
        {
          label: "博士",
          value: "博士",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
      retrievalOptions: [
        {
          label: "SCI/HSCI/SSCI/EI/ISTP",
          value: "A",
        },
        {
          label: "Medline/Scifinder/Biosis preview等国际检索工具",
          value: "B",
        },
        {
          label: "CSCD/CSSCI/CSTPCD",
          value: "C",
        },
        {
          label: "无",
          value: "无",
        },
      ],
      citationsOptions: [
        {
          label: "1-2次",
          value: "1-2次",
        },
        {
          label: "3-5次",
          value: "3-5次",
        },
        {
          label: "6-10次",
          value: "6-10次",
        },
        {
          label: ">=10次",
          value: ">=10次",
        },
        {
          label: "无",
          value: "无",
        },
      ],
      paperTypeOptions: [
        {
          label: "指南、标准、研究性原始论文",
          value: "A",
        },
        {
          label: "综述性文献、讲座",
          value: "B",
        },
        {
          label: "短篇报道",
          value: "C",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
      publicationTypeOptions: [
        {
          label: "专著",
          value: "A",
        },
        {
          label: "编著",
          value: "B",
        },
        {
          label: "译著",
          value: "C",
        },
      ],
      publicationInstitutionalUseOptions: [
        {
          label: "5家或5家机构以上",
          value: "A",
        },
        {
          label: "3-4家机构",
          value: "B",
        },
        {
          label: "1-2家机构",
          value: "C",
        },
        {
          label: "无",
          value: "无",
        },
      ],
      relatedAchievementsOptions: [
        {
          label:
            "有相关专利，或有3篇以上中文相关论文或1篇外文相关论文，或市级政府采用证明",
          value: "A",
        },
        {
          label: "有2篇中文相关论文",
          value: "B",
        },
        {
          label: "有1篇中文相关论文",
          value: "C",
        },
        {
          label: "无",
          value: "无",
        },
      ],
      projectLevelOptions: [
        {
          label: "国家级重大项目",
          value: "A",
        },
        {
          label: "国家级重点项目",
          value: "B",
        },
        {
          label: "国家级一般项目",
          value: "C",
        },
        {
          label: "省部级重点项目",
          value: "D",
        },
        {
          label: "省部级一般项目",
          value: "E",
        },
        {
          label: "其他",
          value: "F",
        },
      ],
      projectInnovationOptions: [
        {
          label: "原始创新",
          value: "A",
        },
        {
          label: "集成创新",
          value: "B",
        },
        {
          label: "引进消化吸收再创新",
          value: "C",
        },
      ],
      patentTypeOptions: [
        {
          label: "实用新型专利",
          value: "B",
        },
        {
          label: "外观设计专利",
          value: "C",
        },
        {
          label: "发明专利",
          value: "A",
        },
      ],
    };
  },
  methods: {
    dropDownSearch() {
      var _this = this;
      // _this.valueMeta = [];
      _this.optionsMetaShow = _this.optionsMetaAll.filter(_this.filterSearch);
    },
    filterSearch(item) {
      return item.unitName.includes(this.dropDownValue);
    },
    clearDrop($event) {
      //此处的clearDrop用于解决搜索内容不存在时，所有内容无法显示的bug
      if ($event) {
        // alert('active')
        this.dropDownValue = "";
        this.optionsMetaShow = this.optionsMetaAll;
      }
    },
    // 获取推荐单位名字列表
    async getUnitNames() {
      const { success, msg, data } = await getUnitNames();
      if (success) {
        this.optionsMetaAll = data;
        this.optionsMetaShow = data;
      } else {
        this.$message.error(msg);
      }
    },
    //获取专业学科列表
    async getDisciplineList() {
      const { success, msg, data } = await getTreeAll();
      if (success) {
        this.disciplineOptions = data;
        console.log(this.disciplineOptions, "this.disciplineOptions");
      }
      // console.log(this.disciplineOptions,"this.disciplineOptions");
      // console.log(success,"success");
    },

    async getIsDeadLine() {
      const { success, msg, data } = await getIsDeadLine();
      if (!success) {
        this.disabled = true;
        this.$baseMessage(msg, "error");
      }
      return success;
    },

    disciplinOptionChange(val) {
      // this.form.discipline = val[1];
      console.log(val, "discipline");
      this.form.disciplineName = val[1];
      console.log(this.form.disciplineName);
      // console.log(this.form.discipline instanceof Array,"type");
      // console.log(this.disciplineOptions[val[0]].children,"disciplineOptionName");
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          this.handlerFormData(this.form);

          // 修改
          if (!isNull(this.form.id)) {
            const { success, msg, data } = await doUpdate(this.form);
            if (success) {
              this.$baseMessage(msg, "success");
            }
          } else {
            //插入
            const { success, msg, data } = await doInsert(this.form);
            if (success) {
              this.$baseMessage(msg, "success");
            }
          }

          this.$router.push({ path: "/apply" });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$nextTick(()=>{
      //     this.$refs[formName].resetFields();
      // })
      this.$refs[formName].resetFields();
    },

    // 上传成功
    onSuccess(response, file, fileList) {
      this.successProcess(file.uid);
      this.$emit("fetchData");
    },
    // 上传失败
    onError(err, file, fileList) {
      this.errorProcess(file.uid);
    },

    // 导入文件限制验证
    beforeUpload(file) {
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
        that.addForm.fileData = reader.result;
      };

      return extension && isLt2M;
    },

    //    预览文件
    viewFile() {
      console.log(this.$options.name, "optionname");
      if (this.addForm.fileData == null && this.form.filePath == null) {
        this.$message.warning("请先上传PDF文件");
        return false;
      }
      if (this.form.filePath != null) {
        window.open(this.form.filePath, "_blank");

        return false;
      }
      if (this.addForm.fileData != null) {
        var win = window.open();
        win.document.write(
          '<body style="margin:0px;"><object data="' +
            this.addForm.fileData +
            '" type="application/pdf" width="100%" height="100%"><iframe src="' +
            this.addForm.fileData +
            '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></object></body>'
        );

        return false;
      }
    },

    // 自定义导入
    handleImport(params) {
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
              this.form.filePath = data;
              // 列表里只允许显示一个文件
              if (this.fileList.length <= 0) {
                this.fileList.push({
                  name: params.file.name,
                  url: this.form.filePath,
                });
              } else {
                this.fileList = undefined;
                this.fileList = new Array();
                this.fileList.push({
                  name: params.file.name,
                  url: this.form.filePath,
                });
                console.log(this.fileList);
              }

              console.log(this.form.filePath);
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

    // 导入文件限制验证
    beforeUploadOther(file) {
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
        that.addFormOther.fileData = reader.result;
      };

      return extension && isLt2M;
    },

    //    预览文件
    viewFileOther() {
      if (
        this.addFormOther.fileData == null &&
        this.form.otherFilePath == null
      ) {
        this.$message.warning("请先上传PDF文件");
        return false;
      }
      if (this.form.otherFilePath != null) {
        window.open(this.form.otherFilePath, "_blank");

        return false;
      }
      if (this.addFormOther.fileData != null) {
        var win = window.open();
        win.document.write(
          '<body style="margin:0px;"><object data="' +
            this.addFormOther.fileData +
            '" type="application/pdf" width="100%" height="100%"><iframe src="' +
            this.addFormOther.fileData +
            '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></object></body>'
        );

        return false;
      }
    },

    // 自定义导入
    handleImportOther(params) {
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
              this.form.otherFilePath = data;
              // 列表里只允许显示一个文件
              if (this.fileListOther.length <= 0) {
                this.fileListOther.push({
                  name: params.file.name,
                  url: this.form.otherFilePath,
                });
              } else {
                this.fileListOther = undefined;
                this.fileListOther = new Array();
                this.fileListOther.push({
                  name: params.file.name,
                  url: this.form.otherFilePath,
                });
                console.log(this.fileListOther);
              }

              console.log(this.form.otherFilePath);
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

    subjectGroupFormat(disciplineSubject) {
      if (disciplineSubject == "理科") {
        return 1;
      } else if (disciplineSubject == "农科") {
        return 2;
      } else if (disciplineSubject == "医药") {
        return 3;
      } else if (disciplineSubject == "生命科学与基础医学") {
        return 4;
      } else if (disciplineSubject == "机械、材料、矿山、冶金") {
        return 5;
      } else if (disciplineSubject == "电气、电子与信息技术") {
        return 6;
      } else if (disciplineSubject == "能源、化工与环境") {
        return 7;
      } else if (disciplineSubject == "交通与基建") {
        return 8;
      }
    },

    addItem() {
      this.form.dynamicItem.push({
        params: this.form.params,
      });
    },
    deleteItem(item, index) {
      this.form.dynamicItem.splice(index, 1);
    },

    handlerFormData(formData) {
      //解析身份证号得到出生年月日
      let iden = this.form.firstAuthorId;
      if (iden.length == 18) {
        this.form.firstAuthorBirth =
          iden.substring(6, 10) +
          "-" +
          iden.substring(10, 12) +
          "-" +
          iden.substring(12, 14);
      }
      if (iden.length == 15) {
        this.form.firstAuthorBirth =
          "19" +
          iden.substring(6, 8) +
          "-" +
          iden.substring(8, 10) +
          "-" +
          iden.substring(10, 12);
      }

      this.form.disciplineName = this.form.discipline[1];

      this.form.subjectGroup = this.subjectGroupFormat(this.form.discipline[0]);

      if (!isNull(formData)) {
        for (let key in formData) {
          // 对于时间类进行处理
          if (
            "[object Date]" === Object.prototype.toString.call(formData[key])
          ) {
            formData[key] = formateDate(formData[key], "yyyy-MM-dd hh:mm:ss");
          }

          if (key == "discipline") {
            formData[key] = JSON.stringify(formData[key]);
            // formData["disciplineName"] = this.disciplineOptions[formData[key][1]].disciplineName;
            // console.log(formData["disciplineName"],"disciplineName");
          }
        }
      }
    },
  },
};
</script>
<style>
.el-divider {
  margin: 8px 0;
  background: 0 0;
  border-top: 1px solid #e6ebf5;
}

.collapseTitle >>> .el-collapse-item__header {
  font-size: 18px;
  color: #f56c6c;
}
</style>
