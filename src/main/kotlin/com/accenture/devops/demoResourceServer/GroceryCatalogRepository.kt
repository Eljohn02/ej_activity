package com.accenture.devops.demoResourceServer

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "grocerycatalog", path = "catalog")
interface GroceryCatalogRepository : CrudRepository<GroceryCatalogModel, Long> {
}