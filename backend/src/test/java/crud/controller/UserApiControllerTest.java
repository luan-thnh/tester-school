package crud.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.ArgumentMatcher;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import sourse.crud.CrudApplication;
import sourse.crud.dto.request.UserCreationRequest;
import sourse.crud.dto.response.UserResponse;
import sourse.crud.service.UserService;

import java.time.LocalDate;

@Slf4j
@SpringBootTest(classes = CrudApplication.class)
@AutoConfigureMockMvc
public class UserApiControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private UserCreationRequest request;
    private UserResponse userResponse;
    private LocalDate birthday;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void iniData() {
        birthday = LocalDate.of(2003, 1, 1);
        request = UserCreationRequest.builder().username("minhhaunguyen").firstName("Nguyen").lastName("Hau").password("minhhau123").confirmPassword("minhhau123").birthday(birthday).build();
        userResponse = UserResponse.builder().id("2434354").username("MinhHau").firstName("Nguyen").lastName("Hau").birthday(birthday).build();
    }

    @Test
    void StoreUserTest_validRequest_success() throws Exception {
// GIVEN
        ObjectMapper mapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(request);
        Mockito.when(userService.store(ArgumentMatchers.any())).thenReturn(userResponse);
//WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON_VALUE).content(content)).andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("code").value(1000))
                .andExpect(MockMvcResultMatchers.jsonPath("result.id").value("2434354"));
    }


    @Test
    void StoreUserTest_inValidRequest_fail() throws Exception {
        request.setUsername("mh");
        ObjectMapper mapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(request);
        Mockito.when(userService.store(ArgumentMatchers.any())).thenReturn(userResponse);
        
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON_VALUE).content(content)).andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("code").value(1003))
                .andExpect(MockMvcResultMatchers.jsonPath("message").value("Username must be at least 3 characters"));
    }

}
