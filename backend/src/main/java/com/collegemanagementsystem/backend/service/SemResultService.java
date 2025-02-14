package com.collegemanagementsystem.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.Semester;
import com.collegemanagementsystem.backend.model.SemesterResults;
import com.collegemanagementsystem.backend.repository.ResultsRepository;

@Service
public class SemResultService {
    @Autowired
    private ResultsRepository resultsRepository;

    public SemesterResults getSemResultDetails(int id) {
        return resultsRepository.findById(id).orElse(null);
    }

    public SemesterResults saveSemesterResult(SemesterResults request) {
        SemesterResults semesterResults = resultsRepository.findById(request.getId())
                .orElse(new SemesterResults(request.getId(), request.getSemesters()));

        Map<Integer, Semester> semesterMap = new HashMap<>();
        
        for (Semester sem : semesterResults.getSemesters()) {
            semesterMap.put(sem.getSemesterNumber(), sem);
        }

        for (Semester newSem : request.getSemesters()) {
            semesterMap.merge(newSem.getSemesterNumber(), newSem, (existingSem, newSemData) -> {
                existingSem.setSubjects(newSemData.getSubjects());
                return existingSem;
            });
        }

        semesterResults.setSemesters(new ArrayList<>(semesterMap.values()));
        return resultsRepository.save(semesterResults);
    }
}
