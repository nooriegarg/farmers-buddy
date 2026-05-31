package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "queries")
public class Query {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private String farmerName;

    @Setter
    @Getter
    private String title;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private String officerReply;

    @Setter
    @Getter
    private String status;


    public Query() {
    }

    public Query(Long id, String farmerName, String title, String description, String officerReply,
                 String status) {
        this.id = id;
        this.farmerName = farmerName;
        this.title = title;
        this.description = description;
        this.officerReply = officerReply;
        this.status = status;
    }

}
