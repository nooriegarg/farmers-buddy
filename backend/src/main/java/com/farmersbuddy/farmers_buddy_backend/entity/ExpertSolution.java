package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "expert_solutions")
public class ExpertSolution {

    @Getter @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter
    private String title;

    @Getter @Setter
    @Column(length = 2000)
    private String description;

    @Getter @Setter
    private String category;

    @Getter @Setter
    private String postedBy;

    @Getter @Setter
    private Long expertId;

    @Getter @Setter
    private String createdDate;

    public ExpertSolution() {}
}
