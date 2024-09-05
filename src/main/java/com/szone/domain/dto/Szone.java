package com.szone.domain.dto;

import lombok.Data;

@Data
public class Szone {
	
	private int id;
	private String link_id;
	private String geom;
	private int lane_no;
	private String lane_note;
	private int slevel;
	private String slevel_note;
	private String road_name;
	private int device_cnt;
	
	private String node_id;
	
	private String cctv_id;
	private String vds_id;
	
	private String waiting_line;
	
	private int timelevel;
}
