package com.collegemanagementsystem.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "classwise_attendance")
public class ClasswiseAttendance {

    @Id
    private String id;
    private String className;
    private List<Student> students;

    public ClasswiseAttendance(String id, String className, List<Student> students) {
        this.id = id;
        this.className = className;
        this.students = students;
    }
    @Override
    public String toString() {
        return "ClassDetails{" +
                "id='" + id + '\'' +
                ", className='" + className + '\'' +
                ", students=" + students +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    // Inner class for Student
    public static class Student {
        private String regdNo;
        private String name;
        private List<AttendanceMonth> attendance;

        @Override
        public String toString() {
            return "Student{" +
                    "regdNo='" + regdNo + '\'' +
                    ", name='" + name + '\'' +
                    ", attendance=" + attendance +
                    '}';
        }

        public Student(String regdNo, String name, List<AttendanceMonth> attendance) {
            this.regdNo = regdNo;
            this.name = name;
            this.attendance = attendance;
        }

        public String getRegdNo() {
            return regdNo;
        }

        public void setRegdNo(String regdNo) {
            this.regdNo = regdNo;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<AttendanceMonth> getAttendance() {
            return attendance;
        }

        public void setAttendance(List<AttendanceMonth> attendance) {
            this.attendance = attendance;
        }

        // Inner class for Monthly Attendance
        public static class AttendanceMonth {
            private String month;
            private int totalWorkingDays;
            private int daysPresent;
            private int daysAbsent;
            private List<AbsentDay> absentDays;

            public AttendanceMonth(String month, int totalWorkingDays, int daysPresent, int daysAbsent,
                    List<AbsentDay> absentDays) {
                this.month = month;
                this.totalWorkingDays = totalWorkingDays;
                this.daysPresent = daysPresent;
                this.daysAbsent = daysAbsent;
                this.absentDays = absentDays;
            }

            @Override
            public String toString() {
                return "AttendanceMonth{" +
                        "month='" + month + '\'' +
                        ", totalWorkingDays=" + totalWorkingDays +
                        ", daysPresent=" + daysPresent +
                        ", daysAbsent=" + daysAbsent +
                        ", absentDays=" + absentDays +
                        '}';
            }

            // Inner class for Absent Day
            public static class AbsentDay {
                private String date;
                private String reason;

                public AbsentDay(String date, String reason) {
                    this.date = date;
                    this.reason = reason;
                }

                @Override
                public String toString() {
                    return "AbsentDay{" +
                            "date='" + date + '\'' +
                            ", reason='" + reason + '\'' +
                            '}';
                }

                public String getDate() {
                    return date;
                }

                public void setDate(String date) {
                    this.date = date;
                }

                public String getReason() {
                    return reason;
                }

                public void setReason(String reason) {
                    this.reason = reason;
                }

                // Getters and Setters
            }

            public String getMonth() {
                return month;
            }

            public void setMonth(String month) {
                this.month = month;
            }

            public int getTotalWorkingDays() {
                return totalWorkingDays;
            }

            public void setTotalWorkingDays(int totalWorkingDays) {
                this.totalWorkingDays = totalWorkingDays;
            }

            public int getDaysPresent() {
                return daysPresent;
            }

            public void setDaysPresent(int daysPresent) {
                this.daysPresent = daysPresent;
            }

            public int getDaysAbsent() {
                return daysAbsent;
            }

            public void setDaysAbsent(int daysAbsent) {
                this.daysAbsent = daysAbsent;
            }

            public List<AbsentDay> getAbsentDays() {
                return absentDays;
            }

            public void setAbsentDays(List<AbsentDay> absentDays) {
                this.absentDays = absentDays;
            }

            // Getters and Setters
        }

        // Getters and Setters
    }

    // Getters and Setters
}
