package com.collegemanagementsystem.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.noticeModal.Notices;
import com.collegemanagementsystem.backend.repository.NoticeRepository;

@Service
public class NoticeService {

    private NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public Notices addNotice(Notices notice) {
        return noticeRepository.save(notice);
    }

    public List<Notices> getallNotices() {
        return noticeRepository.findAll();
    }

    public ResponseEntity<String> deleteNotice(String id) {
        try {
            if (!noticeRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notice not found");
            }
            noticeRepository.deleteById(id);
            return ResponseEntity.ok("Notice deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to delete notice: " + e.getMessage());
        }
    }

}
