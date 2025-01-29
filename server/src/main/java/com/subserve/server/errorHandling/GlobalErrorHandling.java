package com.subserve.server.errorHandling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;



@ControllerAdvice
public class GlobalErrorHandling {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex){
        return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error ocurred in the serve");
    }
}
