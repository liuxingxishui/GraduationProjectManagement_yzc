package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.pagehelper.PageInfo;
import project.entity.Student;
import project.service.StudentService;

import javax.validation.Valid;

@Controller
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/list")
    public String list(@RequestParam(defaultValue = "1") int pageNum,
                       @RequestParam(defaultValue = "10") int pageSize,
                       Model model) {
        PageInfo<Student> pageInfo = new PageInfo<>(studentService.findAll(pageNum, pageSize));
        model.addAttribute("pageInfo", pageInfo);
        return "student/list";
    }

    @GetMapping("/add")
    public String add() {
        return "student/add";
    }

    @PostMapping("/add")
    public String add(@Valid Student student, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("student", student);
            return "student/add";
        }
        studentService.add(student);
        return "redirect:/student/list";
    }

    @GetMapping("/edit/{stuID}")
    public String edit(@PathVariable("stuID") int stuID, Model model) {
        model.addAttribute("student", studentService.findById(stuID));
        return "student/edit";
    }

    @PostMapping("/update")
    public String update(@Valid Student student, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("student", student);
            return "student/edit";
        }
        studentService.update(student);
        return "redirect:/student/list";
    }

    @GetMapping("/delete/{stuID}")
    public String delete(@PathVariable("stuID") int stuID) {
        studentService.delete(stuID);
        return "redirect:/student/list";
    }
}
