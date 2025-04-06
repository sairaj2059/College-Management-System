package com.collegemanagementsystem.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.resultModal.SemesterMarks;
import com.collegemanagementsystem.backend.model.resultModal.SemesterResults;
import com.collegemanagementsystem.backend.model.resultModal.SubjectMarks;
import com.collegemanagementsystem.backend.repository.ResultsRepository;

@Service
public class SemResultService {
    @Autowired
    private ResultsRepository resultsRepository;

    public SemesterResults getSemResultDetails(String regdNo) {
        return resultsRepository.findByRegdNo(regdNo);
    }

   public SemesterResults saveSemesterResult(SemesterResults request) {
    String regdNo = request.getRegdNo();
    String courseName = request.getCourseName();
    String joinYear = request.getJoinYear();
    SemesterMarks incomingSemester = request.getSemesters().get(0); 
    String incomingSemNumber = incomingSemester.getSemesterNumber();

    Optional<SemesterResults> existingOpt = resultsRepository
        .findByRegdNoAndCourseNameAndJoinYear(regdNo, courseName, joinYear);

    if (existingOpt.isPresent()) {
        SemesterResults existing = existingOpt.get();

        // Check if the semester already exists
        Optional<SemesterMarks> existingSemesterOpt = existing.getSemesters().stream()
            .filter(sem -> sem.getSemesterNumber().equals(incomingSemNumber))
            .findFirst();

        if (existingSemesterOpt.isPresent()) {
            SemesterMarks existingSemester = existingSemesterOpt.get();

            for (SubjectMarks newMark : incomingSemester.getSubjectMarks()) {
                Optional<SubjectMarks> existingMarkOpt = existingSemester.getSubjectMarks().stream()
                    .filter(sm -> sm.getSubject().getSubjectCode().equals(newMark.getSubject().getSubjectCode()))
                    .findFirst();

                if (existingMarkOpt.isPresent()) {
                    existingMarkOpt.get().setCieMarks(newMark.getCieMarks()); // Update marks
                } else {
                    existingSemester.getSubjectMarks().add(newMark); // Add new subject
                }
            }

        } else {
            // Add new semester
            existing.getSemesters().add(incomingSemester);
        }

        return resultsRepository.save(existing);
    } else {
        // Save as new document
        return resultsRepository.save(request);
    }
}

}
