package com.accenture.devops.demoResourceServer

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean

@SpringBootApplication
class DemoResoureServerApplication {

	@Bean
	fun run(repository: GroceryCatalogRepository) = ApplicationRunner {
		repository.save(GroceryCatalogModel(
			productName = "Hansel",
			type = "Biscuit",
			manufacturer = "Republic of Biscuits",
			price = 5.0
		))
	}
}

fun main(args: Array<String>) {
	runApplication<DemoResoureServerApplication>(*args)
}
