package com.subserve.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="cart")
public class Cart {

    @Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotNull
    private String name;

    @NotNull
    private String description;


    @NotNull
    private float price;

    @NotNull
    private String imageurl;

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
