package com.exam.auth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("student").isEmpty()) {
            userRepository.save(new AppUser(
                    "student",
                    passwordEncoder.encode("1234"),
                    Role.STUDENT
            ));
        }

        if (userRepository.findByUsername("examiner").isEmpty()) {
            userRepository.save(new AppUser(
                    "examiner",
                    passwordEncoder.encode("1234"),
                    Role.EXAMINER
            ));
        }

        if (userRepository.findByUsername("admin").isEmpty()) {
            userRepository.save(new AppUser(
                    "admin",
                    passwordEncoder.encode("1234"),
                    Role.ADMIN
            ));
        }
    }
}