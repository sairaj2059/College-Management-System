package com.collegemanagementsystem.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth.AbsentDay;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.TeacherDetailsRepository;

@Service
public class TeacherService {
    @Autowired
    ClassWiseAttendaceRepo classWiseAttendaceRepo;

    @Autowired
    TeacherDetailsRepository teacherDetailsRepository;

    public ClasswiseAttendance setStudentAttendanceByRegdNo(String className, String regdNo, String month, int newAbsentDays,
            AbsentDay absentDay) {
        ClasswiseAttendance classwiseAttendance = classWiseAttendaceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo,
                month);
            classwiseAttendance.getStudents().get(0).getAttendance().get(0).setDaysAbsent(newAbsentDays);
        classwiseAttendance.getStudents().get(0).getAttendance().get(0).getAbsentDays().addLast(absentDay);
        System.out.println(classwiseAttendance);
        return classWiseAttendaceRepo.save(classwiseAttendance);
    }
   
}
