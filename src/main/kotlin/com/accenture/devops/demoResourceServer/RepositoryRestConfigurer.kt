package com.accenture.devops.demoResourceServer

import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry

@Configuration
open class RestConfiguration : RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration?, cors: CorsRegistry?) {
        super.configureRepositoryRestConfiguration(config, cors)
        config?.exposeIdsFor(GroceryCatalogModel::class.java)
        config?.setBasePath("/api")
    }
}