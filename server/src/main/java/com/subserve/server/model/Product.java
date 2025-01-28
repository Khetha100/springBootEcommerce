package com.subserve.server.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String price;

    @Column(name="short_description")
    private String shortDescription;

    @Column(name="thumbnail_url")
    private String thumbnailUrl;

    @Column(name="on_hand")
    private int onHand;


}
