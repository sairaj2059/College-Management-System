package com.collegemanagementsystem.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.collegemanagementsystem.backend.model.SemesterResults;
import com.collegemanagementsystem.backend.repository.ResultsRepository;

@Service
public class SemResultService {
    @Autowired
    private ResultsRepository resultsRepository;

   public SemesterResults getSemResultDetails(String regdNo) {
    return resultsRepository.findByRegdNo(regdNo);
}

public SemesterResults saveSemesterResult(SemesterResults request) {
    SemesterResults semesterResults = resultsRepository.findByRegdNo(request.getRegdNo());
    if (semesterResults == null) {
        semesterResults = new SemesterResults(request.getRegdNo(), request.getSemesters());
    }
    

    semesterResults.setSemesters(request.getSemesters());
    return resultsRepository.save(semesterResults);
}

    

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
    //     return resultsRepository.save(semesterResults);
    // }
}
