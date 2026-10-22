package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import project.entity.Student;
import project.service.StudentService;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class LoginController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/doLogin")
    public String doLogin(String username, String password, HttpSession session, Map<String, Object> map) {
        // 学生登录：账号=学号(stuID)，密码=姓名(stuName)
        try {
            int stuID = Integer.parseInt(username);
            Student student = studentService.login(stuID, password);
            if (student != null) {
                session.setAttribute("student", student);
                return "redirect:/topic/browse";
            }
        } catch (NumberFormatException e) {
            // 不是数字ID，登录失败
        }
        map.put("error", "学号或姓名错误");
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
