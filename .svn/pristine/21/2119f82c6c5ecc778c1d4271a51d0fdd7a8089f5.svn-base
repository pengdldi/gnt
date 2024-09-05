package com.szone.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.opensymphony.sitemesh.webapp.SiteMeshFilter;

@Configuration
public class SiteMeshConfig {
	
	@Bean
	public FilterRegistrationBean<SiteMeshFilter> siteMeshFilter() {
		FilterRegistrationBean<SiteMeshFilter> filter = new FilterRegistrationBean<SiteMeshFilter>();
		filter.setFilter(new SiteMeshFilter());
		return filter;
	}
	
}
