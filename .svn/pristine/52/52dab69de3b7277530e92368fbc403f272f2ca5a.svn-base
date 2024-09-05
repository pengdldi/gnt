package com.szone.domain.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.szone.domain.dao.MapDao;
import com.szone.domain.dto.Device;
import com.szone.domain.dto.Szone;


@Service
public class szoneService {
	
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
}