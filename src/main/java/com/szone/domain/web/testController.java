package com.szone.domain.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class testController { 
	@RequestMapping("/home")
	public String intro(HttpServletRequest req, HttpServletResponse res) {
		return "/home";
	}
}