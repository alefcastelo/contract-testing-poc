package com.nonetest.loanofficerprovider.repository;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nonetest.loanofficerprovider.model.LoanOfficer;

@Service
public class LoanOfficerRepository {
  protected LoanOfficer[] loanOfficers;

  public LoanOfficerRepository() {
    loanOfficers = new LoanOfficer[] {
        new LoanOfficer(1, "Alice", new String[] { "CA", "NY" }),
        new LoanOfficer(2, "Bob", new String[] { "CA", "TX" }),
        new LoanOfficer(3, "Charlie", new String[] { "NY", "TX" })
    };
  }

  public LoanOfficer[] getAll() {
    return loanOfficers;
  }

  public Optional<LoanOfficer> getById(Integer id) {
    for (LoanOfficer loanOfficer : loanOfficers) {
      if (loanOfficer.getId().equals(id)) {
        return Optional.of(loanOfficer);
      }
    }

    return Optional.empty();
  }
}
