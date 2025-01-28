package com.subserve.server.payload;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginPayload {
    private String email;
    private String password;
}
