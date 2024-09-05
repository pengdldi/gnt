package com.szone.domain.service;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.szone.domain.dao.MapDao;
import com.szone.domain.dto.Device;
import com.szone.domain.dto.SmtlSpd;
import com.szone.domain.dto.Szone;
import com.szone.domain.dto.TrafficInfo;


@Service
public class smtlService {
	
	@Autowired
	private MapDao mapDao;


	public Map<String, List<Szone>> szoneUnitInfo(Szone szone) {
		Map<String, List<Szone>> result = mapDao.szoneUnitInfo(szone);
		return result;
	}

	public Map<String, List<Szone>> szoneEachInfo(Szone szone) {
		Map<String, List<Szone>> result = mapDao.szoneEachInfo(szone);
		return result;
	}
	
	public Map<String, List<Device>> deviceInfo(Device device) {
		Map<String, List<Device>> result = mapDao.deviceInfo(device);
		return result;
	}

	public Map<String, List<Szone>> waitingLineInfo(Szone line) {
		Map<String, List<Szone>> result = mapDao.waitingLineInfo(line);
		return result;
	}
	
	public Map<String, List<SmtlSpd>> linkSpdInfo(SmtlSpd spd) {
		Map<String, List<SmtlSpd>> result = mapDao.linkSpdInfo(spd);
		return result;
	}

	public Map<String, List<SmtlSpd>> linkVolInfo(SmtlSpd vol) {
		Map<String, List<SmtlSpd>> result = mapDao.linkVolInfo(vol);
		return result;
	}

	public Map<String, List<TrafficInfo>> trafficInfo(TrafficInfo traffic) {
		Map<String, List<TrafficInfo>> result = mapDao.trafficInfo(traffic);
		return result;
	}

	public void insertCrossNode(TrafficInfo traffic) {
		mapDao.insertCrossNode(traffic);
	}

	public void insertSzoneRoad(TrafficInfo traffic) {
		mapDao.insertSzoneRoad(traffic);
		
	}

	public void insertWaitingLine(TrafficInfo traffic) {
		mapDao.insertWaitingLine(traffic);
		
	}

}