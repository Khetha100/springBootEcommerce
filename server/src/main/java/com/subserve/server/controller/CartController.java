package com.subserve.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.subserve.server.model.Cart;
import com.subserve.server.repository.CartRepository;

@CrossOrigin
@RestController
public class CartController {

    @Autowired
    CartRepository cartRepository;

    @PostMapping("/cartItems")
    public List<Cart> getCartItems(){
        return cartRepository.findAll();
    }

    @PostMapping("/ordered")
    public List<Cart> getOrderedItems(){
        return cartRepository.findAll();
    }

    @PostMapping("saveCartItem")
    public Cart saveCartItem(@RequestBody Cart cart) {
        System.out.println("AT PST MAPPING");
        // System.out.println(cart);
        Cart exists = cartRepository.findById(cart.getId()).orElse(null);
        System.out.println(exists);
        if(exists != null){
            exists.setQuantity(exists.getQuantity() + 1);
        }
        return cartRepository.save(exists);
    }

    @PutMapping("/updateCartItem")
    public Cart updateCartItem(@RequestBody Cart cart){
        Cart cObj = cartRepository.findById(cart.getId()).orElse(null);
        cObj.setDescription(cart.getDescription());
        cObj.setName(cart.getName());
        cObj.setPrice(cart.getPrice());
        cObj.setImageurl(cart.getImageurl());
        cObj.setQuantity(cart.getQuantity());
        cObj.setOrdered(cart.isOrdered());
        cObj.setSoftDelete(cart.isSoftDelete());
        return cartRepository.save(cObj);
    }

    @PutMapping("/deleteCartItem")
    public Cart deleteCartItem(@RequestBody Cart cart){
        Cart cObj = cartRepository.findById(cart.getId()).orElse(null);
        cObj.setDescription(cart.getDescription());
        cObj.setName(cart.getName());
        cObj.setPrice(cart.getPrice());
        cObj.setImageurl(cart.getImageurl());
        cObj.setQuantity(cart.getQuantity());
        cObj.setOrdered(cart.isOrdered());
        cObj.setSoftDelete(cart.isSoftDelete());
        return cartRepository.save(cObj);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll(){
        cartRepository.deleteAll();
    }


}
