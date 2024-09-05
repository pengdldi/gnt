package com.szone.domain.dto;

import lombok.Data;

@Data
public class SmtlSpd {
	//공통
	private String link_id;
	private int lane_no;
	private String spd;
	private String vol;
	private String device;
	private String tmsl_note;
	private String node_id;
	private String slevel;
	private String slevel_note;
	private int gubun;
	private String smtl_node_name;
	private int timelevel;
	
}
