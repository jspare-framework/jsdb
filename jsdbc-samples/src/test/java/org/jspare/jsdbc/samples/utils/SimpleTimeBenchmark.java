package org.jspare.jsdbc.samples.utils;

public class SimpleTimeBenchmark {
	
	private long start;
	private long end;
	
	public SimpleTimeBenchmark start(){
		
		start = System.currentTimeMillis();
		return this;
	}
	
	public SimpleTimeBenchmark and(){
		
		return this;
	}
	
	public SimpleTimeBenchmark end(){
		
		end = System.currentTimeMillis();
		System.out.println(end - start);
		
		start = 0;
		end = 0;
		return this;
	}

}
