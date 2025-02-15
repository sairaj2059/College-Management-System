package com.collegemanagementsystem.backend.dto;

import java.util.List;

public class AddMember {
    private List<String> batches;
    private List<String> regdNoList;

    public AddMember(List<String> batches, List<String> regdNoList) {
        this.batches = batches;
        this.regdNoList = regdNoList;
    }

    public List<String> getRegdNoList() {
        return regdNoList;
    }

    public void setRegdNos(List<String> regdNoList) {
        this.regdNoList = regdNoList;
    }

    public List<String> getBatches() {
        return batches;
    }

    public void setBatches(List<String> batches) {
        this.batches = batches;
    }

}
