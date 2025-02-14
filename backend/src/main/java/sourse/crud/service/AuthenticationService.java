package sourse.crud.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.JWTClaimsSet;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sourse.crud.dto.request.AuthenticationRequest;
import sourse.crud.dto.response.AuthenticationResponse;
import sourse.crud.exception.AppException;
import sourse.crud.exception.ErrorCode;
import sourse.crud.repository.UserRepository;

import java.awt.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    @NonFinal
    protected static final String SIGNER_KEY = "44G4LjP6LKI6ECmzy8p5oocl+CLSyjcKca+rNxiA3bajEWAJVPvaA+16f/J7d8dz";
    public AuthenticationResponse login(AuthenticationRequest request) {
        System.out.println("request"+  request);
        var user = userRepository.findByUsername(request.getUsername()) 
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(user.getUsername());

        return AuthenticationResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .token(token)
                .authentication(true)
                .build();
    }

     String generateToken(String username) {
        try {
            // Tạo phần header cho JWS
            JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

            // Tạo phần payload với các thông tin claim
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(username)
                    .issuer("MinhauDev")
                    .issueTime(new Date())
                    .expirationTime(new Date(
                            Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                    ))
                    .claim("minhaudev","Spring boot")
                    .build();


            SignedJWT signedJWT = new SignedJWT(header, claimsSet);


            MACSigner signer = new MACSigner(SIGNER_KEY.getBytes());
            signedJWT.sign(signer);


            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Failed to generate token", e);
        }
    }
}
