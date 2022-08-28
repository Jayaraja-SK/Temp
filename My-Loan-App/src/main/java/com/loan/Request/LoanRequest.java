package com.loan.Request;

import java.util.UUID;


public class LoanRequest {
	public UUID userId;
    public String status;
    public double amount;
    public String purpose;
    public int emiMonths;
    public float interest;
    
	public LoanRequest(UUID userId, String status, double amount, String purpose, int emiMonths, float interest) {
		this.userId = userId;
		this.status = status;
		this.amount = amount;
		this.purpose = purpose;
		this.emiMonths = emiMonths;
		this.interest = interest;
	}
    
    
}
