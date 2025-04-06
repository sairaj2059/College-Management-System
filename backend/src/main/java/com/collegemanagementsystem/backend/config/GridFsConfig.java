// package com.collegemanagementsystem.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import com.mongodb.client.MongoClient;
// import com.mongodb.client.MongoDatabase;
// import com.mongodb.client.gridfs.GridFSBucket;
// import com.mongodb.client.gridfs.GridFSBuckets;

// @Configuration
// public class GridFsConfig {
//     @Bean
//     public GridFSBucket gridFSBucket(MongoClient mongoClient) {
//         MongoDatabase database = mongoClient.getDatabase("student");
//         return GridFSBuckets.create(database, "attachments");
//     }
// }
