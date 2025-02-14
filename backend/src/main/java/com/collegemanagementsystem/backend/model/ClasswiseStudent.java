package com.collegemanagementsystem.backend.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student;

@Document(collection = "classwiseStudent")
public class ClasswiseStudent {
    private String className;
    private List<Student> students;
    public String getClassName() {
        return className;
    }
    public void setClassName(String className) {
        this.className = className;
    }
    public List<Student> getStudents() {
        return students;
    }
    public void setStudents(List<Student> students) {
        this.students = students;
    }

}
