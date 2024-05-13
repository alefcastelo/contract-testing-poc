package com.nonetest.loanofficerprovider.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.nonetest.loanofficerprovider.model.LoanOfficer;
import com.nonetest.loanofficerprovider.repository.LoanOfficerRepository;

@RestController
public class LoanOfficerController {
  protected LoanOfficerRepository loanOfficerRepository;

  @Autowired
  public LoanOfficerController(LoanOfficerRepository loanOfficerRepository) {
    this.loanOfficerRepository = loanOfficerRepository;
  }

  @GetMapping("/loan-officers/{id}")
  public LoanOfficer getById(@PathVariable("id") Integer id) {
    Optional<LoanOfficer> loanOfficer = loanOfficerRepository.getById(id);

    if (loanOfficer.isPresent()) {
      return loanOfficer.get();
    } else {
      return null;
    }
  }

  @GetMapping("/loan-officers")
  public LoanOfficer[] getAll() {
    return loanOfficerRepository.getAll();
  }
}
