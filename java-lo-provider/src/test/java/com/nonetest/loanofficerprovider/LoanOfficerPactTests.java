package com.nonetest.loanofficerprovider;

import static org.mockito.Mockito.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.nonetest.loanofficerprovider.controller.LoanOfficerController;
import com.nonetest.loanofficerprovider.model.LoanOfficer;

import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactBroker;
import au.com.dius.pact.provider.junitsupport.loader.PactBrokerAuth;
import au.com.dius.pact.provider.junitsupport.target.TestTarget;
import au.com.dius.pact.provider.spring.junit5.MockMvcTestTarget;
import au.com.dius.pact.provider.spring.junit5.PactVerificationSpringProvider;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = LoanOfficerProviderApplication.class)
@EnableAutoConfiguration
@Provider("loan-officer-provider")
@TestPropertySource(locations = "classpath:application.properties")
@PactBroker(url = "${pact.broker.url}", authentication = @PactBrokerAuth(token = "${pact.broker.token}"))
class LoanOfficerPactTests {

  @TestTarget
  public final MockMvcTestTarget target = new MockMvcTestTarget();

  @BeforeEach
  void before(PactVerificationContext context) {
    LoanOfficer[] loanOfficers = new LoanOfficer[] {
        new LoanOfficer(1, "Alice", new String[] { "CA", "NY" }),
        new LoanOfficer(2, "Bob", new String[] { "CA", "TX" }),
        new LoanOfficer(3, "Charlie", new String[] { "NY", "TX" })
    };

    LoanOfficerController loanOfficerController = mock(LoanOfficerController.class);

    when(loanOfficerController.getById(1)).thenReturn(loanOfficers[0]);
    when(loanOfficerController.getAll()).thenReturn(loanOfficers);

    target.setControllers(loanOfficerController);
    context.setTarget(target);
  }

  @TestTemplate
  @ExtendWith(PactVerificationSpringProvider.class)
  void pactVerificationTestTemplate(PactVerificationContext context) {
    context.verifyInteraction();
  }
}
