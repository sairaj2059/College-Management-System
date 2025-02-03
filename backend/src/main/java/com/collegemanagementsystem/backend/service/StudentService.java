package com.collegemanagementsystem.backend.service;

import com.collegemanagementsystem.backend.model.StudentPrincipal;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth;

import java.time.YearMonth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.StudentAuth;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.StudentRepository;

@Service
public class StudentService implements UserDetailsService{
    @Autowired
    private StudentRepository repository;

    @Autowired
    private ClassWiseAttendaceRepo attendaceRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        StudentAuth student = repository.findByUsername(username);
        if (student == null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found"+ username);
        }
        return new StudentPrincipal(student);
    }

    public ClasswiseAttendance getStudentAttendanceByMonth(String className, String regdNo, String month){
        ClasswiseAttendance studentAttendance = attendaceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo, month);
        System.out.println(studentAttendance.toString());
       return studentAttendance;
    }

}