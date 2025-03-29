package com.collegemanagementsystem.backend.model.examModel;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttemptedQuestion {
    private Question questionDetails;
    private boolean isAttempted;
    private boolean isCorrect;
    private int marksAwarded;
    private List<String> userAnswer;

}
