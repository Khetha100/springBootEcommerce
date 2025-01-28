package com.subserve.server.controller;

import com.subserve.server.model.Product;
import com.subserve.server.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return  productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@RequestParam Long id){
        return productRepository.findById(id).orElse(null);
    }
}
