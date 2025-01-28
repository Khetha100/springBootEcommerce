package com.subserve.server.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotNull
    private String name;

    @NotNull
    private String description;


    @NotNull
    private int price;

    @NotNull
    private String imageUrl;

    @NotNull
    private int quantity;

    @NotNull
    private boolean softDelete;

    @NotNull
    private boolean ordered;



//    name,
//    description,
//    price,
//    quantity,
//    imageurl,
//    softdelete,
//    ordered,
}
