package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import project.entity.Student;
import project.entity.StuTopic;
import project.service.StuTopicService;
import project.service.StudentService;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/stuTopic")
public class StuTopicController {

    @Autowired
    private StuTopicService stuTopicService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/list")
    public String list(@RequestParam(defaultValue = "1") int pageNum,
                       @RequestParam(defaultValue = "10") int pageSize,
                       Model model) {
        PageInfo<StuTopic> pageInfo = new PageInfo<>(stuTopicService.findAll(pageNum, pageSize));
        model.addAttribute("pageInfo", pageInfo);
        return "stuTopic/list";
    }

    @GetMapping("/myTopic")
    public String myTopic(HttpSession session, Model model) {
        Student student = (Student) session.getAttribute("student");
        if (student != null) {
            model.addAttribute("stuTopicList", stuTopicService.findByStuId(student.getStuID()));
        }
        return "stuTopic/myTopic";
    }

    /**
     * 学生选择选题
     * 从session获取当前登录学生信息，防止越权操作
     */
    @PostMapping("/select")
    @ResponseBody
    public Map<String, Object> select(@RequestParam int topicID, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        try {
            Student student = (Student) session.getAttribute("student");
            if (student == null) {
                result.put("success", false);
                result.put("message", "请先登录");
                return result;
            }
            boolean success = studentService.selectTopic(student.getStuID(), topicID);
            // 更新session中的学生信息
            Student updatedStudent = studentService.findById(student.getStuID());
            session.setAttribute("student", updatedStudent);
            
            result.put("success", success);
            result.put("message", "选题成功");
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }
}
