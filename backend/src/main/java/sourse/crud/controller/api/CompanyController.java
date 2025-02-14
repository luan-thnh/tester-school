package sourse.crud.controller.api;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sourse.crud.dto.request.CompanyCreationRequest;
import sourse.crud.entity.Company;
import sourse.crud.service.CompanyService;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
     CompanyService companyService;
    @PostMapping()
    public Company create(@RequestBody @Valid CompanyCreationRequest request) {
        return companyService.createCompany(request);
    }
    @GetMapping()
    public List<Company> getAllCompany() {
        return companyService.getAllCompany();
    }
    @PatchMapping("/{id}")
    public Company getCompanyById(@PathVariable String id, @RequestBody CompanyCreationRequest request) {
        System.out.println("request" + request);
        return companyService.updateCompany(id, request);
    }
    @GetMapping("/{id}")
    public Company show(@PathVariable String id) {
        return companyService.getCompanyID(id);
    }
    @DeleteMapping("/{id}")
    public void deleteCompany (@PathVariable String id) {
        companyService.deleteCompanyID(id);
    }
}
