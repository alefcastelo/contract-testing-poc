package com.nonetest.loanofficerprovider.model;

public class LoanOfficer {
  protected Integer id;
  protected String name;
  protected String[] licensedStates;

  public LoanOfficer(Integer id, String name, String[] licensedStates) {
    this.id = id;
    this.name = name;
    this.licensedStates = licensedStates;
  }

  public Integer getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String[] getLicensedStates() {
    return licensedStates;
  }
}
