package com.subserve.server.controller;

import com.subserve.server.model.Cart;
import com.subserve.server.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        System.out.println(cart);
        return cartRepository.save(cart);
    }

    @PutMapping("updateCartItem")
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

    @PutMapping("deleteCartItem")
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

    @DeleteMapping("deleteAll")
    public void deleteAll(){
        cartRepository.deleteAll();
    }


}
