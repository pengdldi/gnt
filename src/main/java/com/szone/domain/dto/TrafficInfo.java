package com.szone.domain.dto;

import lombok.Data;

@Data
public class TrafficInfo {
	
	private int id;
	private String positionX;
	private String positionY;
	private String node_id;
	private String cross_node_id;
	private String rn;
	
	private String link_id;
	private String lane_no;
	private String turn;
	private String spd;
	private String vol;
	private String occ;
	private String waiting_line;
	private int timelevel;

}
