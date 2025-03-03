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

        //Map<String, Semester> semesterMap = new HashMap<>();
        
        //for (Semester sem : semesterResults.getSemesters()) {
          //  semesterMap.put(sem.getSemesterNumber(), sem);
        //}

        // for (Semester newSem : request.getSemesters()) {
        //     if (semesterMap.containsKey(newSem.getSemesterNumber())) {
               
        //         Semester existingSem = semesterMap.get(newSem.getSemesterNumber());
              
        //         Map<String, Semester.Subject> subjectMap = new HashMap<>();

        //         for (Semester.Subject subject : existingSem.getSubjects()) {
        //             subjectMap.put(subject.getSubjectCode(), subject);
        //         }
               
        //         for (Semester.Subject newSubject : newSem.getSubjects()) {
        //             if (!subjectMap.containsKey(newSubject.getSubjectCode())) {
        //                 subjectMap.put(newSubject.getSubjectCode(), newSubject);
        //             }
        //         }
                
        //         existingSem.setSubjects(new ArrayList<>(subjectMap.values()));
        //     } else {
        //         semesterMap.put(newSem.getSemesterNumber(), newSem);
        //     }
        // }

        //semesterResults.setSemesters(new ArrayList<>(semesterMap.values()));
        return resultsRepository.save(semesterResults);
    }
}
