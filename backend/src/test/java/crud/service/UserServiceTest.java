package crud.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import sourse.crud.CrudApplication;
import sourse.crud.dto.request.UserCreationRequest;
import sourse.crud.dto.response.UserResponse;
import sourse.crud.entity.User;
import sourse.crud.repository.UserRepository;
import sourse.crud.service.UserService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import java.time.LocalDate;

@Slf4j
@SpringBootTest(classes = CrudApplication.class)
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @MockBean
    private UserRepository userRepository;
    private UserCreationRequest request;
    private UserResponse userResponse;
    private User user;
    private LocalDate birthday;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void iniData() {
        birthday = LocalDate.of(2003, 1, 1);
        request = UserCreationRequest.builder().username("minhhaunguyen").firstName("Nguyen").lastName("Hau").password("minhhau123").confirmPassword("minhhau123").birthday(birthday).build();
        userResponse = UserResponse.builder().id("2434354").username("MinhHau").firstName("Nguyen").lastName("Hau").birthday(birthday).build();
        user = User.builder().username("MinhHau").firstName("Nguyen").lastName("Hau").birthday(birthday)
                .build();
    }
    @Test
    void createUser_validRequest_success(){
//        GIVEN
         when(userRepository.existsByUsername(anyString())).thenReturn(false);
         when(userRepository.save(any())).thenReturn(user);

//         WHEN
       var response  =  userService.store(request);
//       THEN
       Assertions.assertThat(response.getId()).isEqualTo("2434354");
       Assertions.assertThat(response.getUsername()).isEqualTo("MinhHau");
    }
}
