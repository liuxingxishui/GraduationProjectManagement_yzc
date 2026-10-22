import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  HeadingLevel,
  ImportedXmlComponent,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  convertInchesToTwip,
} from "docx";

const outputPath = process.argv[2];
if (!outputPath) throw new Error("Usage: node create.js /absolute/path/output.docx");

const T = String.raw;
const font = { name: "Times New Roman", eastAsia: "SimSun" };

const run = (text, options = {}) => new TextRun({ text, font, size: 24, ...options });
const para = (children, options = {}) => new Paragraph({
  spacing: { after: 160, line: 300 },
  ...options,
  children: Array.isArray(children) ? children : [children],
});

const bodyPara = (text, options = {}) => para(run(text), {
  indent: { firstLine: convertInchesToTwip(0.33) },
  ...options,
});

const h1 = (text) => para(run(text, { bold: true, size: 30 }), {
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 240, after: 120 },
});

const h2 = (text) => para(run(text, { bold: true, size: 26 }), {
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 200, after: 100 },
});

const h3 = (text) => para(run(text, { bold: true, size: 24 }), {
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 160, after: 80 },
});

const cell = (text, options = {}) => new TableCell({
  children: [para(run(text))],
  margins: { top: 120, bottom: 120, left: 120, right: 120 },
  ...options,
});

const xmlEscape = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const toc = (entries) => {
  const cached = entries
    .map(({ title: entryTitle, level, page }) => {
      const indent = Math.max(0, level - 1) * 360;
      return `<w:p>
        <w:pPr>
          <w:pStyle w:val="TOC${level}"/>
          <w:tabs><w:tab w:val="right" w:leader="dot" w:pos="9000"/></w:tabs>
          <w:ind w:left="${indent}"/>
        </w:pPr>
        <w:r><w:t>${xmlEscape(entryTitle)}</w:t></w:r><w:r><w:tab/></w:r><w:r><w:t>${xmlEscape(page)}</w:t></w:r></w:p>`;
    })
    .join("");

  return ImportedXmlComponent.fromXmlString(`<w:sdt xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
    <w:sdtPr><w:alias w:val="目录"/></w:sdtPr>
    <w:sdtContent>
      <w:p><w:r><w:fldChar w:fldCharType="begin" w:dirty="true"/>
        <w:instrText xml:space="preserve"> TOC \\o &quot;1-3&quot; \\h \\z \\u </w:instrText>
        <w:fldChar w:fldCharType="separate"/></w:r></w:p>
      ${cached}
      <w:p><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>
    </w:sdtContent>
  </w:sdt>`).root[0];
};

// 封面页
const coverPage = () => [
  para(run("", { size: 24 }), { spacing: { after: 600 } }),
  para(run("JAVA EE 框架课程设计", { bold: true, size: 44 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  para(run("课程设计报告", { bold: true, size: 36 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
  }),
  para(run("项目名称：毕业设计选题管理系统", { size: 28 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  para(run("", { size: 24 }), { spacing: { after: 800 } }),
  para(run("学    号：________________", { size: 24 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  para(run("姓    名：________________", { size: 24 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  para(run("专    业：________________", { size: 24 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  para(run("指导教师：________________", { size: 24 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  para(run("", { size: 24 }), { spacing: { after: 600 } }),
  para(run("2026 年 7 月", { size: 24 }), {
    alignment: AlignmentType.CENTER,
  }),
];

// 目录条目
const tocEntries = [
  { title: "一、项目概述", level: 1, page: 1 },
  { title: "二、需求分析", level: 1, page: 2 },
  { title: "2.1 功能需求", level: 2, page: 2 },
  { title: "2.2 非功能需求", level: 2, page: 3 },
  { title: "三、系统设计", level: 1, page: 3 },
  { title: "3.1 系统架构设计", level: 2, page: 3 },
  { title: "3.2 功能模块设计", level: 2, page: 4 },
  { title: "3.3 数据库设计", level: 2, page: 5 },
  { title: "四、系统实现", level: 1, page: 6 },
  { title: "4.1 开发环境", level: 2, page: 6 },
  { title: "4.2 关键技术", level: 2, page: 6 },
  { title: "4.3 核心代码", level: 2, page: 7 },
  { title: "五、系统测试与运行", level: 1, page: 10 },
  { title: "六、总结与展望", level: 1, page: 11 },
  { title: "参考文献", level: 1, page: 12 },
];

const sections = [];

// 一、项目概述
sections.push(
  h1("一、项目概述"),
  bodyPara(T`本系统为“毕业设计选题管理系统”，基于 Java EE 技术栈（Spring MVC + MyBatis + MySQL）开发，采用 B/S 架构。系统实现了学生信息管理、毕业设计选题管理、学生选题记录查询等核心功能。`),
  bodyPara(T`系统采用 Maven 构建工具，前端使用 JSP + Bootstrap 技术，后端采用 Spring MVC 框架进行控制层处理，MyBatis 作为数据持久层框架，MySQL 作为关系型数据库。系统支持分页查询、数据增删改查、学生选题等常见业务操作。`),
);

// 二、需求分析
sections.push(
  h1("二、需求分析"),
  h2("2.1 功能需求"),
  bodyPara(T`系统主要面向两类用户：系统管理员（教师）和学生。管理员可对学生信息、选题信息进行增删改查管理；学生可浏览选题列表并选择自己感兴趣的毕业设计题目。具体功能需求如下：`),
  bodyPara(T`（1）学生管理：实现学生信息的增删改查，包括学号、姓名、密码、专业等字段。`),
  bodyPara(T`（2）选题管理：实现毕业设计选题的增删改查，包括选题名称、开始时间、结束时间、容量等字段。`),
  bodyPara(T`（3）选题记录：查询学生与选题之间的关联记录，展示学生已选择的选题信息。`),
  bodyPara(T`（4）学生选题：学生登录后可浏览所有可选题目，并进行选题操作。系统需校验选题容量限制，防止超额选题。`),
  h2("2.2 非功能需求"),
  bodyPara(T`（1）系统采用 B/S 架构，客户端只需浏览器即可访问。`),
  bodyPara(T`（2）数据库使用 MySQL，支持 utf8mb4 字符集。`),
  bodyPara(T`（3）前端页面响应式布局，兼容常见浏览器。`),
  bodyPara(T`（4）系统需具备基本的登录拦截机制，未登录用户无法执行敏感操作。`),
);

// 三、系统设计
sections.push(
  h1("三、系统设计"),
  h2("3.1 系统架构设计"),
  bodyPara(T`本系统采用经典的三层架构模式：表现层（Presentation Layer）、业务逻辑层（Business Layer）、数据访问层（Data Access Layer）。`),
  bodyPara(T`表现层：基于 Spring MVC 的 Controller 接收 HTTP 请求，调用 Service 层处理业务，并返回 JSP 视图或 JSON 数据。`),
  bodyPara(T`业务逻辑层：Service 接口及其实现类封装核心业务逻辑，如学生选题时的容量校验、重复选题校验等。`),
  bodyPara(T`数据访问层：MyBatis Mapper 接口与 XML 映射文件负责与 MySQL 数据库交互，实现数据的持久化操作。`),
);

// 3.2 功能模块设计
sections.push(
  h2("3.2 功能模块设计"),
  bodyPara(T`系统划分为以下功能模块：`),
);

// 模块表格
const moduleWidths = [2000, 3500, 3500];
const moduleTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: moduleWidths,
  rows: [
    new TableRow({ children: [
      cell("模块名称", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" }, width: { size: moduleWidths[0], type: WidthType.DXA } }),
      cell("功能描述", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" }, width: { size: moduleWidths[1], type: WidthType.DXA } }),
      cell("对应页面", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" }, width: { size: moduleWidths[2], type: WidthType.DXA } }),
    ]}),
    new TableRow({ children: [
      cell("学生管理"), cell("学生信息的增删改查、分页展示"), cell("student/list.jsp, add.jsp, edit.jsp"),
    ]}),
    new TableRow({ children: [
      cell("选题管理"), cell("选题信息的增删改查、分页展示"), cell("topic/list.jsp, add.jsp, edit.jsp"),
    ]}),
    new TableRow({ children: [
      cell("选题记录"), cell("查看学生已选选题记录"), cell("stuTopic/list.jsp"),
    ]}),
    new TableRow({ children: [
      cell("浏览选题"), cell("学生浏览所有选题并执行选题操作"), cell("topic/browse.jsp"),
    ]}),
    new TableRow({ children: [
      cell("我的选题"), cell("学生查看自己已选择的选题"), cell("stuTopic/myTopic.jsp"),
    ]}),
    new TableRow({ children: [
      cell("登录模块"), cell("学生登录验证，Session 会话管理"), cell("login.jsp"),
    ]}),
  ],
});
sections.push(moduleTable);

sections.push(
  bodyPara(T`系统还包含登录拦截器（LoginInterceptor），拦截未登录用户访问需要权限的页面，并自动重定向到登录页。`),
);

// 3.3 数据库设计
sections.push(
  h2("3.3 数据库设计"),
  bodyPara(T`数据库采用 MySQL 关系型数据库，数据库名为 mybatis。系统包含三张核心数据表：student（学生表）、topic（选题表）、stutopic（学生选题记录表）。`),
  h3("3.3.1 学生表（student）"),
);

const studentTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [2000, 2000, 2000, 2000, 2000],
  rows: [
    new TableRow({ children: [
      cell("字段名", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("数据类型", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("约束", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("说明", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("备注", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
    ]}),
    new TableRow({ children: [
      cell("stuID"), cell("INT"), cell("PK, NN, AI"), cell("学号"), cell("主键自增"),
    ]}),
    new TableRow({ children: [
      cell("stuName"), cell("VARCHAR(45)"), cell(""), cell("学生姓名"), cell(""),
    ]}),
    new TableRow({ children: [
      cell("stuPwd"), cell("VARCHAR(45)"), cell(""), cell("密码"), cell(""),
    ]}),
    new TableRow({ children: [
      cell("major"), cell("VARCHAR(45)"), cell(""), cell("专业"), cell(""),
    ]}),
  ],
});
sections.push(studentTable);

sections.push(h3("3.3.2 选题表（topic）"));

const topicTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [2000, 2000, 2000, 2000, 2000],
  rows: [
    new TableRow({ children: [
      cell("字段名", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("数据类型", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("约束", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("说明", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("备注", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
    ]}),
    new TableRow({ children: [
      cell("topicID"), cell("INT"), cell("PK, NN, AI"), cell("选题ID"), cell("主键自增"),
    ]}),
    new TableRow({ children: [
      cell("topicName"), cell("VARCHAR(45)"), cell(""), cell("选题名称"), cell(""),
    ]}),
    new TableRow({ children: [
      cell("start"), cell("VARCHAR(45)"), cell(""), cell("开始时间"), cell(""),
    ]}),
    new TableRow({ children: [
      cell("end"), cell("VARCHAR(45)"), cell(""), cell("结束时间"), cell(""),
    ]}),
    new TableRow({ children: [
      cell("capacity"), cell("VARCHAR(45)"), cell(""), cell("容量"), cell(""),
    ]}),
  ],
});
sections.push(topicTable);

sections.push(h3("3.3.3 学生选题记录表（stutopic）"));

const stutopicTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [2000, 2000, 2000, 2000, 2000],
  rows: [
    new TableRow({ children: [
      cell("字段名", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("数据类型", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("约束", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("说明", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("备注", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
    ]}),
    new TableRow({ children: [
      cell("stuID"), cell("INT"), cell("PK, NN"), cell("学号"), cell("联合主键"),
    ]}),
    new TableRow({ children: [
      cell("stuName"), cell("VARCHAR(45)"), cell("NN"), cell("学生姓名"), cell(""),
    ]}),
    new TableRow({ children: [
      cell("topicID"), cell("INT"), cell("PK, NN"), cell("选题ID"), cell("联合主键"),
    ]}),
    new TableRow({ children: [
      cell("topicName"), cell("VARCHAR(45)"), cell(""), cell("选题名称"), cell(""),
    ]}),
  ],
});
sections.push(stutopicTable);

sections.push(
  bodyPara(T`其中 stutopic 表采用联合主键（stuID, topicID），确保一个学生不能重复选择同一选题。`),
);

// 四、系统实现
sections.push(
  h1("四、系统实现"),
  h2("4.1 开发环境"),
);

const envTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [3000, 3000, 4000],
  rows: [
    new TableRow({ children: [
      cell("环境项", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("版本/工具", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
      cell("说明", { shading: { type: ShadingType.CLEAR, fill: "E8E8E8" } }),
    ]}),
    new TableRow({ children: [
      cell("操作系统"), cell("Windows 10/11"), cell("开发及运行环境"),
    ]}),
    new TableRow({ children: [
      cell("JDK"), cell("JDK 1.8"), cell("Java 开发工具包"),
    ]}),
    new TableRow({ children: [
      cell("IDE"), cell("IntelliJ IDEA"), cell("集成开发环境"),
    ]}),
    new TableRow({ children: [
      cell("Web服务器"), cell("Apache Tomcat 9"), cell("Servlet容器"),
    ]}),
    new TableRow({ children: [
      cell("数据库"), cell("MySQL 8.0"), cell("关系型数据库"),
    ]}),
    new TableRow({ children: [
      cell("构建工具"), cell("Maven 3.8+"), cell("项目依赖管理"),
    ]}),
    new TableRow({ children: [
      cell("前端框架"), cell("Bootstrap 4.6.2"), cell("响应式页面布局"),
    ]}),
  ],
});
sections.push(envTable);

sections.push(
  h2("4.2 关键技术"),
  h3("4.2.1 Spring MVC"),
  bodyPara(T`Spring MVC 是 Spring 框架提供的基于 MVC 设计模式的 Web 开发框架。DispatcherServlet 作为前端控制器，统一接收所有请求，并根据 HandlerMapping 将请求分发到对应的 Controller 方法。Controller 处理完后，通过 ViewResolver 解析视图，返回 JSP 页面。`),
  h3("4.2.2 MyBatis"),
  bodyPara(T`MyBatis 是一款优秀的持久层框架，支持定制化 SQL、存储过程以及高级映射。通过 Mapper 接口与 XML 映射文件分离 SQL 与 Java 代码，降低了耦合度。本系统中所有数据库操作均通过 MyBatis 完成。`),
  h3("4.2.3 PageHelper"),
  bodyPara(T`PageHelper 是 MyBatis 的分页插件，通过在 Mapper 方法调用前执行 PageHelper.startPage(pageNum, pageSize) 实现物理分页。分页结果封装为 PageInfo 对象，包含当前页数据、总页数、导航页码等，便于前端分页展示。`),
  h3("4.2.4 Druid 连接池"),
  bodyPara(T`Druid 是阿里巴巴开源的数据库连接池，提供监控、SQL 防注入、性能统计等功能。本系统配置 initialSize=5、maxActive=20、maxWait=60000，确保数据库连接高效复用。`),
);

// 4.3 核心代码
sections.push(
  h2("4.3 核心代码"),
  h3("4.3.1 实体类设计"),
  bodyPara(T`Student 实体类对应 student 表，包含 stuID、stuName、stuPwd、major 四个属性。Topic 实体类对应 topic 表，包含 topicID、topicName、start、end、capacity 五个属性。StuTopic 实体类对应 stutopic 关联表，包含 stuID、stuName、topicID、topicName 四个属性。`),
  h3("4.3.2 Mapper 接口与 XML 映射"),
  bodyPara(T`以 StudentMapper 为例，定义了 add、delete、update、findById、findAll、findByIdAndName 等方法。对应的 XML 映射文件 StudentMapper.xml 中配置 resultMap 映射关系，并编写 SQL 语句实现 CRUD 操作。`),
  h3("4.3.3 学生选题核心逻辑"),
  bodyPara(T`学生选题是系统的核心业务逻辑，主要校验步骤如下：检查学生是否存在；检查选题是否存在；检查学生是否已经选过该选题；检查学生是否已有其他选题（每人限选一个）；检查选题容量是否已满；通过校验后，向 stutopic 表插入记录。`),
  h3("4.3.4 Spring 配置"),
  bodyPara(T`spring-dao.xml 配置 Druid 数据源、SqlSessionFactory 和 Mapper 扫描器；spring-service.xml 配置 Service 层扫描和声明式事务；spring-mvc.xml 配置 Controller 扫描、视图解析器、拦截器和静态资源放行。`),
);

// 五、系统测试与运行
sections.push(
  h1("五、系统测试与运行"),
  bodyPara(T`系统部署到 Tomcat 后，通过浏览器访问 http://localhost:8080/index.jsp 即可进入首页。首页提供学生管理、选题管理、选题记录、学生选择选题四个模块入口。`),
  bodyPara(T`测试用例包括：`),
  bodyPara(T`（1）未登录用户可直接访问学生管理、选题管理、选题记录模块，无需登录验证。`),
  bodyPara(T`（2）点击“学生选择选题”后，未登录用户自动跳转至登录页面，输入学号（stuID）和姓名（stuName）完成登录。`),
  bodyPara(T`（3）登录后进入浏览选题页面，可查看所有选题列表，点击“选择选题”按钮进行选题。`),
  bodyPara(T`（4）系统校验选题容量，若已满则提示错误信息；若学生已选过其他选题，则禁止重复选择。`),
  bodyPara(T`（5）在“我的选题”页面可查看当前登录学生已选择的选题记录。`),
);

// 六、总结与展望
sections.push(
  h1("六、总结与展望"),
  bodyPara(T`本系统基于 Spring MVC + MyBatis 技术栈实现了毕业设计选题管理的基本功能，涵盖了学生管理、选题管理、选题记录查询、学生选题等核心模块。通过本次课程设计，深入理解了 Spring MVC 的请求处理流程、MyBatis 的 SQL 映射机制、以及 Maven 项目构建和依赖管理。`),
  bodyPara(T`在后续工作中，可考虑以下优化方向：增加教师角色与选题审核流程；引入 Redis 缓存提升查询性能；增加选题抢选并发控制（乐观锁）；完善前端界面，引入 Vue.js 实现前后端分离；增加数据统计与可视化报表功能。`),
);

// 参考文献
sections.push(
  h1("参考文献"),
  bodyPara(T`[1]  Craig Walls. Spring 实战（第5版）[M]. 人民邮电出版社, 2020.`),
  bodyPara(T`[2]  刘增辉. MyBatis 从入门到精通[M]. 电子工业出版社, 2017.`),
  bodyPara(T`[3]  张开涛. 跟我学 Spring MVC[M]. 电子工业出版社, 2016.`),
  bodyPara(T`[4]  官网文档. Spring Framework Reference Documentation. https://spring.io/projects/spring-framework`),
  bodyPara(T`[5]  官网文档. MyBatis 3. https://mybatis.org/mybatis-3/`),
);

// 组装文档
const children = [
  ...coverPage(),
  new Paragraph({ children: [new TextRun({ text: "", break: 1 })], pageBreakBefore: true }),
  h1("目录"),
  para(run(T`右键目录，选择“更新域”刷新页码。`, { italics: true, color: "78909C" })),
  toc(tocEntries),
];

for (const item of sections) {
  children.push(item);
}

const doc = new Document({
  features: { updateFields: true },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [para(run("毕业设计选题管理系统 — 课程设计报告", { bold: true }), {
          alignment: AlignmentType.CENTER,
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [para(
          new TextRun({ children: [PageNumber.CURRENT] }),
          { alignment: AlignmentType.CENTER },
        )],
      }),
    },
    children,
  }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outputPath, buffer);
console.log("Report generated:", outputPath);
