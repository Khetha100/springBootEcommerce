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
    private String short_description;

    @Column(name="long_description")
    private String long_description;

    @Column(name="thumbnail_url")
    private String thumbnail_url;


    @Column(name="on_hand")
    private int on_hand;


}
