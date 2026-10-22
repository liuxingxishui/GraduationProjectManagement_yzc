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
import project.entity.Topic;
import project.service.TopicService;

import javax.validation.Valid;

@Controller
@RequestMapping("/topic")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping("/list")
    public String list(@RequestParam(defaultValue = "1") int pageNum,
                       @RequestParam(defaultValue = "10") int pageSize,
                       Model model) {
        PageInfo<Topic> pageInfo = new PageInfo<>(topicService.findAll(pageNum, pageSize));
        model.addAttribute("pageInfo", pageInfo);
        return "topic/list";
    }

    @GetMapping("/add")
    public String add() {
        return "topic/add";
    }

    @PostMapping("/add")
    public String add(@Valid Topic topic, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("topic", topic);
            return "topic/add";
        }
        topicService.add(topic);
        return "redirect:/topic/list";
    }

    @GetMapping("/edit/{topicID}")
    public String edit(@PathVariable("topicID") int topicID, Model model) {
        model.addAttribute("topic", topicService.findById(topicID));
        return "topic/edit";
    }

    @PostMapping("/update")
    public String update(@Valid Topic topic, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("topic", topic);
            return "topic/edit";
        }
        topicService.update(topic);
        return "redirect:/topic/list";
    }

    @GetMapping("/delete/{topicID}")
    public String delete(@PathVariable("topicID") int topicID) {
        topicService.delete(topicID);
        return "redirect:/topic/list";
    }

    @GetMapping("/browse")
    public String browse(Model model) {
        model.addAttribute("topicList", topicService.findAll());
        return "topic/browse";
    }
}
