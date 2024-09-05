package com.szone.domain.dao;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.szone.domain.dto.Device;
import com.szone.domain.dto.SmtlSpd;
import com.szone.domain.dto.Szone;
import com.szone.domain.dto.TrafficInfo;

@Repository
public class MapDao {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<Map<String,Object>> selectGeom() {
		return sqlSession.selectList("mapDao.selectGeom");
	}

	public Map<String, List<String>> selectSzoneAll() {
		Map<String, List<String>> results = new HashMap<>();
		//List<String> results = sqlSession.selectList("mapDao.selectSzoneAll");
		
		List<String> szoneUnit = sqlSession.selectList("mapDao.selectSzoneUnit");
		results.put("szoneUnit", szoneUnit);
		List<String> lane = sqlSession.selectList("mapDao.selectLane");
		results.put("lane", lane);
		
		for (int i = 1; i <= 8; i++) {
			int param = i;
			List<String> szone = sqlSession.selectList("mapDao.selectSzone", param);
			results.put("szone"+i, szone);
		}

		return results;
	}

	public Map<String, List<Szone>> szoneUnitInfo(Szone szone) {
		Map<String, List<Szone>> results = new HashMap<>();
		
		szone.setTimelevel(getServerHour());
		
		List<Szone> szoneUnitInfo = sqlSession.selectList("mapDao.szoneUnitInfo", szone);
		List<Szone> smtl = sqlSession.selectList("mapDao.smtl", szone);
		List<Szone> vds = sqlSession.selectList("mapDao.vds", szone);
		List<Szone> cctv = sqlSession.selectList("mapDao.cctv", szone);
		List<Szone> lidar = sqlSession.selectList("mapDao.lidar", szone);
		List<Szone> device_cnt = new ArrayList<Szone>();
		Szone dcnt = new Szone();
		dcnt.setDevice_cnt(smtl.size()+vds.size()+cctv.size()+lidar.size());
		device_cnt.add(dcnt);
		
		results.put("szoneInfo", szoneUnitInfo);
		results.put("smtl", smtl);
		results.put("vds", vds);
		results.put("cctv", cctv);
		results.put("lidar", lidar);
		results.put("device_cnt", device_cnt);
		return results;
	}
	
	public Map<String, List<Szone>> szoneEachInfo(Szone szone) {
		Map<String, List<Szone>> results = new HashMap<>();
		
		szone.setTimelevel(getServerHour());
		
		List<Szone> szoneEachInfo = sqlSession.selectList("mapDao.szoneEachInfo", szone);
		List<Szone> smtl = sqlSession.selectList("mapDao.smtl", szone);
		List<Szone> vds = sqlSession.selectList("mapDao.vds", szone);
		List<Szone> cctv = sqlSession.selectList("mapDao.cctv", szone);
		List<Szone> lidar = sqlSession.selectList("mapDao.lidar", szone);
		List<Szone> device_cnt = new ArrayList<Szone>();
		Szone dcnt = new Szone();
		dcnt.setDevice_cnt(smtl.size()+vds.size()+cctv.size()+lidar.size());
		device_cnt.add(dcnt);
		
		results.put("szoneInfo", szoneEachInfo);
		results.put("smtl", smtl);
		results.put("vds", vds);
		results.put("cctv", cctv);
		results.put("lidar", lidar);
		results.put("device_cnt", device_cnt);
		return results;
	}
	
	public Map<String, List<Szone>> waitingLineInfo(Szone line) {
		Map<String, List<Szone>> results = new HashMap<>();
		// TODO Auto-generated method stub
		return null;
	}

	public Map<String, List<Device>> deviceInfo(Device device) {
		Map<String, List<Device>> results = new HashMap<>();
		
		device.setTimelevel(getServerHour());
		
		List<Device> smtlInfo = sqlSession.selectList("mapDao.smtl", device);
		List<Device> smtlDetail = sqlSession.selectList("mapDao.smtlDetail", device);
		List<Device> vdsInfo = sqlSession.selectList("mapDao.vds", device);
		List<Device> vdsDetail = sqlSession.selectList("mapDao.vdsDetail", device);
		List<Device> cctvInfo = sqlSession.selectList("mapDao.cctv", device);
		List<Device> cctvDetail = sqlSession.selectList("mapDao.cctvDetail", device);
		List<Device> lidarInfo = sqlSession.selectList("mapDao.lidar", device);
		List<Device> lidarDetail = sqlSession.selectList("mapDao.lidarDetail", device);
		
		results.put("smtlInfo", smtlInfo);
		results.put("smtlDetail", smtlDetail);
		results.put("vdsInfo", vdsInfo);
		results.put("vdsDetail", vdsDetail);
		results.put("cctvInfo", cctvInfo);
		results.put("cctvDetail", cctvDetail);
		results.put("lidarInfo", lidarInfo);
		results.put("lidarDetail", lidarDetail);
		return results;
	}

	public Map<String, List<SmtlSpd>> linkSpdInfo(SmtlSpd spd) {
		Map<String, List<SmtlSpd>> results = new HashMap<>();
		List<SmtlSpd> spdInfo = new ArrayList<SmtlSpd>();
		
		spd.setTimelevel(getServerHour());
		
		int gubun = spd.getGubun();
		
		if (gubun == 5) {
			spdInfo = sqlSession.selectList("mapDao.linkSpdUnit", spd);
		} else {
			spdInfo = sqlSession.selectList("mapDao.linkSpdEach", spd);	
		}
		results.put("spdInfo", spdInfo);
		return results;
	}

	public Map<String, List<SmtlSpd>> linkVolInfo(SmtlSpd vol) {
		Map<String, List<SmtlSpd>> results = new HashMap<>();
		List<SmtlSpd> volInfo = new ArrayList<SmtlSpd>();
		
		vol.setTimelevel(getServerHour());
		
		int gubun = vol.getGubun();
		
		if (gubun == 5) {
			volInfo = sqlSession.selectList("mapDao.linkVolUnit", vol);
		} else {
			volInfo = sqlSession.selectList("mapDao.linkVolEach", vol);	
		}
		results.put("volInfo", volInfo);
		return results;
	}

	public Map<String, List<TrafficInfo>> trafficInfo(TrafficInfo traffic) {
		Map<String, List<TrafficInfo>> results = new HashMap<>();
		List<TrafficInfo> popupXY = new ArrayList<TrafficInfo>();
		List<TrafficInfo> trafficInfo = new ArrayList<TrafficInfo>();
		
		/* 교차로 클릭 시 위성지도 위 팝업의 x,y값 */
		popupXY = sqlSession.selectList("mapDao.popupXY", traffic);
		results.put("popupXY", popupXY);
		
		//LocalTime currentTime = LocalTime.now();
		//int hour = currentTime.getHour();
		//traffic.setTimelevel(hour);
		
		trafficInfo = sqlSession.selectList("mapDao.trafficInfo", traffic);
		results.put("trafficInfo", trafficInfo);
		return results;
	}

	public void insertCrossNode(TrafficInfo traffic) {
		int timelevel = traffic.getTimelevel();
		sqlSession.selectOne("mapDao.insertCrossNode", timelevel);
	}

	public void insertSzoneRoad(TrafficInfo traffic) {
		sqlSession.selectOne("mapDao.insertSzoneRoad");
		
	}

	public void insertWaitingLine(TrafficInfo traffic) {
		sqlSession.selectOne("mapDao.insertWaitingLine");
		
	}
	
	public int getServerHour() {
		LocalTime currentTime = LocalTime.now();
		int hour = currentTime.getHour();
		
		return hour;
	}
}